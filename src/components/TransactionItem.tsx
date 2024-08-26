import React, {memo} from 'react';
import {Icon, Surface, Text} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useAppTheme} from 'src/theme';
import {APP_STRINGS} from 'src/constants';
import {SmsHelper} from 'src/module';
import {NumberUtils} from 'src/utils';
import {KeywordData} from '../types';
import {HighlightText} from 'src/components';

const TransactionItem = ({
  extractedData,
  rawSms,
  userData,
  onPress,
  query = '',
}: KeywordData & {
  query?: string;
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
        <Surface mode={'flat'} style={styles.contentIcon}>
          <Icon source={userData.icon} size={24} />
        </Surface>
        <Surface mode={'flat'} style={styles.leftDetails}>
          <HighlightText variant="bodyMedium" query={query}>
            {SmsHelper.formatSenderName({
              senderName: extractedData.senderUpi,
              accountNumber: extractedData.account,
            }) || '-'}
          </HighlightText>

          <Surface mode="flat" style={styles.row}>
            <HighlightText
              variant="bodySmall"
              style={{color: colors.primary}}
              query={query}>
              {userData.category}
            </HighlightText>
            <Text style={{color: colors.onSurfaceDisabled}}>
              {' • '}
              {rawSms?.date_display}
            </Text>
          </Surface>

          {__DEV__ ? (
            <HighlightText
              style={{color: colors.onSurfaceDisabled}}
              query={query}>
              {rawSms?.body}
            </HighlightText>
          ) : null}
          <Text>{extractedData.bankName}</Text>
        </Surface>
        <Surface mode={'flat'}>
          <HighlightText
            style={[
              {
                color: debitCreditText === '+' ? colors.success : colors.error,
              },
              styles.debitCreditText,
            ]}
            query={query}>
            {debitCreditText +
              APP_STRINGS.RS +
              NumberUtils.formatNumber(extractedData?.amount)}
          </HighlightText>
        </Surface>
      </Surface>
    </TouchableOpacity>
  );
};

export default memo(TransactionItem);

const styles = StyleSheet.create({
  contentIcon: {
    paddingHorizontal: 4,
  },
  leftDetails: {
    flex: 1,
    paddingHorizontal: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
