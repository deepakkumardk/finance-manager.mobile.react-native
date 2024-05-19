import React, {memo} from 'react';
import {Icon, Surface, Text} from 'react-native-paper';
import {KeywordData} from '../types';
import {StyleSheet} from 'react-native';
import {useAppTheme} from 'src/theme';
import {APP_STRINGS} from 'src/constants';
import {SmsHelper} from 'src/module';
import {NumberUtils} from 'src/utils';

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
        <Text variant="bodyMedium">
          {extractedData.type === 'Credit'
            ? ''
            : SmsHelper.formatSenderName(extractedData.senderUpi) || '-'}
        </Text>
        <Text variant="bodySmall" style={{color: colors.onSurfaceDisabled}}>
          {'Misc • '}
          {rawSms?.date_display}
        </Text>
        {__DEV__ ? (
          <Text style={{color: colors.onSurfaceDisabled}}>{rawSms?.body}</Text>
        ) : null}
      </Surface>
      <Surface mode={'flat'}>
        <Text
          style={[
            {
              color: debitCreditText === '+' ? colors.success : colors.error,
            },
            styles.debitCreditText,
          ]}>
          {debitCreditText +
            APP_STRINGS.RS +
            NumberUtils.formatNumber(extractedData?.amount)}
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
