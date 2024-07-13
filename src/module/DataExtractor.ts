import {tags} from './tags';

export class DataExtractor {
  _numberRegex = /([\d\,?]+\.?\d{0,2})/gi;
  _text: string = '';
  _amountRegex: RegExp = new RegExp('');

  constructor(text: string) {
    this._text = text;
  }
  findFirstMatch = (regex: RegExp, matchedIndex = 0) => {
    return this._text.match(regex)?.[matchedIndex];
  };

  getAmount(bankAccount: string) {
    // [^A-Za-z0-9\s] is to allow only special character like Rs: 45.00, Rs- 46.00
    const rsRegex = /(?:Rs|INR)\s*[^A-Za-z0-9\s]{0,1}\s*/gi;
    const alternateAmountRegex = /([\d\,?]+\.\d{1,2})/gi;

    this._amountRegex = new RegExp(
      rsRegex.source + this._numberRegex.source,
      rsRegex.flags,
    );
    let amountDisplay = this.findFirstMatch(this._amountRegex);
    let amount = amountDisplay?.replace(rsRegex, '').replace(/\,/g, '');

    if (!amount && bankAccount) {
      amount = this.findFirstMatch(alternateAmountRegex);
      amountDisplay = amount;
    }
    if (amount?.endsWith('.')) {
      amount = amount.split('.')[0];
    }
    return {amount, amountDisplay, alternateAmountRegex};
  }
  getBankName() {
    let bankRegex = /([A-Z]+(?:\s+[A-Z]+)*|[A-Z][a-z]+)\s(Bank|BANK)/g;
    let bankName = this.findFirstMatch(bankRegex);

    if (!bankName) {
      bankRegex =
        /(([A-Za-z]+)\s*(?:debit card|credit card)\s*(?:bank))|(?:(?:-\s*)(\w+\s*(bank)?))$/gi;
      bankName = this.findFirstMatch(bankRegex);
    }
    return bankName;
  }
  getAvailableBalance() {
    const availableBalanceTextRegex =
      /((available|avl|new|avail)\.?\s*(balance|bal)\.?\s*(is)?(\:)?\s*)/gi;
    const availableBalanceRegex = new RegExp(
      availableBalanceTextRegex.source + this._amountRegex.source,
      this._amountRegex.flags,
    );
    let availableBalanceDisplay = this.findFirstMatch(availableBalanceRegex);
    let availableBalance = availableBalanceDisplay
      ?.match(this._numberRegex)?.[0]
      ?.replace(/\,/g, '');

    if (availableBalance?.endsWith('.')) {
      availableBalance = availableBalance.split('.')[0];
    }
    return availableBalance;
  }

  getType(availableBalance: any) {
    let isDebited = false;
    let isCredited = false;
    isDebited = tags.Debit.keywords.some(keyword =>
      this._text.toLowerCase().includes(keyword.toLowerCase()),
    );
    isCredited = tags.Credit.keywords.some(keyword =>
      this._text.toLowerCase().includes(keyword.toLowerCase()),
    );

    let type = isDebited ? 'Debit' : isCredited ? 'Credit' : undefined;
    if (!isDebited && !isCredited && availableBalance) {
      type = 'Balance';
    }

    return type;
  }
  getSenderName() {
    //   TODO name change
    const senderUpiRegex = /[\d\w\.\-]+\@([a-z]+)/g;
    let senderUpi = this.findFirstMatch(senderUpiRegex);

    if (!senderUpi) {
      const mfRegex = /(?<=towards\s)([^\s]+)/g;
      senderUpi = this.findFirstMatch(mfRegex);
    }
    if (!senderUpi) {
      // lookbehind and lookahead to just include the in-between text
      const alternateSenderRegex =
        //   /(?<=\sto\syour\s(account|a\/c))(.*?)(?=\s(Ref|on))/gi;
        [
          /(?<=from\sbeneficiary\s)(.*?)(?=\s(?=ACC|UTR|Ref|on))/gi,
          /(?<=\sto\syour\s)(.*?)(?=\s(?=via|Ref|on))/gi,
          /(?<=\sto\s)(.*?)(?=\s(?=via|Ref|on))/gi,
          // /(?<=from\sbeneficiary\s|\sto\syour\s|to\s)(.*?)(?=\s(?=ACC|Ref|on|))/gi,
        ];
      alternateSenderRegex.forEach(regex => {
        if (senderUpi) {
          return;
        }
        senderUpi = this.findFirstMatch(regex)
          ?.replace(/your (account|ac\.?|a\/c)/i, '')
          ?.trim();
      });
    }
    return senderUpi;
  }

  getAccount() {
    const accountWordRegex = /((account|a\/c|AC)(\s*no.)?)\s*/gi;
    const accountNumberRegex = /[\*|x]+\d+/gi;
    const bankAccountRegex = new RegExp(
      accountWordRegex.source + accountNumberRegex.source,
      accountWordRegex.flags,
    );
    const bankAccount = this.findFirstMatch(bankAccountRegex)
      ?.split(accountWordRegex)
      ?.pop();

    return bankAccount;
  }
}
