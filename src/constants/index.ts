import {AccountDataInfo} from 'src/types';

export const APP_STRINGS = {
  RS: '₹',
  ALL_ACCOUNTS: 'All Accounts',
};

export const AppSingletons = {
  accounts: [] as Partial<AccountDataInfo>[],
};

export const TRANSACTION_CATEGORY = [
  'Travel',
  'Shopping',
  'Friends & Family',
  'Home',
  'Bills',
  'Foods',
  'Loans',
  'Fuel',
  'Groceries',
  'Health',
  'Rent',
  'Investment',
  'Office',
  'Misc',
];
