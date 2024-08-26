import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';

import {FlashList} from '@shopify/flash-list';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AccountDataInfo, KeywordData} from 'src/types';
import {AddTransactionModal, TransactionItem} from 'src/components';
import AccountCard from 'src/screens/dashboard/components/AccountCard';
import {Chip, Surface} from 'react-native-paper';
import {HeaderWithSearch} from './components/HeaderWithSearch';
import {useSmsData} from 'src/context';
import {useTransactionUpdate} from 'src/hooks';

const types = ['All', 'Credit', 'Debit'];

export const AccountTransactions = ({_, route}: any) => {
  const {bankName, account, showAllTransactions} = route.params;

  const {accountSummaryList, allTransactions} = useSmsData();

  const {onSubmit} = useTransactionUpdate();

  const accountSummary = accountSummaryList.find(
    item => item.account === account && item.bankName === bankName,
  ) as AccountDataInfo;

  const [transactionsList, setTransactionsList] = useState<KeywordData[]>([]);
  const [selectedType, setSelectedType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<KeywordData>();
  const [searchQuery, setSearchQuery] = useState('');

  const selectedTypeRef = useRef(selectedType);

  const initList = () => {
    const list = showAllTransactions
      ? allTransactions
      : accountSummary?.list ?? [];

    setTransactionsList(
      list.filter(
        (item: any) =>
          item.extractedData.type === 'Debit' ||
          item.extractedData.type === 'Credit',
      ),
    );
  };

  useEffect(() => {
    initList();
    onChipPress(selectedTypeRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allTransactions, accountSummary]);

  const onChipPress = useCallback((tag: string) => {
    setSelectedType(tag);
    selectedTypeRef.current = tag;
    if (tag === 'All') {
      initList();
      return;
    }
    const list = showAllTransactions
      ? allTransactions
      : accountSummary?.list ?? [];
    setTransactionsList(
      list.filter((item: any) => item.extractedData.type === tag),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onQueryChange = useCallback((query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      return;
    }
    const list = showAllTransactions
      ? allTransactions
      : accountSummary?.list ?? [];

    setTransactionsList(
      list.filter((item: KeywordData) => {
        const contains = (text?: string) =>
          text?.toLowerCase()?.includes(query.trim().toLowerCase());

        return (
          (item.extractedData.type === 'Debit' ||
            item.extractedData.type === 'Credit') &&
          (contains(item.extractedData.senderUpi) ||
            contains(item.userData.category) ||
            contains(item.userData.tags) ||
            contains(item.rawSms.body))
        );
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithSearch
        onQueryChange={onQueryChange}
        onSearchHide={() => onChipPress(selectedType)}
      />
      <AccountCard {...accountSummary} onPress={() => {}} />
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
            query={searchQuery}
            onPress={() => {
              setSelectedItem(item);
              setShowModal(true);
            }}
          />
        )}
        estimatedItemSize={10}
      />
      {showModal && (
        <AddTransactionModal
          visible={showModal}
          item={selectedItem}
          onSubmit={data => {
            onSubmit(data, {
              account,
              bankName,
            });
          }}
          onDismiss={() => {
            setSelectedItem(undefined);
            setShowModal(false);
          }}
        />
      )}
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
