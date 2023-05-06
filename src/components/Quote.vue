<template>
  <div v-show="isLoading" ref="loading" class="loader">
    <div class="loader-spinner"></div>
  </div>
  <div v-show="!isLoading">
    <blockquote>
      <div ref="quote" class="quote">{{ quote }}</div>
      <cite>
        <figure>
          <figcaption ref="author">{{ author }}</figcaption>
          <a ref="link" target="_blank" class="quote__author">
            <img
              ref="thumbnail"
              class="quote__thumbnail"
              :src="thumbnail"
              :alt="author"
              @error="handleThumbnailError"
            />
          </a>
        </figure>
      </cite>
    </blockquote>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getTimeToMidnight } from '../helpers/getTimeToMidnight.vue';

export default {
  setup() {
    const quote = ref('');
    const author = ref('');
    const thumbnail = ref('');
    const isLoading = ref(true);
    const timeToMidnight = getTimeToMidnight();

    const handleThumbnailError = () => (thumbnail.value.style.display = 'none');

    const randomizeQuote = async () => {
      if (timeToMidnight > 0) {
        try {
          const response = await fetch('https://api.quotable.io/quotes?limit=150');
          const data = await response.json();
          const results = data.results;
          const today = new Date();
          const days = today.getTime() / (1000 * 60 * 60 * 24);
          const quoteIndex = Object.keys(results)[Math.floor(days) % results.length];
          const slug = results[quoteIndex].authorSlug;

          author.value.textContent = results[quoteIndex].author;
          quote.value.textContent = results[quoteIndex].content;
          thumbnail.value.src = `https://images.quotable.dev/profile/200/${slug}.jpg`;
          isLoading.value = false;
          thumbnail.value.onerror = handleThumbnailError;
        } catch (error) {
          handleThumbnailError();
          console.error(error);
        }
      }
    };

    onMounted(() => randomizeQuote());

    return { quote, author, thumbnail, isLoading };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/quote';
</style>
