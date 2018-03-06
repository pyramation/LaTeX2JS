<template>
  <span v-html="text"></span>
</template>

<script>
export default {
  props: ['lines'],
  computed: {
    text() {
      return this.lines.join('\n');
    },
  },
};
</script>
