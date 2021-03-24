import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
// @ts-expect-error
import SensorsScreen from '../../screens/Admin/DashboardScreen';
// @ts-expect-error
import ActionsScreen from '../../screens/Admin/ActionsScreen';
// @ts-expect-error
import SettingsScreen from '../../screens/Admin/SettingsScreen';
// @ts-expect-error
import InventoryScreen from '../../Aya/InventoryScreen.js';
// @ts-expect-error
import FAQScreen from '../../Aya/FAQScreen.js';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabOneAyaParamList, TabTwoAyaParamList} from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  TabOneAyaNavigator
  return (
    <BottomTab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Dashboard"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Actions"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
       <BottomTab.Screen
    name="Inventory"
    component={TabOneAyaNavigator}
    options={{
      tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
    }}
  />
     <BottomTab.Screen
    name="FAQ"
    component={TabTwoAyaNavigator}
    options={{
      tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
    }}
  />
    </BottomTab.Navigator>
    
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  // @ts-expect-error
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="DashboardScreen"
        component={SensorsScreen}
        options={{ headerTitle: 'Dashboard' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ActionsScreen"
        component={ActionsScreen}
        options={{ headerTitle: 'Actions' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </TabThreeStack.Navigator>
  );
}
const TabOneAyaStack = createStackNavigator<TabOneAyaParamList>();

function TabOneAyaNavigator() {
  return (
    <TabOneAyaStack.Navigator>
      <TabOneAyaStack.Screen
        name="InventoryScreen"
        component={InventoryScreen}
        options={{ headerTitle: 'Inventory' }}
      />
    </TabOneAyaStack.Navigator>
  );
}

const TabTwoAyaStack = createStackNavigator<TabTwoAyaParamList>();

function TabTwoAyaNavigator() {
  return (
    <TabTwoAyaStack.Navigator>
      <TabTwoAyaStack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{ headerTitle: 'FAQ' }}
      />
    </TabTwoAyaStack.Navigator>
  );
}