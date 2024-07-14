import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, useColorScheme} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import {Icon, Surface, Text, useTheme} from 'react-native-paper';

const CategoryPicker = ({
  category,
  items,
  onChange,
}: {
  category?: string;
  items: Array<any>;
  onChange: (item: any) => void;
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const {colors} = useTheme();

  const getItemsList = () => {
    return items.map(item => ({
      label: item.label,
      value: item,
    }));
  };

  const [open, setOpen] = useState(false);

  const [categoryList, setCategoryList] = useState(getItemsList());
  const [value, setValue] = useState(category);

  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

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
        label: 'label',
        value: 'label',
        icon: 'icon',
      }}
      props={{
        activeOpacity: 0.5,
      }}
      placeholderStyle={{
        color: colors.outline,
      }}
      containerStyle={styles.picker}
      items={categoryList}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setCategoryList}
      //   renderListItem={renderItem}
      itemKey="label"
      closeAfterSelecting={true}
      closeOnBackPressed={true}
      theme={isDarkMode ? 'DARK' : 'LIGHT'}
    />
  );
};

export default CategoryPicker;

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
