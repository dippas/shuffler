<script>
import { onMounted, reactive } from 'vue';

const useUsers = () => {
  const members = reactive([]);

  const fetchUsers = async () => {
    const response = await fetch('http://localhost:7000/members');
    const data = await response.json();
    const tempMembers = [];

    for (const id in data) {
      tempMembers.push({
        id: id,
        name: data[id].name,
        photo:
          data[id]?.photo ??
          `https://eu.ui-avatars.com/api/?background=random&name=${data[id].name}`,
        isWorking: data[id].isWorking
      });
    }
    tempMembers.sort((a, b) => a.name.localeCompare(b.name));
    members.splice(0, members.length, ...tempMembers);

    return members;
  };

  onMounted(() => {
    fetchUsers();
  });

  return { members, fetchUsers };
};

export { useUsers };
</script>
