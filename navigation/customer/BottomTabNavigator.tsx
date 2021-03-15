import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
// @ts-expect-error
import SensorsScreen from '../../screens/Customer/SensorsScreen';
// @ts-expect-error
import ActionsScreen from '../../screens/Customer/ActionsScreen';
// @ts-expect-error
import SettingsScreen from '../../screens/Customer/SettingsScreen';

//---Addalin
// @ts-expect-error
import liveChatScreen from '../../addalin/screens/Customer/LiveChatScreen';
// @ts-expect-error
import ViewFavoritesScreen from '../../addalin/screens/Customer/ViewFavoritesScreen';
// @ts-expect-error
import WishListScreen from '../../addalin/screens/Customer/WishListScreen';
// @ts-expect-error
import ViewAllSensorsScreen from '../../addalin/screens/Customer/ViewAllSensorsScreen';
//---Addalin
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList,TabFourAddalinParamList,TabFiveAddalinParamList,TabSixAddalinParamList,TabSevenAddalinParamList } from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Sensors"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Sensors"
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
        name="liveChat"
        component={TabFourAddalinNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ViewFavorites"
        component={TabFiveAddalinNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="WishList"
        component={TabSixAddalinNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ViewAllSensors"
        component={TabSevenAddalinNavigator}
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
        name="SensorsScreen"
        component={SensorsScreen}
        options={{ headerTitle: 'Sensors' }}
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

//Addalin Start
const TabFourAddalinStack = createStackNavigator<TabFourAddalinParamList>();

function TabFourAddalinNavigator() {
  return (
    <TabFourAddalinStack.Navigator>
      <TabFourAddalinStack.Screen
        name="liveChatScreen"
        component={liveChatScreen}
        options={{ headerTitle: 'live chat' }}
      />
    </TabFourAddalinStack.Navigator>
  );
}
const TabFiveAddalinStack = createStackNavigator<TabFiveAddalinParamList>();

function TabFiveAddalinNavigator() {
  return (
    <TabFiveAddalinStack.Navigator>
      <TabFiveAddalinStack.Screen
        name="ViewFavoritesScreen"
        component={ViewFavoritesScreen}
        options={{ headerTitle: 'Favorites' }}
      />
    </TabFiveAddalinStack.Navigator>
  );
}
const TabSevenAddalinStack = createStackNavigator<TabSevenAddalinParamList>();

function TabSevenAddalinNavigator() {
  return (
    <TabSevenAddalinStack.Navigator>
      <TabSevenAddalinStack.Screen
        name="ViewAllSensorsScreen"
        component={ViewAllSensorsScreen}
        options={{ headerTitle: 'All Sensors' }}
      />
    </TabSevenAddalinStack.Navigator>
  );
}
const TabSixAddalinStack = createStackNavigator<TabSixAddalinParamList>();

function TabSixAddalinNavigator() {
  return (
    <TabSixAddalinStack.Navigator>
      <TabSixAddalinStack.Screen
        name="WishListScreen"
        component={WishListScreen}
        options={{ headerTitle: 'WishList' }}
      />
    </TabSixAddalinStack.Navigator>
  );
}
//Addalin End