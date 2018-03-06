import { convertUnits } from './utils';

export const Expressions = {
  fillcolor: /^fillcolor$/,
  fillstyle: /^fillstyle$/,
  linecolor: /^linecolor$/,
  linestyle: /^linestyle$/,
  unit: /^unit/,
  runit: /^runit/,
  xunit: /^xunit/,
  yunit: /^yunit/,
};

export const Functions = {
  fillcolor: function(o, v) {
    o.fillcolor = v;
  },
  fillstyle: function(o, v) {
    o.fillstyle = v;
  },
  linecolor: function(o, v) {
    o.linecolor = v;
  },
  linestyle: function(o, v) {
    o.linestyle = v;
  },
  unit: function(o, v) {
    v = convertUnits(v);
    o.unit = v;
    o.runit = v;
    o.xunit = v;
    o.yunit = v;
  },
  runit: function(o, v) {
    v = convertUnits(v);
    o.runit = v;
  },
  xunit: function(o, v) {
    v = convertUnits(v);
    o.xunit = v;
  },
  yunit: function(o, v) {
    v = convertUnits(v);
    o.yunit = v;
  },
};

export default {
  Expressions,
  Functions,
};
