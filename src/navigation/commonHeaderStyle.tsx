import React from 'react';

import type {StackNavigationOptions} from '@react-navigation/stack';
import {MD3Colors} from 'react-native-paper/lib/typescript/types';
import {Icon} from 'react-native-paper';

export const commonHeaderStyle = (
  colors: MD3Colors,
): StackNavigationOptions => ({
  headerStyle: {
    backgroundColor: colors.surface,
  },
  headerTintColor: colors.onSurface,
  headerTitleAlign: 'center',
  headerTitleStyle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <Icon source={'arrow-left'} color={colors.primary} size={30} />
  ),
});
