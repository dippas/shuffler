<template lang="pug">
h2.choice(v-cloak) {{ copy }}
	span.who-shuffles
</template>

<script>
import { onMounted, reactive } from 'vue';
import { newDay } from '../helpers/newDay.vue';

export default {
  props: {
    copy: {
      type: String,
      required: true
    }
  },

  setup() {
    const members = reactive([]),
      timeToMidnight = newDay();

    let whoShuffles = '';

    const randomizeShuffler = () => {
      fetch('http://localhost:7000/members')
        .then(response => response.json())
        .then(data => {
          for (const id in data) {
            members.push({
              name: data[id].name
            });
          }

          if (timeToMidnight > 0 && data !== null) {
            const today = new Date(),
              days = today.getTime() / (1000 * 60 * 60 * 24),
              index = Math.floor(days) % members.length;

            members.length ? (whoShuffles.textContent = members[index].name) : '';
          }
        });
    };

    onMounted(() => {
      whoShuffles = document.querySelector('.who-shuffles');
      randomizeShuffler();
    });

    return { randomizeShuffler };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/choice';
</style>
