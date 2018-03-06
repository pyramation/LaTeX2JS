<template>
  <div>
    LaTeX components
    <component
      v-for="item in items"
      :is="item.type"
      :env="item.env"
      :lines="item.lines"
      :plot="item.plot"
      :settings="item.settings"
      :key="item.id"
      >
    </component>
  </div>
</template>

<script>
import LaTeX2JS from 'latex2js';
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
  data() {
    const latex = new LaTeX2JS();
    const parsed = latex.parse(this.$attrs.content);
    console.log(parsed);
    console.log(JSON.stringify(parsed, null, 2));
    return {
      items: parsed.map((item, i) => {
        item.id = i;
        return item;
      }),
    };
  },
};
</script>
