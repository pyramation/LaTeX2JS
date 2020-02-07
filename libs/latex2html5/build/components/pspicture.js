'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = render;

var _latex2jsPstricks = require('latex2js-pstricks');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function render(that) {
  var size = _latex2jsPstricks.psgraph.getSize.call(that);
  var style = 'width: ' + size.width + 'px; height: ' + size.height + 'px;';
  var width = size.width + 'px';
  var height = size.height + 'px';
  var div = document.createElement('div');
  div.className = 'pspicture';
  div.style.width = width;
  div.style.height = height;
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  var d3svg = d3.select(svg);
  that.$el = div;
  _latex2jsPstricks.psgraph.pspicture.call(that, d3svg);
  div.appendChild(svg);
  return div;
}