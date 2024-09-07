import {DateUtils} from './DateUtils';
import {type KeywordData} from '../types';
import {SMSData} from './SMSData';
import {default as smsSenders} from './smsSenders.json';
import {financeFeatureExtractor} from './financeDataExtractor';
import {StringUtils} from './StringUtils';
import {SmsHelper} from 'src/module/SmsHelper';
import {SmsModel} from 'src/workflow/database';

const sendersCodeList = Object.keys(smsSenders);

export const getBankNameCodeMap = () => {
  const bankNameCodeMap: any = {};
  Object.entries(smsSenders).forEach(([key, value]) => {
    bankNameCodeMap[value] = [...(bankNameCodeMap[value] ?? []), key];
  });
  return bankNameCodeMap;
};

let mostUsedTags: string[] = [];

export const getMostUsedTags = (currentTags: string) =>
  mostUsedTags.filter(usedTag => !currentTags.split(',').includes(usedTag));

export const getTransformedSmsList = (
  smsList: SMSData[],
  dbSmsList: SmsModel[],
) => {
  // const categoryList = [];
  // const tagsList = [];
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
    .filter((item: SMSData) => sendersCodeList.includes(item.address))
    .map(item => ({
      ...item,
      // @ts-ignore
      fullBankName: smsSenders[item.address],
      date_display: DateUtils.format(item.date),
    }))
    // .filter(item => item.fullBankName.includes('Kotak'))
    .forEach(sms => {
      const extractedData = financeFeatureExtractor(sms.body);
      const categoryInfo = SmsHelper.findAutoCategory(sms.body);
      const obj =
        extractedData?.type &&
        ({
          date_debug: DateUtils.format(sms.date),
          text_debug: sms.body,
          rawSms: sms,
          extractedData,
          userData: {
            ...dbSmsMap[sms.date],
            tags: dbSmsMap[sms.date]?.tags || SmsHelper.findAutoTags(sms.body),
            category: dbSmsMap[sms.date]?.category || categoryInfo.label,
            icon: dbSmsMap[sms.date]?.icon || categoryInfo.icon,
            color: categoryInfo.color,
          },
        } as KeywordData);

      mostUsedTags.push(obj?.userData?.tags || '');

      const prevList = bankWiseSmsData[sms.fullBankName]?.list ?? [];
      bankWiseSmsData[sms.fullBankName] = {
        fullBankName: sms.fullBankName,
        list: obj ? [...prevList, obj] : prevList,
      };
    });

  mostUsedTags = StringUtils.getTopTags(mostUsedTags, 10);

  return bankWiseSmsData;
};
