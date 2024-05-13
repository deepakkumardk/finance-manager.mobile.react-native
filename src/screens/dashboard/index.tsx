import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SmsModule} from '../../module';
import {AccountDataInfo} from '../../types';
import SummaryItem from './components/SummaryItem';
import {AllAccountsCarousel} from './components/AllAccountsCarousel';
import {Surface, Text} from 'react-native-paper';
import {TransactionItem} from 'src/components';

export const Dashboard = ({navigation}: any) => {
  const [accountSummaryList, setAccountSummaryList] = useState<
    AccountDataInfo[]
  >([]);

  useEffect(() => {
    const initData = async () => {
      const res = await SmsModule.getFinanceSms();
      setAccountSummaryList(res);
    };
    initData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AllAccountsCarousel accountSummaryList={accountSummaryList} />
      <Surface style={styles.transactionContainer}>
        <Text variant="headlineLarge">{'Recent Transaction'}</Text>
        <Text variant="bodySmall">{'See All'}</Text>
      </Surface>
      <TransactionItem
        extractedData={accountSummaryList?.[0]?.list?.[0]?.extractedData ?? {}}
      />
      {/* <FlashList
        data={accountSummaryList}
        keyExtractor={item => item.account || ''}
        renderItem={({item}) => (
          <SummaryItem
            {...item}
            onPress={() => {
              console.log('Dashboard -> onPress');
              navigation.navigate('AccountTransactions', item);
            }}
          />
        )}
        estimatedItemSize={10}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 8,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
