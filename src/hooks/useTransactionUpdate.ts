import {useSmsData} from 'src/context';
import {AccountDataInfo, KeywordData} from 'src/types';

/**
 * Handles the updation of context data whenever user updates the transaction userData
 */
export const useTransactionUpdate = () => {
  const {setAllTransactions, setAccountSummaryList} = useSmsData();

  const onSubmit = (
    data: KeywordData,
    {
      account,
      bankName,
    }: {
      account?: string;
      bankName?: string;
    },
  ) => {
    // @ts-ignore
    setAllTransactions((prev: KeywordData[]) => {
      const prevList = [...prev];
      const index = prevList.findIndex(
        item => item.rawSms.date === data.rawSms.date,
      );
      console.log('setAllTransactions -> index', index);
      prevList[index].userData = data.userData;
      return prevList;
    });
    // @ts-ignore
    setAccountSummaryList((prev: AccountDataInfo[]) => {
      const newSummaryList = [...prev];
      console.log('setAccountSummaryList -> account', account, bankName);
      const index = newSummaryList.findIndex((item: AccountDataInfo) => {
        return (
          account &&
          item.account.endsWith(account) &&
          item.bankName === bankName
        );
      });
      console.log('setAccountSummaryList -> index', index);
      const transactionIndex = newSummaryList[index]?.list.findIndex(
        (item: KeywordData) => item.rawSms.date === data.rawSms.date,
      );
      console.log(
        'setAccountSummaryList -> transactionIndex',
        transactionIndex,
      );
      if (transactionIndex !== -1 && index !== -1) {
        newSummaryList[index].list[transactionIndex].userData = data.userData;
      }
      return newSummaryList;
    });
  };

  return {onSubmit};
};
