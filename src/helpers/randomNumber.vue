<script>
const MIN_ROUNDS = 5;
const MAX_ROUNDS = 10;

const generateRandomRounds = () => Math.floor(Math.random() * (MAX_ROUNDS - MIN_ROUNDS + 1)) + MIN_ROUNDS;

export { generateRandomRounds };
</script>
