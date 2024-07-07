import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useSmsModel} from 'src/hooks';
import {SmsModule} from 'src/module';
import {AccountDataInfo, KeywordData, SmsDataContextProps} from 'src/types';
import {PermissionUtils} from 'src/utils';

const defaultValue: SmsDataContextProps = {
  accountSummaryList: [],
  allTransactions: [],

  setAccountSummaryList: () => {},
  setAllTransactions: () => {},
};
export const SmsDataContext = createContext(defaultValue);

export const SmsDataProvider = ({children}: PropsWithChildren) => {
  const [accountSummary, setAccountSummaryList] = useState<AccountDataInfo[]>(
    [],
  );
  const [allTransactions, setAllTransactions] = useState<KeywordData[]>([]);

  const {smsList: dbSmsList} = useSmsModel();

  const smsActions: SmsDataContextProps = {
    accountSummaryList: accountSummary,
    setAccountSummaryList: setAccountSummaryList,
    allTransactions,
    setAllTransactions,
  };

  const initData = async () => {
    const isGranted = await PermissionUtils.requestPermission();
    if (!isGranted) {
      // setIsLoading(false);
      console.warn('initData -> isGranted', isGranted);
      return;
    }
    const res = await SmsModule.getFinanceSms(dbSmsList);
    setAccountSummaryList(res.accountSummary);
    setAllTransactions(res.allTransactions);
    // setIsLoading(false);
    console.log('initData -> res.allTransactions', res.allTransactions.length);
  };

  useEffect(() => {
    initData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SmsDataContext.Provider value={smsActions}>
      {children}
    </SmsDataContext.Provider>
  );
};

export const useSmsData = () => useContext(SmsDataContext);
