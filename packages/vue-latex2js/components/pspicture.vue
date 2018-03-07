<template>
  <svg :width="size.width" :height="size.height" style="border: solid 1px black" />
</template>

<script>
import { psgraph } from 'latex2js-pstricks';
import * as d3 from 'd3';

export default {
  props: ['lines', 'plot', 'settings', 'env'],
  computed: {
    size() {
      return psgraph.getSize.call(this);
    },
    // text() {
    //   return this.lines.join('\n');
    // },
  },
  mounted() {
    d3
      .select(this.$el)
      .append('circle')
      .attr('cx', '250')
      .attr('cy', '150')
      .attr('r', '100');
  },
};
</script>
