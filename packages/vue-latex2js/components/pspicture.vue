<template>
  <div :style="style">
    <svg ref="svg" :width="size.width" :height="size.height" style="border: solid 1px black" />
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
    style() {
      return `{width: ${this.size.width}px; height: ${this.size.height}px}`;
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
        // userEvent(touchcoords);
        console.log('userEvent', touchcoords);
      },
      false
    );

    svg.on(
      'mousemove',
      function() {
        var coords = d3.mouse(this);
        console.log('userEvent', coords);
        // userEvent(coords);
      },
      false
    );

    // rput
    this.plot.rput.forEach(rput => {
      console.log(rput.data, env);
      psgraph.rput.call(rput.data, el);
    });
  },
};
</script>
