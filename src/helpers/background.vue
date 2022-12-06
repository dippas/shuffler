<script>
import { newDay } from '../helpers/newDay.vue';

const setDailyBackground = () => {
  const timeToMidnight = newDay();

  fetch('https://picsum.photos/v2/list')
    .then(response => response.json())
    .then(data => {
      if (timeToMidnight > 0) {
        const today = new Date(),
          days = today.getTime() / (1000 * 60 * 60 * 24),
          index = Math.floor(days) % data.length;

        document.querySelector('.app').style.backgroundImage = `url('${data[index].download_url}')`;
      }
    });
};

export { setDailyBackground };
</script>
