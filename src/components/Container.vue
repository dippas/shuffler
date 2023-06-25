<template>
  <div v-cloak class="shuffler-ready">
    <label v-show="!state.checked" class="shuffler-ready__label button button--pink">
      <input
        v-model="state.checked"
        class="shuffler-ready__check"
        name="ready"
        type="checkbox"
      />Ready to Shuffle?
    </label>
    <button v-show="state.checked" class="button" type="button" @click="startShuffler">
      Start Shuffling
    </button>
  </div>
  <div v-cloak class="shuffler">
    <Events
      :key="state.counter"
      shuffler-copy="Who shuffles? — "
      rounds-copy="Rounds: "
      reset-copy="Reset"
      shuffle-copy="Shuffle!"
      shuffle-delete="Delete!"
      shuffle-edit="Edit List"
    />
    <Quote />
  </div>
</template>
<script>
import { reactive } from 'vue';
import Events from './Events.vue';
import Quote from './Quote.vue';

export default {
  components: {
    Events,
    Quote
  },

  setup() {
    const state = reactive({
      counter: 0,
      checked: false
    });

    const startShuffler = () => state.counter++;

    return { state, startShuffler };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/buttons';
@import '../scss/shuffler';
</style>
