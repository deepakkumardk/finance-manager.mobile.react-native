import React, {memo} from 'react';
import {Icon, Surface, Text} from 'react-native-paper';
import {KeywordData} from '../types';
import {StyleSheet} from 'react-native';
import {useAppTheme} from 'src/theme';
import {APP_STRINGS} from 'src/constants';

const TransactionItem = ({extractedData, rawSms}: KeywordData) => {
  const {colors} = useAppTheme();
  const debitCreditText =
    extractedData.type === 'Credit'
      ? '+'
      : extractedData.type === 'Debit'
      ? '-'
      : '';

  return (
    <Surface mode={'flat'} style={styles.container}>
      <Surface mode={'flat'}>
        <Icon source="home" size={24} />
      </Surface>
      <Surface mode={'flat'} style={styles.leftDetails}>
        <Text>{extractedData.senderUpi || 'Sender'}</Text>
        <Text>
          {'UserTag - '}
          {rawSms?.date_display}
        </Text>
        {/* <Text>{rawSms?.body}</Text> */}
      </Surface>
      <Surface mode={'flat'}>
        <Text
          style={[
            {
              color: debitCreditText === '+' ? colors.success : colors.error,
            },
            styles.debitCreditText,
          ]}>
          {debitCreditText + APP_STRINGS.RS + extractedData?.amount}
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
