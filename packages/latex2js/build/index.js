Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("underscore");
var text_1 = require("./lib/text");
var headers_1 = require("./lib/headers");
var pstricks_1 = require("./lib/pstricks");
var environments_1 = require("./lib/environments");
var ignore_1 = require("./lib/ignore");
var parser_1 = require("./lib/parser");
var LaTeX2HTML5 = /** @class */ (function () {
    function LaTeX2HTML5(Text, Headers, Environments, Ignore, PSTricks, Views) {
        if (Text === void 0) { Text = text_1.default; }
        if (Headers === void 0) { Headers = headers_1.default; }
        if (Environments === void 0) { Environments = environments_1.default; }
        if (Ignore === void 0) { Ignore = ignore_1.default; }
        if (PSTricks === void 0) { PSTricks = pstricks_1.default; }
        if (Views === void 0) { Views = {}; }
        var _this = this;
        this.Text = Text;
        this.Headers = Headers;
        this.Environments = Environments;
        this.Ignore = Ignore;
        this.PSTricks = PSTricks;
        this.Views = Views;
        this.Delimiters = {};
        _.each(Environments, function (name) {
            _this.addEnvironment(name);
        });
    }
    LaTeX2HTML5.prototype.addEnvironment = function (name) {
        var delim = {
            begin: new RegExp('\\\\begin\\{' + name + '\\}'),
            end: new RegExp('\\\\end\\{' + name + '\\}'),
        };
        this.Delimiters[name] = delim;
    };
    LaTeX2HTML5.prototype.addView = function (name, options) {
        this.addEnvironment(name);
        // var view = {};
        // this.Views[name] = this.BaseEnvView.extend(options);
    };
    LaTeX2HTML5.prototype.addText = function (name, exp, func) {
        this.Text.Expressions[name] = exp;
        this.Text.Functions[name] = func;
    };
    LaTeX2HTML5.prototype.addHeaders = function (name, begin, end) {
        var exp = {};
        var beginHash = name + 'begin';
        var endHash = name + 'end';
        exp[beginHash] = new RegExp('\\\\begin\\{' + name + '\\}');
        exp[endHash] = new RegExp('\\\\end\\{' + name + '\\}');
        Object.assign(this.Headers.Expressions, exp);
        var fns = {};
        fns[beginHash] = function () {
            return begin || '';
        };
        fns[endHash] = function () {
            return end || '';
        };
        Object.assign(this.Headers.Functions, fns);
    };
    // events: _.clone(Backbone.Events),
    LaTeX2HTML5.prototype.getParser = function () {
        return new parser_1.default(this);
    };
    LaTeX2HTML5.prototype.parse = function (text) {
        var parser = new parser_1.default(this);
        var parsed = parser.parse(text);
        _.each(parsed, function (element) {
            if (!element.hasOwnProperty('type')) {
                throw new Error('no type!');
            }
            // TODO implement rendering
            // console.log(element.type);
        });
        return parsed;
    };
    return LaTeX2HTML5;
}());
exports.default = LaTeX2HTML5;
//# sourceMappingURL=index.js.map