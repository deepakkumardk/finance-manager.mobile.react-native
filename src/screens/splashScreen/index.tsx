import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {globalEmitter, useEventEmitter} from 'src/common';
import {GLOBAL_EVENTS} from 'src/constants';
import {Assets} from 'src/assets';
import {Image} from 'react-native';

export const SplashScreen = ({navigation}: any) => {
  useEventEmitter(globalEmitter, event => {
    switch (event.type) {
      case GLOBAL_EVENTS.INIT_DATA_SUCCESS:
        navigation.navigate('BottomTabs');
        break;
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image source={Assets.appLogo} style={styles.image} />
        <ActivityIndicator />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginVertical: 24,
  },
});
