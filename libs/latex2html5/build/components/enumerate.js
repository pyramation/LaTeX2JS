'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;
function render(that) {
  var lines = that.lines.map(function (line) {
    var m = line.match(/\\item (.*)/);
    if (m) {
      return '<li>' + m[1] + '</li>';
    } else {
      return line;
    }
  }).join('\n');

  var ul = document.createElement('ul');
  ul.className = 'math';
  ul.innerHTML = lines;
  return ul;
}