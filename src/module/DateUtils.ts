import {DateTime} from 'luxon';

function addOrdinalSuffix(day: number) {
  if (day > 3 && day < 21) {
    return day + 'th';
  }
  switch (day % 10) {
    case 1:
      return day + 'st';
    case 2:
      return day + 'nd';
    case 3:
      return day + 'rd';
    default:
      return day + 'th';
  }
}

export const DateUtils = {
  format: (millis: any, format: string = 'd LLL, HH:mm') => {
    const inputDate = DateTime.fromMillis(parseInt(millis));
    const currentYear = DateTime.now().year;
    let newFormat = format;

    let dayWithSuffix = '';
    if (format.startsWith('d LLL')) {
      newFormat = format.replace('d', '');
      dayWithSuffix = addOrdinalSuffix(inputDate.day);
    }

    if (inputDate.year === currentYear) {
      return dayWithSuffix + inputDate.toFormat(newFormat);
    } else {
      return inputDate.toFormat('d LLL yyyy');
    }
  },

  isInCurrentMonthAndYear: (millis: any) => {
    const date = new Date(parseInt(millis));
    const now = new Date();

    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth()
    );
  },
};
