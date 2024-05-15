import {SMSData} from './module';

export type BankDataInfo = {
  [key: string]: AccountDataInfo;
};

export type AccountDataInfo = {
  account?: string;
  bankName?: string;
  fullBankName?: string;
  list: KeywordData[];
  availableBalance?: number;
  lastReportedBalance?: number;
  currentMonthIn?: number;
  currentMonthExpense?: number;
};

export type KeywordData = {
  text_debug?: string;
  date_debug?: string;
  rawSms: SMSData;
  extractedData: FinanceDataProps;
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
