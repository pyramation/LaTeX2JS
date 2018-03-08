'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _latex2jsMacros = require('latex2js-macros');

var _latex2jsMacros2 = _interopRequireDefault(_latex2jsMacros);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return _react2.default.createElement('div', {
    style: { display: 'none' },
    dangerouslySetInnerHTML: { __html: _latex2jsMacros2.default }
  });
};