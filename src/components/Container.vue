<template lang="pug">
.shuffler-ready(v-cloak)
	label.shuffler-ready__label.button.button--pink(v-show='!checked')
		input.shuffler-ready__check(name='ready' type="checkbox" v-model='checked')
		| Ready to Shuffle?
	button.button(type='button' @click='startShuffler' v-show='checked') Start Shuffling

.shuffler(v-cloak)
	User(copy='Who shuffles — ')
	Shuffler(roundsCopy='Rounds: ' resetCopy='Reset' shuffleCopy='Shuffle!' shuffleDelete='Delete!' shuffleEdit='Edit List' :key='cId')
	Quote
</template>

<script>
import Shuffler from './Events.vue';
import User from './User.vue';
import Quote from './Quote.vue';

export default {
  components: {
    Shuffler,
    User,
    Quote
  },

  data() {
    return {
      cId: 0,
      checked: false
    };
  },

  methods: {
    startShuffler() {
      this.cId++;
      User.setup().randomizeShuffler();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/buttons', '../scss/shuffler';
</style>
