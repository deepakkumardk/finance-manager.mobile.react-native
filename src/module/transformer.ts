import {DateUtils} from './DateUtils';
import {type KeywordData} from '../types';
import {SMSData} from './SMSData';
import {default as smsSenders} from './smsSenders.json';
import {financeFeatureExtractor} from './financeDataExtractor';

export const getTransformedSmsList = (
  smsList: SMSData[],
  sendersCodeList: string[],
) => {
  const bankWiseSmsData: any = {};
  smsList
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
    .filter(
      (item: any) => sendersCodeList.includes(item.address),
      // DEV conditions to debug only
      //  (__DEV__ && item.address.includes('IDFC')),
    )
    .map(item => ({
      ...item,
      // @ts-ignore
      fullBankName: smsSenders[item.address],
      // @ts-ignore
      date_display: DateUtils.format(item.date),
    }))
    .forEach(sms => {
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

  return bankWiseSmsData;
};
