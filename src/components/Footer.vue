<template lang="pug">
footer(class='footer') {{ copy }}
	a(class='footer__link' :href='authorLink' target='_blank') {{ author }}
</template>

<script>
export default {
  props: {
    copy: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    authorLink: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/footer';
</style>
