import {NativeModules} from 'react-native';

import {getTransformedSmsList} from './transformer';
import {orderByAccount} from './finance';
import {SMSData} from './SMSData';

const {SmsModule: RNSmsModule} = NativeModules;

export const SmsModule = {
  getFinanceSms: async (dbSmsList: any) => {
    const smsList: SMSData[] = await RNSmsModule.getAllSms();

    const bankWiseSmsData = getTransformedSmsList(smsList, dbSmsList);
    const orderedList = orderByAccount(bankWiseSmsData);

    return orderedList;
  },
};
