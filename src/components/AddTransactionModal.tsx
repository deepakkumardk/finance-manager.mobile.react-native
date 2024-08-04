import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Modal, Portal} from 'react-native-paper';

import {AddTransactionInfo} from './AddTransactionInfo';
import {AddTransactionProps} from 'src/types';
import {useAppTheme} from 'src/theme';

export const AddTransactionModal = ({
  visible,
  item,
  onSubmit,
  onDismiss,
}: {
  visible: boolean;
} & AddTransactionProps) => {
  const {colors} = useAppTheme();

  useEffect(() => {
    if (!visible) {
      return;
    }
  }, [visible]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[
          styles.containerStyle,
          {backgroundColor: colors.background},
        ]}>
        <Divider style={styles.divider} />
        <AddTransactionInfo
          item={item}
          onSubmit={onSubmit}
          onDismiss={onDismiss}
        />
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '10%',
    height: 8,
    alignSelf: 'center',
  },
  containerStyle: {
    paddingHorizontal: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: 'absolute',
    start: 0,
    end: 0,
    bottom: 0,
  },
});
