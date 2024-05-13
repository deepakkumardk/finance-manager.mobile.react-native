import React, {memo} from 'react';
import {Icon, List, Surface, Text} from 'react-native-paper';
import {KeywordData} from '../types';
import {StyleSheet} from 'react-native';

const TransactionItem = ({extractedData, text_debug}: KeywordData) => {
  const debitCreditText =
    extractedData.type === 'Credit'
      ? '+'
      : extractedData.type === 'Debit'
      ? '-'
      : '';

  return (
    <Surface elevation={1} style={styles.container}>
      <List.Item
        contentStyle={{alignSelf: 'center', alignContent: 'center'}}
        title={extractedData?.senderUpi || 'Sender Address'}
        description={
          'Tag' +
          ' - ' +
          '2 Feb' +
          ' - ' +
          extractedData?.type +
          ' - ' +
          extractedData?.availableBalance +
          '\n' +
          text_debug
        }
        descriptionNumberOfLines={5}
        left={() => <Icon source={'home'} size={28} />}
        right={() => (
          <Text
            style={{
              color: debitCreditText === '+' ? 'green' : 'red',
              alignItems: 'center',
              textAlignVertical: 'center',
            }}>
            {debitCreditText + extractedData?.amount}
          </Text>
        )}
      />
    </Surface>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 4,
    // paddingHorizontal: 12,
    // flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});
