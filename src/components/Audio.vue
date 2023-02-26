<template>
  <audio id="shuffling-sound">
    <source :src="shuffling" type="audio/mpeg" />
  </audio>
  <audio id="shuffling-finish">
    <source :src="flute" type="audio/mpeg" />
  </audio>
</template>

<script>
export default {
  props: {
    shuffling: {
      type: String,
      required: true
    },

    flute: {
      type: String,
      required: true
    }
  }
};
</script>
