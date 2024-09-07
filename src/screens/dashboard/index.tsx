import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {AccountDataInfo, KeywordData} from 'src/types';
import {AllAccountsCarousel} from './components/AllAccountsCarousel';
import {ActivityIndicator, Button, Surface, Text} from 'react-native-paper';
import {AddTransactionModal, TransactionItem} from 'src/components';
import {APP_STRINGS, AppSingletons} from 'src/constants';
import {useSmsData} from 'src/context';
import {useTransactionUpdate} from 'src/hooks';

export const Dashboard = ({navigation}: any) => {
  const {accountSummaryList, allTransactions} = useSmsData();

  const {onSubmit} = useTransactionUpdate();

  const [isLoading, _] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KeywordData>();

  const navigateToTransactions = (item?: AccountDataInfo) => {
    navigation.navigate('AccountTransactions', {
      account: item?.account,
      bankName: item?.bankName,
      showAllTransactions: item?.bankName === APP_STRINGS.ALL_ACCOUNTS,
    });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Surface mode={'flat'} elevation={4}>
        <AllAccountsCarousel
          accountSummaryList={accountSummaryList}
          onPress={item => {
            navigateToTransactions(item);
          }}
        />
        <Surface mode={'flat'} style={styles.transactionContainer}>
          <Text variant="headlineSmall">{'Recent Transaction'}</Text>
          <Button
            mode="text"
            onPress={() => {
              const item = accountSummaryList.find(
                summaryItem =>
                  summaryItem?.bankName === APP_STRINGS.ALL_ACCOUNTS,
              );
              navigateToTransactions(item);
            }}>
            {'See All'}
          </Button>
        </Surface>
        <FlatList
          contentContainerStyle={styles.list}
          data={allTransactions
            .filter(item =>
              AppSingletons.enableDebugging
                ? item
                : item.extractedData.type !== 'Balance',
            )
            .slice(0, 20)}
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
        />
        {showModal && (
          <AddTransactionModal
            visible={showModal}
            item={selectedItem}
            onSubmit={data => {
              onSubmit(data, {
                account: selectedItem?.extractedData?.account,
                bankName: selectedItem?.extractedData?.bankName,
              });
            }}
            onDismiss={() => {
              setSelectedItem(undefined);
              setShowModal(false);
            }}
          />
        )}
      </Surface>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  list: {
    paddingBottom: 500,
  },
});
