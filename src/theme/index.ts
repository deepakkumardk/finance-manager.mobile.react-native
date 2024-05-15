import {useTheme} from 'react-native-paper';
import {default as AppLightTheme} from './light-theme.json';

export {default as AppDarkTheme} from './dark-theme.json';
export {AppLightTheme};

export type AppTheme = typeof AppLightTheme;

export const useAppTheme = () => useTheme<AppTheme>();
