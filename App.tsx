import 'react-native-gesture-handler';
import React from 'react';
import {useColorScheme} from 'react-native';

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
  const theme = isDarkMode ? CombinedDarkTheme : CombinedDefaultTheme;

  return (
    <PaperProvider
      theme={theme}
      settings={{
        rippleEffectEnabled: true,
      }}>
      <RealmProvider schema={[SmsModel]}>
        <NavigationContainer theme={theme}>
          <SmsDataProvider>
            <RootNavigator />
          </SmsDataProvider>
        </NavigationContainer>
      </RealmProvider>
    </PaperProvider>
  );
}

export default App;
