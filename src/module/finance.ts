import {DateUtils} from 'src/module';
import {APP_STRINGS} from 'src/constants';

import {AccountDataInfo, BankDataInfo, KeywordData} from '../types';
import {ListUtils} from 'src/utils';

const getAccountWiseSmsData = (bankWiseSmsData: BankDataInfo) => {
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
            reportedDateDisplay: '',
          };
        }
        if (!accountData.bankName) {
          // @ts-ignore
          accountData.bankName = item.extractedData.bankName;
        }

        const isCurrentMonth = DateUtils.isInCurrentMonthAndYear(
          item.rawSms.date,
        );

        // Start of calculate availableBalance
        if (item.extractedData.type === 'Debit') {
          accountData.availableBalance -= Number(item.extractedData.amount);

          if (accountData.availableBalance > 0) {
            accountData.reportedDateDisplay = item.rawSms.date;
          }

          if (isCurrentMonth) {
            accountData.currentMonthExpense += Number(
              item.extractedData.amount,
            );
          }
        } else if (item.extractedData.type === 'Credit') {
          accountData.availableBalance += Number(item.extractedData.amount);

          if (accountData.availableBalance > 0) {
            accountData.reportedDateDisplay = item.rawSms.date;
          }

          if (isCurrentMonth) {
            accountData.currentMonthIn += Number(item.extractedData.amount);
          }
        }
        // Balance can also come in the debit/credit type messages
        if (
          item.extractedData.availableBalance ||
          item.extractedData.type === 'Balance'
        ) {
          accountData.availableBalance = accountData.lastReportedBalance =
            Number(item.extractedData.availableBalance);
          accountData.reportedDateDisplay = item.rawSms.date;
        }
        // End of calculate availableBalance

        accountData.reportedDateDisplay = DateUtils.format(
          accountData.reportedDateDisplay,
          'd LLL',
        );
        accountData.list = [...accountData.list, item];

        accountWiseSmsData[formattedAccount] = accountData;
      });
  });

  return accountWiseSmsData;
};

export function orderByAccount(bankWiseSmsData: BankDataInfo) {
  const accountWiseSmsData = getAccountWiseSmsData(bankWiseSmsData);

  let allTransactions: KeywordData[] = [];

  const allAccountSummaryData: AccountDataInfo = {
    list: [],
    account: '',
    bankName: APP_STRINGS.ALL_ACCOUNTS,
    fullBankName: APP_STRINGS.ALL_ACCOUNTS,
    availableBalance: 0,
    currentMonthIn: 0,
    currentMonthExpense: 0,
    lastReportedBalance: 0,
    reportedDateDisplay: '',
  };

  const firstItemsList: KeywordData[] = [];

  const accountSummary = Object.entries(accountWiseSmsData).map(
    ([_, accountData]) => {
      allAccountSummaryData.availableBalance +=
        accountData.availableBalance > 0
          ? accountData.availableBalance
          : accountData.lastReportedBalance;

      allAccountSummaryData.currentMonthIn += accountData.currentMonthIn;
      allAccountSummaryData.currentMonthExpense +=
        accountData.currentMonthExpense;

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

      firstItemsList.push(sortedList?.[0]);

      return {
        ...accountData,
        list: sortedList,
      };
    },
  );

  allAccountSummaryData.reportedDateDisplay = DateUtils.format(
    ListUtils.sortByDate(firstItemsList)?.[0].rawSms.date,
    'd LLL',
  );

  // Insert the All Accounts at first index
  accountSummary.splice(0, 0, allAccountSummaryData);

  return {accountSummary, allTransactions};
}
