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
        <label class="users__avatar button button--turquoise" for="uploadFile">
          <span class="users__icon"></span>Upload Avatar
        </label>
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
    const newUser = ref(null);
    const userAdded = ref(null);
    const startShufflerButton = ref(null);
    const preview = ref(null);

    const addNewUser = async e => {
      if (newUser.value) {
        startShufflerButton.value.style.display = 'block';

        try {
          const response = await fetch('http://localhost:7000/members', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: newUser.value,
              photo: preview.value.src ?? null
            })
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          e.target.reset();
          userAdded.value.textContent = 'User added';

          setTimeout(() => {
            newUser.value = '';
            userAdded.value.textContent = '';
            preview.value.src ? preview.value.removeAttribute('src') : '';
          }, 1000);
        } catch (error) {
          console.error('Error:', error);
        }
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

    onMounted(() => (startShufflerButton.value = document.querySelector('.shuffler-ready')));

    return { newUser, preview, userAdded, addNewUser, uploadFile };
  }
};
</script>

<style lang="scss" scoped>
@import '../scss/buttons';
@import '../scss/users';
</style>
