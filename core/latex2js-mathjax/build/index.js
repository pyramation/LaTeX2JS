Object.defineProperty(exports, "__esModule", { value: true });
var loadScript = require("load-script");
exports.DEFAULT_SCRIPT = process.env.MATHJAX_CDN ||
    'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.3/MathJax.js';
exports.DEFAULT_OPTIONS = {
    TeX: { extensions: ['AMSmath.js', 'AMSsymbols.js'] },
    extensions: ['tex2jax.js'],
    showProcessingMessages: false,
    jax: ['input/TeX', 'output/HTML-CSS'],
    messageStyle: 'none',
    showMathMenu: false,
    showMathMenuMSIE: false,
    tex2jax: {
        processEnvironments: true,
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        preview: 'none',
        processEscapes: true,
    },
    'HTML-CSS': { linebreaks: { automatic: true, width: 'container' } },
};
exports.getMathJax = function () {
    return typeof MathJax === 'undefined' ? undefined : MathJax;
};
exports.loadMathJax = function (callback, script, options) {
    if (callback === void 0) { callback = function () { }; }
    if (script === void 0) { script = exports.DEFAULT_SCRIPT; }
    if (options === void 0) { options = exports.DEFAULT_OPTIONS; }
    var onLoad = function () {
        MathJax.Hub.Config(options);
        callback();
    };
    if (!script) {
        return onLoad();
    }
    loadScript(script, onLoad);
};
//# sourceMappingURL=index.js.map