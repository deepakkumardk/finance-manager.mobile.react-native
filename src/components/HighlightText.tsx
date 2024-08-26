import React from 'react';
import {Text} from 'react-native-paper';

import {StringUtils} from 'src/module';
import {useAppTheme} from 'src/theme';
import {HighlightTextProps} from 'src/types';

export const HighlightText = ({
  query = '',
  children,
  ...rest
}: HighlightTextProps) => {
  const {colors} = useAppTheme();
  const splitStrings = StringUtils.splitStringByQuery(children, query);

  if (query) {
    return (
      <Text {...rest}>
        {splitStrings.map((value, index) => (
          <Text
            key={value + index}
            style={
              value.toLowerCase() === query && {
                backgroundColor: colors.warnContainer,
              }
            }
            {...rest}>
            {value}
          </Text>
        ))}
      </Text>
    );
  }

  return <Text {...rest}>{children}</Text>;
};
