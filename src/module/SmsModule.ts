import {NativeModules} from 'react-native';
import {default as smsSenders} from './smsSenders.json';
import {getTransformedSmsList} from './transformer';
import {orderByAccount} from './finance';
import {default as dataDD} from './dataDD.json';

const {SmsModule: RNSmsModule} = NativeModules;

const sendersCode = Object.keys(smsSenders);

export const SmsModule = {
  getFinanceSms: async () => {
    // let smsList = await RNSmsModule.getAllSms(sendersCode);
    let smsList: any = dataDD.sms;
    console.log('smsList1', smsList.length);
    smsList = smsList.filter((item: any) => {
      if (item.address.includes('-')) {
        return sendersCode.includes(item.address.split('-')?.[1]);
      }
      return sendersCode.includes(item.address);
    });

    const transformedList = getTransformedSmsList(smsList);
    const orderedList = orderByAccount(transformedList);

    return orderedList;
  },
};
