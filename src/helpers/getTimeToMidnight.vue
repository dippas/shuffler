<script>
const getTimeToMidnight = () => {
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const today = new Date();
  const timeToMidnight = midnight - today;

  return timeToMidnight;
};

export { getTimeToMidnight };
</script>
