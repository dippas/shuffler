<template lang="pug">
footer(class='footer') {{ copy }}
	a(class='footer__link' :href='authorLink' target='_blank') {{ author }}
</template>

<script>
export default {
	props: {
		copy: String,
		author: String,
		authorLink: String
	}
}
</script>

<style lang="scss" scoped>
	@import '../scss/footer'
</style>