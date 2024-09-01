import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {Icon, Surface, Text, useTheme} from 'react-native-paper';
import {SelectPickerProps} from 'src/types';

export const SelectPicker = ({
  options,
  defaultValue,
  labelKey = 'label',
  valueKey = 'value',
  onSelect,
}: SelectPickerProps) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {colors} = useTheme();

  const getItemsList = () => {
    return options.map(item => ({
      label: item.label,
      value: item,
    }));
  };

  const [open, setOpen] = useState(false);

  const [optionsList, setOptionsList] = useState(getItemsList());
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    onSelect?.(value);
  }, [onSelect, value]);

  useEffect(() => {
    setOptionsList(getItemsList());
  }, [options]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const renderItem = ({item}: {item: any}) => {
    console.log('renderItem -> item', item);
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          console.log('renderItem -> item', item);
          setValue(item);
          setOpen(false);
        }}>
        <Surface style={styles.item}>
          <Icon source={item.icon} size={20} />
          <Text style={styles.textItem}>{item.label}</Text>
        </Surface>
      </TouchableOpacity>
    );
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      schema={{
        label: labelKey,
        value: valueKey,
        icon: 'icon',
      }}
      props={{
        activeOpacity: 0.5,
      }}
      placeholderStyle={{
        color: colors.outline,
      }}
      containerStyle={styles.picker}
      items={optionsList}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setOptionsList}
      //   renderListItem={renderItem}
      itemKey="label"
      closeAfterSelecting={true}
      closeOnBackPressed={true}
      theme={isDarkMode ? 'DARK' : 'LIGHT'}
    />
  );
};

const styles = StyleSheet.create({
  picker: {
    marginVertical: 8,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    marginStart: 12,
  },
});
