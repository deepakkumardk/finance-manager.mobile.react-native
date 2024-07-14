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
import CategoryPicker from './CategoryPicker';
import {APP_STRINGS, TRANSACTION_CATEGORY} from 'src/constants';
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

  const [showMessage, setShowMessage] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryList, setCategoryList] = useState(TRANSACTION_CATEGORY);

  const debitCreditText =
    item?.extractedData.type === 'Credit'
      ? '+'
      : item?.extractedData.type === 'Debit'
      ? '-'
      : '';

  const [category, setCategory] = useState(item?.userData?.category || '');
  const [tags, setTags] = useState(item?.userData?.tags || '');
  // const categoryRef = useRef(category);
  const iconRef = useRef(category);
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
        <Button
          mode="text"
          compact={true}
          style={styles.createNew}
          labelStyle={styles.smallText}
          onPress={() => setShowMessage(prev => !prev)}>
          {showMessage ? 'Hide' : 'Show'}
          {' Message'}
        </Button>
        {showMessage ? (
          <Text style={{color: colors.onSurfaceDisabled}}>
            {item?.rawSms.body}
          </Text>
        ) : null}

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

          <CategoryPicker
            category={item?.userData.category}
            items={categoryList}
            onChange={(value: string) => setCategory(value)}
          />
          <Button icon={'plus'} style={styles.createNew}>
            {'Create New'}
          </Button>
          <TextInput
            label="Tags"
            placeholder="Comma (,) separated tags"
            value={tags}
            onChangeText={value => setTags(value)}
          />
          <ScrollView horizontal>
            <Surface
              style={[styles.row, {backgroundColor: colors.background}]}
              mode="flat">
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
            style={[
              styles.row,
              styles.input,
              styles.buttonContainer,
              {backgroundColor: colors.background},
            ]}>
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
                    icon: iconRef.current,
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
    marginVertical: 4,
    borderRadius: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  createNew: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
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
    marginBottom: 8,
  },
  smallText: {
    fontSize: 12,
  },
});
