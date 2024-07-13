import {DateUtils} from './DateUtils';
import {type KeywordData} from '../types';
import {SMSData} from './SMSData';
import {default as smsSenders} from './smsSenders.json';
import {financeFeatureExtractor} from './financeDataExtractor';

const sendersCodeList = Object.keys(smsSenders);

export const getBankNameCodeMap = () => {
  const bankNameCodeMap: any = {};
  Object.entries(smsSenders).forEach(([key, value]) => {
    bankNameCodeMap[value] = [...(bankNameCodeMap[value] ?? []), key];
  });
  return bankNameCodeMap;
};

export const getTransformedSmsList = (smsList: SMSData[], dbSmsList: any[]) => {
  const dbSmsMap: any = {};
  dbSmsList.forEach(dbItem => {
    dbSmsMap[dbItem.date] = dbItem;
  });

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
      // __DEV__ &&
      // // @ts-ignore
      // smsSenders[item.address].includes('Kotak'),
    )
    .map(item => ({
      ...item,
      // @ts-ignore
      fullBankName: smsSenders[item.address],
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
          userData: {
            ...dbSmsMap[sms.date],
            category: dbSmsMap[sms.date]?.category || 'Misc',
          },
        } as KeywordData);
      const prevList = bankWiseSmsData[sms.fullBankName]?.list ?? [];
      bankWiseSmsData[sms.fullBankName] = {
        fullBankName: sms.fullBankName,
        list: obj ? [...prevList, obj] : prevList,
      };
    });

  return bankWiseSmsData;
};
