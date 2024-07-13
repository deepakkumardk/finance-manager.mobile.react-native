import React, {memo, useRef} from 'react';
import {StyleSheet} from 'react-native';

import {
  Divider,
  Icon,
  Surface,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {NumberUtils} from 'src/utils';
import {AccountDataInfo} from 'src/types';
import {useAppTheme} from 'src/theme';
import {APP_STRINGS} from 'src/constants';

const AccountCard = ({
  account,
  bankName,
  availableBalance,
  currentMonthIn,
  currentMonthExpense,
  lastReportedBalance,
  reportedDateDisplay,
  onPress,
}: AccountDataInfo & {
  onPress: () => void;
}) => {
  const {colors, dark} = useAppTheme();
  const bgStyle = useRef(bankName === APP_STRINGS.ALL_ACCOUNTS && {}).current;

  return (
    <Surface mode={'flat'} style={[styles.container, bgStyle]}>
      <TouchableRipple onPress={onPress}>
        <Surface mode={'flat'} style={[styles.innerContainer, bgStyle]}>
          <Surface mode={'flat'} style={[styles.firstHalf, bgStyle]}>
            <Text variant="labelMedium">{bankName}</Text>
            <Text variant="labelMedium">{account}</Text>
            <Text variant="labelMedium">{'Available Balance'}</Text>
            <Text variant="headlineLarge">
              {APP_STRINGS.RS}
              {NumberUtils.formatNumber(
                availableBalance && availableBalance > 0
                  ? availableBalance
                  : lastReportedBalance,
              )}
            </Text>
            <Text variant="labelSmall">
              {'as of '}
              {reportedDateDisplay}
            </Text>
          </Surface>
          <Surface
            mode={'flat'}
            style={[
              styles.secondHalf,
              {
                backgroundColor: dark
                  ? colors.onSecondaryContainer
                  : colors.secondaryContainer,
              },
            ]}>
            <Text style={{color: colors.success}}>
              <Icon source={'trending-up'} size={16} color={colors.success} />
              {' in'}
            </Text>
            <Text style={{color: colors.shadow}}>
              {APP_STRINGS.RS}
              {NumberUtils.formatNumber(currentMonthIn)}
            </Text>
            <Divider
              style={[styles.divider, {backgroundColor: colors.surface}]}
            />
            <Text style={{color: colors.error}}>
              <Icon source={'trending-down'} size={16} color={colors.error} />
              {' out'}
            </Text>
            <Text style={{color: colors.shadow}}>
              {APP_STRINGS.RS}
              {NumberUtils.formatNumber(currentMonthExpense)}
            </Text>
          </Surface>
        </Surface>
      </TouchableRipple>
    </Surface>
  );
};

export default memo(AccountCard);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 12,
  },
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderRadius: 16,
    marginVertical: 16,
  },
  innerContainer: {
    // alignItems: 'center',
    // paddingBottom: 12,
    marginHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  firstHalf: {
    flex: 0.75,
  },

  secondHalf: {
    flex: 0.25,
    justifyContent: 'center',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
});
