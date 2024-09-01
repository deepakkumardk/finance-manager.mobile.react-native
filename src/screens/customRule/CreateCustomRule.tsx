import React, {useLayoutEffect, useState} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RuleFilters} from './components/RuleFilters';
import {FlashList} from '@shopify/flash-list';
import {CustomRuleFilter, KeywordData} from 'src/types';
import {useSmsData} from 'src/context';
import {TransactionItem} from 'src/components';
import {CategoryPicker} from 'src/components';
import {IconButton, MD3Colors, TextInput} from 'react-native-paper';

export const CreateCustomRule = ({navigation, route}: any) => {
  const smsItem: KeywordData = route.params.item;

  const [filteredList, setFilteredList] = useState<KeywordData[]>([]);
  const [category, setCategory] = useState(smsItem?.userData?.category || '');
  const [tags, setTags] = useState(smsItem?.userData?.tags || '');

  const {allTransactions} = useSmsData();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={'check'}
          iconColor={MD3Colors.primary50}
          onPress={() => {
            console.log('CreateCustomRule -> category', category);
            Alert.alert('Done');
          }}
        />
      ),
    });
  }, []);

  const initData = (filter: CustomRuleFilter) => {
    setFilteredList(
      allTransactions.filter((data: KeywordData) => {
        if (
          data.extractedData.senderUpi !== smsItem.extractedData.senderUpi ||
          data.extractedData.type !== smsItem.extractedData.type
        ) {
          return false;
        }
        let predicate = false;

        if (filter.withAllBanks) {
          if (filter.withAllTransactions) {
            return true;
          } else {
            return data.extractedData.amount === smsItem.extractedData.amount;
          }
        } else {
          predicate =
            data.extractedData.account === smsItem.extractedData.account;
          if (filter.withAllTransactions) {
            return predicate;
          } else {
            return (
              predicate &&
              data.extractedData.amount === smsItem.extractedData.amount
            );
          }
        }
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <RuleFilters
        onChange={filter => {
          initData(filter);
        }}
      />
      <CategoryPicker
        defaultValue={smsItem?.userData.category}
        onChange={(value: string) => setCategory(value)}
      />
      <TextInput
        style={styles.input}
        label="Tags"
        placeholder="Comma (,) separated tags"
        value={tags}
        onChangeText={value => setTags(value)}
      />
      <FlashList
        data={filteredList}
        keyExtractor={item => item.rawSms.date}
        renderItem={({item}) => (
          <TransactionItem {...item} onPress={() => {}} />
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
  input: {
    marginVertical: 5,
  },
});
