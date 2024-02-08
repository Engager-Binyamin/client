// Description : Formats a date object or string into the format dd/mm/yyyy.
// Creator : yehoshua preiser

export default function formatDate(date) {
  if(!date) return;
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  // Extract individual components

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  // Format the date and time
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

// Example usage:
const currentDate = new Date(); // You can replace this with your specific date
const formattedDate = formatDate(currentDate);
// console.log(formattedDate);
