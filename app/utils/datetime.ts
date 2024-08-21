
export function formatDate(dateInput: Date) {
  const date = new Date(dateInput);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date input');
  }

  const month = date.toLocaleString('en-US', { month: 'short' }); // 'Oct'
  const day = date.getDate(); // 30
  const daySuffix = getDaySuffix(day); // 'th'
  const year = date.getFullYear(); // 2017

  return `${month} ${day}${daySuffix} ${year}`;
}

function getDaySuffix(day: number) {
  if (day > 3 && day < 21) return 'th'; // Special case for 11th, 12th, 13th
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}