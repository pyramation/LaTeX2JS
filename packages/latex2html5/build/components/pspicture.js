Object.defineProperty(exports, "__esModule", { value: true });
var latex2js_pstricks_1 = require("latex2js-pstricks");
var d3 = require("d3");
function render(that) {
    var size = latex2js_pstricks_1.psgraph.getSize.call(that);
    var style = "width: " + size.width + "px; height: " + size.height + "px;";
    var width = size.width + "px";
    var height = size.height + "px";
    var div = document.createElement('div');
    div.className = 'pspicture';
    div.style.width = width;
    div.style.height = height;
    var svg = document.createElement('svg');
    svg.width = width;
    svg.height = height;
    var d3svg = d3.select(svg);
    latex2js_pstricks_1.psgraph.pspicture.call(this, d3svg);
    div.appendChild(svg);
    return div;
}
exports.default = render;
//# sourceMappingURL=pspicture.js.map