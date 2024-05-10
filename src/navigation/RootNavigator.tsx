import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens/dashboard';
import {AccountTransactions} from '../screens/accountTransactions';

const Stack = createStackNavigator();

export const RootNavigator = ({}: any) => (
  <Stack.Navigator>
    <Stack.Screen name="Dashboard" component={Dashboard} />
    <Stack.Screen name="AccountTransactions" component={AccountTransactions} />
  </Stack.Navigator>
);
