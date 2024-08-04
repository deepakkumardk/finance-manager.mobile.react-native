import {AccountDataInfo, CategoryProps} from 'src/types';

export const APP_STRINGS = {
  RS: '₹',
  ALL_ACCOUNTS: 'All Accounts',
};

export const AppSingletons = {
  accounts: [] as Partial<AccountDataInfo>[],
};

export const TRANSACTION_CATEGORY: CategoryProps[] = [
  {label: 'Misc', icon: 'puzzle', color: ''},
  {label: 'Bills', icon: 'note-text', color: ''},
  {label: 'Education', icon: 'book', color: ''},
  {label: 'EMI', icon: 'calculator', color: ''},
  {label: 'Foods', icon: 'food-variant', color: ''},
  {label: 'Fuel', icon: 'fuel', color: ''},
  {label: 'Friends & Family', icon: 'account-multiple', color: ''},
  {label: 'Groceries', icon: 'cart-variant', color: ''},
  {label: 'Health', icon: 'heart-pulse', color: ''},
  {label: 'Home', icon: 'home-outline', color: ''},
  {label: 'Interest', icon: 'piggy-bank-outline', color: ''},
  {label: 'Investment', icon: 'trending-up', color: ''},
  {label: 'Loans', icon: 'trending-down', color: ''},
  {label: 'Office', icon: 'office-building-marker', color: ''},
  {label: 'Refund', icon: 'cash-refund', color: ''},
  {label: 'Rent', icon: 'bunk-bed', color: ''},
  {label: 'Shopping', icon: 'shopping', color: ''},
  {label: 'Salary', icon: 'currency-inr', color: ''},
  {label: 'Travel', icon: 'map-marker-radius', color: ''},
];
