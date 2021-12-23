<template lang='pug'>
h3.rounds(v-cloak) {{ roundsCopy }}
	strong(ref='totalRounds')
button.button.button--white.button--reset(@click='reset' v-show='counter' :disabled='isDisabled') {{ resetCopy }}
button.button.button--turquoise(@click='shuffle' v-show='!counter') {{ shuffleCopy }}
button.button.button--pink(@click='deleteShuffle' :disabled='isDisabled') {{ shuffleDelete }}
button.button(@click='editList' v-show='!counter') {{ shuffleEdit }}
Suspense
	template(#default)
		transition-group(name='list' tag='ul' v-cloak class='list')
			li.list__item(v-for='(member, idx) in members' :key='member.id' v-show='member.isWorking' v-cloak)
				.list__box
					figure.list__figure
						img.list__image(:src='member.photo' :alt='member.name')
					span.list__text {{ member.name }}
					button.list__info(@click='member.isWorking = !member.isWorking' :disabled='isDisabled')
						span Working
		
	template(#fallback)
		div Loading...

</template>

<script>
	import { ref, onMounted } from 'vue'
	import { setDailyBackground } from '../helpers/background.vue'
	import { randomRounds } from '../helpers/randomNumber.vue'
	import { confettiEffect }  from '../helpers/confettiEffect.vue'
	import { users } from '../helpers/users.vue'
	import { newDay } from '../helpers/newDay.vue'

	export default {
		props: {
			roundsCopy: String,
			resetCopy: String,
			shuffleCopy: String,
			shuffleDelete: String,
			shuffleEdit: String
		},

		setup() {
			const members = users(),
				totalRounds = ref(null),
				counter = ref(0),
				timeToMidnight =  newDay()
				
			let roundCount = randomRounds(),
				isDisabled = ref(null),
				shuffleSound,
				finishSound,
				shufflerContainer,
				usersContainer

			const reset = () => {
				finishSound.pause()
				finishSound.currentTime = 0
				counter.value = 0
				roundCount = totalRounds.value.textContent = randomRounds()
				members.sort((a, b) => a.name.localeCompare(b.name))
				members.forEach(member => member.isWorking = true)
			}

			const shuffle = () =>  {
				isDisabled.value = true
				const shufflingMembers = setInterval(() => {
					counter.value++

					if (counter.value <= roundCount) {
							shuffleSound.play()
							totalRounds.value.textContent = roundCount - counter.value
							
							for (let i = members.length - 1; i > 0; i--) {
								const randomId = Math.floor(Math.random() * (i + 1));
								[members[i], members[randomId]] = [members[randomId], members[i]]
							}
							
							if (counter.value === roundCount) {
								clearInterval(shufflingMembers)
								finishSound.play()
								setTimeout(() => {
									if(!finishSound.paused) {
										isDisabled.value = false
										confettiEffect()
									}
								}, 5500)	
							}
						}
				}, 1000)
			}

			const deleteShuffle = () => {
				while (members.length) {
					
					fetch(`http://localhost:7000/members/${members.length}`, {method: 'DELETE'})

					members.pop()

					if(!members.length) {
						shufflerContainer.style.display =  'none'
						usersContainer.style.display = 'block'
						finishSound.pause()
						finishSound.currentTime = 0
						counter.value = 0
					}
				}
			}

			const editList = () => {
				shufflerContainer.style.display =  'none'
				usersContainer.style.display = 'block'
			}

			const rounds = () => totalRounds.value.textContent = roundCount

			onMounted(() => {
				shuffleSound = document.getElementById('shuffling-sound')
				finishSound = document.getElementById('shuffling-finish')
				shufflerContainer = document.querySelector('.shuffler')
				usersContainer = document.querySelector('.users')
				rounds()
				setDailyBackground()
			})

			return { members, totalRounds, roundCount, counter, shuffle, reset, isDisabled, deleteShuffle, editList }
		}
	}
</script>

<style lang='scss' scoped>
	@import '../scss/list',
			'../scss/buttons',
			'../scss/rounds'
</style>