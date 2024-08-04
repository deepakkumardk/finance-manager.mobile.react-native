import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

export const STORAGE_KEYS = {
  APP_THEME: 'APP_THEME',
};

export const LocalStorage = {
  get: (key: string) => {
    const value = storage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  set: (key: string, value: any) => {
    const _value = JSON.stringify(value);
    storage.set(key, _value);
  },
  delete: (key: string) => {
    storage.delete(key);
  },
};
