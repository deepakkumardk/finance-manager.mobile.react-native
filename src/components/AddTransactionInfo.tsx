import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Button,
  Chip,
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
} from 'react-native-paper';
import {APP_STRINGS} from 'src/constants';
import {useSmsModel} from 'src/hooks';
import {useAppTheme} from 'src/theme';
import {KeywordData} from 'src/types';
import {NumberUtils} from 'src/utils';

export const AddTransactionInfo = ({
  visible,
  item,
  onSubmit,
  onDismiss,
}: {
  visible: boolean;
  item?: KeywordData;
  onSubmit: (data: KeywordData) => void;
  onDismiss: () => void;
}) => {
  const {colors} = useAppTheme();

  const debitCreditText =
    item?.extractedData.type === 'Credit'
      ? '+'
      : item?.extractedData.type === 'Debit'
      ? '-'
      : '';

  const [category, setCategory] = useState(item?.userData?.category || '');
  const [tags, setTags] = useState(item?.userData?.tags || '');
  const categoryRef = useRef<any>();
  const {createOrUpdate} = useSmsModel();

  const onSavePress = () => {
    const smsModel = {
      category,
      date: item?.rawSms.date ?? '',
      tags,
    };
    createOrUpdate(smsModel);
    onDismiss();
  };

  useEffect(() => {
    if (!visible) {
      return;
    }
    categoryRef.current?.focus();
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
        <Text variant="titleMedium" style={styles.center}>
          {'Add Transaction Info'}
        </Text>
        <Surface mode="flat" style={{backgroundColor: colors.background}}>
          <Surface
            mode="flat"
            style={[styles.textApart, {backgroundColor: colors.background}]}>
            <Text variant="labelSmall">
              {debitCreditText === '+' ? 'From' : 'To'}
            </Text>
            <Text>{item?.extractedData.senderUpi || 'N/A'}</Text>
          </Surface>
          <Surface
            mode="flat"
            style={[styles.textApart, {backgroundColor: colors.background}]}>
            <Text variant="labelSmall">{'Amount'}</Text>
            <Text
              style={[
                {
                  color:
                    debitCreditText === '+' ? colors.success : colors.error,
                },
                styles.debitCreditText,
              ]}>
              {debitCreditText +
                APP_STRINGS.RS +
                NumberUtils.formatNumber(item?.extractedData?.amount)}
            </Text>
          </Surface>
          {item?.extractedData.availableBalance ? (
            <Surface
              mode="flat"
              style={[styles.textApart, {backgroundColor: colors.background}]}>
              <Text variant="labelSmall">{'Balance at that time'}</Text>
              <Text>{item?.extractedData.availableBalance}</Text>
            </Surface>
          ) : null}

          <TextInput
            ref={categoryRef}
            style={styles.input}
            label="Category"
            placeholder="Unique category of the transaction"
            value={category}
            onChangeText={value => setCategory(value)}
          />
          <TextInput
            label="Tags"
            placeholder="Comma (,) separated tags"
            value={tags}
            onChangeText={value => setTags(value)}
          />
          <ScrollView horizontal>
            <Surface style={styles.row}>
              {tags &&
                tags.split(',').map(tag => (
                  <Chip key={tag} style={styles.chip}>
                    {'#'}
                    {tag}
                  </Chip>
                ))}
            </Surface>
          </ScrollView>
          <Surface
            mode="flat"
            style={[styles.row, styles.input, styles.buttonContainer]}>
            <Button mode="outlined" style={styles.button} onPress={onDismiss}>
              {'Cancel'}
            </Button>
            <Button
              disabled={!category}
              mode="contained"
              style={styles.button}
              onPress={() => {
                onSavePress();
                // @ts-ignore
                onSubmit({
                  ...item,
                  userData: {
                    category,
                    tags: tags,
                  },
                });
              }}>
              {'Save'}
            </Button>
          </Surface>
        </Surface>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    padding: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: 'absolute',
    start: 0,
    end: 0,
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  chip: {
    padding: 2,
    borderRadius: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  input: {
    marginVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },

  debitCreditText: {
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  textApart: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  center: {
    alignSelf: 'center',
  },
});
