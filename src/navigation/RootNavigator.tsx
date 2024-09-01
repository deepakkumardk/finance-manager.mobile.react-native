import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from '../screens/dashboard';
import {AccountTransactions} from '../screens/accountTransactions';
import {Stats} from 'src/screens/stats';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {Settings} from 'src/screens/settings';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {CreateNew} from 'src/screens/createNew';
import {commonHeaderStyle} from 'src/navigation/commonHeaderStyle';
import {useTheme} from 'react-native-paper';
import {SplashScreen} from 'src/screens/splashScreen';
import {CreateCustomRule} from 'src/screens/customRule/CreateCustomRule';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getTabIcon = ({focused, size, name, color}: any) => {
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
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      // @ts-ignore
      screenOptions={{
        ...commonHeaderStyle(colors),
        tabBarStyle: {
          height: 60,
          borderRadius: 36,
          marginBottom: 4,
          marginHorizontal: 12,
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
          title: 'Home',
          tabBarLabel: 'Home',
          tabBarIcon: (props: any) => getTabIcon({...props, name: 'home'}),
        }}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={{
          title: 'Statistics',
          tabBarLabel: 'Stats',
          tabBarIcon: (props: any) => getTabIcon({...props, name: 'pie-chart'}),
        }}
      />
      {/* <Tab.Screen
        name="CreateNew"
        component={CreateNew}
        options={{
          title: 'Create New Transaction',
          tabBarLabel: 'Create',
          tabBarIcon: (props: any) =>
            getTabIcon({...props, name: 'add-circle'}),
        }}
      /> */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: (props: any) => getTabIcon({...props, name: 'settings'}),
        }}
      />
    </Tab.Navigator>
  );
};
export const RootNavigator = ({}: any) => {
  const {colors} = useTheme();

  return (
    <Stack.Navigator screenOptions={{...commonHeaderStyle(colors)}}>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountTransactions"
        component={AccountTransactions}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateCustomRule"
        component={CreateCustomRule}
        options={{title: 'Create Custom Rule'}}
      />
    </Stack.Navigator>
  );
};
