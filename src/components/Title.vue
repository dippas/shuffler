<template>
  <h1 v-cloak class="title">{{ copy }} {{ currentDate }}</h1>
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
      default: () => new Date().toLocaleDateString('pt-PT')
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/title';
</style>
