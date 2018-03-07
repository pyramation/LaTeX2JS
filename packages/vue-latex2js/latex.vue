<template>
  <div class="latex-container">
    <component
      v-for="(item, id) in items"
      :is="item.type"
      :env="item.env"
      :lines="item.lines"
      :plot="item.plot"
      :settings="item.settings"
      :key="id"
      >
    </component>
  </div>
</template>

<script>
import LaTeX2JS from 'latex2js';
import { getMathJax, loadMathJax } from 'latex2js-mathjax';
import pspicture from './components/pspicture.vue';
import nicebox from './components/nicebox.vue';
import enumerate from './components/enumerate.vue';
import verbatim from './components/verbatim.vue';
import slider from './components/slider.vue';
import math from './components/math.vue';

export default {
  name: 'latex',
  components: {
    pspicture,
    nicebox,
    enumerate,
    verbatim,
    slider,
    math,
  },
  beforeMount() {
    if (getMathJax()) {
      return;
    }
    loadMathJax(() => {
      this.loaded = true;
    });
  },
  data() {
    return {
      loaded: false,
    };
  },
  computed: {
    items() {
      const latex = new LaTeX2JS();
      const parsed = latex.parse(this.$attrs.content);
      return this.loaded ? parsed : [];
    },
  },
};
</script>
