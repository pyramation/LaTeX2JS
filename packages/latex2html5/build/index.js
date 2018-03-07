Object.defineProperty(exports, "__esModule", { value: true });
var latex2js_1 = require("latex2js");
var latex2js_mathjax_1 = require("latex2js-mathjax");
var pspicture_1 = require("./components/pspicture");
exports.pspicture = pspicture_1.default;
var nicebox_1 = require("./components/nicebox");
exports.nicebox = nicebox_1.default;
var enumerate_1 = require("./components/enumerate");
exports.enumerate = enumerate_1.default;
var verbatim_1 = require("./components/verbatim");
exports.verbatim = verbatim_1.default;
var math_1 = require("./components/math");
exports.math = math_1.default;
var macros_1 = require("./components/macros");
exports.macros = macros_1.default;
var ELEMENTS = { pspicture: pspicture_1.default, nicebox: nicebox_1.default, enumerate: enumerate_1.default, verbatim: verbatim_1.default, math: math_1.default, macros: macros_1.default };
function render(tex) {
    var done = function () {
        var latex = new latex2js_1.default();
        var parsed = latex.parse(tex);
        var div = document.createElement('div');
        div.className = 'latex-container';
        parsed.forEach(function (el) {
            if (ELEMENTS.hasOwnProperty(el.type)) {
                div.appendChild(ELEMENTS[el.type].call(el));
            }
        });
        document.body.appendChild(div);
    };
    if (latex2js_mathjax_1.getMathJax()) {
        return done();
    }
    latex2js_mathjax_1.loadMathJax(done);
}
exports.default = render;
//# sourceMappingURL=index.js.map