import {AccountDataInfo} from 'src/types';

export const APP_STRINGS = {
  RS: '₹',
  ALL_ACCOUNTS: 'All Accounts',
};

export const AppSingletons = {
  accounts: [] as Partial<AccountDataInfo>[],
};

export const TRANSACTION_CATEGORY = [
  {label: 'Misc', icon: 'database-settings'},
  {label: 'Bills', icon: 'note-text'},
  {label: 'Education', icon: 'book'},
  {label: 'EMI', icon: 'calculator'},
  {label: 'Foods', icon: 'food-variant'},
  {label: 'Fuel', icon: 'fuel'},
  {label: 'Friends & Family', icon: 'account-multiple'},
  {label: 'Groceries', icon: 'cart-variant'},
  {label: 'Health', icon: 'heart-pulse'},
  {label: 'Home', icon: 'home-outline'},
  {label: 'Investment', icon: 'trending-up'},
  {label: 'Loans', icon: 'trending-down'},
  {label: 'Office', icon: 'office-building-marker'},
  {label: 'Refund', icon: 'cash-refund'},
  {label: 'Rent', icon: 'bunk-bed'},
  {label: 'Shopping', icon: 'shopping'},
  {label: 'Travel', icon: 'map-marker-radius'},
];
