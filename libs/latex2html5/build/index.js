'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.macros = exports.math = exports.verbatim = exports.enumerate = exports.nicebox = exports.pspicture = undefined;
exports.default = render;

var _latex2js = require('latex2js');

var _latex2js2 = _interopRequireDefault(_latex2js);

var _latex2jsMathjax = require('latex2js-mathjax');

var _pspicture = require('./components/pspicture');

var _pspicture2 = _interopRequireDefault(_pspicture);

var _nicebox = require('./components/nicebox');

var _nicebox2 = _interopRequireDefault(_nicebox);

var _enumerate = require('./components/enumerate');

var _enumerate2 = _interopRequireDefault(_enumerate);

var _verbatim = require('./components/verbatim');

var _verbatim2 = _interopRequireDefault(_verbatim);

var _slider = require('./components/slider');

var _slider2 = _interopRequireDefault(_slider);

var _math = require('./components/math');

var _math2 = _interopRequireDefault(_math);

var _macros = require('./components/macros');

var _macros2 = _interopRequireDefault(_macros);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ELEMENTS = { pspicture: _pspicture2.default, nicebox: _nicebox2.default, enumerate: _enumerate2.default, verbatim: _verbatim2.default, math: _math2.default, macros: _macros2.default };

exports.pspicture = _pspicture2.default;
exports.nicebox = _nicebox2.default;
exports.enumerate = _enumerate2.default;
exports.verbatim = _verbatim2.default;
exports.math = _math2.default;
exports.macros = _macros2.default;
function render(tex, resolve) {
  var done = function done() {
    var latex = new _latex2js2.default();
    var parsed = latex.parse(tex);
    var div = document.createElement('div');
    div.className = 'latex-container';
    parsed && parsed.forEach(function (el) {
      if (ELEMENTS.hasOwnProperty(el.type)) {
        div.appendChild(ELEMENTS[el.type](el));
      }
    });
    resolve(div);
  };

  if ((0, _latex2jsMathjax.getMathJax)()) {
    return done();
  }
  (0, _latex2jsMathjax.loadMathJax)(done);
}

var init = exports.init = function init() {
  (0, _latex2jsMathjax.loadMathJax)();
  document.querySelectorAll('script[type="text/latex"]').forEach(function (el) {
    render(el.innerHTML, function (div) {
      el.parentNode.insertBefore(div, el.nextSibling);
    });
  });
};