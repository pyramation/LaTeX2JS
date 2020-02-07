'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _latex2jsMacros = require('latex2js-macros');

var _latex2jsMacros2 = _interopRequireDefault(_latex2jsMacros);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function render(that) {
  var div = document.createElement('div');
  div.id = 'latex-macros';
  div.style.display = 'none';
  div.className = 'verbatim';
  div.innerHTML = _latex2jsMacros2.default;
  return div;
}