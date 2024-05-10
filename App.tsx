import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SmsModule} from './src/module';
import {NavigationContainer} from '@react-navigation/native';
import {RootNavigator} from './src/navigation/RootNavigator';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    SmsModule.getFinanceSms();
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
