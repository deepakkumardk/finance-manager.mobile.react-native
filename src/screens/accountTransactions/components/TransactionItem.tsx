import React, {memo} from 'react';
import {Surface, Text} from 'react-native-paper';
import {AccountDataInfo, FinanceDataProps, KeywordData} from '../../../types';
import {StyleSheet, View} from 'react-native';

const TransactionItem = ({extractedData, date_display}: KeywordData) => {
  const debitCreditText =
    extractedData.type === 'Credit'
      ? '+'
      : extractedData.type === 'Debit'
      ? '-'
      : '';

  return (
    <Surface elevation={1} style={styles.container}>
      <View>
        <Text>{extractedData?.senderUpi || ''}</Text>
        <Text style={{fontStyle: 'italic'}}>
          {'Bal: '}
          {extractedData?.availableBalance || ''}
        </Text>
        <Text>{date_display || ''}</Text>
      </View>
      <Text style={{color: debitCreditText === '+' ? 'green' : 'red'}}>
        {debitCreditText + extractedData?.amount}
      </Text>
    </Surface>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
