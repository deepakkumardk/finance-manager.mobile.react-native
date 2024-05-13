import {DateTime} from 'luxon';

export const DateUtils = {
  format: (millis: any, format: string = DateTime.DATETIME_MED) => {
    const dt = DateTime.fromMillis(parseInt(millis));
    return dt.toFormat(format);
  },
};
