import {AppSingletons} from 'src/constants';

export const SmsHelper = {
  formatSenderName(senderName = '', accountNumber: string = '') {
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
};
