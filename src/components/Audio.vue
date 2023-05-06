<template>
  <audio v-for="(source, index) in audioSources" :id="source.id" :key="index">
    <source :src="source.url" :type="'audio/mpeg'" />
  </audio>
</template>

<script>
export default {
  props: {
    audioSources: {
      type: Array,
      required: true
    }
  }
};
</script>
