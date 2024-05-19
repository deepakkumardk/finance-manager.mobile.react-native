import {DataExtractor} from './DataExtractor';
import {FinanceDataProps} from '../types';

export const financeFeatureExtractor = (text: string) => {
  const extractor = new DataExtractor(text);
  //
  // [^A-Za-z0-9\s] is to allow only special character like Rs: 45.00, Rs- 46.00
  //   const rsRegex = /(?:Rs|INR)\s*[^A-Za-z0-9\s]{0,1}\s*/gi;
  //   const numberRegex = /([\d\,?]+\.?\d{0,2})/gi;
  //   const alternateAmountRegex = /([\d\,?]+\.\d{1,2})/gi;

  //   const amountRegex = new RegExp(
  //     rsRegex.source + numberRegex.source,
  //     rsRegex.flags,
  //   );
  //   let amountDisplay = findFirstMatch(amountRegex);
  //   let amount = amountDisplay?.replace(rsRegex, '').replace(/\,/g, '');
  //
  let bankAccount = extractor.getAccount();

  let {amount, amountDisplay} = extractor.getAmount(bankAccount ?? '');
  //

  //   let bankRegex = /([A-Z]+(?:\s+[A-Z]+)*|[A-Z][a-z]+)\s(Bank|BANK)/g;
  //   let bankName = findFirstMatch(bankRegex);

  //   if (!bankName) {
  //     bankRegex =
  //       /(([A-Za-z]+)\s*(?:debit card|credit card)\s*(?:bank))|(?:(?:-\s*)(\w+\s*(bank)?))$/gi;
  //     bankName = findFirstMatch(bankRegex);
  //   }
  //
  let bankName = extractor.getBankName();

  //
  //   const availableBalanceTextRegex =
  //     /((available|avl|new|avail)\.?\s*(balance|bal)\.?\s*(is)?(\:)?\s*)/gi;
  //   const availableBalanceRegex = new RegExp(
  //     availableBalanceTextRegex.source + amountRegex.source,
  //     amountRegex.flags,
  //   );
  //   let availableBalanceDisplay = findFirstMatch(availableBalanceRegex);
  //   let availableBalance = availableBalanceDisplay
  //     ?.match(numberRegex)?.[0]
  //     ?.replace(/\,/g, '');
  //
  let availableBalance = extractor.getAvailableBalance();
  //
  //   let isDebited = false;
  //   let isCredited = false;
  //   isDebited = tags.Debit.keywords.some(keyword =>
  //     text.toLowerCase().includes(keyword.toLowerCase()),
  //   );
  //   isCredited = tags.Credit.keywords.some(keyword =>
  //     text.toLowerCase().includes(keyword.toLowerCase()),
  //   );

  //   let type = isDebited ? 'Debit' : isCredited ? 'Credit' : undefined;
  //   if (!isDebited && !isCredited && availableBalance) {
  //     type = 'Balance';
  //   }
  //
  let type = extractor.getType(availableBalance);
  //

  //   TODO name change
  //   const senderUpiRegex = /[\d\w\.]+\@([a-z]+)/g;
  //   let senderUpi = findFirstMatch(senderUpiRegex);
  //   // lookbehind and lookahead to just include the in-between text
  //   const alternateSenderRegex =
  //     /(?<=\sto\syour\s(account|a\/c))(.*?)(?=\s(Ref|on))/gi;
  //   if (!senderUpi) {
  //     senderUpi = findFirstMatch(alternateSenderRegex)?.trim();
  //   }
  //
  let senderUpi = extractor.getSenderName();
  //
  //   const accountWordRegex = /((account|a\/c|AC)(\s*no.)?)\s*/gi;
  //   const accountNumberRegex = /[\*|x]+\d+/gi;
  //   const bankAccountRegex = new RegExp(
  //     accountWordRegex.source + accountNumberRegex.source,
  //     accountWordRegex.flags,
  //   );
  //   const bankAccount = findFirstMatch(bankAccountRegex)
  //     ?.split(accountWordRegex)
  //     ?.pop();
  //
  //   let bankAccount = extractor.getAccount();

  //
  let fullBankName = bankName || senderUpi?.split('@')?.[1];

  if (fullBankName && !fullBankName?.endsWith('Bank')) {
    fullBankName += ' Bank';
    fullBankName = fullBankName.replace('-', '').trim();
  }
  //

  // ----

  // ----

  return {
    amountDisplay,
    amount,
    availableBalance,
    bankName: fullBankName,
    account: bankAccount,
    senderUpi,
    type,
  } as FinanceDataProps;
};
