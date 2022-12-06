<script>
import confetti from 'canvas-confetti';

const confettiEffect = () => {
  const effect = {
    fireEffect(particleRatio, options) {
      const count = 200,
        defaults = { origin: { y: 0.7 } };

      confetti(
        Object.assign({}, defaults, options, { particleCount: Math.floor(count * particleRatio) })
      );
    }
  };

  effect.fireEffect(0.25, { spread: 26, startVelocity: 55 });
  effect.fireEffect(0.2, { spread: 60 });
  effect.fireEffect(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  effect.fireEffect(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  effect.fireEffect(0.1, { spread: 120, startVelocity: 45 });
};

export { confettiEffect };
</script>
