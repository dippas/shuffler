<template lang="pug">
h1(v-cloak class='title') {{ copy }} {{ currentDate }}
</template>

<script>
export default {
  props: {
    copy: {
      type: String,
      required: true
    },
    currentDate: {
      type: String,
      required: true,
      default: () => new Date().toLocaleDateString('pt-PT')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/title';
</style>
