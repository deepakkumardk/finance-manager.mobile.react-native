import {SMSData} from './module';

export type FinanceDataProps = {
  amountDisplay?: string;
  amount?: number;
  availableBalance?: string;
  bankName?: string;
  bankAccount?: string;
  senderUpi?: string;
  type?: 'Debit' | 'Credit' | 'Balance';
};

export type KeywordData = {
  text_debug?: string;
  date_debug?: string;
  rawSms: SMSData;
  extractedData: FinanceDataProps;
};

export type TagsDataProps = {
  [key: string]: {
    keywords: string[];
    data: KeywordData[];
  };
};

export type AccountDataInfo = {
  list: KeywordData[];
  bankName?: string;
  currentBalance?: number;
  lastReportedBalance?: number;
};
