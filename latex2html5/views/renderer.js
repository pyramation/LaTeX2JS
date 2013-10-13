

// Set all Views to be managed by LayoutManager.
// Backbone.Layout.configure({ manage: true });


  
    // Backbone.Layout.configure({

    //     fetchTemplate: function(path) {

    //         alert(path);

    //         var relative = '';
    //         var absolute = '';

    //         if (path.indexOf('/') === 0) {
    //             relative = path.substr(1);
    //             absolute = path;
    //         } else {
    //             relative = path;
    //             absolute = '/' + path;
    //         }

    //         relative += '.html';
    //         absolute += '.html';

    //         var done = this.async();

    //         if (JST.hasOwnProperty(relative)) {
    //             return done(JST[relative]);
    //         }

    //         $.get(absolute, function(contents) {
    //             var tmpl = Handlebars.compile(contents);
    //             done(JST[relative] = tmpl);
    //         }, "text");

    //     },
    //     renderTemplate: function(template, context) {
    //         return template(context);
    //     }

    // });


// var BaseView = Backbone.View.extend({
 
//         initialize: function () {

            
//             this.render = _.wrap(this.render, function(render) {
//                 this.beforeRender();
//                 render();                       
//                 this.afterRender();
//             });                     
            
//             this.render();
//         },
 
//         render: function () {
//             console.log('Inside render');
//             return this;
//         },
        
//         beforeRender: function () {
//             console.log("Before render");
//         },
        
//         afterRender: function () {
//             console.log("After render");
//         }
 

// });
var BaseView = Backbone.View.extend({

});

// var BaseView = Backbone.View.extend({
//   // Override this property to specify the path to the template.
//   template: "",

//   // Override this method to provide the right data to your template.
//   serialize: function() {
//     return {};
//   },

//   // Overrideable fetch method to get the template contents, pass a callback to
//   // get the contents.
//   fetch: function(done) {
//     // Using jQuery, execute a GET request to asynchronously load the template
//     // from the filesystem.



//     alert(this.template + ".html");

//     $.get(this.template + ".html", function(contents) {
//       // Trigger the callback with the compiled template function.
//       done(Handlebars.compile(con));
//     });

//   },

//   // This method now looks for the above `template` and `serialize` properties
//   // in order to render.
//   render: function() {
//     // Fetch the template.

//     alert('render!!!!!!!!!!!');

//     this.fetch(function(template) {
//       // Render the markup.
//       var markup = template(this.serialize());

//       // Put the content into this Views element.
//       this.$el.html(markup);
//     });

//     // Allow chaining.
//     return this;
//   }
// });

var TeX = (function(){

    var views = window.views = {

        pspicture: BaseView.extend({

            className: 'pspicture-view',
            initialize: function() {

                var env = this.env = this.options.content.settings;
                var svg = this.svg = psgraph.init.call(env, this.el);

                var self = this;
                var plots = this.options.content.plot;

                svg.on('touchmove', function() {

                    d3.event.preventDefault();
                    var touchcoords = d3.touches(this)[0];

                    userEvent(touchcoords);

                }, false);

                svg.on('mousemove', function() {

                    var coords = d3.mouse(this);
                    userEvent(coords);

                }, false);



                function userEvent (coords) {

                    svg.selectAll('.userline').remove();
                    svg.selectAll('.psplot').remove();

                    var currentEnvironment = {};

                    // find special vars
                    _.each(plots, function(plot, k) {
                        if (k.match(/uservariable/)) {

                            _.each(plot, function (data) {
                                data.env.userx = coords[0];
                                data.env.usery = coords[1];
                                var dd = data.fn.call(data.env, data.match);
                                currentEnvironment[data.data.name] = dd.value;
                            });

                        }
                    });

                    _.each(plots, function(plot, k) {

                        if (k.match(/psplot/)) {

                            _.each(plot, function(data) {

                                _.each(currentEnvironment, function(variable, name) {
                                    data.env.variables[name] = variable;
                                });

                                var d = data.fn.call(data.env, data.match);

                                d.global = {};
                                _.extend(d.global, env); // give pspicture!

                                psgraph[k].call(d, svg);
                            });

                        }


                        if (k.match(/userline/)) {

                            _.each(plot, function(data) {

                                var d = data.fn.call(data.env, data.match);

                                data.env.x2 = coords[0]; // / env.xunit;
                                data.env.y2 = coords[1]; // / env.yunit;

                                data.data.x2 = data.env.x2;
                                data.data.y2 = data.env.y2;

                                if (data.data.xExp2) {
                                    data.data.x2 =  d.userx2(coords);
                                    data.data.x1 =  d.userx(coords);
                                } else if (data.data.xExp) {
                                    data.data.x2 =  d.userx(coords);
                                }

                                if (data.data.yExp2) {

                                    data.data.y2 =  d.usery2(coords);
                                    data.data.y1 =  d.usery(coords);

                                } else if (data.data.yExp) {
                                    data.data.y2 = d.usery(coords);
                                }

                                d.global = {};
                                _.extend(d.global, env); // give pspicture!
                                _.extend(d, data.data);
                                psgraph[k].call(d, svg);
                            });

                        }

                    });

                }

            },

            afterRender: function() {


                var env = this.env;
                var svg = this.svg;

                var el = this.el;

                var plots = this.options.content.plot;

                _.each(plots, function(plot, k) {

                    if (k.match(/rput/)) return;

                    if (psgraph.hasOwnProperty(k)) {
                        _.each(plot, function(data) {

                            data.data.global = env; // give access to pspicture!
                            psgraph[k].call(data.data, svg);
                        });
                    }

                });


                _.each(plots.rput, function(rput) {
                    var elem = psgraph.rput.call(rput.data, this.el);
                }, this);

            }

        }),

        math: BaseView.extend({

            className: 'mathjax-view',
            beforeRender: function() {
                $(this.el).html(this.options.content.lines.join('\n'));
            },
            afterRender: function() {
                var process = MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.el]);
                if (typeof process === 'function') process();

            }

        }),

        nicebox: BaseView.extend({

            className: 'well',
            beforeRender: function() {
                $(this.el).html(this.options.content.lines.join('\n'));
            },
            afterRender: function() {
                var process = MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.el]);
                if (typeof process === 'function') process();

            }

        }),

        enumerate: BaseView.extend({

            className: 'mathjax-view',
            tagName: 'ul',
            beforeRender: function() {
                var ls = [];
                _.each(this.options.content.lines, function(line) {
                    var m = line.match(/\\item (.*)/);
                    if (m) {
                        ls.push( '<li>' + m[1] + '</li>' );
                    } else {
                        ls.push(line);
                    }
                });


                $(this.el).html(ls.join('\n'));
            },
            afterRender: function() {
                var process = MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.el]);
                if (typeof process === 'function') process();

            }

        }),

        verbatim: BaseView.extend({
            tagName: 'pre',
            beforeRender: function() {
                $(this.el).html(this.options.content.lines.join('\n'));
            }
        })

    };


    var fns = {

        pspicture: function (element) {
            var pstricks = new views.pspicture({
                content: element
            });
            this.insertView(pstricks);

            if (element.env.sliders && element.env.sliders.length) {

                //give related interactive elements the SVG reference!!
                var slidersView = new SlidersView({
                    env: element.env,
                    sliders: element.env.sliders,
                    plot: element.plot,
                    svg: pstricks.svg
                });
                this.insertView(slidersView);

            }
        },
        math: function (element) {
            var math = new views.math({
                content: element
            });
            this.insertView(math);
        },
        verbatim: function (element) {
            var raw = new views.verbatim({
                content: element
            });
            this.insertView(raw);
        },
        nicebox: function (element) {                
            var well = new views.nicebox({
                content: element
            });
            this.insertView(well);
        },
        enumerate: function (element) {
            var enumerate = new view.enumerate({
                content: element
            });
            this.insertView(enumerate);
        }

    };



    return BaseView.extend({

        className: 'latex2html5',

        initialize: function() {

            window.lastScrollTo = $(document).scrollTop();

            alert('render BaseView?');

        },

        beforeRender: function() {

            // iterate through the parsed object!
            // insert subviews

            // create MATH view
            // create PSTRICKS view

            alert('in beforeRender');

            _.each(this.options.latex, function(element) {

                if (! element.hasOwnProperty('type')) {
                    throw new Error('no type!');
                }



                _.any(views, function (view, hash) {
                    if (element.type == hash) {
                        var fn = view[hash];
                        if (_.isFunction(fn)) {
                            fn.call(this, element);
                            alert('found it!');
                            return true;
                        }
                    }
                }, this);

            }, this);

        },

        afterRender: function() {
            window.scrollTo(0, window.lastScrollTo);


            alert('afterRender');

        }

    });

})();

var SliderView = BaseView.extend({
    template: 'templates/sliders',

    serialize: function() {
        var slider = this.options.slider;
        return {
            latex: slider.latex,
            scalar: slider.scalar,
            variable: slider.variable,
            min:  slider.min*slider.scalar,
            max:  slider.max*slider.scalar,
            value: slider.value
        };
    },
    afterRender: function() {
       
       var slid = this.$('input[type=range]');
       var p = this.$('h4+p');

       var svg = this.options.svg;
       var env = this.options.env;
       var plots = this.options.plot;


       // THIS SHOULD DELEGATE, NOT BE RESPONSIBLE FOR RENDERING! 
       slid.on('change', function(){
            var value = this.value/this.getAttribute('scalar');
            var variable = this.getAttribute('variable');
        
            p.html(value);

            env.variables[variable] = value;
            svg.selectAll('.psplot').remove();

            _.each(plots, function(plot, k) {

                if (k.match(/psplot/)) {

                    _.each(plot, function(data) {

                        var d = data.fn.call(data.env, data.match);

                        // var d = _.extend({}, data, env);
                        psgraph[k].call(d, svg);
                    });
                }

            });

        });

        var process = MathJax.Hub.Queue(["Typeset",MathJax.Hub,this.el]);
        if (typeof process === 'function') process();

    }


});


var SlidersView = BaseView.extend({

    className: 'well interactive',
    beforeRender: function() {
           _.each(this.options.sliders, function(slider) {

            var view = new SliderView({
                svg: this.options.svg,
                env: this.options.env,
                plot: this.options.plot,
                slider: slider
            });
            this.insertView(view);

        }, this);
    }

});