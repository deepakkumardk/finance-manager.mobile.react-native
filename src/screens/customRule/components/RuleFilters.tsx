import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  Checkbox,
  Divider,
  RadioButton,
  Surface,
  useTheme,
} from 'react-native-paper';
import {CustomRuleFilter} from 'src/types';

import {STRINGS} from '../strings';

const BANK_OPTIONS = [
  {
    label: 'With Same Bank a/c Only',
    value: 'Self',
  },
  {
    label: 'With All Bank a/c',
    value: 'All',
  },
];

const SENDER_OPTIONS = [
  {
    value: 'SenderAndAmount',
    label: 'With same sender and same amount too only',
  },
  {
    value: 'All',
    label: 'All transactions of the sender',
  },
];

export const RuleFilters = ({
  onChange,
}: {
  onChange: (filters: CustomRuleFilter) => void;
}) => {
  const {colors} = useTheme();
  const [bankOption, setBankOption] = React.useState(BANK_OPTIONS[0].value);
  const [senderOption, setSenderOption] = React.useState(
    SENDER_OPTIONS[0].value,
  );
  const [withFutureTransactions, setWithFutureTransactions] = useState(false);

  useEffect(() => {
    onChange({
      withAllBanks: bankOption === 'All',
      withAllTransactions: senderOption === 'All',
      withFutureTransactions,
    });
  }, [bankOption, senderOption, withFutureTransactions]);

  return (
    <Surface mode="flat">
      <RadioButton.Group
        onValueChange={newValue => setBankOption(newValue)}
        value={bankOption}>
        {BANK_OPTIONS.map(item => (
          <Surface key={item.label}>
            <RadioButton.Item
              style={styles.radioItem}
              labelVariant="labelMedium"
              label={item.label}
              value={item.value}
            />
          </Surface>
        ))}
      </RadioButton.Group>

      <Divider style={styles.divider} />

      <RadioButton.Group
        onValueChange={newValue => setSenderOption(newValue)}
        value={senderOption}>
        {SENDER_OPTIONS.map(item => (
          <Surface key={item.label}>
            <RadioButton.Item
              style={styles.radioItem}
              labelVariant="labelMedium"
              label={item.label}
              value={item.value}
            />
          </Surface>
        ))}
      </RadioButton.Group>

      <Divider style={styles.divider} />

      <Checkbox.Item
        labelVariant="labelMedium"
        color={colors.primary}
        labelStyle={{color: colors.primary}}
        label={STRINGS.MARK_FUTURE}
        status={withFutureTransactions ? 'checked' : 'unchecked'}
        onPress={() => setWithFutureTransactions(prev => !prev)}
      />
    </Surface>
  );
};

const styles = StyleSheet.create({
  radioItem: {
    paddingVertical: 2,
  },
  divider: {
    height: 4,
  },
});
