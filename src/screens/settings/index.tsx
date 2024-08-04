import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Surface, Text} from 'react-native-paper';
import {useMMKVString} from 'react-native-mmkv';

import {globalEmitter, STORAGE_KEYS} from 'src/common';

import {ThemeModal} from './component/ThemeModal';
import {GLOBAL_EVENTS} from 'src/constants';

export const Settings = () => {
  const [appTheme, setAppTheme] = useMMKVString(STORAGE_KEYS.APP_THEME);
  const [shouldShowThemeModal, setShouldShowThemeModal] = useState(false);

  // eslint-disable-next-line react/no-unstable-nested-components
  const SettingItem = ({
    title,
    subtitle,
    onPress,
  }: {
    title: string;
    subtitle: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity key={title} activeOpacity={0.5} onPress={onPress}>
      <Surface style={styles.settingItem}>
        <Text variant="bodyLarge">{title}</Text>
        <Text variant="labelSmall">{subtitle}</Text>
      </Surface>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Surface style={styles.container}>
        <SettingItem
          title="Theme"
          subtitle={appTheme ?? 'System Default'}
          onPress={() => setShouldShowThemeModal(true)}
        />
        <ThemeModal
          visible={shouldShowThemeModal}
          onDismiss={() => setShouldShowThemeModal(false)}
          onDonePress={(value, isDarkMode) => {
            setAppTheme(value);
            setShouldShowThemeModal(false);
            globalEmitter.emit(GLOBAL_EVENTS.ON_THEME_CHANGE, {isDarkMode});
          }}
        />
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  settingItem: {
    padding: 12,
  },
  container: {
    flex: 1,
  },
});
