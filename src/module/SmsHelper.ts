import {AppSingletons} from 'src/constants';

export const SmsHelper = {
  formatSenderName(senderName = '') {
    if (senderName.includes('cred.club')) {
      return 'Cred Payment';
    }
    let formattedName = senderName;

    AppSingletons.accounts.forEach(item => {
      if (!item.account) {
        return;
      }
      const account = item.account.substring(item.account.length - 5);
      if (
        account &&
        senderName.toLowerCase().includes(account?.toLowerCase())
      ) {
        formattedName = 'Self A/C ' + senderName + ' | ' + item.bankName;
      }
    });

    return formattedName;
  },
};
