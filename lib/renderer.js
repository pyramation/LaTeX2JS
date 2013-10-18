(function(LaTeX2HTML5) {


    var Graph = LaTeX2HTML5.Graph;
    var JST = window.JST = window.JST || {};

    Backbone.Layout.configure({
        fetchTemplate: function (path) {
            var relative = '';
            var absolute = '';
            if (path.indexOf('/') === 0) {
                relative = path.substr(1);
                absolute = path;
            } else {
                relative = path;
                absolute = '/' + path;
            }
            relative += '.html';
            absolute += '.html';
            var done = this.async();
            if (JST.hasOwnProperty(relative)) {
                return done(JST[relative]);
            }
            $.get(absolute, function (contents) {
                var tmpl = Handlebars.compile(contents);
                done(JST[relative] = tmpl);
            }, 'text');
        },
        renderTemplate: function (template, context) {
            return template(context);
        }
    });

    var BaseView = LaTeX2HTML5.BaseView = Backbone.Layout.extend({

    });

    var BaseEnvView = LaTeX2HTML5.BaseEnvView = BaseView.extend({
        beforeRender: function () {
            $(this.el).html(this.options.content.lines.join('\n'));
        },
        afterRender: function () {
            var process = MathJax.Hub.Queue([
                    'Typeset',
                    MathJax.Hub,
                    this.el
                ]);
            if (typeof process === 'function')
                process();
        }
    });

    var TeXViews = LaTeX2HTML5.Views = {};

    _.extend(TeXViews, {
        pspicture: BaseView.extend({
            className: 'pspicture-view',
            initialize: function (options) {
                this.options = options;
                var env = this.env = this.options.content.settings;
                var svg = this.svg = Graph.init.call(env, this.el);
                var self = this;
                var plots = this.options.content.plot;
                

                if (!this.svg) {
                    throw new Error('svg is required!');
                }


                svg.on('touchmove', function () {
                    d3.event.preventDefault();
                    var touchcoords = d3.touches(this)[0];
                    userEvent(touchcoords);
                }, false);
                
                svg.on('mousemove', function () {
                    var coords = d3.mouse(this);
                    userEvent(coords);
                }, false);

                function userEvent(coords) {
                    svg.selectAll('.userline').remove();
                    svg.selectAll('.psplot').remove();
                    var currentEnvironment = {};
                    // find special vars
                    _.each(plots, function (plot, k) {
                        if (k.match(/uservariable/)) {
                            _.each(plot, function (data) {
                                data.env.userx = coords[0];
                                data.env.usery = coords[1];
                                var dd = data.fn.call(data.env, data.match);
                                currentEnvironment[data.data.name] = dd.value;
                            });
                        }
                    });
                    _.each(plots, function (plot, k) {
                        if (k.match(/psplot/)) {
                            _.each(plot, function (data) {
                                _.each(currentEnvironment, function (variable, name) {
                                    data.env.variables[name] = variable;
                                });
                                var d = data.fn.call(data.env, data.match);
                                d.global = {};
                                _.extend(d.global, env);
                                // give pspicture!
                                Graph[k].call(d, svg);
                            });
                        }
                        if (k.match(/userline/)) {
                            _.each(plot, function (data) {
                                var d = data.fn.call(data.env, data.match);
                                data.env.x2 = coords[0];
                                // / env.xunit;
                                data.env.y2 = coords[1];
                                // / env.yunit;
                                data.data.x2 = data.env.x2;
                                data.data.y2 = data.env.y2;
                                if (data.data.xExp2) {
                                    data.data.x2 = d.userx2(coords);
                                    data.data.x1 = d.userx(coords);
                                } else if (data.data.xExp) {
                                    data.data.x2 = d.userx(coords);
                                }
                                if (data.data.yExp2) {
                                    data.data.y2 = d.usery2(coords);
                                    data.data.y1 = d.usery(coords);
                                } else if (data.data.yExp) {
                                    data.data.y2 = d.usery(coords);
                                }
                                d.global = {};
                                _.extend(d.global, env);
                                // give pspicture!
                                _.extend(d, data.data);
                                Graph[k].call(d, svg);
                            });
                        }
                    });
                }
            },
            afterRender: function () {
                var env = this.env;
                var svg = this.svg;
                var el = this.el;
                var plots = this.options.content.plot;
                _.each(plots, function (plot, k) {
                    if (k.match(/rput/))
                        return;
                    if (Graph.hasOwnProperty(k)) {
                        _.each(plot, function (data) {
                            data.data.global = env;
                            // give access to pspicture!
                            Graph[k].call(data.data, svg);
                        });
                    }
                });
                _.each(plots.rput, function (rput) {
                    var elem = Graph.rput.call(rput.data, this.el);
                }, this);
            }
        }),

        math: BaseEnvView.extend({
            className: 'mathjax-view'
        }),

        nicebox: BaseEnvView.extend({
            className: 'well'
        }),

        enumerate: BaseEnvView.extend({
            className: 'mathjax-view',
            tagName: 'ul',
            beforeRender: function () {
                var ls = [];
                _.each(this.options.content.lines, function (line) {
                    var m = line.match(/\\item (.*)/);
                    if (m) {
                        ls.push('<li>' + m[1] + '</li>');
                    } else {
                        ls.push(line);
                    }
                });
                $(this.el).html(ls.join('\n'));
            }
        }),

        verbatim: BaseView.extend({
            tagName: 'pre',
            beforeRender: function () {
                $(this.el).html(this.options.content.lines.join('\n'));
            }
        }),

        slider: BaseView.extend({
            template: 'templates/sliders',
            initialize: function (options) {
                this.options = options;
                if (!options.svg) {
                    throw new Error('svg is required!');
                }

            },                
            serialize: function () {
                var slider = this.options.slider;
                return {
                    latex: slider.latex,
                    scalar: slider.scalar,
                    variable: slider.variable,
                    min: slider.min * slider.scalar,
                    max: slider.max * slider.scalar,
                    value: slider.value
                };
            },
            afterRender: function () {
                var slid = this.$('input[type=range]');
                var p = this.$('h4+p');
                var svg = this.options.svg;
                var env = this.options.env;
                var plots = this.options.plot;
                // THIS SHOULD DELEGATE, NOT BE RESPONSIBLE FOR RENDERING! 
                slid.on('change', function () {
                    var value = this.value / this.getAttribute('scalar');
                    var variable = this.getAttribute('variable');
                    p.html(value);
                    env.variables[variable] = value;
                    svg.selectAll('.psplot').remove();
                    _.each(plots, function (plot, k) {
                        if (k.match(/psplot/)) {
                            _.each(plot, function (data) {
                                var d = data.fn.call(data.env, data.match);
                                // var d = _.extend({}, data, env);
                                Graph[k].call(d, svg);
                            });
                        }
                    });
                });
                var process = MathJax.Hub.Queue([
                        'Typeset',
                        MathJax.Hub,
                        this.el
                    ]);
                if (typeof process === 'function')
                    process();
            }
        }),

        sliders: BaseView.extend({
            className: 'well interactive',
            initialize: function (options) {
                this.options = options;
                if (!options.svg) {
                    throw new Error('svg is required!');
                }

            },
            beforeRender: function () {
                _.each(this.options.sliders, function (slider) {
                    var view = new TeXViews.slider({
                            svg: this.options.svg,
                            env: this.options.env,
                            plot: this.options.plot,
                            slider: slider
                        });
                    this.insertView(view);
                }, this);
            }
        })

    });

    LaTeX2HTML5.TeX = BaseView.extend({
        className: 'latex2html5',
        initialize: function (options) {
            if (options.latex) {
                var parser = new LaTeX2HTML5.Parser();
                this.options.parsed = parser.parse(options.latex);
            }
        },
        beforeRender: function () {
            _.each(this.options.parsed, function (element) {
                if (!element.hasOwnProperty('type')) {
                    throw new Error('no type!');
                }
                var matchedView = null;
                    _.any(TeXViews, function (view, hash) {
                        if (element.type == hash) {
                            var fn = TeXViews[hash];
                            if (_.isFunction(fn)) {
                                var v = new fn({ content: element });
                                this.insertView(v);
                                matchedView = v;
                                return v;
                            }
                        }
                    }, this);
                if (matchedView && element.env && element.env.sliders && element.env.sliders.length) {
                    //give related interactive elements the SVG reference!!
                    var slidersView = new TeXViews.sliders({
                            env: element.env,
                            sliders: element.env.sliders,
                            plot: element.plot,
                            svg: matchedView.svg
                        });
                    this.insertView(slidersView);
                }
            }, this);
        }
    });

}(LaTeX2HTML5));
