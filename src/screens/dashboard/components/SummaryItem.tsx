import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Surface, Text} from 'react-native-paper';
import {AccountDataInfo} from 'src/types';

const SummaryItem = ({
  account,
  bankName,
  availableBalance,
  onPress,
}: AccountDataInfo & {
  onPress: () => void;
}) => (
  <Surface style={styles.container}>
    <TouchableOpacity
      onPress={() => {
        console.log('onPress', onPress);
        onPress();
      }}>
      <View />
      <Text>{account}</Text>
      <Text>{bankName}</Text>
      <Text>{availableBalance}</Text>
    </TouchableOpacity>
  </Surface>
);

export default memo(SummaryItem);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
