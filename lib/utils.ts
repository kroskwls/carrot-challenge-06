export const getFormattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

export const getFormattedDateTime = (date: Date) => {
  const formattedDate = getFormattedDate(date);
  const hours = date.getHours();
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const minutes = date.getMinutes();
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const today = getFormattedDate(new Date());

  return today === formattedDate
    ? `${formattedHours}:${formattedMinutes}`
    : `${formattedDate} ${formattedHours}:${formattedMinutes}`;
};
