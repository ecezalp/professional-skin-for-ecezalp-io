const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const shortMonths = months.map(item => item === "September" ? item.substring(0, 4) : item.substring(0, 3));

export const dateArray = (dateString) => dateString.split("-").map(date => parseInt(date));

export const getIndexFormat = dateString => {
  const dates = dateArray(dateString);
  return `${shortMonths[dates[0] - 1]} ${dates[1].toString()}`
};

export const getEntryFormat = dateString => {
  const dates = dateArray(dateString);
  return dates.length === 3 && `${shortMonths[dates[0] - 1]} ${dates[1].toString()}, ${dates[2]}`;
};