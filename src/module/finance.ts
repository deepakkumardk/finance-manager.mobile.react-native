import {DateUtils} from 'src/module/DateUtils';
import {AccountDataInfo, BankDataInfo, KeywordData} from '../types';

export const formatNumber = (num: any) => {
  return parseInt(num).toLocaleString();
};

export function orderByAccount(bankWiseSmsData: BankDataInfo) {
  const accountWiseSmsData: {
    [account: string]: AccountDataInfo;
  } = {};

  Object.entries(bankWiseSmsData).forEach(([_, bankDataItem]) => {
    bankDataItem?.list
      ?.sort((a, b) => {
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
      .forEach((item: KeywordData) => {
        // Start of Find formatted account name
        const accountNumber = item.extractedData.account;
        // TODO
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
        // End of Find formatted account name

        let accountData: AccountDataInfo = accountWiseSmsData[
          formattedAccount
        ] as AccountDataInfo;

        if (!Object.hasOwn(accountWiseSmsData, formattedAccount)) {
          accountData = {
            list: [],
            bankName: '',
            account: formattedAccount,
            fullBankName: bankDataItem.fullBankName,
            availableBalance: 0,
            lastReportedBalance: 0,
            currentMonthIn: 0,
            currentMonthExpense: 0,
          };
        }
        if (!accountData.bankName) {
          accountData.bankName = item.extractedData.bankName;
        }

        const isCurrentMonth = DateUtils.isInCurrentMonthAndYear(
          item.rawSms.date,
        );

        // Start of calculate availableBalance
        if (
          item.extractedData.availableBalance ||
          item.extractedData.type === 'Balance'
        ) {
          accountData.availableBalance = accountData.lastReportedBalance =
            Number(item.extractedData.availableBalance);
        } else if (item.extractedData.type === 'Debit') {
          // @ts-ignore
          accountData.availableBalance -= Number(item.extractedData.amount);

          if (isCurrentMonth) {
            // @ts-ignore
            accountData.currentMonthExpense += Number(
              item.extractedData.amount,
            );
          }
        } else if (item.extractedData.type === 'Credit') {
          // @ts-ignore
          accountData.availableBalance += Number(item.extractedData.amount);

          if (isCurrentMonth) {
            // @ts-ignore
            accountData.currentMonthIn += Number(item.extractedData.amount);
          }
        }
        // End of calculate availableBalance

        accountData.list = [...accountData.list, item];

        accountWiseSmsData[formattedAccount] = accountData;
      });
  });

  let allTransactions: KeywordData[] = [];

  let allAccountBalance = 0;
  let allAccountCurrentMonthIn = 0;
  let allAccountCurrentMonthExpense = 0;

  const accountSummary = Object.entries(accountWiseSmsData).map(
    ([_, accountData]) => {
      allAccountBalance +=
        // @ts-ignore
        accountData.availableBalance > 0
          ? accountData.availableBalance
          : accountData.lastReportedBalance;

      allAccountCurrentMonthIn += accountData.currentMonthIn || 0;
      allAccountCurrentMonthExpense += accountData.currentMonthExpense || 0;

      const sortedList = accountData.list?.sort((a, b) => {
        const date1 = a.rawSms.date;
        const date2 = b.rawSms.date;
        if (date1 < date2) {
          return 1;
        }
        if (date1 > date2) {
          return -1;
        }
        return 0;
      });
      allTransactions = allTransactions.concat(sortedList);

      return {
        ...accountData,
        list: sortedList,
      };
    },
  );

  // Insert the All Accounts at first index
  accountSummary.splice(0, 0, {
    list: [],
    availableBalance: allAccountBalance,
    bankName: 'All Accounts',
    fullBankName: 'All Accounts',
    currentMonthIn: allAccountCurrentMonthIn,
    currentMonthExpense: allAccountCurrentMonthExpense,
  });

  return {accountSummary, allTransactions};
}
