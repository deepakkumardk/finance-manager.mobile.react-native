import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {SmsModule} from '../../module';
import {AccountDataInfo, KeywordData} from '../../types';
import {AllAccountsCarousel} from './components/AllAccountsCarousel';
import {Button, Surface, Text} from 'react-native-paper';
import {TransactionItem} from 'src/components';
import {APP_STRINGS} from 'src/constants';
import {PermissionUtils} from 'src/utils';

export const Dashboard = ({navigation}: any) => {
  const [accountSummaryList, setAccountSummaryList] = useState<
    AccountDataInfo[]
  >([]);
  const [allTransactions, setAllTransactions] = useState<KeywordData[]>([]);

  const navigateToTransactions = (item?: AccountDataInfo) => {
    let newItem = {...item};
    if (!item) {
      const summaryItem = accountSummaryList.find(
        summary => summary.bankName === APP_STRINGS.ALL_ACCOUNTS,
      );
      newItem = {...summaryItem};
    }
    if (newItem?.bankName === APP_STRINGS.ALL_ACCOUNTS) {
      newItem.list = allTransactions;
    }
    navigation.navigate('AccountTransactions', newItem);
  };

  useEffect(() => {
    const initData = async () => {
      const isGranted = await PermissionUtils.requestPermission();
      if (!isGranted) {
        return;
      }
      const res = await SmsModule.getFinanceSms();
      setAccountSummaryList(res.accountSummary);
      setAllTransactions(res.allTransactions);
    };
    initData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Surface mode={'flat'} elevation={4}>
        <AllAccountsCarousel
          accountSummaryList={accountSummaryList}
          onPress={item => {
            navigateToTransactions(item);
          }}
        />
        <Surface mode={'flat'} style={styles.transactionContainer}>
          <Text variant="headlineLarge">{'Recent Transaction'}</Text>
          <Button
            mode="text"
            onPress={() => {
              navigateToTransactions();
            }}>
            {'See All'}
          </Button>
        </Surface>
        <FlatList
          style={styles.list}
          data={allTransactions
            .filter(item => item.extractedData.type !== 'Balance')
            .slice(0, 20)}
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
    padding: 12,
  },
  list: {
    paddingBottom: 64,
  },
});
