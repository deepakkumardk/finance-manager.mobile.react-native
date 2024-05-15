import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeywordData} from 'src/types';
import {TransactionItem} from 'src/components';

export const AccountTransactions = ({navigation, route}: any) => {
  console.log('AccountTransactions -> navigation', navigation);
  const [transactionsList, _] = useState<KeywordData[]>(
    route.params.list.filter(
      (item: any) =>
        item.extractedData.type === 'Debit' ||
        item.extractedData.type === 'Credit',
    ),
  );

  useEffect(() => {
    //
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
});
