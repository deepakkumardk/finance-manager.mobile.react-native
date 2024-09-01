import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Chip, Surface, Text, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import CategoryPicker from './CategoryPicker';
import {APP_STRINGS, TRANSACTION_CATEGORY} from 'src/constants';
import {useSmsModel} from 'src/hooks';
import {useAppTheme} from 'src/theme';
import {AddTransactionProps} from 'src/types';
import {NumberUtils} from 'src/utils';
import {getMostUsedTags} from 'src/module';
import {STRINGS} from './strings';

export const AddTransactionInfo = ({
  item,
  onSubmit,
  onDismiss,
}: AddTransactionProps) => {
  const {colors} = useAppTheme();

  const navigation = useNavigation();

  const [showMessage, setShowMessage] = useState(true);

  const debitCreditText =
    item?.extractedData.type === 'Credit'
      ? '+'
      : item?.extractedData.type === 'Debit'
      ? '-'
      : '';

  const [category, setCategory] = useState(item?.userData?.category || '');
  const [tags, setTags] = useState(item?.userData?.tags || '');
  const [comment, setComment] = useState(item?.userData?.comment || '');
  // const categoryRef = useRef(category);
  // const iconRef = useRef(category);
  const {createOrUpdate} = useSmsModel();

  const onSavePress = () => {
    const smsModel = {
      category,
      // TODO update it for dynamic icon
      icon:
        TRANSACTION_CATEGORY.find(_item => _item.label === category)?.icon ||
        '',
      date: item?.rawSms.date ?? '',
      comment,
      tags,
    };
    createOrUpdate(smsModel);

    // @ts-ignore
    onSubmit({
      ...item,
      userData: smsModel,
    });
    onDismiss();
  };

  const onSuggestedTagPress = (tag: string) => {
    setTags(prev => {
      if (prev.split(',').includes(tag)) {
        return prev;
      }
      return prev.concat(',' + tag);
    });
  };

  return (
    <Surface mode="flat" style={{backgroundColor: colors.background}}>
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
              color: debitCreditText === '+' ? colors.success : colors.error,
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
        defaultValue={item?.userData.category}
        onChange={(value: string) => setCategory(value)}
      />
      <Button icon={'plus'} compact style={styles.createNew}>
        {'Create New'}
      </Button>
      <Text variant="labelSmall">{'Pick From most used tags'}</Text>
      <ScrollView horizontal>
        <Surface
          style={[styles.row, {backgroundColor: colors.background}]}
          mode="flat">
          {getMostUsedTags(tags).map(tag => (
            <Chip
              key={tag}
              style={styles.chip}
              onPress={() => onSuggestedTagPress(tag)}>
              {'#'}
              {tag}
            </Chip>
          ))}
        </Surface>
      </ScrollView>
      <TextInput
        style={styles.input}
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
              <Chip key={tag} compact mode="outlined" style={styles.chip}>
                {'#'}
                {tag}
              </Chip>
            ))}
        </Surface>
      </ScrollView>
      <TextInput
        style={styles.input}
        label="Comment"
        placeholder="Comment"
        value={comment}
        onChangeText={value => setComment(value)}
      />
      <Surface
        mode="flat"
        style={[
          styles.row,
          styles.input,
          styles.buttonContainer,
          {backgroundColor: colors.background},
        ]}>
        <Button mode="outlined" style={styles.button} onPress={onDismiss}>
          {'Close'}
        </Button>
        <Button
          disabled={!category}
          mode="contained-tonal"
          style={styles.button}
          onPress={onSavePress}>
          {'Save'}
        </Button>
      </Surface>

      <Text>{STRINGS.SIMILAR_TRANSACTIONS}</Text>
      <Button
        mode="contained"
        style={styles.button}
        icon={{source: 'bell-ring-outline', direction: 'ltr'}}
        onPress={() => {
          onDismiss();
          // @ts-ignore
          navigation.navigate('CreateCustomRule', {item});
        }}>
        {STRINGS.CUSTOM_RULE}
      </Button>
    </Surface>
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
    marginVertical: 5,
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
