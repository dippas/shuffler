import { createApp } from 'vue';
import { setDailyBackground } from './helpers/background.vue';
import App from './App.vue';

createApp(App).mount('#app');

const appElement = document.querySelector('.app');

setDailyBackground(appElement);
