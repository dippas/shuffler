<template>
  <h2 v-cloak class="choice">
    {{ shufflerCopy }}<span class="who-shuffles">{{ shuffler }}</span>
  </h2>
  <h3 v-cloak class="rounds">
    {{ roundsCopy }}<strong ref="totalRounds">{{ roundCount }}</strong>
  </h3>
  <button
    v-show="counter"
    class="button button--white button--reset"
    :disabled="isDisabled"
    @click="reset"
  >
    {{ resetCopy }}
  </button>
  <button v-show="!counter" class="button button--turquoise" @click="shuffle">
    {{ shuffleCopy }}
  </button>
  <button
    class="button button--pink"
    :disabled="members.length === 0 || isDisabled"
    @click="deleteShuffle"
  >
    {{ shuffleDelete }}
  </button>
  <button v-show="!counter" class="button" @click="editList">{{ shuffleEdit }}</button>
  <Suspense>
    <template #default>
      <transition-group v-cloak class="list" name="list" tag="ul">
        <li v-for="member in members" v-cloak :key="member.id" class="list__item">
          <div class="list__box">
            <figure class="list__figure">
              <img class="list__image" :src="member.photo" :alt="member.name" />
            </figure>
            <span class="list__text">{{ member.name }}</span>
            <button class="list__info" :disabled="isDisabled" @click="toggleWorking(member)">
              <span>{{ member.isWorking ? workingCopy : notWorkingCopy }}</span>
            </button>
          </div>
        </li>
      </transition-group>
    </template>
    <template #fallback>Loading...</template>
  </Suspense>
</template>

<script>
import { ref, onMounted } from 'vue';
import { generateRandomRounds } from '../helpers/randomNumber.vue';
import { getTimeToMidnight } from '../helpers/getTimeToMidnight.vue';
import { confettiEffect } from '../helpers/confettiEffect.vue';
import { useUsers } from '../helpers/useUsers.vue';

export default {
  props: {
    shufflerCopy: {
      type: String,
      required: true
    },
    roundsCopy: {
      type: String,
      required: true
    },
    resetCopy: {
      type: String,
      required: true
    },
    shuffleCopy: {
      type: String,
      required: true
    },
    shuffleDelete: {
      type: String,
      required: true
    },
    shuffleEdit: {
      type: String,
      required: true
    }
  },

  setup() {
    const { members, fetchUsers } = useUsers();
    const totalRounds = ref(null);
    const timeToMidnight = getTimeToMidnight();
    const counter = ref(0);
    const usersLoaded = ref(false);

    let roundCount = generateRandomRounds(),
      isDisabled = ref(null),
      shuffling,
      flute,
      shufflerContainer,
      whoShuffles,
      usersContainer;

    const reset = () => {
      flute.pause();
      flute.currentTime = 0;
      counter.value = 0;
      roundCount = totalRounds.value.textContent = generateRandomRounds();
      members.sort((a, b) => a.name.localeCompare(b.name));
      members.map(member => (member.isWorking = true));
    };

    const shuffle = () => {
      isDisabled.value = true;
      const shufflingMembers = setInterval(() => {
        counter.value++;

        if (counter.value <= roundCount) {
          shuffling.play();
          totalRounds.value.textContent = roundCount - counter.value;

          for (let i = members.length - 1; i > 0; i--) {
            const randomId = Math.floor(Math.random() * (i + 1));
            [members[i], members[randomId]] = [members[randomId], members[i]];
          }

          if (counter.value === roundCount) {
            clearInterval(shufflingMembers);
            flute.play();
            setTimeout(() => {
              if (!flute.paused) {
                isDisabled.value = false;
                confettiEffect();
              }
            }, 5500);
          }
        }
      }, 1000);
    };

    const deleteShuffle = () => {
      while (members.length) {
        fetch(`http://localhost:7000/members/${members.length}`, {
          method: 'DELETE'
        });

        members.pop();

        if (!members.length) {
          shufflerContainer.style.display = 'none';
          usersContainer.style.display = 'block';
          flute.pause();
          flute.currentTime = 0;
          counter.value = 0;
        }
      }
    };

    const editList = () => {
      shufflerContainer.style.display = 'none';
      usersContainer.style.display = 'block';
    };

    const whoShufflesRandomizer = () => {
      if (timeToMidnight > 0 && usersLoaded) {
        setTimeout(() => {
          const today = new Date();
          const days = today.getTime() / (1000 * 60 * 60 * 24);
          const index = Math.floor(days) % members.length;
          const shuffler = members[index];
          whoShuffles.textContent = shuffler.name;
        }, 500);
      }
    };

    const rounds = () => (totalRounds.value.textContent = roundCount);

    fetchUsers().then(() => {
      usersLoaded.value = true;
    });

    onMounted(() => {
      shuffling = document.getElementById('shuffling');
      flute = document.getElementById('flute');
      shufflerContainer = document.querySelector('.shuffler');
      usersContainer = document.querySelector('.users');
      whoShuffles = document.querySelector('.who-shuffles');
      rounds();
      whoShufflesRandomizer();
    });

    return {
      members,
      totalRounds,
      roundCount,
      counter,
      isDisabled,
      whoShuffles,
      usersLoaded,
      shuffle,
      reset,
      deleteShuffle,
      editList,
      whoShufflesRandomizer
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/list';
@import '../scss/buttons';
@import '../scss/choice';
@import '../scss/rounds';
</style>
