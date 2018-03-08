Object.defineProperty(exports, "__esModule", { value: true });
function render(that) {
    var span = document.createElement('span');
    span.className = 'math nicebox';
    span.innerHTML = that.lines.join('\n');
    return span;
}
exports.default = render;
//# sourceMappingURL=nicebox.js.map