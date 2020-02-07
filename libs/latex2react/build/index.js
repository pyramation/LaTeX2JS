'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LaTeX = exports.macros = exports.math = exports.verbatim = exports.enumerate = exports.nicebox = exports.pspicture = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ELEMENTS = { pspicture: _pspicture2.default, nicebox: _nicebox2.default, enumerate: _enumerate2.default, verbatim: _verbatim2.default, math: _math2.default, macros: _macros2.default };

exports.pspicture = _pspicture2.default;
exports.nicebox = _nicebox2.default;
exports.enumerate = _enumerate2.default;
exports.verbatim = _verbatim2.default;
exports.math = _math2.default;
exports.macros = _macros2.default;

var LaTeX = exports.LaTeX = function (_Component) {
  _inherits(LaTeX, _Component);

  function LaTeX(props) {
    _classCallCheck(this, LaTeX);

    var _this = _possibleConstructorReturn(this, (LaTeX.__proto__ || Object.getPrototypeOf(LaTeX)).call(this, props));

    _this.onLoad = _this.onLoad.bind(_this);
    return _this;
  }

  _createClass(LaTeX, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if ((0, _latex2jsMathjax.getMathJax)()) {
        this.onLoad();
      }
      (0, _latex2jsMathjax.loadMathJax)(this.onLoad);
    }
  }, {
    key: 'onLoad',
    value: function onLoad() {
      this.setState({
        loaded: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (!(0, _latex2jsMathjax.getMathJax)()) return _react2.default.createElement(
        'div',
        { className: 'latex-container' },
        'loading...'
      );

      var latex = new _latex2js2.default();
      var parsed = latex.parse(this.props.content);

      var children = [];

      parsed && parsed.forEach(function (el) {
        if (ELEMENTS.hasOwnProperty(el.type)) {
          children.push((0, _react.createElement)(ELEMENTS[el.type], el));
        }
      });

      return _react2.default.createElement(
        'div',
        { className: 'latex-container' },
        children
      );
    }
  }]);

  return LaTeX;
}(_react.Component);