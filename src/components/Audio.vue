<template lang='pug'>
audio#shuffling-sound
	source(:src='shuffling' type='audio/mpeg')

audio#shuffling-finish
	source(:src='flute' type='audio/mpeg')
</template>

<script>
	export default {
		props: {
			shuffling: String,
			flute: String
		}
	}
</script>