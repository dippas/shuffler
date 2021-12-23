<script>
	import { onMounted, reactive } from 'vue'

	export const users = () => {

		const members = reactive([])
		let shufflerContainer,
			shufflerReady,
			usersContainer

		fetch('http://localhost:7000/members')
			.then(response => response.json())
			.then(data => {
				shufflerReady.style.display = 'none'
				shufflerContainer.style.display = data.length ? 'block' : 'none'
				usersContainer.style.display = data.length ? 'none' : 'block'
				
				const users = data 

				for (const id in users) {

					members.push({
						id: id,
						name: users[id].name,
						photo: users[id]?.photo ?? `https://eu.ui-avatars.com/api/?background=random&name=${users[id].name}`,
						isWorking: true
					})

					members.sort((a, b) => a.name.localeCompare(b.name))
				}
			})

		onMounted(() => {
			shufflerReady = document.querySelector('.shuffler-ready')
			shufflerContainer = document.querySelector('.shuffler')
			usersContainer = document.querySelector('.users')
		})	

		return members
	}
</script>