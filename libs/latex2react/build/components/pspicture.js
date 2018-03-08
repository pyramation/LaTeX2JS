'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _latex2jsPstricks = require('latex2js-pstricks');

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pspicture = function (_Component) {
  _inherits(pspicture, _Component);

  function pspicture() {
    _classCallCheck(this, pspicture);

    return _possibleConstructorReturn(this, (pspicture.__proto__ || Object.getPrototypeOf(pspicture)).apply(this, arguments));
  }

  _createClass(pspicture, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var d3svg = d3.select(this.refSvg);
      var obj = Object.assign({}, this.props);
      obj.$el = this.refDiv;
      _latex2jsPstricks.psgraph.pspicture.call(obj, d3svg);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var size = _latex2jsPstricks.psgraph.getSize.call(this.props);
      var width = size.width + 'px';
      var height = size.height + 'px';
      return _react2.default.createElement(
        'div',
        {
          className: 'pspicture',
          style: { width: width, height: height },
          ref: function ref(div) {
            _this2.refDiv = div;
          }
        },
        _react2.default.createElement('svg', {
          width: size.width,
          height: size.height,
          ref: function ref(svg) {
            _this2.refSvg = svg;
          }
        })
      );
    }
  }]);

  return pspicture;
}(_react.Component);

exports.default = pspicture;