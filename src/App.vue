<template>
  <div class="app__container">
    <div class="app__box">
      <Audio shuffling="assets/audio/shuffling.mp3" flute="assets/audio/flute.mp3"></Audio>
      <Title copy="Shuffler — "></Title>
      <AddUsers></AddUsers>
      <Container></Container>
      <Footer copy="Powered by " author="dippas" author-link="https://github.com/dippas"></Footer>
    </div>
  </div>
</template>

<script setup>
import Audio from './components/Audio.vue';
import AddUsers from './components/AddUsers.vue';
import Container from './components/Container.vue';
import Title from './components/Title.vue';
import Footer from './components/Footer.vue';
</script>

<style lang="scss">
@import './scss/app';
</style>
