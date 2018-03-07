Object.defineProperty(exports, "__esModule", { value: true });
function render(that) {
    var span = document.createElement('span');
    span.className = 'math';
    span.innerHTML = that.lines.join('\n');
    return span;
}
exports.default = render;
//# sourceMappingURL=math.js.map