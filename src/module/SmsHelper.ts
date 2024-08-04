import {AppSingletons, TRANSACTION_CATEGORY} from 'src/constants';
import {CategoryProps} from 'src/types';

export const SmsHelper = {
  formatSenderName({
    senderName = '',
    accountNumber = '',
  }: {
    senderName?: string;
    accountNumber?: string;
  }) {
    if (senderName.includes('cred.club')) {
      return 'Cred Payment';
    }

    let formattedName = senderName;

    let isFound = false;
    AppSingletons.accounts.forEach(item => {
      if (!item.account) {
        return;
      }
      const account = item.account.substring(item.account.length - 5);
      const smsAc = accountNumber.substring(accountNumber.length - 5);
      if (
        account &&
        account !== smsAc &&
        senderName.toLowerCase().includes(account?.toLowerCase())
      ) {
        isFound = true;
        formattedName =
          'Transfer Self A/C ' + senderName + ' | ' + item.bankName;
      }
    });

    // TODO x could be in upi number too, fix it
    if (!isFound && senderName.toLowerCase().startsWith('x')) {
      formattedName = 'A/C ' + senderName;
    }

    return formattedName;
  },
  findAutoCategory: (smsText: string) => {
    const _smsText = smsText.toLowerCase();
    const categoryMap: any = {};
    TRANSACTION_CATEGORY.forEach(item => {
      categoryMap[item.label] = item;
    });
    let category: CategoryProps = categoryMap.Misc;

    const contains = (compareText: string) => {
      return _smsText.toLowerCase().includes(compareText.toLowerCase());
    };

    if (contains('Monthly interest')) {
      category = categoryMap.Interest;
    } else if (contains('Refund')) {
      category = categoryMap.Refund;
    } else if (contains('EMI')) {
      category = categoryMap.EMI;
    } else if (contains('Salary')) {
      category = categoryMap.Salary;
    } else if (contains('Shopping')) {
      category = categoryMap.Shopping;
    }

    return category;
  },
  findAutoTags: (smsText: string) => {
    const _smsText = smsText.toLowerCase();
    let tags = '';
    if (_smsText.includes('UPI'.toLowerCase())) {
      tags = 'UPI';
    }
    return tags;
  },
};
