import {AccountDataInfo, KeywordData} from '../types';
import {DateUtils} from './DateUtils';
import {tags} from './tags';

export function orderByAccount(tagsData: typeof tags) {
  const accountWiseSmsData: {
    [account: string]: AccountDataInfo;
  } = {};

  [...tagsData.Debit.data, ...tagsData.Credit.data, ...tagsData.Balance.data]
    .sort((a, b) => {
      const date1 = a.rawSms.date;
      const date2 = b.rawSms.date;
      if (date1 < date2) {
        return -1;
      }
      if (date1 > date2) {
        return 1;
      }
      return 0;
    })
    .forEach(item => {
      const accountNumber = item.extractedData.account;
      if (!accountNumber) {
        return;
      }
      const lastChars = accountNumber.substring(accountNumber.length - 4);

      let formattedAccount = 'X'.repeat(7) + lastChars;

      const sameAccountKey = Object.keys(accountWiseSmsData).find(
        key =>
          key.substring(key.length - 3) ===
          lastChars.substring(lastChars.length - 3),
      );
      if (sameAccountKey) {
        formattedAccount = sameAccountKey;
      }
      let accountData: AccountDataInfo = accountWiseSmsData[
        formattedAccount
      ] as AccountDataInfo;

      if (!Object.hasOwn(accountWiseSmsData, formattedAccount)) {
        console.log(
          '.forEach -> formattedAccount',
          accountNumber,
          formattedAccount,
        );
        accountData = {
          list: [],
          bankName: '',
          availableBalance: 0,
          lastReportedBalance: 0,
        };
      }
      if (!accountData.bankName) {
        accountData.bankName = item.extractedData.bankName;
      }

      if (
        item.extractedData.availableBalance ||
        item.extractedData.type === 'Balance'
      ) {
        accountData.availableBalance = accountData.lastReportedBalance = Number(
          item.extractedData.availableBalance,
        );
      } else if (item.extractedData.type === 'Debit') {
        // @ts-ignore
        accountData.availableBalance -= Number(item.extractedData.amount);
      } else if (item.extractedData.type === 'Credit') {
        // @ts-ignore
        accountData.availableBalance += Number(item.extractedData.amount);
      }

      accountData.list = [
        ...accountData.list,
        {
          date_debug: DateUtils.format(item.rawSms.date),
          date_display: DateUtils.format(item.rawSms.date, 'd LLL, HH:mm'),
          text_debug: item.rawSms.body,
          rawSms: item.rawSms,
          extractedData: item.extractedData,
        } as KeywordData,
      ];

      accountWiseSmsData[formattedAccount] = accountData;
    });

  const accountSummary = Object.keys(accountWiseSmsData).map(key => {
    console.log(
      'orderByAccount -> accountData',
      accountWiseSmsData[key].list.length,
    );
    let availableBalance = parseInt(accountWiseSmsData[key].availableBalance);

    return {
      account: key,
      list: accountWiseSmsData[key].list,
      bankName: accountWiseSmsData[key].bankName,
      availableBalance,
      availableBalanceDisplay: availableBalance?.toLocaleString(),
      lastReportedBalance: accountWiseSmsData[key].lastReportedBalance,
    };
  });

  return {accountSummary, accountWiseSmsData};
}
