<template lang='pug'>
.app__container
	.app__box
		Audio(shuffling='assets/audio/shuffling.mp3' flute='assets/audio/flute.mp3')
		Title(copy='Shuffler — ')
		AddUsers
		Container
		Footer(copy='Powered by ' author='dippas' authorLink='https://github.com/dippas')
</template>

<script setup>
	import Audio from './components/Audio.vue'
	import AddUsers from './components/AddUsers.vue'
	import Container from './components/Container.vue'
	import Title from './components/Title.vue'
	import Quote from './components/Quote.vue'
	import Footer from './components/Footer.vue'
</script>

<style lang='scss'>
	@import './scss/app'
</style>