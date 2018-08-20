const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const shortMonths = months.map(item => item === "September" ? item.substring(0, 4) : item.substring(0, 3));

export const getIndexFormat = (dateString) => {
  return `${shortMonths[parseInt(dateString.split("-")[0]) - 1]} ${parseInt(dateString.split("-")[1]).toString()}`
};
