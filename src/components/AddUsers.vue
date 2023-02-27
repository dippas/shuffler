<template>
  <div v-cloak class="users">
    <form
      class="users__form"
      autocomplete="off"
      novalidate="novalidate"
      @submit.prevent="addNewUser"
    >
      <fieldset class="users__fieldset">
        <legend class="users__title">Add user &amp; avatar</legend>
        <input
          v-model="newUser"
          class="users__name"
          name="newUser"
          placeholder="Insert name of user"
        />
        <input
          id="uploadFile"
          class="users__upload"
          type="file"
          accept="image/*"
          @change="uploadFile"
        />
        <label class="users__avatar button button--turquoise" for="uploadFile"
          ><span class="users__icon">
            <svg
              class="users__svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              width="16"
              height="16"
            >
              <path
                fill="currentColor"
                d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
              ></path></svg></span
          >Upload Avatar</label
        >
      </fieldset>
      <button class="button button--coral">Add New User</button>
    </form>
    <article v-if="newUser" class="users__preview">
      <h2 ref="userAdded" class="users__legend">{{ newUser }}</h2>
      <figure><img ref="preview" class="users__preview-image" /></figure>
    </article>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';

export default {
  setup() {
    let startShufflerButton,
      preview = ref(null);

    const newUser = ref(null),
      userAdded = ref(null);

    const addNewUser = e => {
      if (newUser.value) {
        startShufflerButton.style.display = 'block';

        fetch('http://localhost:7000/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: newUser.value,
            photo: preview.value.src ?? null
          })
        });
        e.target.reset();
        userAdded.value.textContent = 'User added';

        setTimeout(() => {
          newUser.value = '';
          userAdded.value.textContent = '';
          preview.value.src ? preview.value.removeAttribute('src') : '';
        }, 1000);
      } else {
        alert('No user added!');
      }
    };

    const createBase64Image = fileObject => {
      const reader = new FileReader();
      reader.addEventListener('load', e => (preview.value.src = e.target.result));
      reader.readAsDataURL(fileObject);
    };

    const uploadFile = e => createBase64Image(e.target.files[0]);

    onMounted(() => (startShufflerButton = document.querySelector('.shuffler-ready')));

    return { newUser, addNewUser, uploadFile, userAdded, preview };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/buttons', '../scss/users';
</style>
