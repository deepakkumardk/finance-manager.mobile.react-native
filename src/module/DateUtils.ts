import {DateTime} from 'luxon';

export const DateUtils = {
  // @ts-ignore
  format: (millis: any, format: string = DateTime.DATETIME_MED) => {
    const dt = DateTime.fromMillis(parseInt(millis));
    return dt.toFormat(format);
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
