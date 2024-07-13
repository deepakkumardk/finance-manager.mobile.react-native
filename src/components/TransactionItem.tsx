import React, {memo} from 'react';
import {Icon, Surface, Text} from 'react-native-paper';
import {KeywordData} from '../types';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAppTheme} from 'src/theme';
import {APP_STRINGS} from 'src/constants';
import {SmsHelper} from 'src/module';
import {NumberUtils} from 'src/utils';

const TransactionItem = ({
  extractedData,
  rawSms,
  userData,
  onPress,
}: KeywordData & {
  onPress?: () => void;
}) => {
  const {colors} = useAppTheme();
  const debitCreditText =
    extractedData.type === 'Credit'
      ? '+'
      : extractedData.type === 'Debit'
      ? '-'
      : '';

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => onPress?.()}>
      <Surface mode={'flat'} style={styles.container}>
        <Surface mode={'flat'}>
          <Icon source="home" size={24} />
        </Surface>
        <Surface mode={'flat'} style={styles.leftDetails}>
          <Text variant="bodyMedium">
            {SmsHelper.formatSenderName(
              extractedData.senderUpi,
              extractedData.account,
            ) || '-'}
          </Text>
          <Text variant="bodySmall" style={{color: colors.primary}}>
            {userData.category}
            <Text style={{color: colors.onSurfaceDisabled}}>
              {' • '}
              {rawSms?.date_display}
            </Text>
          </Text>
          {__DEV__ ? (
            <Text style={{color: colors.onSurfaceDisabled}}>
              {rawSms?.body}
            </Text>
          ) : null}
          <Text>{extractedData.bankName}</Text>
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
    </TouchableOpacity>
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
    alignItems: 'center',
    flex: 1,
    width: '100%',
    padding: 8,
  },
  debitCreditText: {
    alignItems: 'center',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
