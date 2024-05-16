import {KeywordData} from 'src/types';

export const ListUtils = {
  sortByDate: (list: KeywordData[], order: 'ASC' | 'DSC' = 'DSC') => {
    return list?.sort((a, b) => {
      const date1 = a.rawSms.date;
      const date2 = b.rawSms.date;
      if (date1 < date2) {
        return order === 'ASC' ? -1 : 1;
      }
      if (date1 > date2) {
        return order === 'ASC' ? 1 : -1;
      }
      return 0;
    });
  },
};
