import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SmsModule} from '../../module';
import {AccountDataInfo} from '../../types';
import SummaryItem from './components/SummaryItem';
import {AllAccountsCarousel} from './components/AllAccountsCarousel';
import {Text} from 'react-native-paper';

export const Dashboard = ({navigation}: any) => {
  const [accountSummaryList, setAccountSummaryList] = useState<
    AccountDataInfo[]
  >([]);

  useEffect(() => {
    const initData = async () => {
      const list = await SmsModule.getFinanceSms();
      setAccountSummaryList(list.accountSummary);
    };
    initData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <AllAccountsCarousel accountSummaryList={accountSummaryList} />
      <View style={styles.transactionContainer}>
        <Text variant="headlineLarge">{'Recent Transaction'}</Text>
        <Text variant="bodySmall">{'See All'}</Text>
      </View>
      <FlashList
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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
