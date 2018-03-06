Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
exports.simplerepl = function (regex, replace) {
    return function (m, contents) {
        return contents.replace(regex, replace);
    };
};
exports.matchrepl = function (regex, callback) {
    return function (m, contents) {
        _.each(m, function (match) {
            var m2 = match.match(regex);
            contents = contents.replace(m2.input, callback(m2));
        });
        return contents;
    };
};
exports.convertUnits = function (value) {
    var m = null;
    if ((m = value.match(/([^c]+)\s*cm/))) {
        var num1 = Number(m[1]);
        return num1 * 50; //118;
    }
    else if ((m = value.match(/([^i]+)\s*in/))) {
        var num2 = Number(m[1]);
        return num2 * 20; //46;
    }
    else if ((m = value.match(/(.*)/))) {
        var num3 = Number(m[1]);
        return num3 * 50;
    }
    else {
        var num4 = Number(value);
        return num4;
    }
};
exports.RE = {
    options: '(\\[[^\\]]*\\])?',
    type: '(\\{[^\\}]*\\})?',
    squiggle: '\\{([^\\}]*)\\}',
    squiggleOpt: '(\\{[^\\}]*\\})?',
    coordsOpt: '(\\(\\s*([^\\)]*),([^\\)]*)\\s*\\))?',
    coords: '\\(\\s*([^\\)]*),([^\\)]*)\\s*\\)',
};
// OPTIONS
// converts [showorigin=false,labels=none, Dx=3.14] to {showorigin: 'false', labels: 'none', Dx: '3.14'}
exports.parseOptions = function (opts) {
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
exports.parseArrows = function (m) {
    var lineType = m;
    var arrows = [0, 0];
    var dots = [0, 0];
    if (lineType) {
        var type = lineType.match(/\{([^\-]*)?\-([^\-]*)?\}/);
        if (type) {
            if (type[1]) {
                // check starting point
                if (type[1].match(/\*/)) {
                    dots[0] = 1;
                }
                else if (type[1].match(/</)) {
                    arrows[0] = 1;
                }
            }
            if (type[2]) {
                // check ending point
                if (type[2].match(/\*/)) {
                    dots[1] = 1;
                }
                else if (type[2].match(/>/)) {
                    arrows[1] = 1;
                }
            }
        }
    }
    return {
        arrows: arrows,
        dots: dots,
    };
};
exports.evaluate = function (exp) {
    var num = Number(exp);
    if (_.isNaN(num)) {
        var expression = '';
        _.each(this.variables, function (val, name) {
            expression += 'var ' + name + ' = ' + val + ';';
        });
        expression += 'with (Math){' + exp + '}';
        return eval(expression);
    }
    else {
        return num;
    }
};
exports.X = function (v) {
    return (this.w - (this.x1 - Number(v))) * this.xunit;
};
exports.Xinv = function (v) {
    return Number(v) / this.xunit - this.w + this.x1;
};
exports.Y = function (v) {
    return (this.y1 - Number(v)) * this.yunit;
};
exports.Yinv = function (v) {
    return this.y1 - Number(v) / this.yunit;
};
//# sourceMappingURL=utils.js.map