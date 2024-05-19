import {DateTime} from 'luxon';

export const DateUtils = {
  format: (millis: any, format: string = 'd LLL, HH:mm') => {
    const inputDate = DateTime.fromMillis(parseInt(millis));
    const currentYear = DateTime.now().year;

    if (inputDate.year === currentYear) {
      return inputDate.toFormat(format);
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
