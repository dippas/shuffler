<script>
	export const newDay = () => {
		const midnight = new Date()
			midnight.setUTCHours(24, 0, 0, 0)

		const today = new Date(),
			timeToMidnight = midnight - today

		return timeToMidnight
	}
</script>