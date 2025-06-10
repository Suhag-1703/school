export const timeFormater = (val: string) => {
  const utcDate = new Date(val);

  // Convert to IST (UTC + 5:30)
  const istOffset = 5.5 * 60 * 60 * 1000; // in milliseconds
  const istDate = new Date(utcDate.getTime() + istOffset);

  // Extract hours, minutes, seconds
  const pad = (n: any) => n.toString().padStart(2, '0');
  const hours = pad(istDate.getHours());
  const minutes = pad(istDate.getMinutes());
  const seconds = pad(istDate.getSeconds());

  const formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export const dateFormater = (val: string | Date): string => {
  const dateObj = new Date(val);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  return `${day}-${month}-${year}`;
};
