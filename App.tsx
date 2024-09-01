import 'react-native-gesture-handler';
import 'src/extensions';
import React, {useEffect, useState} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {RootNavigator} from './src/navigation/RootNavigator';
import {PaperProvider} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import merge from 'deepmerge';
import {AppDarkTheme, AppLightTheme} from 'src/theme';
import {RealmProvider} from '@realm/react';
import {SmsModel} from 'src/workflow/database';
import {SmsDataProvider} from 'src/context';
import {globalEmitter, STORAGE_KEYS, useEventEmitter} from 'src/common';
import {GLOBAL_EVENTS} from 'src/constants';
import {useMMKVString} from 'react-native-mmkv';

const {LightTheme, DarkTheme} = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(
  {...MD3LightTheme, colors: AppLightTheme.colors},
  LightTheme,
);
const CombinedDarkTheme = merge(
  {...MD3DarkTheme, colors: AppDarkTheme.colors},
  DarkTheme,
);

function App(): React.ReactNode {
  const isDarkMode = useColorScheme() === 'dark';

  const [appThemeStorage = 'System Default'] = useMMKVString(
    STORAGE_KEYS.APP_THEME,
  );

  const [isAppInDarkMode, setIsAppInDarkMode] = useState(
    isDarkMode || appThemeStorage === 'Dark',
  );
  const theme = isAppInDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  const [appTheme, setAppTheme] = useState(theme);

  const onThemeChange = (darkMode: boolean) => {
    setIsAppInDarkMode(darkMode);
    setAppTheme(darkMode ? CombinedDarkTheme : CombinedDefaultTheme);
  };

  useEventEmitter(globalEmitter, event => {
    switch (event.type) {
      case GLOBAL_EVENTS.ON_THEME_CHANGE:
        onThemeChange(event.data.isDarkMode);
        break;
    }
  });

  useEffect(() => {
    if (appThemeStorage === 'System Default') {
      onThemeChange(isDarkMode);
    }
  }, [isDarkMode, appThemeStorage]);

  return (
    <RealmProvider schema={[SmsModel]} schemaVersion={7}>
      <SmsDataProvider>
        <NavigationContainer
          theme={appTheme}
          onReady={() => {
            console.log('App -> onReady');
          }}>
          <PaperProvider
            theme={appTheme}
            settings={{
              rippleEffectEnabled: true,
            }}>
            <StatusBar
              barStyle={isAppInDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={appTheme.colors.background}
            />
            <RootNavigator />
          </PaperProvider>
        </NavigationContainer>
      </SmsDataProvider>
    </RealmProvider>
  );
}

export default App;
