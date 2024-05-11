import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens/dashboard';
import {AccountTransactions} from '../screens/accountTransactions';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import {useTheme} from 'react-native-paper';
import {Stats} from 'src/screens/stats';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Settings} from 'src/screens/settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CreateNew} from 'src/screens/createNew';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  const {colors} = useTheme();

  const TabIcon = ({focused, name}) => (
    <IonIcons name={focused ? name : name + '-outline'} size={24} />
  );

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
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} name={'home'} />
          ),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          tabBarLabel: 'Stats',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} name={'pie-chart'} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateNew"
        component={CreateNew}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} name={'add-circle'} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({focused}) => (
            <TabIcon focused={focused} name={'settings'} />
          ),
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
