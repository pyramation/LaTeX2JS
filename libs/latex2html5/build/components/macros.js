Object.defineProperty(exports, "__esModule", { value: true });
var latex2js_macros_1 = require("latex2js-macros");
function render(that) {
    var div = document.createElement('div');
    div.id = 'latex-macros';
    div.style.display = 'none';
    div.className = 'verbatim';
    div.innerHTML = latex2js_macros_1.default;
    return div;
}
exports.default = render;
//# sourceMappingURL=macros.js.map