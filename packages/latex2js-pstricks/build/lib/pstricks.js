Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var latex2js_utils_1 = require("latex2js-utils");
var latex2js_settings_1 = require("latex2js-settings");
exports.Expressions = {
    pspicture: /\\begin\{pspicture\}\(\s*(.*),(.*)\s*\)\(\s*(.*),(.*)\s*\)/,
    psframe: /\\psframe\(\s*(.*),(.*)\s*\)\(\s*(.*),(.*)\s*\)/,
    psplot: /\\psplot(\[[^\]]*\])?\{([^\}]*)\}\{([^\}]*)\}\{([^\}]*)\}/,
    psarc: new RegExp('\\\\psarc' +
        latex2js_utils_1.RE.options +
        latex2js_utils_1.RE.type +
        latex2js_utils_1.RE.coords +
        latex2js_utils_1.RE.squiggle +
        latex2js_utils_1.RE.squiggle +
        latex2js_utils_1.RE.squiggle),
    pscircle: /\\pscircle.*\(\s*(.*),(.*)\s*\)\{(.*)\}/,
    pspolygon: new RegExp('\\\\pspolygon' + latex2js_utils_1.RE.options + '(.*)'),
    psaxes: new RegExp('\\\\psaxes' +
        latex2js_utils_1.RE.options +
        latex2js_utils_1.RE.type +
        latex2js_utils_1.RE.coords +
        latex2js_utils_1.RE.coordsOpt +
        latex2js_utils_1.RE.coordsOpt),
    slider: new RegExp('\\\\slider' +
        latex2js_utils_1.RE.options +
        latex2js_utils_1.RE.squiggle +
        latex2js_utils_1.RE.squiggle +
        latex2js_utils_1.RE.squiggle +
        latex2js_utils_1.RE.squiggle +
        latex2js_utils_1.RE.squiggle),
    psline: new RegExp('\\\\psline' + latex2js_utils_1.RE.options + latex2js_utils_1.RE.type + latex2js_utils_1.RE.coords + latex2js_utils_1.RE.coordsOpt),
    userline: new RegExp('\\\\userline' +
        latex2js_utils_1.RE.options +
        latex2js_utils_1.RE.type +
        latex2js_utils_1.RE.coords +
        latex2js_utils_1.RE.coords +
        latex2js_utils_1.RE.squiggleOpt +
        latex2js_utils_1.RE.squiggleOpt +
        latex2js_utils_1.RE.squiggleOpt +
        latex2js_utils_1.RE.squiggleOpt),
    uservariable: new RegExp('\\\\uservariable' + latex2js_utils_1.RE.options + latex2js_utils_1.RE.squiggle + latex2js_utils_1.RE.coords + latex2js_utils_1.RE.squiggle),
    rput: /\\rput\((.*),(.*)\)\{(.*)\}/,
    psset: /\\psset\{(.*)\}/,
};
exports.Functions = {
    slider: function (m) {
        // console.log(m);
        var obj = {
            scalar: 1,
            min: Number(m[2]),
            max: Number(m[3]),
            variable: m[4],
            latex: m[5],
            value: Number(m[6]),
        };
        this.variables = this.variables || {};
        this.variables[obj.variable] = obj.value;
        this.sliders = this.sliders || [];
        this.sliders.push(obj);
        if (m[1]) {
            Object.assign(obj, latex2js_utils_1.parseOptions(m[1]));
        }
        return obj;
    },
    pspicture: function (m) {
        var p = {
            x0: Number(m[1]),
            y0: Number(m[2]),
            x1: Number(m[3]),
            y1: Number(m[4]),
        };
        var s = {
            w: p.x1 - p.x0,
            h: p.y1 - p.y0,
        };
        Object.assign(this, p, s);
        return Object.assign(p, s);
    },
    psframe: function (m) {
        var obj = {
            x1: latex2js_utils_1.X.call(this, m[1]),
            y1: latex2js_utils_1.Y.call(this, m[2]),
            x2: latex2js_utils_1.X.call(this, m[3]),
            y2: latex2js_utils_1.Y.call(this, m[4]),
        };
        return obj;
    },
    pscircle: function (m) {
        var obj = {
            cx: latex2js_utils_1.X.call(this, m[1]),
            cy: latex2js_utils_1.Y.call(this, m[2]),
            r: this.xunit * m[3],
        };
        return obj;
    },
    psaxes: function (m) {
        var obj = {
            dx: 1 * this.xunit,
            dy: 1 * this.yunit,
            arrows: [0, 0],
            dots: [0, 0],
            ticks: 'all',
        };
        if (m[1]) {
            var options = latex2js_utils_1.parseOptions(m[1]);
            if (options.Dx) {
                obj.dx = Number(options.Dx) * this.xunit;
            }
            if (options.Dy) {
                obj.dy = Number(options.Dy) * this.yunit;
            }
        }
        // arrows?
        var l = latex2js_utils_1.parseArrows(m[2]);
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
            obj.origin = [latex2js_utils_1.X.call(this, m[3]), latex2js_utils_1.Y.call(this, m[4])];
            obj.bottomLeft = [latex2js_utils_1.X.call(this, m[3]), latex2js_utils_1.Y.call(this, m[4])];
            obj.topRight = [latex2js_utils_1.X.call(this, m[6]), latex2js_utils_1.Y.call(this, m[7])];
        }
        else if (!m[5] && !m[8]) {
            // If both (x0,y0) and (x1,y1) are omitted, (0,0) is used as the default.
            obj.origin = [latex2js_utils_1.X.call(this, 0), latex2js_utils_1.Y.call(this, 0)];
            obj.bottomLeft = [latex2js_utils_1.X.call(this, 0), latex2js_utils_1.Y.call(this, 0)];
            obj.topRight = [latex2js_utils_1.X.call(this, m[3]), latex2js_utils_1.Y.call(this, m[6])];
        }
        else {
            // all three are specified
            obj.origin = [latex2js_utils_1.X.call(this, m[3]), latex2js_utils_1.Y.call(this, m[4])];
            obj.bottomLeft = [latex2js_utils_1.X.call(this, m[6]), latex2js_utils_1.Y.call(this, m[7])];
            obj.topRight = [latex2js_utils_1.X.call(this, m[9]), latex2js_utils_1.Y.call(this, m[10])];
        }
        return obj;
    },
    psplot: function (m) {
        var startX = latex2js_utils_1.evaluate.call(this, m[2]);
        var endX = latex2js_utils_1.evaluate.call(this, m[3]);
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
            data.push(latex2js_utils_1.X.call(this, x));
            // data.push(Y.call(this, Math.cos(x/2)));
            data.push(latex2js_utils_1.Y.call(this, eval(expression)));
        }
        var obj = {
            linecolor: 'black',
            linestyle: 'solid',
            fillstyle: 'none',
            fillcolor: 'none',
            linewidth: 2,
        };
        if (m[1])
            Object.assign(obj, latex2js_utils_1.parseOptions(m[1]));
        obj.data = data;
        return obj;
    },
    pspolygon: function (m) {
        var coords = m[2];
        if (!coords)
            return;
        var manyCoords = new RegExp(latex2js_utils_1.RE.coords, 'g');
        var matches = coords.match(manyCoords);
        var singleCoord = new RegExp(latex2js_utils_1.RE.coords);
        var data = [];
        _.each(matches, function (coord) {
            var d = singleCoord.exec(coord);
            data.push(latex2js_utils_1.X.call(this, d[1]));
            data.push(latex2js_utils_1.Y.call(this, d[2]));
        }, this);
        var obj = {
            linecolor: 'black',
            linestyle: 'solid',
            fillstyle: 'none',
            fillcolor: 'black',
            linewidth: 2,
            data: data,
        };
        if (m[1])
            Object.assign(obj, latex2js_utils_1.parseOptions(m[1]));
        return obj;
    },
    psarc: function (m) {
        // console.log(m);
        var l = latex2js_utils_1.parseArrows(m[2]);
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
            cx: latex2js_utils_1.X.call(this, 0),
            cy: latex2js_utils_1.Y.call(this, 0),
        };
        if (m[1]) {
            Object.assign(obj, latex2js_utils_1.parseOptions(m[1]));
        }
        // m[1] options
        // m[2] arrows
        // m[3] x1
        // m[4] y1
        // m[5] radius
        // m[6] angleA
        // m[7] angleB
        if (m[3]) {
            obj.cx = latex2js_utils_1.X.call(this, m[3]);
        }
        if (m[4]) {
            obj.cy = latex2js_utils_1.Y.call(this, m[4]);
        }
        // choose x units over y, no reason...
        obj.r = Number(m[5]) * this.xunit;
        obj.angleA = Number(m[6]) * Math.PI / 180;
        obj.angleB = Number(m[7]) * Math.PI / 180;
        obj.A = {
            x: latex2js_utils_1.X.call(this, Number(m[5]) * Math.cos(obj.angleA)),
            y: latex2js_utils_1.Y.call(this, Number(m[5]) * Math.sin(obj.angleA)),
        };
        obj.B = {
            x: latex2js_utils_1.X.call(this, Number(m[5]) * Math.cos(obj.angleB)),
            y: latex2js_utils_1.Y.call(this, Number(m[5]) * Math.sin(obj.angleB)),
        };
        return obj;
    },
    psline: function (m) {
        var options = m[1];
        var lineType = m[2];
        var l = latex2js_utils_1.parseArrows(lineType);
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
        };
        if (m[5]) {
            obj.x1 = latex2js_utils_1.X.call(this, m[3]);
            obj.y1 = latex2js_utils_1.Y.call(this, m[4]);
            obj.x2 = latex2js_utils_1.X.call(this, m[6]);
            obj.y2 = latex2js_utils_1.Y.call(this, m[7]);
        }
        else {
            obj.x1 = latex2js_utils_1.X.call(this, 0);
            obj.y1 = latex2js_utils_1.Y.call(this, 0);
            obj.x2 = latex2js_utils_1.X.call(this, m[3]);
            obj.y2 = latex2js_utils_1.Y.call(this, m[4]);
        }
        if (options) {
            Object.assign(obj, latex2js_utils_1.parseOptions(options));
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
        }
        else {
            coords.push(latex2js_utils_1.X.call(this, m[3]));
            coords.push(latex2js_utils_1.Y.call(this, m[4]));
        }
        var nx1 = latex2js_utils_1.Xinv.call(this, coords[0]);
        var ny1 = latex2js_utils_1.Yinv.call(this, coords[1]);
        var expx1 = 'var x = ' + nx1 + ';';
        var expy1 = 'var y = ' + ny1 + ';';
        // return X.call(this, eval(expy1 + expx1 + xExp));
        var obj = {
            name: m[2],
            x: latex2js_utils_1.X.call(this, m[3]),
            y: latex2js_utils_1.Y.call(this, m[4]),
            func: m[5],
            value: eval(expx1 + expy1 + m[5]),
        };
        return obj;
    },
    userline: function (m) {
        var options = m[1];
        // WE ARENT USING THIS YET!!!! e.g., [linecolor=green]
        var lineType = m[2];
        var l = latex2js_utils_1.parseArrows(lineType);
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
            xExp2 =
                'with (Math){' + xExp2.replace(/^\{/, '').replace(/\}$/, '') + '}';
        if (yExp2)
            yExp2 =
                'with (Math){' + yExp2.replace(/^\{/, '').replace(/\}$/, '') + '}';
        var expression = '';
        _.each(this.variables, function (val, name) {
            expression += 'var ' + name + ' = ' + val + ';';
        });
        var obj = {
            x1: latex2js_utils_1.X.call(this, m[3]),
            y1: latex2js_utils_1.Y.call(this, m[4]),
            x2: latex2js_utils_1.X.call(this, m[5]),
            y2: latex2js_utils_1.Y.call(this, m[6]),
            xExp: xExp,
            yExp: yExp,
            xExp2: xExp2,
            yExp2: yExp2,
            userx: _.bind(function (coords) {
                var nx1 = latex2js_utils_1.Xinv.call(this, coords[0]);
                var ny1 = latex2js_utils_1.Yinv.call(this, coords[1]);
                var expx1 = 'var x = ' + nx1 + ';';
                var expy1 = 'var y = ' + ny1 + ';';
                return latex2js_utils_1.X.call(this, eval(expression + expy1 + expx1 + xExp));
            }, this),
            usery: _.bind(function (coords) {
                var nx2 = latex2js_utils_1.Xinv.call(this, coords[0]);
                var ny2 = latex2js_utils_1.Yinv.call(this, coords[1]);
                var expx2 = 'var x = ' + nx2 + ';';
                var expy2 = 'var y = ' + ny2 + ';';
                return latex2js_utils_1.Y.call(this, eval(expression + expy2 + expx2 + yExp));
            }, this),
            userx2: _.bind(function (coords) {
                var nx3 = latex2js_utils_1.Xinv.call(this, coords[0]);
                var ny3 = latex2js_utils_1.Yinv.call(this, coords[1]);
                var expx3 = 'var x = ' + nx3 + ';';
                var expy3 = 'var y = ' + ny3 + ';';
                return latex2js_utils_1.X.call(this, eval(expression + expy3 + expx3 + xExp2));
            }, this),
            usery2: _.bind(function (coords) {
                var nx4 = latex2js_utils_1.Xinv.call(this, coords[0]);
                var ny4 = latex2js_utils_1.Yinv.call(this, coords[1]);
                var expx4 = 'var x = ' + nx4 + ';';
                var expy4 = 'var y = ' + ny4 + ';';
                return latex2js_utils_1.Y.call(this, eval(expression + expy4 + expx4 + yExp2));
            }, this),
            linecolor: 'black',
            linestyle: 'solid',
            fillstyle: 'solid',
            fillcolor: 'black',
            linewidth: 2,
            arrows: arrows,
            dots: dots,
        };
        if (options) {
            Object.assign(obj, latex2js_utils_1.parseOptions(options));
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
            x: latex2js_utils_1.X.call(this, m[1]),
            y: latex2js_utils_1.Y.call(this, m[2]),
            text: m[3],
        };
    },
    psset: function (m) {
        var pairs = m[1].split(',').map(function (pair) { return pair.split('='); });
        var obj = {};
        pairs.forEach(function (pair) {
            var key = pair[0];
            var value = pair[1];
            Object.keys(latex2js_settings_1.default.Expressions).forEach(function (setting) {
                var exp = latex2js_settings_1.default.Expressions[setting];
                if (key.match(exp)) {
                    latex2js_settings_1.default.Functions[setting](obj, value);
                }
            });
        });
        return obj;
    },
};
exports.default = {
    Expressions: exports.Expressions,
    Functions: exports.Functions,
};
//# sourceMappingURL=pstricks.js.map