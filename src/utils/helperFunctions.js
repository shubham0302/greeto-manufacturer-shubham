export const formattedDuration = (duration) => {
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((duration % (1000 * 60)) / 1000);

  let formattedDuration = "";
  if (days > 0) {
    formattedDuration += `${days} days `;
  }
  if (hours > 0 || days > 0) {
    formattedDuration += `${hours} hours `;
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    formattedDuration += `${minutes} minutes `;
  }
  return (formattedDuration += `${seconds} seconds`);
};
