import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../../../constants/Colors";
import useColorScheme from "../../../hooks/useColorScheme";
// @ts-expect-error
import SensorsScreen from "../../CustomerService/SensorsScreen";
// import ActionsScreen from '../../../screens/Customer/ActionsScreen';
// @ts-expect-error
// import SettingsScreen from '../../Customer/QueriesScreen';
import SettingsScreen from "../../SettingsScreen";
// @ts-expect-error
import QueriesScreen from "../../CustomerService/QueriesScreen";
// @ts-expect-error
import ReportsScreen from "../../CustomerService/Reports/ReportsScreen";
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import {
    BottomTabParamList,
    TabOneParamList,
    TabThreeParamList,
    TabQueriesScreenParamList,
    TabReportsScreenParamList,
} from "./types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const colorScheme = useColorScheme();
    return (
        <BottomTab.Navigator
            initialRouteName="Dashboard"
            tabBarOptions={{ activeTintColor: 'green' }}
        >
            <BottomTab.Screen
                name="Dashboard"
                component={TabOneNavigator}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome name="dashboard" size={40} style={{marginBottom: 10}} color="purple" />,
                }}
            />
            <BottomTab.Screen
                name="Queries"
                component={TabFourNavigator}
                options={{
                    tabBarIcon: ({ color }) => <AntDesign name="questioncircle" size={35} style={{marginBottom: 10}} color="purple" />,
                }}
            />

            <BottomTab.Screen
                name="Reports"
                component={TabFiveNavigator}
                options={{
                    tabBarIcon: ({ color }) => <MaterialIcons name="report" size={40} style={{marginBottom: 10}} color="purple" />,
                }}
            />

            <BottomTab.Screen
                name="Logout"
                component={TabThreeNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Entypo name="log-out" size={35} style={{marginBottom: 10}} color="red" />,
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
                options={{ headerTitle: "Dashboard" }}
            />
        </TabOneStack.Navigator>
    );
}

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//   return (
//     <TabTwoStack.Navigator>
//       <TabTwoStack.Screen
//         name="ActionsScreen"
//         component={ActionsScreen}
//         options={{ headerTitle: 'Actions' }}
//       />
//     </TabTwoStack.Navigator>
//   );
// }

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={{ headerTitle: "Settings" }}
            />
        </TabThreeStack.Navigator>
    );
}
const TabFourStack = createStackNavigator<TabQueriesScreenParamList>();

function TabFourNavigator() {
    return (
        <TabFourStack.Navigator>
            <TabFourStack.Screen
                name="QueriesScreen"
                component={QueriesScreen}
                options={{ headerTitle: "Queries" }}
            />
        </TabFourStack.Navigator>
    );
}
const TabFiveStack = createStackNavigator<TabReportsScreenParamList>();

function TabFiveNavigator() {
    return (
        <TabFiveStack.Navigator>
            <TabFiveStack.Screen
                name="ReportsScreen"
                component={ReportsScreen}
                options={{ headerTitle: "Reports" }}
            />
        </TabFiveStack.Navigator>
    );
}
