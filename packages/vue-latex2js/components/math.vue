<template>
  <div>
{{ text }}
  </div>
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
