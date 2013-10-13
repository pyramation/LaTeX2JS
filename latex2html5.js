(function (root) {
    var Delimiters = {
            pspicture: {
                begin: /\\begin\{pspicture\}/,
                end: /\\end\{pspicture\}/
            },
            verbatim: {
                begin: /^\\begin\{verbatim\}/,
                end: /^\\end\{verbatim\}/
            },
            enumerate: {
                begin: /\\begin\{enumerate\}/,
                end: /\\end\{enumerate\}/
            },
            print: {
                begin: /\\begin\{print\}/,
                end: /\\end\{print\}/
            },
            nicebox: {
                begin: /\\begin\{nicebox\}/,
                end: /\\end\{nicebox\}/
            }
        };
    var Ignore = [
            /^\%/,
            /\\begin\{document\}/,
            /\\end\{document\}/,
            /\\begin\{interactive\}/,
            /\\end\{interactive\}/,
            /\\usepackage/,
            /\\documentclass/,
            /\\tableofcontents/,
            /\\author/,
            /\\date/,
            /\\maketitle/,
            /\\title/,
            /\\pagestyle/,
            /\\smallskip/,
            /\\medskip/,
            /\\bigskip/,
            /\\nobreak/,
            /\\begin\{center\}/,
            /\\end\{center\}/
        ];
    var Headers = {
            Expressions: {
                bq: /\\begin\{quotation\}/,
                eq: /\\end\{quotation\}/,
                proof: /\\begin\{proof\}/,
                qed: /\\end\{proof\}/,
                example: /\\begin\{example\}/,
                definition: /\\begin\{definition\}/,
                theorem: /\\begin\{theorem\}/,
                claim: /\\begin\{claim\}/,
                corollary: /\\begin\{corollary\}/,
                problem: /\\begin\{problem\}/,
                solution: /\\begin\{solution\}/,
                endexample: /\\end\{example\}/,
                enddefinition: /\\end\{definition\}/,
                endproblem: /\\end\{problem\}/,
                endsolution: /\\end\{solution\}/,
                endtheorem: /\\end\{theorem\}/,
                endclaim: /\\end\{claim\}/,
                endcorallary: /\\end\{corallary\}/
            },
            Functions: {
                endexample: function () {
                    return '';
                },
                enddefinition: function () {
                    return '';
                },
                endproblem: function () {
                    return '';
                },
                endsolution: function () {
                    return '';
                },
                endtheorem: function () {
                    return '';
                },
                endclaim: function () {
                    return '';
                },
                endcorollary: function () {
                    return '';
                },
                bq: function () {
                    return '<p class="quotation">';
                },
                eq: function () {
                    return '</p>';
                },
                proof: function () {
                    return '<h4>Proof</h4>';
                },
                qed: function () {
                    return '$\\qed$';
                },
                example: function () {
                    return '<h4>Example</h4>';
                },
                definition: function () {
                    return '<h4>Definition</h4>';
                },
                problem: function () {
                    return '<h4>Problem</h4>';
                },
                solution: function () {
                    return '<h4>Solution</h4>';
                },
                theorem: function () {
                    return '<h4>Theorem</h4>';
                },
                corollary: function () {
                    return '<h4>Corollary</h4>';
                },
                claim: function () {
                    return '<h4>Claim</h4>';
                }
            }
        };
    /**
* TEXT
*/
    var simplerepl = function (regex, replace) {
        return function (m, contents) {
            return contents.replace(regex, replace);
        };
    };
    var matchrepl = function (regex, callback) {
        return function (m, contents) {
            _.each(m, function (match) {
                var m2 = match.match(regex);
                contents = contents.replace(m2.input, callback(m2));
            });
            return contents;
        };
    };
    var Text = {
            Expressions: {
                emph: /\\emph\{[^}]*\}/g,
                bf: /\{*\\bf [^}]*\}/g,
                rm: /\{*\\rm [^}]*\}/g,
                sl: /\{*\\sl [^}]*\}/g,
                it: /\{*\\it [^}]*\}/g,
                tt: /\{*\\tt [^}]*\}/g,
                mdash: /---/g,
                ndash: /--/g,
                openq: /``/g,
                closeq: /''/g,
                TeX: /\\TeX\\|\\TeX/g,
                LaTeX: /\\LaTeX\\|\\LaTeX/g,
                vspace: /\\vspace/g,
                cite: /\\cite\[\d+\]\{[^}]*\}/g,
                href: /\\href\{[^}]*\}\{[^}]*\}/g,
                img: /\\img\{[^}]*\}/g,
                set: /\\set\{[^}]*\}/g,
                youtube: /\\youtube\{[^}]*\}/g,
                euler: /Euler\^/g
            },
            Functions: {
                cite: function (m, contents) {
                    _.each(m, function (match) {
                        var m2 = match.match(/\\cite\[(\d+)\]\{([^}]*)\}/);
                        var m = location.pathname.match(/\/books\/(\d+)\//);
                        var book_id = 0;
                        if (m) {
                            book_id = m[1];
                        }
                        contents = contents.replace(m2.input, '<a data-bypass="true" href="/references/' + book_id + '/' + m2[2] + '">[p' + m2[1] + ']</a>');
                    });
                    return contents;
                },
                img: matchrepl(/\\img\{([^}]*)\}/, function (m) {
                    return '<div style="width: 100%;text-align: center;"><img src="' + m[1] + '"></div>';
                }),
                youtube: matchrepl(/\\youtube\{([^}]*)\}/, function (m) {
                    return '<div style="width: 100%;text-align: center;"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + m[1] + '" frameborder="0" allowfullscreen></iframe></div>';
                }),
                href: matchrepl(/\\href\{([^}]*)\}\{([^}]*)\}/, function (m) {
                    return '<a href="' + m[1] + '">' + m[2] + '</a>';
                }),
                set: matchrepl(/\\set\{([^}]*)\}/, function (m) {
                    return '<i>' + m[1] + '</i>';
                }),
                euler: simplerepl(/Euler\^/, 'exp'),
                emph: matchrepl(/\{([^}]*)\}/, function (m) {
                    return '<i>' + m[1] + '</i>';
                }),
                bf: matchrepl(/\{*\\bf ([^}]*)\}/, function (m) {
                    return '<b>' + m[1] + '</b>';
                }),
                rm: matchrepl(/\{*\\rm ([^}]*)\}/, function (m) {
                    return '<span class="rm">' + m[1] + '</span>';
                }),
                sl: matchrepl(/\{*\\sl ([^}]*)\}/, function (m) {
                    return '<i>' + m[1] + '</i>';
                }),
                it: matchrepl(/\{*\\it ([^}]*)\}/, function (m) {
                    return '<i>' + m[1] + '</i>';
                }),
                tt: matchrepl(/\{*\\tt ([^}]*)\}/, function (m) {
                    return '<span class="tt">' + m[1] + '</span>';
                }),
                ndash: simplerepl(/--/g, '&ndash;'),
                mdash: simplerepl(/---/g, '&mdash;'),
                openq: simplerepl(/``/g, '&ldquo;'),
                closeq: simplerepl(/''/g, '&rdquo;'),
                vspace: simplerepl(/\\vspace/g, '<br>'),
                TeX: simplerepl(/\\TeX\\|\\TeX/g, '$\\TeX$'),
                LaTeX: simplerepl(/\\LaTeX\\|\\LaTeX/g, '$\\LaTeX$')
            }
        };
    // OPTIONS 
    // converts [showorigin=false,labels=none, Dx=3.14] to {showorigin: 'false', labels: 'none', Dx: '3.14'}
    var parseOptions = function (opts) {
        var options = opts.replace(/[\]\[]/g, '');
        var all = options.split(',');
        var obj = {};
        _.each(all, function (option) {
            var kv = option.split('=');
            if (kv.length == 2) {
                obj[kv[0].trim()] = kv[1].trim();
            }
        });
        return obj;
    };
    /**
* SETTINGS
*/
    var convertUnits = function (value) {
        var m = null;
        if (m = value.match(/([^c]+)\s*cm/)) {
            var num1 = Number(m[1]);
            return num1 * 50;    //118;
        } else if (m = value.match(/([^i]+)\s*in/)) {
            var num2 = Number(m[1]);
            return num2 * 20;    //46;
        } else if (m = value.match(/(.*)/)) {
            var num3 = Number(m[1]);
            return num3 * 50;
        } else {
            var num4 = Number(value);
            return num4;
        }
    };
    var Settings = {
            Expressions: {
                fillcolor: /^fillcolor$/,
                fillstyle: /^fillstyle$/,
                linecolor: /^linecolor$/,
                linestyle: /^linestyle$/,
                unit: /^unit/,
                runit: /^runit/,
                xunit: /^xunit/,
                yunit: /^yunit/
            },
            Functions: {
                fillcolor: function (o, v) {
                    o.fillcolor = v;
                },
                fillstyle: function (o, v) {
                    o.fillstyle = v;
                },
                linecolor: function (o, v) {
                    o.linecolor = v;
                },
                linestyle: function (o, v) {
                    o.linestyle = v;
                },
                unit: function (o, v) {
                    v = convertUnits(v);
                    o.unit = v;
                    o.runit = v;
                    o.xunit = v;
                    o.yunit = v;
                },
                runit: function (o, v) {
                    v = convertUnits(v);
                    o.runit = v;
                },
                xunit: function (o, v) {
                    v = convertUnits(v);
                    o.xunit = v;
                },
                yunit: function (o, v) {
                    v = convertUnits(v);
                    o.yunit = v;
                }
            }
        };
    /**
* PSTRICKS
*/
    var parseArrows = function (m) {
        var lineType = m;
        var arrows = [
                0,
                0
            ];
        var dots = [
                0,
                0
            ];
        if (lineType) {
            var type = lineType.match(/\{([^\-]*)?\-([^\-]*)?\}/);
            if (type) {
                if (type[1]) {
                    // check starting point
                    if (type[1].match(/\*/)) {
                        dots[0] = 1;
                    } else if (type[1].match(/</)) {
                        arrows[0] = 1;
                    }
                }
                if (type[2]) {
                    // check ending point
                    if (type[2].match(/\*/)) {
                        dots[1] = 1;
                    } else if (type[2].match(/>/)) {
                        arrows[1] = 1;
                    }
                }
            }
        }
        return {
            arrows: arrows,
            dots: dots
        };
    };
    var evaluate = function (exp) {
        var num = Number(exp);
        if (_.isNaN(num)) {
            var expression = '';
            _.each(this.variables, function (val, name) {
                expression += 'var ' + name + ' = ' + val + ';';
            });
            expression += 'with (Math){' + exp + '}';
            return eval(expression);
        } else {
            return num;
        }
    };
    var X = function (v) {
        return (this.w - (this.x1 - Number(v))) * this.xunit;
    };
    var Xinv = function (v) {
        return Number(v) / this.xunit - this.w + this.x1;
    };
    var Y = function (v) {
        return (this.y1 - Number(v)) * this.yunit;
    };
    var Yinv = function (v) {
        return this.y1 - Number(v) / this.yunit;
    };
    var RE = {
            options: '(\\[[^\\]]*\\])?',
            type: '(\\{[^\\}]*\\})?',
            squiggle: '\\{([^\\}]*)\\}',
            squiggleOpt: '(\\{[^\\}]*\\})?',
            coordsOpt: '(\\(\\s*([^\\)]*),([^\\)]*)\\s*\\))?',
            coords: '\\(\\s*([^\\)]*),([^\\)]*)\\s*\\)'
        };
    var Expressions = {
            X: X,
            Y: Y,
            Xinv: Xinv,
            Yinv: Yinv
        };
    var PSTricks = {
            Expressions: {
                pspicture: /\\begin\{pspicture\}\(\s*(.*),(.*)\s*\)\(\s*(.*),(.*)\s*\)/,
                psframe: /\\psframe\(\s*(.*),(.*)\s*\)\(\s*(.*),(.*)\s*\)/,
                psplot: /\\psplot(\[[^\]]*\])?\{([^\}]*)\}\{([^\}]*)\}\{([^\}]*)\}/,
                psarc: new RegExp('\\\\psarc' + RE.options + RE.type + RE.coords + RE.squiggle + RE.squiggle + RE.squiggle),
                pscircle: /\\pscircle.*\(\s*(.*),(.*)\s*\)\{(.*)\}/,
                pspolygon: new RegExp('\\\\pspolygon' + RE.options + '(.*)'),
                psaxes: new RegExp('\\\\psaxes' + RE.options + RE.type + RE.coords + RE.coordsOpt + RE.coordsOpt),
                slider: new RegExp('\\\\slider' + RE.options + RE.squiggle + RE.squiggle + RE.squiggle + RE.squiggle + RE.squiggle),
                psline: new RegExp('\\\\psline' + RE.options + RE.type + RE.coords + RE.coordsOpt),
                userline: new RegExp('\\\\userline' + RE.options + RE.type + RE.coords + RE.coords + RE.squiggleOpt + RE.squiggleOpt + RE.squiggleOpt + RE.squiggleOpt),
                uservariable: new RegExp('\\\\uservariable' + RE.options + RE.squiggle + RE.coords + RE.squiggle),
                rput: /\\rput\((.*),(.*)\)\{(.*)\}/,
                psset: /\\psset\{(.*)\}/
            },
            Functions: {
                slider: function (m) {
                    // console.log(m);
                    var obj = {
                            scalar: 1,
                            min: Number(m[2]),
                            max: Number(m[3]),
                            variable: m[4],
                            latex: m[5],
                            value: Number(m[6])
                        };
                    this.variables = this.variables || {};
                    this.variables[obj.variable] = obj.value;
                    this.sliders = this.sliders || [];
                    this.sliders.push(obj);
                    if (m[1]) {
                        _.extend(obj, parseOptions(m[1]));
                    }
                    return obj;
                },
                pspicture: function (m) {
                    var p = {
                            x0: Number(m[1]),
                            y0: Number(m[2]),
                            x1: Number(m[3]),
                            y1: Number(m[4])
                        };
                    var s = {
                            w: p.x1 - p.x0,
                            h: p.y1 - p.y0
                        };
                    _.extend(this, p, s);
                    return _.extend(p, s);
                },
                psframe: function (m) {
                    var obj = {
                            x1: X.call(this, m[1]),
                            y1: Y.call(this, m[2]),
                            x2: X.call(this, m[3]),
                            y2: Y.call(this, m[4])
                        };
                    return obj;
                },
                pscircle: function (m) {
                    var obj = {
                            cx: X.call(this, m[1]),
                            cy: Y.call(this, m[2]),
                            r: this.xunit * m[3]
                        };
                    return obj;
                },
                psaxes: function (m) {
                    var obj = {
                            dx: 1 * this.xunit,
                            dy: 1 * this.yunit,
                            arrows: [
                                0,
                                0
                            ],
                            dots: [
                                0,
                                0
                            ],
                            ticks: 'all'
                        };
                    if (m[1]) {
                        var options = parseOptions(m[1]);
                        if (options.Dx) {
                            obj.dx = Number(options.Dx) * this.xunit;
                        }
                        if (options.Dy) {
                            obj.dy = Number(options.Dy) * this.yunit;
                        }
                    }
                    // arrows?
                    var l = parseArrows(m[2]);
                    obj.arrows = l.arrows;
                    obj.dots = l.dots;
                    // \psaxes*[par]{arrows}(x0,y0)(x1,y1)(x2,y2)
                    // m[1] [options]
                    // m[2] {<->}
                    // origin
                    // m[3] x0
                    // m[4] y0
                    // bottom left corner
                    // m[6] x1 
                    // m[7] y1
                    // top right corner
                    // m[9] x2
                    // m[10] y2
                    if (m[5] && !m[8]) {
                        // If (x0,y0) is omitted, then the origin is (x1,y1).
                        obj.origin = [
                            X.call(this, m[3]),
                            Y.call(this, m[4])
                        ];
                        obj.bottomLeft = [
                            X.call(this, m[3]),
                            Y.call(this, m[4])
                        ];
                        obj.topRight = [
                            X.call(this, m[6]),
                            Y.call(this, m[7])
                        ];
                    } else if (!m[5] && !m[8]) {
                        // If both (x0,y0) and (x1,y1) are omitted, (0,0) is used as the default.
                        obj.origin = [
                            X.call(this, 0),
                            Y.call(this, 0)
                        ];
                        obj.bottomLeft = [
                            X.call(this, 0),
                            Y.call(this, 0)
                        ];
                        obj.topRight = [
                            X.call(this, m[3]),
                            Y.call(this, m[6])
                        ];
                    } else {
                        // all three are specified
                        obj.origin = [
                            X.call(this, m[3]),
                            Y.call(this, m[4])
                        ];
                        obj.bottomLeft = [
                            X.call(this, m[6]),
                            Y.call(this, m[7])
                        ];
                        obj.topRight = [
                            X.call(this, m[9]),
                            Y.call(this, m[10])
                        ];
                    }
                    return obj;
                },
                psplot: function (m) {
                    var startX = evaluate.call(this, m[2]);
                    var endX = evaluate.call(this, m[3]);
                    var data = [];
                    var x;
                    // get env
                    var expression = '';
                    _.each(this.variables, function (val, name) {
                        expression += 'var ' + name + ' = ' + val + ';';
                    });
                    expression += 'with (Math){' + m[4] + '}';
                    // console.log(expression);
                    for (x = startX; x <= endX; x += 0.005) {
                        data.push(X.call(this, x));
                        // data.push(Y.call(this, Math.cos(x/2)));
                        data.push(Y.call(this, eval(expression)));
                    }
                    var obj = {
                            linecolor: 'black',
                            linestyle: 'solid',
                            fillstyle: 'none',
                            fillcolor: 'none',
                            linewidth: 2
                        };
                    if (m[1])
                        _.extend(obj, parseOptions(m[1]));
                    obj.data = data;
                    return obj;
                },
                pspolygon: function (m) {
                    var coords = m[2];
                    if (!coords)
                        return;
                    var manyCoords = new RegExp(RE.coords, 'g');
                    var matches = coords.match(manyCoords);
                    var singleCoord = new RegExp(RE.coords);
                    var data = [];
                    _.each(matches, function (coord) {
                        var d = singleCoord.exec(coord);
                        data.push(X.call(this, d[1]));
                        data.push(Y.call(this, d[2]));
                    }, this);
                    var obj = {
                            linecolor: 'black',
                            linestyle: 'solid',
                            fillstyle: 'none',
                            fillcolor: 'black',
                            linewidth: 2,
                            data: data
                        };
                    if (m[1])
                        _.extend(obj, parseOptions(m[1]));
                    return obj;
                },
                psarc: function (m) {
                    // console.log(m);
                    var l = parseArrows(m[2]);
                    var arrows = l.arrows;
                    var dots = l.dots;
                    var obj = {
                            linecolor: 'black',
                            linestyle: 'solid',
                            fillstyle: 'solid',
                            fillcolor: 'black',
                            linewidth: 2,
                            arrows: arrows,
                            dots: dots,
                            cx: X.call(this, 0),
                            cy: Y.call(this, 0)
                        };
                    if (m[1]) {
                        _.extend(obj, parseOptions(m[1]));
                    }
                    // m[1] options
                    // m[2] arrows
                    // m[3] x1
                    // m[4] y1
                    // m[5] radius
                    // m[6] angleA
                    // m[7] angleB
                    if (m[3]) {
                        obj.cx = X.call(this, m[3]);
                    }
                    if (m[4]) {
                        obj.cy = Y.call(this, m[4]);
                    }
                    // choose x units over y, no reason...
                    obj.r = Number(m[5]) * this.xunit;
                    obj.angleA = Number(m[6]) * Math.PI / 180;
                    obj.angleB = Number(m[7]) * Math.PI / 180;
                    obj.A = {
                        x: X.call(this, Number(m[5]) * Math.cos(obj.angleA)),
                        y: Y.call(this, Number(m[5]) * Math.sin(obj.angleA))
                    };
                    obj.B = {
                        x: X.call(this, Number(m[5]) * Math.cos(obj.angleB)),
                        y: Y.call(this, Number(m[5]) * Math.sin(obj.angleB))
                    };
                    return obj;
                },
                psline: function (m) {
                    var options = m[1], lineType = m[2];
                    var l = parseArrows(lineType);
                    var arrows = l.arrows;
                    var dots = l.dots;
                    var obj = {
                            linecolor: 'black',
                            linestyle: 'solid',
                            fillstyle: 'solid',
                            fillcolor: 'black',
                            linewidth: 2,
                            arrows: arrows,
                            dots: dots
                        };
                    if (m[5]) {
                        obj.x1 = X.call(this, m[3]);
                        obj.y1 = Y.call(this, m[4]);
                        obj.x2 = X.call(this, m[6]);
                        obj.y2 = Y.call(this, m[7]);
                    } else {
                        obj.x1 = X.call(this, 0);
                        obj.y1 = Y.call(this, 0);
                        obj.x2 = X.call(this, m[3]);
                        obj.y2 = Y.call(this, m[4]);
                    }
                    if (options) {
                        _.extend(obj, parseOptions(options));
                    }
                    // TODO: add regex
                    if (typeof obj.linewidth === 'string') {
                        obj.linewidth = 2;
                    }
                    return obj;
                },
                uservariable: function (m) {
                    var options = m[1];
                    var coords = [];
                    if (this.userx && this.usery) {
                        // coords.push( Xinv.call(this, this.userx) );
                        // coords.push( Yinv.call(this, this.usery) );
                        coords.push(Number(this.userx));
                        coords.push(Number(this.usery));
                    } else {
                        coords.push(X.call(this, m[3]));
                        coords.push(Y.call(this, m[4]));
                    }
                    var nx1 = Xinv.call(this, coords[0]);
                    var ny1 = Yinv.call(this, coords[1]);
                    var expx1 = 'var x = ' + nx1 + ';';
                    var expy1 = 'var y = ' + ny1 + ';';
                    // return X.call(this, eval(expy1 + expx1 + xExp));
                    var obj = {
                            name: m[2],
                            x: X.call(this, m[3]),
                            y: Y.call(this, m[4]),
                            func: m[5],
                            value: eval(expx1 + expy1 + m[5])
                        };
                    return obj;
                },
                userline: function (m) {
                    var options = m[1],
                        // WE ARENT USING THIS YET!!!! e.g., [linecolor=green]
                        lineType = m[2];
                    var l = parseArrows(lineType);
                    var arrows = l.arrows;
                    var dots = l.dots;
                    var xExp = m[7];
                    var yExp = m[8];
                    if (xExp)
                        xExp = 'with (Math){' + xExp.replace(/^\{/, '').replace(/\}$/, '') + '}';
                    if (yExp)
                        yExp = 'with (Math){' + yExp.replace(/^\{/, '').replace(/\}$/, '') + '}';
                    var xExp2 = m[9];
                    var yExp2 = m[10];
                    if (xExp2)
                        xExp2 = 'with (Math){' + xExp2.replace(/^\{/, '').replace(/\}$/, '') + '}';
                    if (yExp2)
                        yExp2 = 'with (Math){' + yExp2.replace(/^\{/, '').replace(/\}$/, '') + '}';
                    var expression = '';
                    _.each(this.variables, function (val, name) {
                        expression += 'var ' + name + ' = ' + val + ';';
                    });
                    var obj = {
                            x1: X.call(this, m[3]),
                            y1: Y.call(this, m[4]),
                            x2: X.call(this, m[5]),
                            y2: Y.call(this, m[6]),
                            xExp: xExp,
                            yExp: yExp,
                            xExp2: xExp2,
                            yExp2: yExp2,
                            userx: _.bind(function (coords) {
                                var nx1 = Xinv.call(this, coords[0]);
                                var ny1 = Yinv.call(this, coords[1]);
                                var expx1 = 'var x = ' + nx1 + ';';
                                var expy1 = 'var y = ' + ny1 + ';';
                                return X.call(this, eval(expression + expy1 + expx1 + xExp));
                            }, this),
                            usery: _.bind(function (coords) {
                                var nx2 = Xinv.call(this, coords[0]);
                                var ny2 = Yinv.call(this, coords[1]);
                                var expx2 = 'var x = ' + nx2 + ';';
                                var expy2 = 'var y = ' + ny2 + ';';
                                return Y.call(this, eval(expression + expy2 + expx2 + yExp));
                            }, this),
                            userx2: _.bind(function (coords) {
                                var nx3 = Xinv.call(this, coords[0]);
                                var ny3 = Yinv.call(this, coords[1]);
                                var expx3 = 'var x = ' + nx3 + ';';
                                var expy3 = 'var y = ' + ny3 + ';';
                                return X.call(this, eval(expression + expy3 + expx3 + xExp2));
                            }, this),
                            usery2: _.bind(function (coords) {
                                var nx4 = Xinv.call(this, coords[0]);
                                var ny4 = Yinv.call(this, coords[1]);
                                var expx4 = 'var x = ' + nx4 + ';';
                                var expy4 = 'var y = ' + ny4 + ';';
                                return Y.call(this, eval(expression + expy4 + expx4 + yExp2));
                            }, this),
                            linecolor: 'black',
                            linestyle: 'solid',
                            fillstyle: 'solid',
                            fillcolor: 'black',
                            linewidth: 2,
                            arrows: arrows,
                            dots: dots
                        };
                    if (options) {
                        _.extend(obj, parseOptions(options));
                    }
                    // TODO: add regex
                    if (typeof obj.linewidth === 'string') {
                        obj.linewidth = 2;
                    }
                    // console.log('check options!!!!');
                    // console.log(obj);
                    return obj;
                },
                rput: function (m) {
                    return {
                        x: X.call(this, m[1]),
                        y: Y.call(this, m[2]),
                        text: m[3]
                    };
                },
                psset: function (m) {
                    var pairs = _.map(m[1].split(','), function (pair) {
                            return pair.split('=');
                        });
                    var obj = {};
                    _.each(pairs, function (pair) {
                        var key = pair[0];
                        var value = pair[1];
                        _.each(Settings.Expressions, function (exp, setting) {
                            if (key.match(exp)) {
                                Settings.Functions[setting](obj, value);
                            }
                        });
                    });
                    return obj;
                }
            }
        };
    root.PSTricks = PSTricks;
    root.Headers = Headers;
    root.Ignore = Ignore;
    root.Delimiters = Delimiters;
    root.Expressions = Expressions;
}(window));function Parser() {
    this.objects = [];
    this.environment = null;
    // emulating a match
    this.settings = PSTricks.Functions.psset.call(this, [
        '',
        'units=1cm,linecolor=black,linestyle=solid,fillstyle=none'
    ]);
}
Parser.prototype = {
    parse: function (text) {
        if (!text)
            return {};
        var lines = text.split('\n');
        this.parseEnvText(lines);
        this.parseEnv(lines);
        _.each(this.objects, function (obj) {
            if (obj.type.match(/pspicture/)) {
                obj.plot = this.parsePSTricks(obj.lines, obj.env);
            }
        }, this);
        return this.objects;
    },
    newEnvironment: function (type) {
        if (this.environment && this.environment.lines.length) {
            this.environment.settings = _.clone(this.settings);
            this.objects.push(this.environment);
        }
        this.environment = {
            type: type,
            lines: []
        };
    },
    pushLine: function (line) {
        var add = true;
        _.each(Ignore, function (exp) {
            if (exp.test(line)) {
                add = false;
            }
        });
        if (add) {
            if (typeof line === 'string' && line.trim().length) {
                if (PSTricks.Expressions.psset.test(line)) {
                    this.parseUnits(line);
                } else {
                    this.environment.lines.push(line);
                }
            }
        }
    },
    parseUnits: function (line) {
        var m = line.match(PSTricks.Expressions.psset);
        _.extend(this.settings, PSTricks.Functions.psset.call(this, m));
    },
    metaData: function (environment, line) {
        if (PSTricks.Expressions.hasOwnProperty(environment)) {
            this.environment.match = line.match(PSTricks.Expressions[environment]);
            this.environment.env = PSTricks.Functions[environment].call(this.settings, this.environment.match);
            if (environment.match(/pspicture/)) {
                _.defaults(this.environment.env, _.pick(this.settings, 'xunit', 'yunit'));
            }
        }
    },
    parseEnv: function (lines) {
        this.objects = [];
        this.environment = {
            type: 'math',
            lines: []
        };
        // for(var i=0; i<lines.length; i++) {
        //     var line = lines[i];
        var print = false;
        _.each(lines, function (line) {
            var isDelim = false;
            _.each(Delimiters, function (type, env) {
                _.each(type, function (delim, k) {
                    if (line.match(delim)) {
                        isDelim = true;
                        if (k.match(/begin/)) {
                            if (this.environment.type.match(/verbatim/)) {
                                isDelim = false;
                            } else if (this.environment.type.match(/print/)) {
                                isDelim = false;
                            } else {
                                this.newEnvironment(env);
                                this.metaData(env, line);
                            }
                        } else if (k.match(/end/)) {
                            if (this.environment.type.match(/verbatim/)) {
                                if (env.match(/verbatim/)) {
                                    this.newEnvironment('math');
                                } else {
                                    isDelim = false;
                                }
                            } else if (this.environment.type.match(/print/)) {
                                if (env.match(/print/)) {
                                    this.newEnvironment('math');
                                } else {
                                    isDelim = false;
                                }
                            } else {
                                this.newEnvironment('math');
                            }
                        }
                    }
                }, this);
            }, this);
            if (!isDelim)
                this.pushLine(line);    // }
        }, this);
        // push last!
        this.newEnvironment('math');
    },
    parseEnvText: function (lines) {
        var _env = 'math';
        _.each(lines, function (line, i) {
            var isDelim = false;
            _.each(Delimiters, function (type, env) {
                _.each(type, function (delim, k) {
                    if (line.match(delim)) {
                        isDelim = true;
                        if (k.match(/begin/)) {
                            if (!_env.match(/verbatim/)) {
                                _env = env;
                            } else {
                                isDelim = false;
                            }
                        } else if (k.match(/end/)) {
                            if (!_env.match(/verbatim/)) {
                                _env = 'math';
                            } else {
                                if (!env.match(/verbatim/)) {
                                    isDelim = false;
                                } else {
                                    _env = 'math';
                                }
                            }
                        }
                    }
                }, this);
            }, this);
            if (!isDelim) {
                if (!_env.match(/verbatim/)) {
                    lines[i] = this.parseText(line);
                }
                if (!line.trim().length) {
                    lines[i] = '<br>';
                }
            }
        }, this);
    },
    parsePSExpression: function (line, exp, plot, k, env) {
        var match = line.match(exp);
        if (match) {
            if (k == 'pscircle') {
                plot[k].push({
                    data: PSTricks.Functions[k].call(env, match),
                    env: env,
                    match: match,
                    fn: PSTricks.Functions[k]
                });
            } else {
                plot[k].push({
                    data: PSTricks.Functions[k].call(env, match),
                    env: env,
                    match: match,
                    fn: PSTricks.Functions[k]
                });
            }
            return true;
        }
        return false;
    },
    parsePSVariables: function (line, exp, plot, k, env) {
        var match = line.match(exp);
        if (match) {
            if (k.match(/uservariable/)) {
                var dd = PSTricks.Functions[k].call(env, match);
                env.variables = env.variables || {};
                env.variables[dd.name] = dd.value;
            }
        }
    },
    parsePSTricks: function (lines, env) {
        var plot = {};
        _.each(PSTricks.Expressions, function (exp, k) {
            plot[k] = [];
        });
        _.each(lines, function (line) {
            _.each(PSTricks.Expressions, function (exp, k) {
                this.parsePSVariables(line, exp, plot, k, env);
                this.parsePSExpression(line, exp, plot, k, env);
            }, this);
        }, this);
        return plot;
    },
    parseTextExpression: function (line, exp, k, contents) {
        var match = line.match(exp);
        if (match) {
            return Text.Functions[k].call(this, match, contents);
        }
        return contents;
    },
    parseHeadersExpression: function (line, exp, k, contents) {
        var match = line.match(exp);
        if (match) {
            return Headers.Functions[k].call(this);
        }
        return contents;
    },
    parseText: function (line) {
        var contents = line;
        // TEXT
        _.each(Text.Expressions, function (exp, k) {
            contents = this.parseTextExpression(line, exp, k, contents);
        }, this);
        // HEADERS
        _.each(Headers.Expressions, function (exp, k) {
            contents = this.parseHeadersExpression(line, exp, k, contents);
        }, this);
        return contents;
    }
};var psgraph = (function(){

    // http://mathforum.org/library/drmath/view/54146.html
    function arrow(x1, y1, x2, y2) {

        var t = Math.PI/6;

        // d is the length of the arrowhead line
        var d = 8;

        // l is the length of the line AB = sqrt((x1-x0)^2 + (y1-y0)^2)
        var dx = x2-x1, dy=y2-y1;
        var l =Math.sqrt(dx*dx+dy*dy);

        var cost = Math.cos(t);
        var sint = Math.sin(t);
        var dl = d/l;

        var x = x2 - (dx*cost - dy*sint)*dl;
        var y = y2 - (dy*cost + dx*sint)*dl;

        var context = [];
        context.push('M');
        context.push(x2);
        context.push(y2);
        context.push('L');
        context.push(x);
        context.push(y);

        cost = Math.cos(-t);
        sint = Math.sin(-t);

        x = x2 - (dx*cost - dy*sint)*dl;
        y = y2 - (dy*cost + dx*sint)*dl;

        // context.push('L');
        context.push(x);
        context.push(y);

        context.push('Z');
        return context.join(' ');

    }

    return {

        init: function(el) {

            var padding = 20;
            this.scale = 1;

            var goalWidth = $(window).width() - padding;
            if (goalWidth <= this.w * this.xunit) {
                this.scale = goalWidth / this.w / this.xunit;
            }

            var width = this.w * this.xunit;
            var height = this.h * this.yunit;
           


            var svg = d3.select(el).append('svg:svg')
            .attr("width", width)
            .attr("height", height);

            // .append('g')
            // .attr('transform', 'scale('+ this.scale + ')');

            // so we can center the diagrams, lets set the width
            $(el)
            .width(width)
            .height(height);

            return svg;

        },

        psframe: function(svg) {

            // svg.append("svg:rect")
            //   .attr("x", this.x2)
            //   .attr("y", this.y2)
            //   .attr("height", Math.abs(this.y2 - this.y1))
            //   .attr("width", Math.abs(this.x1 - this.x2))
            // .style("stroke-width", 2)
            // .style("fill-color", "rgba(0,0,0,0)")
            //   .style("stroke", "rgb(0,0,0)")
            //   .style("stroke-opacity", 1);

            svg.append('svg:line')
            .attr("x1", this.x1)
            .attr("y1", this.y1)
            .attr("x2", this.x2)
            .attr("y2", this.y1)
            .style("stroke-width", 2)
            .style("stroke", "rgb(0,0,0)")
            .style("stroke-opacity", 1);

            svg.append('svg:line')
            .attr("x1", this.x2)
            .attr("y1", this.y1)
            .attr("x2", this.x2)
            .attr("y2", this.y2)
            .style("stroke-width", 2)
            .style("stroke", "rgb(0,0,0)")
            .style("stroke-opacity", 1);

            svg.append('svg:line')
            .attr("x1", this.x2)
            .attr("y1", this.y2)
            .attr("x2", this.x1)
            .attr("y2", this.y2)
            .style("stroke-width", 2)
            .style("stroke", "rgb(0,0,0)")
            .style("stroke-opacity", 1);

            svg.append('svg:line')
            .attr("x1", this.x1)
            .attr("y1", this.y2)
            .attr("x2", this.x1)
            .attr("y2", this.y1)
            .style("stroke-width", 2)
            .style("stroke", "rgb(0,0,0)")
            .style("stroke-opacity", 1);


        },
        pscircle: function(svg) {
            
            svg.append('svg:circle')
            .attr('cx', this.cx)
            .attr('cy', this.cy)
            .attr('r', this.r)
            .style("stroke", "black")
            .style("fill", "none")
            .style("stroke-width", 2)
            .style("stroke-opacity", 1);

        },

        psplot: function(svg) {

            var context = [];
            context.push('M');
            if (this.fillstyle === 'solid') {
                context.push(this.data[0]);
                context.push(Expressions.Y.call(this.global, 0));
            } else {                
                context.push(this.data[0]);
                context.push(this.data[1]);
            }
            context.push('L');
            
            _.each(this.data, function(data) {
                context.push(data);
            });            

            if (this.fillstyle === 'solid') {
                context.push(this.data[this.data.length - 2]);
                context.push(Expressions.Y.call(this.global, 0));
                context.push('Z');
            }

            svg.append('svg:path')
                .attr("d",context.join(' '))
                .attr('class', 'psplot')
                .style("stroke-width", this.linewidth)
                .style("stroke-opacity", 1)
                .style("fill", this.fillstyle  === 'none' ? 'none' : this.fillcolor)
                .style('stroke', this.linecolor);


        },

        pspolygon: function (svg) {

            var context = [];
            context.push('M');
            context.push(this.data[0]);
            context.push(this.data[1]);
            context.push('L');
            
            _.each(this.data, function(data) {
                context.push(data);
            });            
            context.push('Z');


            svg.append('svg:path')
                .attr("d",context.join(' '))
                .style("stroke-width", this.linewidth)
                .style("stroke-opacity", 1)
                .style("fill", this.fillstyle === 'none' ? 'none' : this.fillcolor)
                .style('stroke', 'black');

        },

        psarc: function(svg) {


            // http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
            var context = [];
            context.push('M');
            context.push(this.cx);
            context.push(this.cy);
            context.push('L');
            context.push(this.A.x);
            context.push(this.A.y);

            context.push('A');
            // context.push('a');

            context.push(this.A.x);
            context.push(this.A.y);

            context.push(0);
            context.push(0);
            context.push(0);

            context.push(this.B.x);
            context.push(this.B.y);







            svg.append('svg:path')
                .attr("d",context.join(' '))
                .style("stroke-width", 2)
                .style("stroke-opacity", 1)
                .style("fill", "blue")
                .style('stroke', 'black');

            // svg.append('svg:circle')
            // .attr('cx', this.cx)
            // .attr('cy', this.cy)
            // .attr('r', this.r)
            // .style("stroke", this.linecolor)
            // .style("fill", "none")
            // .style("stroke-width", 2)
            // .style("stroke-opacity", 1);            

        },

        psaxes: function(svg) {

            var xaxis = [this.bottomLeft[0], this.topRight[0]];
            var yaxis = [this.bottomLeft[1], this.topRight[1]];

            var origin = this.origin;

            function line(x1,y1,x2,y2) {
                svg.append('svg:path')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .style("stroke-width", 2)
                .style("stroke", "rgb(0,0,0)")
                .style("stroke-opacity", 1);
            }

            var xticks = function() {
                   // draw ticks
                for(var x=xaxis[0]; x<=xaxis[1]; x+=this.dx) {
                    line(x, origin[1]-5, x, origin[1]+5);
                }

            };

            var yticks = function() {

                // draw ticks
                for(var y=yaxis[0]; y<=yaxis[1]; y+=this.dy) {
                    line(origin[0]-5, y, origin[0]+5, y);
                }

            };


            // draw axes
            line(xaxis[0], origin[1], xaxis[1], origin[1]);
            line(origin[0], yaxis[0], origin[0], yaxis[1]);


            // draw ticks
            if (this.ticks.match(/all/)) {
                xticks();
                yticks();
            } else if (this.ticks.match(/x/)) {
                xticks();
            } else if (this.ticks.match(/y/)) {
                yticks();
            }

            if (this.arrows[0]) {
              svg.append('path')
              .attr('d', arrow(xaxis[1], origin[1], xaxis[0], origin[1]))
              .style("fill", "black")
              .style('stroke', 'black');

              svg.append('path')
              .attr('d', arrow(origin[0], yaxis[1], origin[0], yaxis[0]))
              .style("fill", "black")
              .style('stroke', 'black');

            }

            if (this.arrows[1]) {            
              svg.append('path')
              .attr('d', arrow(xaxis[0], origin[1], xaxis[1], origin[1]))
              .style("fill", "black")
              .style('stroke', 'black');


              svg.append('path')
              .attr('d', arrow(origin[0], yaxis[0], origin[0], yaxis[1]))
              .style("fill", "black")
              .style('stroke', 'black');

            }
           



        },
        psline: function(svg) {

            var linewidth = this.linewidth,
            linecolor = this.linecolor;

            function solid(x1,y1,x2,y2) {
                svg.append('svg:path')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .style("stroke-width", linewidth)
                .style("stroke", linecolor)
                .style("stroke-opacity", 1);
            }


            function dashed(x1,y1,x2,y2) {

                svg.append('svg:path')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .style("stroke-width", linewidth)
                .style("stroke", linecolor)
                .style("stroke-dasharray", "9,5")
                .style("stroke-opacity", 1);
            }

            function dotted(x1,y1,x2,y2) {
                svg.append('svg:path')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .style("stroke-width", linewidth)
                .style("stroke", linecolor)
                .style("stroke-dasharray", "9,5")
                .style("stroke-opacity", 1);
            }

            // draw line
            if (this.linestyle.match(/dotted/)) {
                dotted(this.x1, this.y1, this.x2, this.y2);
            } else if (this.linestyle.match(/dashed/)) {
                dashed(this.x1, this.y1, this.x2, this.y2);
            } else {
                solid(this.x1, this.y1, this.x2, this.y2);
            }


            // for arrows we have to calculate
            // var dx = this.x2-this.x1, dy=this.y2-this.y1, len=Math.sqrt(dx*dx+dy*dy);

            // ADD DOTS

            if (this.dots[0]) {

                svg.append('svg:circle')
                .attr('cx', this.x1)
                .attr('cy', this.y1)
                .attr('r', 3)
                .style("stroke", this.linecolor)
                .style("fill", this.linecolor)
                .style("stroke-width", 1)
                .style("stroke-opacity", 1);


            }

            if (this.dots[1]) {

                svg.append('svg:circle')
                .attr('cx', this.x2)
                .attr('cy', this.y2)
                .attr('r', 3)
                .style("stroke", this.linecolor)
                .style("fill", this.linecolor)
                .style("stroke-width", 1)
                .style("stroke-opacity", 1);

            }

            var x1 = this.x1,
            y1 = this.y1,
            x2 = this.x2,
            y2 = this.y2;


            if (this.arrows[0]) {
              svg.append('path')
              .attr('d', arrow(x2, y2, x1, y1))
              .style("fill", this.linecolor)
              .style('stroke', this.linecolor);

            }

            if (this.arrows[1]) {            
              svg.append('path')
              .attr('d', arrow(x1, y1, x2, y2))
              .style("fill", this.linecolor)
              .style('stroke', this.linecolor);
            }

        },

        userline: function(svg) {

            var linewidth = this.linewidth,
            linecolor = this.linecolor;

            function solid(x1,y1,x2,y2) {
                svg.append('svg:path')
                .attr('class', 'userline')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .style("stroke-width", linewidth)
                .style("stroke", linecolor)
                .style("stroke-opacity", 1);
            }


            function dashed(x1,y1,x2,y2) {

                svg.append('svg:path')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .attr('class', 'userline')
                .style("stroke-width", linewidth)
                .style("stroke", linecolor)
                .style("stroke-dasharray", "9,5")
                .style("stroke-opacity", 1);
            }

            function dotted(x1,y1,x2,y2) {
                svg.append('svg:path')
                .attr("d", 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2)
                .attr('class', 'userline')
                .style("stroke-width", linewidth)
                .style("stroke", linecolor)
                .style("stroke-dasharray", "9,5")
                .style("stroke-opacity", 1);
            }

            // draw line
            if (this.linestyle.match(/dotted/)) {
                dotted(this.x1, this.y1, this.x2, this.y2);
            } else if (this.linestyle.match(/dashed/)) {
                dashed(this.x1, this.y1, this.x2, this.y2);
            } else {
                solid(this.x1, this.y1, this.x2, this.y2);
            }


            // for arrows we have to calculate
            // var dx = this.x2-this.x1, dy=this.y2-this.y1, len=Math.sqrt(dx*dx+dy*dy);

            // ADD DOTS

            if (this.dots[0]) {

                svg.append('svg:circle')
                .attr('cx', this.x1)
                .attr('cy', this.y1)
                .attr('r', 3)
                .attr('class', 'userline')
                .style("stroke", this.linecolor)
                .style("fill", this.linecolor)
                .style("stroke-width", 1)
                .style("stroke-opacity", 1);


            }

            if (this.dots[1]) {

                svg.append('svg:circle')
                .attr('cx', this.x2)
                .attr('cy', this.y2)
                .attr('r', 3)
                .attr('class', 'userline')
                .style("stroke", this.linecolor)
                .style("fill", this.linecolor)
                .style("stroke-width", 1)
                .style("stroke-opacity", 1);

            }

            var x1 = this.x1,
            y1 = this.y1,
            x2 = this.x2,
            y2 = this.y2;


            if (this.arrows[0]) {
              svg.append('path')
              .attr('d', arrow(x2, y2, x1, y1))
              .attr('class', 'userline')
              .style("fill", this.linecolor)
              .style('stroke', this.linecolor);

            }

            if (this.arrows[1]) {            
              svg.append('path')
              .attr('d', arrow(x1, y1, x2, y2))
              .attr('class', 'userline')
              .style("fill", this.linecolor)
              .style('stroke', this.linecolor);
            }

        },

        rput: function(el) {

            var $_ = $('<div></div>');

            $_.html(this.text).css({
                position: 'absolute',
                top: this.y,
                left: this.x
            });

            $(el).append($_);

            var process = MathJax.Hub.Queue(["Typeset",MathJax.Hub,$_[0]]);
            if (typeof process === 'function') process();

            //rput defaults to centering the element in pstricks, so then so do we!
            var x = this.x;
            var y = this.y;
            setTimeout(function(){
                var w = $_.width();
                var h = $_.height();
                $_.css({
                    top: y-h/2,
                    left: x-w/2
                });
            },0);

            return $_;

        }

    };

})();Backbone.Layout.configure({
    fetch: function (path) {
        var JST = window.JST || {};
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

var BaseView = Backbone.Layout.extend({});

var TeX = function () {

        var SliderView = BaseView.extend({
                template: 'templates/sliders',
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
                                    psgraph[k].call(d, svg);
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
            });

        var SlidersView = BaseView.extend({
                className: 'well interactive',
                beforeRender: function () {
                    _.each(this.options.sliders, function (slider) {
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

        var views = {
                pspicture: BaseView.extend({
                    className: 'pspicture-view',
                    initialize: function () {
                        var env = this.env = this.options.content.settings;
                        var svg = this.svg = psgraph.init.call(env, this.el);
                        var self = this;
                        var plots = this.options.content.plot;
                        
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
                                        psgraph[k].call(d, svg);
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
                                        psgraph[k].call(d, svg);
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
                            if (psgraph.hasOwnProperty(k)) {
                                _.each(plot, function (data) {
                                    data.data.global = env;
                                    // give access to pspicture!
                                    psgraph[k].call(data.data, svg);
                                });
                            }
                        });
                        _.each(plots.rput, function (rput) {
                            var elem = psgraph.rput.call(rput.data, this.el);
                        }, this);
                    }
                }),

                math: BaseView.extend({
                    className: 'mathjax-view',
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
                }),

                nicebox: BaseView.extend({
                    className: 'well',
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
                }),

                enumerate: BaseView.extend({
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
                }),

                verbatim: BaseView.extend({
                    tagName: 'pre',
                    beforeRender: function () {
                        $(this.el).html(this.options.content.lines.join('\n'));
                    }
                })
            };

        var fns = {
                pspicture: function (element) {
                    var pstricks = new views.pspicture({ content: element });
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
                    var math = new views.math({ content: element });
                    this.insertView(math);
                },
                verbatim: function (element) {
                    var raw = new views.verbatim({ content: element });
                    this.insertView(raw);
                },
                nicebox: function (element) {
                    var well = new views.nicebox({ content: element });
                    this.insertView(well);
                },
                enumerate: function (element) {
                    var enumerate = new view.enumerate({ content: element });
                    this.insertView(enumerate);
                }
            };

        return BaseView.extend({
            initialize: function (options) {
                if (options.latex) {
                    var parser = new Parser();
                    this.options.parsed = parser.parse(options.latex);
                }
            },
            beforeRender: function () {
                _.each(this.options.parsed, function (element) {
                    if (!element.hasOwnProperty('type')) {
                        throw new Error('no type!');
                    }
                    var view = _.any(views, function (view, hash) {
                            if (element.type == hash) {
                                var fn = views[hash];
                                if (_.isFunction(fn)) {
                                    var v = new fn({ content: element });
                                    this.insertView(v);
                                    return v;
                                }
                            }
                        }, this);
                    if (element.env && element.env.sliders && element.env.sliders.length) {
                        //give related interactive elements the SVG reference!!
                        var slidersView = new SlidersView({
                                env: element.env,
                                sliders: element.env.sliders,
                                plot: element.plot,
                                svg: view.svg
                            });
                        this.insertView(slidersView);
                    }
                }, this);
            }
        });
    }();