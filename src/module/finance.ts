import {AccountDataInfo, BankDataInfo, KeywordData} from '../types';

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
          console.log(
            '.forEach -> formattedAccount',
            accountNumber,
            formattedAccount,
          );
          accountData = {
            list: [],
            bankName: '',
            fullBankName: bankDataItem.fullBankName,
            availableBalance: 0,
            lastReportedBalance: 0,
            account: formattedAccount,
          };
        }
        if (!accountData.bankName) {
          accountData.bankName = item.extractedData.bankName;
        }

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
        } else if (item.extractedData.type === 'Credit') {
          // @ts-ignore
          accountData.availableBalance += Number(item.extractedData.amount);
        }
        // End of calculate availableBalance

        accountData.list = [...accountData.list, item];

        accountWiseSmsData[formattedAccount] = accountData;
      });
  });

  const accountSummary = Object.entries(accountWiseSmsData).map(
    ([_, accountData]) => {
      // @ts-ignore
      let availableBalance = parseInt(accountData.availableBalance);
      // @ts-ignore
      let lastReportedBalance = parseInt(accountData.lastReportedBalance);

      return {
        availableBalanceDisplay: availableBalance?.toLocaleString(),
        lastReportedBalanceDisplay: lastReportedBalance?.toLocaleString(),
        ...accountData,
      };
    },
  );

  return accountSummary;
}
