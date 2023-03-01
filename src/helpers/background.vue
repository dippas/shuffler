<script>
import { getTimeToMidnight } from './getTimeToMidnight.vue';

const setDailyBackground = async element => {
  const timeToMidnight = getTimeToMidnight();

  const response = await fetch('https://picsum.photos/v2/list');
  const data = await response.json();

  if (timeToMidnight > 0) {
    const today = new Date(),
      days = today.getTime() / (1000 * 60 * 60 * 24),
      index = Math.floor(days) % data.length;

    element.style.backgroundImage = `url('${data[index].download_url}')`;
  }
};

export { setDailyBackground };
</script>
