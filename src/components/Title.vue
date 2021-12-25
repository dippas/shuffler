<template lang='pug'>
h1(v-cloak class='title') {{ copy }} {{ currentDate }}
</template>

<script>
	export default {
		props: {
			copy: String,
			currentDate: {
				type: String,
				default:  () => new Date().toLocaleDateString('pt-PT')
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '../scss/title'
</style>