import React, {memo} from 'react';
import {Icon, Surface, Text, useTheme} from 'react-native-paper';
import {KeywordData} from '../types';
import {StyleSheet} from 'react-native';

const TransactionItem = ({extractedData, rawSms}: KeywordData) => {
  const {colors} = useTheme();
  const debitCreditText =
    extractedData.type === 'Credit'
      ? '+'
      : extractedData.type === 'Debit'
      ? '-'
      : '';

  return (
    <Surface style={styles.container}>
      <Surface>
        <Icon source="home" size={24} />
      </Surface>
      <Surface style={styles.leftDetails}>
        <Text>{extractedData.senderUpi || 'Sender'}</Text>
        <Text>
          {'UserTag - '}
          {rawSms?.date_display}
        </Text>
        {/* <Text>{rawSms?.body}</Text> */}
      </Surface>
      <Surface>
        <Text
          style={[
            {
              color: debitCreditText === '+' ? colors.primary : colors.error,
            },
            styles.debitCreditText,
          ]}>
          {debitCreditText + extractedData?.amount}
        </Text>
      </Surface>
    </Surface>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  leftDetails: {
    flex: 1,
    paddingHorizontal: 8,
  },
  container: {
    flexDirection: 'row',
    // alignSelf: 'center',
    alignItems: 'center',
    // alignContent: 'center',
    // justifyContent: 'space-between',
    flex: 1,
    width: '100%',
    padding: 8,
  },
  debitCreditText: {
    alignItems: 'center',
    textAlignVertical: 'center',
  },
});
