import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const allIcons = Object.keys(MaterialIcons.getRawGlyphMap());

const IconPicker = ({
  onSelect,
}: {
  onSelect: ({icon}: {icon: string}) => void;
}) => {
  const [searchText, setSearchText] = useState('');
  const [filteredIcons, setFilteredIcons] = useState(allIcons);

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text) {
      const filtered = allIcons.filter(icon =>
        icon.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredIcons(filtered);
    } else {
      setFilteredIcons(allIcons);
    }
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.iconItem} onPress={() => onSelect(item)}>
      <MaterialIcons name={item} size={30} />
      <Text style={styles.iconText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Icons"
        value={searchText}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredIcons}
        keyExtractor={item => item}
        renderItem={renderItem}
        numColumns={4}
        contentContainerStyle={styles.iconList}
      />
    </View>
  );
};

export default IconPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  iconList: {
    justifyContent: 'center',
  },
  iconItem: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  iconText: {
    textAlign: 'center',
    marginTop: 5,
  },
});
