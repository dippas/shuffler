<template lang='pug'>
.loader(ref='loading' v-show='isLoading')
	.loader-spinner

blockquote
	.quote(ref='quote')
	cite
		figure
			figcaption.quote__author(ref='author')
			a(ref='link' target='_blank')
				img(v-cloak class='quote__thumbnail' ref='thumbnail')
</template>

<script>
	import { ref, onMounted } from 'vue'
	import { newDay } from '../helpers/newDay.vue'

	export default {
		setup() {
			const quote = ref(null),
				author = ref(null),
				link = ref(null),
				thumbnail = ref(null),
				timeToMidnight = newDay()

			let	isLoading = ref(true)
			
			const randomizeQuote = () => {
				if (timeToMidnight > 0) {
					const today = new Date(),
						days = today.getTime() / (1000 * 60 * 60 * 24)

					fetch('https://api.quotable.io/quotes?limit=150')
						.then(response => response.json())
						.then(data => {
								isLoading.value = false
								const results = data.results, 
									quoteIndex = Object.keys(results)[Math.floor(days) % results.length],
									slug = results[quoteIndex].authorSlug
								
								author.value.textContent = results[quoteIndex].author
								quote.value.textContent = results[quoteIndex].content
								thumbnail.value.src = `https://images.quotable.dev/profile/200/${slug}.jpg`,
								thumbnail.value.alt = results[quoteIndex].author
						})
	
						.catch(error => quote.value.textContent = error)
					}
			}

			onMounted(() => randomizeQuote())

			return { quote, author, thumbnail, isLoading }
		}
	}
</script>

<style lang='scss' scoped>
	@import '../scss/quote'
</style>