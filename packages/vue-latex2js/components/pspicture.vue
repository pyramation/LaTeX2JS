<template>
  <span ref="el">
    <h4>pspicture</h4>
    <pre>
  {{ text }}
    </pre>
  </span>
</template>

<script>
import { psgraph } from 'latex2js-pstricks';

export default {
  props: ['lines', 'plot', 'settings', 'env'],
  computed: {
    svg() {
      var svg = psgraph.init.call(this.env, this.$refs.el));
      console.log(svg);
      return svg;
    },
    text() {
      return this.lines.join('\n');
    },
  },
};
</script>
