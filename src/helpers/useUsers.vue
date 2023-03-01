<script>
import { onMounted, reactive, toRefs } from 'vue';

const useUsers = () => {
  const state = reactive({
    members: [],
    isLoading: true,
    isShufflerVisible: true,
    isUsersVisible: false
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:7000/members');
      const data = await response.json();

      state.members = data.map(({ id, name, photo }) => ({
        id: id,
        name: name,
        photo: photo ?? `https://eu.ui-avatars.com/api/?background=random&name=${name}`,
        isWorking: true
      }));

      state.members.sort((a, b) => a.name.localeCompare(b.name));
      state.isLoading = false;
      state.isShufflerVisible = state.members.length;
      state.isUsersVisible = !state.isShufflerVisible;
    } catch (error) {
      console.error(error);
      alert('Something went wrong, please try again later.');
    }
  };

  onMounted(fetchData);

  return toRefs(state);
};

export { useUsers };
</script>
