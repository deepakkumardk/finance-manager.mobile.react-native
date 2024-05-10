import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Surface, Text} from 'react-native-paper';
import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {SmsModule} from '../../module';
import {AccountDataInfo} from '../../types';
import SummaryItem from './components/SummaryItem';

export const Dashboard = ({navigation, route}: any) => {
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
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchbar: {
    width: '96%',
  },
  typeIcon: {
    paddingHorizontal: 6,
  },
});
