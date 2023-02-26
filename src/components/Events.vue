<template>
  <h3 v-cloak class="rounds">{{ roundsCopy }}<strong ref="totalRounds"></strong></h3>
  <button
    v-show="counter"
    :disabled="isDisabled"
    class="button button--white button--reset"
    @click="reset"
  >
    {{ resetCopy }}
  </button>
  <button v-show="!counter" class="button button--turquoise" @click="shuffle">
    {{ shuffleCopy }}
  </button>
  <button :disabled="isDisabled" class="button button--pink" @click="deleteShuffle">
    {{ shuffleDelete }}
  </button>
  <button v-show="!counter" class="button" @click="editList">{{ shuffleEdit }}</button>
  <Suspense>
    <template #default>
      <transition-group v-cloak class="list" name="list" tag="ul">
        <li
          v-for="member in members"
          v-cloak
          v-show="member.isWorking"
          :key="member.id"
          class="list__item"
        >
          <div class="list__box">
            <figure class="list__figure">
              <img class="list__image" :src="member.photo" :alt="member.name" />
            </figure>
            <span class="list__text">{{ member.name }}</span>
            <button
              class="list__info"
              :disabled="isDisabled"
              @click="member.isWorking = !member.isWorking"
            >
              <span>Working</span>
            </button>
          </div>
        </li>
      </transition-group>
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script>
import { ref, onMounted } from 'vue';
import { setDailyBackground } from '../helpers/background.vue';
import { randomRounds } from '../helpers/randomNumber.vue';
import { confettiEffect } from '../helpers/confettiEffect.vue';
import { users } from '../helpers/users.vue';

export default {
  props: {
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
    const members = users(),
      totalRounds = ref(null),
      counter = ref(0);

    let roundCount = randomRounds(),
      isDisabled = ref(null),
      shuffleSound,
      finishSound,
      shufflerContainer,
      usersContainer;

    const reset = () => {
      finishSound.pause();
      finishSound.currentTime = 0;
      counter.value = 0;
      roundCount = totalRounds.value.textContent = randomRounds();
      members.sort((a, b) => a.name.localeCompare(b.name));
      members.map(member => (member.isWorking = true));
    };

    const shuffle = () => {
      isDisabled.value = true;
      const shufflingMembers = setInterval(() => {
        counter.value++;

        if (counter.value <= roundCount) {
          shuffleSound.play();
          totalRounds.value.textContent = roundCount - counter.value;

          for (let i = members.length - 1; i > 0; i--) {
            const randomId = Math.floor(Math.random() * (i + 1));
            [members[i], members[randomId]] = [members[randomId], members[i]];
          }

          if (counter.value === roundCount) {
            clearInterval(shufflingMembers);
            finishSound.play();
            setTimeout(() => {
              if (!finishSound.paused) {
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
          finishSound.pause();
          finishSound.currentTime = 0;
          counter.value = 0;
        }
      }
    };

    const editList = () => {
      shufflerContainer.style.display = 'none';
      usersContainer.style.display = 'block';
    };

    const rounds = () => (totalRounds.value.textContent = roundCount);

    onMounted(() => {
      shuffleSound = document.getElementById('shuffling-sound');
      finishSound = document.getElementById('shuffling-finish');
      shufflerContainer = document.querySelector('.shuffler');
      usersContainer = document.querySelector('.users');
      rounds();
      setDailyBackground();
    });

    return {
      members,
      totalRounds,
      roundCount,
      counter,
      shuffle,
      reset,
      isDisabled,
      deleteShuffle,
      editList
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/list', '../scss/buttons', '../scss/rounds';
</style>
