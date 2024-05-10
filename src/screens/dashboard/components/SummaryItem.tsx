import React, {memo} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import {Surface, Text, TouchableRipple} from 'react-native-paper';
import {AccountDataInfo, KeywordData} from '../../../types';

const SummaryItem = ({
  account,
  bankName,
  currentBalance,
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
      <Text>{currentBalance}</Text>
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
