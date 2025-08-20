export const formatDate = (isoString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(isoString).toLocaleString("en-US", options);
};
