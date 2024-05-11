import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Divider, Surface, Text} from 'react-native-paper';
import {AccountDataInfo} from 'src/types';

const RS = '₹';

const AccountCard = ({
  account,
  bankName,
  availableBalance,
  lastReportedBalance,
  onPress,
}: AccountDataInfo & {
  onPress: () => void;
}) => (
  <Surface style={styles.container}>
    <TouchableOpacity
      style={styles.innerContainer}
      onPress={() => {
        console.log('onPress', onPress);
        onPress();
      }}>
      <View style={styles.firstHalf}>
        <Text variant="labelMedium">{bankName}</Text>
        <Text variant="labelMedium">{account}</Text>
        <Text variant="labelMedium">{'Available Balance'}</Text>
        <Text variant="headlineLarge">
          {RS}
          {availableBalance && availableBalance > 0
            ? availableBalance
            : lastReportedBalance}
        </Text>
        <Text variant="labelSmall">
          {'as of '}
          {'Date'}
        </Text>
      </View>
      <View style={styles.secondHalf}>
        <Text>{'in'}</Text>
        <Text>
          {RS}
          {'123'}
        </Text>
        <Divider style={{height: 1, marginVertical: 12}} />
        <Text>{'out'}</Text>
        <Text>
          {RS}
          {'123'}
        </Text>
      </View>
    </TouchableOpacity>
  </Surface>
);

export default memo(AccountCard);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  innerContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  firstHalf: {
    flex: 0.75,
  },

  secondHalf: {
    flex: 0.25,
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
});
