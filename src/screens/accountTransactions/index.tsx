import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeywordData} from 'src/types';
import {TransactionItem} from 'src/components';
import AccountCard from 'src/screens/dashboard/components/AccountCard';
import {Chip, Surface} from 'react-native-paper';

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

  useEffect(() => {
    //
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
        renderItem={({item}) => <TransactionItem {...item} />}
        estimatedItemSize={10}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
