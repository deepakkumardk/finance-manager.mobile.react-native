import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {SmsModule} from '../../module';
import {AccountDataInfo, KeywordData} from '../../types';
import {AllAccountsCarousel} from './components/AllAccountsCarousel';
import {Button, Surface, Text} from 'react-native-paper';
import {TransactionItem} from 'src/components';

export const Dashboard = ({navigation}: any) => {
  const [accountSummaryList, setAccountSummaryList] = useState<
    AccountDataInfo[]
  >([]);
  const [allTransactions, setAllTransactions] = useState<KeywordData[]>([]);

  useEffect(() => {
    const initData = async () => {
      const res = await SmsModule.getFinanceSms();
      setAccountSummaryList(res.accountSummary);
      setAllTransactions(res.allTransactions);
    };
    initData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Surface elevation={4}>
        <AllAccountsCarousel accountSummaryList={accountSummaryList} />
        <Surface style={styles.transactionContainer}>
          <Text variant="headlineLarge">{'Recent Transaction'}</Text>
          <Button
            mode="text"
            onPress={() => {
              navigation.navigate('AccountTransactions', {
                list: allTransactions,
              });
            }}>
            {'See All'}
          </Button>
        </Surface>
        <FlatList
          style={styles.list}
          data={allTransactions.slice(0, 20)}
          keyExtractor={item => item.rawSms.date}
          renderItem={({item}) => <TransactionItem {...item} />}
        />
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  list: {
    paddingBottom: 64,
  },
});
