import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Checkbox, Divider, Surface, Text} from 'react-native-paper';
import {useMMKVString} from 'react-native-mmkv';

import {globalEmitter, STORAGE_KEYS} from 'src/common';

import {ThemeModal} from './component/ThemeModal';
import {AppSingletons, GLOBAL_EVENTS} from 'src/constants';
import {STRINGS} from './strings';

export const Settings = ({navigation}: any) => {
  const [appTheme, setAppTheme] = useMMKVString(STORAGE_KEYS.APP_THEME);
  const [shouldShowThemeModal, setShouldShowThemeModal] = useState(false);
  const [settingValues, setSettingValues] = useState<any>({});

  // eslint-disable-next-line react/no-unstable-nested-components
  const SettingItem = ({
    title,
    subtitle = '',
    withCheckbox,
    onPress,
  }: {
    title: string;
    subtitle?: string;
    withCheckbox?: boolean;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      key={title}
      activeOpacity={0.5}
      style={styles.row}
      onPress={withCheckbox ? undefined : onPress}>
      <Surface mode="flat" style={styles.settingItem}>
        <Text variant="bodyLarge">{title}</Text>
        <Text variant="labelSmall">{subtitle}</Text>
      </Surface>

      {withCheckbox && (
        <Checkbox
          status={settingValues[title] ? 'checked' : 'unchecked'}
          onPress={() => {
            if (title === STRINGS.ENABLE_DEBUGGING) {
              AppSingletons.enableDebugging = !AppSingletons.enableDebugging;
            }
            setSettingValues((prev: any) => ({
              ...prev,
              [title]: !prev[title],
            }));
          }}
        />
      )}
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
        <Divider />
        <SettingItem
          title="Custom Rules"
          onPress={() => navigation.navigate('CustomRules')}
        />
        <Divider />
        {__DEV__ && (
          <SettingItem title={STRINGS.ENABLE_DEBUGGING} withCheckbox />
        )}
        <ThemeModal
          visible={shouldShowThemeModal}
          onDismiss={() => setShouldShowThemeModal(false)}
          onDonePress={(value, isDarkMode) => {
            setAppTheme(value);
            setShouldShowThemeModal(false);
            globalEmitter.emit(GLOBAL_EVENTS.ON_THEME_CHANGE, {isDarkMode});
          }}
        />
        <Divider />
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
