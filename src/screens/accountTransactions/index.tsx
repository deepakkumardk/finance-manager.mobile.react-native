import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeywordData} from 'src/types';
import {AddTransactionInfo, TransactionItem} from 'src/components';
import AccountCard from 'src/screens/dashboard/components/AccountCard';
import {Chip, Surface} from 'react-native-paper';
import {HeaderWithSearch} from './components/HeaderWithSearch';

const types = ['All', 'Credit', 'Debit'];

export const AccountTransactions = ({navigation, route}: any) => {
  console.log('AccountTransactions -> navigation', navigation);
  const [transactionsList, setTransactionsList] = useState<KeywordData[]>(
    route.params.list.filter(
      (item: any) =>
        item.extractedData.type === 'Debit' ||
        item.extractedData.type === 'Credit',
    ),
  );
  const [selectedType, setSelectedType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KeywordData>();

  const onChipPress = useCallback(
    (tag: string) => {
      setSelectedType(tag);
      if (tag === 'All') {
        setTransactionsList(
          route.params.list.filter(
            (item: any) =>
              item.extractedData.type === 'Debit' ||
              item.extractedData.type === 'Credit',
          ),
        );
        return;
      }
      setTransactionsList(
        route.params.list.filter(
          (item: any) => item.extractedData.type === tag,
        ),
      );
    },
    [route.params],
  );

  const onQueryChange = useCallback(
    (query: string) => {
      if (query) {
        setTransactionsList(
          route.params.list.filter(
            (item: KeywordData) =>
              (item.extractedData.type === 'Debit' ||
                item.extractedData.type === 'Credit') &&
              item.extractedData.senderUpi
                ?.toLowerCase()
                ?.includes(query.toLowerCase()),
          ),
        );
        return;
      }
    },
    [route.params],
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearch
        onQueryChange={onQueryChange}
        onSearchHide={() => onChipPress(selectedType)}
      />
      <AccountCard {...route.params} onPress={() => {}} />
      <Surface style={styles.row}>
        {types.map(type => (
          <Chip
            key={type}
            selected={selectedType === type}
            style={styles.chip}
            onPress={() => onChipPress(type)}>
            {type}
          </Chip>
        ))}
      </Surface>

      <FlashList
        data={transactionsList}
        keyExtractor={item => item.rawSms.date}
        renderItem={({item}) => (
          <TransactionItem
            {...item}
            onPress={() => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          />
        )}
        estimatedItemSize={10}
      />
      <AddTransactionInfo
        visible={showModal}
        item={selectedItem}
        onSubmit={() => {}}
        onDismiss={() => {
          setSelectedItem(undefined);
          setShowModal(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    paddingHorizontal: 12,
  },
  searchContainer: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
  chip: {
    paddingHorizontal: 4,
    marginHorizontal: 8,
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
});
