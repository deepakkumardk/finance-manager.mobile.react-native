import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens/dashboard';
import {AccountTransactions} from '../screens/accountTransactions';
import {useTheme} from 'react-native-paper';
import {Stats} from 'src/screens/stats';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Settings} from 'src/screens/settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateNew} from 'src/screens/createNew';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getTabIcon = ({focused, size, name, color}: any) => {
  const {colors} = useTheme();

  return (
    <IonIcons
      name={focused ? name : name + '-outline'}
      size={size ?? 24}
      color={color}
      // color={focused ? colors.primary : colors.backdrop}
    />
  );
};
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 64,
          borderRadius: 36,
          marginVertical: 12,
          marginHorizontal: 20,
        },
        tabBarLabelStyle: {
          paddingBottom: 8,
        },
        tabBarIconStyle: {
          marginBottom: -6,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: (props: any) => getTabIcon({...props, name: 'home'}),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: (props: any) => getTabIcon({...props, name: 'pie-chart'}),
        }}
      />
      <Tab.Screen
        name="CreateNew"
        component={CreateNew}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: (props: any) =>
            getTabIcon({...props, name: 'add-circle'}),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: (props: any) => getTabIcon({...props, name: 'settings'}),
        }}
      />
    </Tab.Navigator>
  );
};
export const RootNavigator = ({}: any) => (
  <Stack.Navigator>
    <Stack.Screen
      name="BottomTabs"
      component={BottomTabs}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name="AccountTransactions" component={AccountTransactions} />
  </Stack.Navigator>
);
