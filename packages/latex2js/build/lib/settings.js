"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.Expressions = {
    fillcolor: /^fillcolor$/,
    fillstyle: /^fillstyle$/,
    linecolor: /^linecolor$/,
    linestyle: /^linestyle$/,
    unit: /^unit/,
    runit: /^runit/,
    xunit: /^xunit/,
    yunit: /^yunit/,
};
exports.Functions = {
    fillcolor: function (o, v) {
        o.fillcolor = v;
    },
    fillstyle: function (o, v) {
        o.fillstyle = v;
    },
    linecolor: function (o, v) {
        o.linecolor = v;
    },
    linestyle: function (o, v) {
        o.linestyle = v;
    },
    unit: function (o, v) {
        v = utils_1.convertUnits(v);
        o.unit = v;
        o.runit = v;
        o.xunit = v;
        o.yunit = v;
    },
    runit: function (o, v) {
        v = utils_1.convertUnits(v);
        o.runit = v;
    },
    xunit: function (o, v) {
        v = utils_1.convertUnits(v);
        o.xunit = v;
    },
    yunit: function (o, v) {
        v = utils_1.convertUnits(v);
        o.yunit = v;
    },
};
exports.default = {
    Expressions: exports.Expressions,
    Functions: exports.Functions,
};
//# sourceMappingURL=settings.js.map