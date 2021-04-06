import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import AdsAsmarScreen from "../../Asmar/Marketer/AdsAsmarScreen";
import NotifsAsmarScreen from "../../Asmar/Marketer/NotifsAsmarScreen";
import PromotionsAsmarScreen from "../../Asmar/Marketer/PromotionsAsmarScreen";
import SettingsScreen from "../../Asmar/Marketer/SettingsScreen";
import DashboardScreen from "../../Asmar/Marketer/DashboardScreen";

import {
    BottomTabParamList,
    TabOneParamList,
    TabTwoParamList,
    TabThreeParamList,
    TabFourParamList,
    TabFiveParamList,

} from "./types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
        >
            <BottomTab.Screen
                name="Dashboard"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="home-outline" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Notifications"
                component={TabFiveNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="notifications-outline" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Promotions"
                component={TabTwoNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="pricetag-outline" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Advertisements"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="images-outline" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={TabFourNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="settings-outline" color={color} />,
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
                name="Dashboard"
                component={DashboardScreen}
                options={{ headerTitle: "Dashboard" }}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="PromotionsAsmarScreen"
                component={PromotionsAsmarScreen}
                options={{ headerTitle: "Promotions" }}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="AdsAsmarScreen"
                component={AdsAsmarScreen}
                options={{ headerTitle: "Advertisements" }}
            />
        </TabThreeStack.Navigator>
    );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
    return (
        <TabFourStack.Navigator>
            <TabFourStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerTitle: "Settings" }}
            />
        </TabFourStack.Navigator>
    );
}
const TabFiveStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
    return (
        <TabFiveStack.Navigator>
            <TabFiveStack.Screen
                name="NotifsAsmarScreen"
                component={NotifsAsmarScreen}
                options={{ headerTitle: "Notifications" }}
            />
        </TabFiveStack.Navigator>
    );
}