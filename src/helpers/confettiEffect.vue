<script>
	import confetti from 'canvas-confetti'

	export const confettiEffect = () => {
		const effect = {
			fireEffect(particleRatio, options) {
				const count = 200,
					defaults = {origin: { y: .7 }}

				confetti(Object.assign({}, defaults, options, {particleCount: Math.floor(count * particleRatio)}))
			}
		}

		effect.fireEffect(.25, {spread: 26, startVelocity: 55})
		effect.fireEffect(.2, {spread: 60})
		effect.fireEffect(.35, {spread: 100, decay: .91, scalar: .8})
		effect.fireEffect(.1, {spread: 120,	startVelocity: 25, decay: .92,	scalar: 1.2})
		effect.fireEffect(.1, {spread: 120, startVelocity: 45})
	}
</script>