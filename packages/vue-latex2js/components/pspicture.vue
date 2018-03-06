<template>
  <span>
    <h4>pspicture</h4>
    <pre>
  {{ text }}
    </pre>
  </span>
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
