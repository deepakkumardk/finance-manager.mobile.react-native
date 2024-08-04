import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import {useMMKVString} from 'react-native-mmkv';
import {
  Modal,
  Portal,
  RadioButton,
  Button,
  Text,
  Surface,
} from 'react-native-paper';
import {STORAGE_KEYS} from 'src/common';
import {ThemeModalProps} from 'src/types';

const THEME_OPTIONS = ['Light', 'Dark', 'System Default'];

export const ThemeModal = ({
  visible,
  onDismiss,
  onDonePress,
}: ThemeModalProps) => {
  const colorScheme = useColorScheme();

  const [appThemeStorage = 'System Default'] = useMMKVString(
    STORAGE_KEYS.APP_THEME,
  );

  const [value, setValue] = React.useState<string>(appThemeStorage);

  const isDarkMode = (themeValue: string) => {
    if (themeValue === 'Light') {
      return false;
    } else if (themeValue === 'Dark') {
      return true;
    }
    return colorScheme === 'dark';
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const RadioButtonItem = ({label}: any) => {
    return (
      <Surface key={label} mode="flat" style={styles.radioButtonContainer}>
        <RadioButton
          value={label}
          status={label === appThemeStorage ? 'checked' : 'unchecked'}
        />
        <Text>{label}</Text>
      </Surface>
    );
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <Surface style={styles.modalContainer}>
          <Text variant="bodyLarge">{'Choose Theme'}</Text>
          <RadioButton.Group onValueChange={setValue} value={value}>
            {THEME_OPTIONS.map(label => (
              <RadioButtonItem key={label} label={label} />
            ))}
          </RadioButton.Group>
          <Surface mode="flat" style={styles.buttonContainer}>
            <Button onPress={onDismiss} mode="outlined" style={styles.button}>
              {'Cancel'}
            </Button>
            <Button
              onPress={() => onDonePress(value, isDarkMode(value))}
              mode="contained"
              style={styles.button}>
              {'OK'}
            </Button>
          </Surface>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    marginHorizontal: 10,
  },
});
