Object.defineProperty(exports, "__esModule", { value: true });
function render(that) {
    var pre = document.createElement('pre');
    pre.className = 'verbatim';
    pre.innerHTML = that.lines.join('\n');
    return pre;
}
exports.default = render;
//# sourceMappingURL=verbatim.js.map