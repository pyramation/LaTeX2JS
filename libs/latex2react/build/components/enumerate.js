"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var lines = _ref.lines;
  return _react2.default.createElement(
    "ul",
    { className: "math" },
    lines.map(function (line) {
      var m = line.match(/\\item (.*)/);
      if (m) {
        return _react2.default.createElement(
          "li",
          null,
          m[1]
        );
      } else {
        return line;
      }
    })
  );
};