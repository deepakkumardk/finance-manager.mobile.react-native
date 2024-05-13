import {NativeModules} from 'react-native';
import {default as smsSenders} from './smsSenders.json';
import {financeFeatureExtractor, getTransformedSmsList} from './transformer';
import {orderByAccount} from './finance';
import {default as dataDD} from './dataDD.json';
import {SMSData} from './SMSData';
import {DateUtils} from 'src/module/DateUtils';
import {KeywordData} from 'src/types';

const {SmsModule: RNSmsModule} = NativeModules;

const sendersCodeList = Object.keys(smsSenders);

export const getBankNameCodeMap = () => {
  const bankNameCodeMap: any = {};
  Object.entries(smsSenders).forEach(([key, value]) => {
    bankNameCodeMap[value] = [...(bankNameCodeMap[value] ?? []), key];
  });
  console.log('Object.entries -> bankNameCodeMap', bankNameCodeMap);
  return bankNameCodeMap;
};

export const SmsModule = {
  getFinanceSms: async () => {
    let smsList: SMSData[] = await RNSmsModule.getAllSms();
    // let smsList: any = dataDD.sms;
    console.log('smsList1', smsList.length);
    smsList = smsList
      .map(item => {
        let newAddress = item.address;
        if (item.address.includes('-')) {
          newAddress = item.address.split('-')?.[1];
        }
        return {
          ...item,
          address: newAddress,
        };
      })
      .filter((item: any) => sendersCodeList.includes(item.address))
      .map(item => ({
        ...item,
        // @ts-ignore
        fullBankName: smsSenders[item.address],
        // @ts-ignore
        date_display: DateUtils.format(item.date, 'd LLL, HH:mm'),
      }));
    console.log('smsList2', smsList.length);

    const bankWiseSmsData: any = {};
    smsList.forEach(sms => {
      const extractedData = financeFeatureExtractor(sms.body);
      const obj =
        extractedData?.type &&
        ({
          date_debug: DateUtils.format(sms.date),
          text_debug: sms.body,
          rawSms: sms,
          extractedData,
        } as KeywordData);
      const prevList = bankWiseSmsData[sms.fullBankName]?.list ?? [];
      bankWiseSmsData[sms.fullBankName] = {
        fullBankName: sms.fullBankName,
        list: obj ? [...prevList, obj] : prevList,
      };
    });
    // console.log('getFinanceSms: -> bankWiseSmsData', bankWiseSmsData);

    // const transformedList = getTransformedSmsList(smsList);
    // const orderedList = orderByAccount(transformedList);
    const orderedList = orderByAccount(bankWiseSmsData);
    console.log('getFinanceSms: -> orderedList', orderedList);

    return orderedList;
  },
};

// iterate through list
// get bank name from sender's address
// extract other's data
// merge all same bank address into a list with object like list,bankName,extractedData
//
