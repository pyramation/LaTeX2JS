<template>
  <div>
    by dynamic Component:
    <component
      v-for="item in items"
      :is="item.type"
      :opts="item.props"
      :key="item.id"
      >
    </component>
  </div>
</template>

<script>
import LaTeX2JS from 'latex2js';
import pspicture from './pspicture.vue';
import nicebox from './nicebox.vue';
import enumerate from './enumerate.vue';
import slider from './slider.vue';
import math from './math.vue';

export default {
  name: 'latex',
  components: {
    pspicture,
    nicebox,
    enumerate,
    slider,
    math,
  },
  data() {
    const latex = new LaTeX2JS();
    console.log(this);
    console.log(latex);
    const parsed = latex.parse(this.$attrs.content);
    console.log(parsed);
    return {
      content: 'loading...',
      items: [
        {
          id: 1,
          type: 'div',
          props: {
            color: 'white',
          },
        },
        {
          id: 2,
          type: 'img',
          props: {
            src: 'boom.jpg',
          },
        },
      ],
    };
  },
};
</script>
