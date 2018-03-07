<template>
  <div :style="`width: ${size.width}px; height: ${size.height}px;`" class="pspicture">
    <svg ref="svg" :width="`${size.width}px`" :height="`${size.height}px`" />
  </div>
</template>

<script>
import { psgraph } from 'latex2js-pstricks';
import * as d3 from 'd3';
import * as _ from 'underscore';

export default {
  props: ['lines', 'plot', 'settings', 'env'],
  computed: {
    size() {
      return psgraph.getSize.call(this);
    },
  },
  mounted() {
    var env = this.env;
    var el = this.$el;
    var svg = d3.select(this.$refs.svg);

    Object.keys(this.plot).forEach(key => {
      const plot = this.plot[key];
      if (key.match(/rput/)) return;
      if (psgraph.hasOwnProperty(key)) {
        plot.forEach(data => {
          data.data.global = env;
          // give access to pspicture!
          psgraph[key].call(data.data, svg);
        });
      }
    });

    svg.on(
      'touchmove',
      function() {
        d3.event.preventDefault();
        var touchcoords = d3.touches(this)[0];
        userEvent(touchcoords);
      },
      false
    );

    svg.on(
      'mousemove',
      function() {
        var coords = d3.mouse(this);
        userEvent(coords);
      },
      false
    );

    const plots = this.plot;
    function userEvent(coords) {
      svg.selectAll('.userline').remove();
      svg.selectAll('.psplot').remove();
      var currentEnvironment = {};
      // find special vars
      _.each(plots, function(plot, k) {
        if (k.match(/uservariable/)) {
          _.each(plot, function(data) {
            data.env.userx = coords[0];
            data.env.usery = coords[1];
            var dd = data.fn.call(data.env, data.match);
            currentEnvironment[data.data.name] = dd.value;
          });
        }
      });
      _.each(plots, function(plot, k) {
        if (k.match(/psplot/)) {
          _.each(plot, function(data) {
            _.each(currentEnvironment, function(variable, name) {
              data.env.variables[name] = variable;
            });
            var d = data.fn.call(data.env, data.match);
            d.global = {};
            Object.assign(d.global, env);
            // give pspicture!
            psgraph[k].call(d, svg);
          });
        }
        if (k.match(/userline/)) {
          _.each(plot, function(data) {
            var d = data.fn.call(data.env, data.match);
            data.env.x2 = coords[0];
            // / env.xunit;
            data.env.y2 = coords[1];
            // / env.yunit;
            data.data.x2 = data.env.x2;
            data.data.y2 = data.env.y2;
            if (data.data.xExp2) {
              data.data.x2 = d.userx2(coords);
              data.data.x1 = d.userx(coords);
            } else if (data.data.xExp) {
              data.data.x2 = d.userx(coords);
            }
            if (data.data.yExp2) {
              data.data.y2 = d.usery2(coords);
              data.data.y1 = d.usery(coords);
            } else if (data.data.yExp) {
              data.data.y2 = d.usery(coords);
            }
            d.global = {};
            Object.assign(d.global, env);
            // give pspicture!
            Object.assign(d, data.data);
            psgraph[k].call(d, svg);
          });
        }
      });
    }

    // rput
    this.plot.rput.forEach(rput => {
      psgraph.rput.call(rput.data, el);
    });
  },
};
</script>
