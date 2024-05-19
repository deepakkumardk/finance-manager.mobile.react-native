import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Appbar, Searchbar} from 'react-native-paper';
import {useDebounce} from 'src/hooks';

export const HeaderWithSearch = ({
  onQueryChange,
  onSearchHide,
}: {
  onQueryChange: (query: string) => void;
  onSearchHide: () => void;
}) => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const debouncedQuery = useDebounce(searchQuery);

  const toggleSearchBar = () => {
    setIsSearchBarVisible(prev => {
      if (prev === true) {
        onSearchHide();
      }
      return !prev;
    });
  };

  const onBackPress = () => {
    if (isSearchBarVisible) {
      toggleSearchBar();
    } else {
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      onQueryChange(debouncedQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.BackAction onPress={onBackPress} />
      {isSearchBarVisible ? (
        <Searchbar
          style={styles.searchbar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      ) : (
        <>
          <Appbar.Content title="Transactions" />
          <Appbar.Action icon="magnify" onPress={toggleSearchBar} />
        </>
      )}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchbar: {
    flex: 1,
  },
});
