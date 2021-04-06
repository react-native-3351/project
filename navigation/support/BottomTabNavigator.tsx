import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
// @ts-expect-error
import ServerScreen from '../../screens/Support/ServerScreen';
// @ts-expect-error
import Settings from '../../screens/Support/RequestScreen';
// @ts-expect-error
import ViewUnreadMessagesScreen from '../../addalin/screens/Support/ViewUnreadChatsScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList } from './types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="Server"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Server"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <Ionicons
          size={30}
          style={{ marginBottom: -3 }}
          name="server"
          color={color}
      />,
        }}
      />
      <BottomTab.Screen
        name="Live Chat"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
              <AntDesign
                  size={30}
                  style={{ marginBottom: -3 }}
                  name="customerservice"
                  color={color}
              />
          ),
      }}
      />
      <BottomTab.Screen
        name="Settings"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
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
        name="ServerScreen"
        component={ServerScreen}
        options={{ headerTitle: 'Server' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="ViewUnreadMessagesScreen"
        component={ViewUnreadMessagesScreen}
        options={{ headerTitle: 'Live Chat' }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="Settings"
        component={Settings}
        options={{ headerTitle: 'Settings' }}
      />
    </TabThreeStack.Navigator>
  );
}