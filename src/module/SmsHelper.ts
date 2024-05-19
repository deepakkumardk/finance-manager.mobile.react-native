import {AppSingletons} from 'src/constants';

export const SmsHelper = {
  formatSenderName(senderName = '') {
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
      if (
        account &&
        senderName.toLowerCase().includes(account?.toLowerCase())
      ) {
        isFound = true;
        formattedName = 'Self A/C ' + senderName + ' | ' + item.bankName;
      }
    });

    if (!isFound && senderName.toLowerCase().startsWith('x')) {
      formattedName = 'A/C ' + senderName;
    }

    return formattedName;
  },
};
