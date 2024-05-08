import {DateTime} from 'luxon';

export const DateUtils = {
  format: (millis: any, format = DateTime.DATETIME_MED) => {
    const dt = DateTime.fromMillis(parseInt(millis));
    return dt.toLocaleString(format);
  },
};
