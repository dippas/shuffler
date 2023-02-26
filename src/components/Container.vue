<template>
  <div v-cloak class="shuffler-ready">
    <label v-show="!checked" class="shuffler-ready__label button button--pink">
      <input v-model="checked" class="shuffler-ready__check" name="ready" type="checkbox" />Ready to
      Shuffle?
    </label>
    <button v-show="checked" class="button" type="button" @click="startShuffler">
      Start Shuffling
    </button>
  </div>
  <div v-cloak class="shuffler">
    <User copy="Who shuffles — " />
    <Shuffler
      :key="cId"
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
      counter: 0,
      checked: false
    };
  },

  methods: {
    startShuffler() {
      this.counter++;
      User.setup().randomizeShuffler();
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/buttons', '../scss/shuffler';
</style>
