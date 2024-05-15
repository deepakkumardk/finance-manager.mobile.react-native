import {NativeModules} from 'react-native';

import {default as smsSenders} from './smsSenders.json';
import {getTransformedSmsList} from './transformer';
import {orderByAccount} from './finance';
import {SMSData} from './SMSData';

const {SmsModule: RNSmsModule} = NativeModules;

const sendersCodeList = Object.keys(smsSenders);

export const getBankNameCodeMap = () => {
  const bankNameCodeMap: any = {};
  Object.entries(smsSenders).forEach(([key, value]) => {
    bankNameCodeMap[value] = [...(bankNameCodeMap[value] ?? []), key];
  });
  return bankNameCodeMap;
};

export const SmsModule = {
  getFinanceSms: async () => {
    const smsList: SMSData[] = await RNSmsModule.getAllSms();

    const bankWiseSmsData = getTransformedSmsList(smsList, sendersCodeList);
    const orderedList = orderByAccount(bankWiseSmsData);

    return orderedList;
  },
};
