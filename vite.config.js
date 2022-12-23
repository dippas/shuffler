import vue from '@vitejs/plugin-vue';

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        // example : additionalData: `@import "./src/design/styles/variables";`
        // dont need include file extend .scss
        additionalData: `
						@use 'sass:math'; 
						@import	"./src/scss/abstract/variables",
									"./src/scss/abstract/functions", 
									"./src/scss/abstract/mixins",
									"./src/scss/abstract/placeholders";
					`
      }
    }
  }
};
