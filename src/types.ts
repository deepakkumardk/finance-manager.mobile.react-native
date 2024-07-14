import {SMSData} from './module';

export type BankDataInfo = {
  [key: string]: AccountDataInfo;
};

export type AccountDataInfo = {
  account: string;
  bankName: string;
  fullBankName: string;
  list: KeywordData[];
  availableBalance: number;
  lastReportedBalance: number;
  currentMonthIn: number;
  currentMonthExpense: number;
  reportedDateDisplay: string;
};

export type KeywordData = {
  text_debug?: string;
  date_debug?: string;
  rawSms: SMSData;
  extractedData: FinanceDataProps;
  userData: {
    category: string;
    icon: string;
    tags: string;
  };
};

export type FinanceDataProps = {
  amountDisplay?: string;
  amount?: number;
  availableBalance?: string;
  bankName?: string;
  account?: string;
  senderUpi?: string;
  type?: 'Debit' | 'Credit' | 'Balance';
};

export type TagsDataProps = {
  [key: string]: {
    keywords: string[];
    data: KeywordData[];
  };
};

export type SmsDataContextProps = {
  accountSummaryList: AccountDataInfo[];
  allTransactions: KeywordData[];
  setAccountSummaryList: (data: AccountDataInfo[]) => void;
  setAllTransactions: (data: KeywordData[]) => void;
};
