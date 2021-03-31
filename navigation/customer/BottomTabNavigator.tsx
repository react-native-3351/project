import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SensorsScreen from "../../screens/Customer/SensorsScreen";
import ServicesScreen from "../../screens/Customer/ServicesScreen";
import HomeScreen from "../../screens/Customer/placeholders/HomeScreen";
import SupportScreen from "../../screens/Customer/placeholders/SupportScreen";
import ActionsScreen from "../../screens/Customer/ActionsScreen";
import SettingsScreen from "../../screens/Customer/SettingsScreen";
import GiftsAsmarScreen from "../../Asmar/Customer/GiftsAsmarScreen";
import NotifsAsmarScreen from "../../Asmar/Customer/NotifsAsmarScreen";
import AdOverlay from "../../Asmar/AdOverlay";
import {
    BottomTabParamList,
    TabOneParamList,
    TabTwoParamList,
    TabThreeParamList,
    TabFourParamList,
    TabQueriesScreenParamList,
    TabSuggestionsScreenParamList,
    TabReportsScreenParamList,
} from "./types";
import QueriesScreen from "../../OmarSayed/Customer/Queries/QueriesScreen";
import SuggestionsScreen from "../../OmarSayed/Customer/Suggestions/SuggestionsScreen";
import ReportsScreen from "../../OmarSayed/Customer/Reports/ReportsScreen";
//---Addalin
import liveChatScreen from "../../addalin/screens/Customer/LiveChatScreen";
import ViewFavoritesScreen from "../../addalin/screens/Customer/ViewFavoritesScreen";
import WishListScreen from "../../addalin/screens/Customer/WishListScreen";
import ViewAllSensorsScreen from "../../addalin/screens/Customer/ViewAllSensorsScreen";
//---Addalin

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
    const showAdsEvery = 5;
    const [screens, setScreens] = React.useState(showAdsEvery);
    const [visible, setVisible] = React.useState(false);

    const colorScheme = useColorScheme();
    return (
        <>
            <AdOverlay visible={visible} setVisible={setVisible} />
            <BottomTab.Navigator
                initialRouteName="Home"
                tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
            >
                <BottomTab.Screen
                    name="Home"
                    component={TabOneNavigator}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="ios-home" color={color} />,
                    }}
                    // listeners={{
                    //     focus: (e) => {
                    //         if (screens == showAdsEvery) {
                    //             setVisible(true);
                    //             setScreens(0);
                    //         } else {
                    //             setScreens(screens + 1);
                    //         }
                    //     },
                    // }}
                />
                <BottomTab.Screen
                    name="Services"
                    component={TabTwoNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="file-tray-stacked" color={color} />
                        ),
                    }}
                    listeners={{
                        focus: (e) => {
                            if (screens == showAdsEvery) {
                                setVisible(true);
                                setScreens(0);
                            } else {
                                setScreens(screens + 1);
                            }
                        },
                    }}
                />
                <BottomTab.Screen
                    name="Support"
                    component={TabThreeNavigator}
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
                    listeners={{
                        focus: (e) => {
                            if (screens == showAdsEvery) {
                                setVisible(true);
                                setScreens(0);
                            } else {
                                setScreens(screens + 1);
                            }
                        },
                    }}
                />
                <BottomTab.Screen
                    name="Settings"
                    component={TabFourNavigator}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
                    }}
                    listeners={{
                        focus: (e) => {
                            if (screens == showAdsEvery) {
                                setVisible(true);
                                setScreens(0);
                            } else {
                                setScreens(screens + 1);
                            }
                        },
                    }}
                />
            </BottomTab.Navigator>
        </>
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
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerTitle: "Home" }}
            />
        </TabOneStack.Navigator>
    );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
    return (
        <TabTwoStack.Navigator>
            <TabTwoStack.Screen
                name="ServicesScreen"
                component={ServicesScreen}
                options={{ headerTitle: "Services" }}
            />
            <TabTwoStack.Screen
                name="Sensors"
                component={SensorsScreen}
                options={{ headerTitle: "Sensors" }}
            />
            <TabTwoStack.Screen
                name="Actions"
                component={ActionsScreen}
                options={{ headerTitle: "Actions" }}
            />
            <TabTwoStack.Screen
                name="Notifications"
                component={NotifsAsmarScreen}
                options={{ headerTitle: "Notifications" }}
            />
            <TabTwoStack.Screen
                name="Gifts"
                component={GiftsAsmarScreen}
                options={{ headerTitle: "Gifts" }}
            />
            <TabTwoStack.Screen
                name="Queries"
                component={QueriesScreen}
                options={{ headerTitle: "Queries" }}
            />
            <TabTwoStack.Screen
                name="Suggestions"
                component={SuggestionsScreen}
                options={{ headerTitle: "Suggestions" }}
            />
            <TabTwoStack.Screen
                name="Reports"
                component={ReportsScreen}
                options={{ headerTitle: "Reports" }}
            />
            <TabTwoStack.Screen
                name="ViewFavoritesScreen"
                component={ViewFavoritesScreen}
                options={{ headerTitle: "Favorites" }}
            />
            <TabTwoStack.Screen
                name="ViewAllSensorsScreen"
                component={ViewAllSensorsScreen}
                options={{ headerTitle: "All Sensors" }}
            />
            <TabTwoStack.Screen
                name="WishListScreen"
                component={WishListScreen}
                options={{ headerTitle: "WishList" }}
            />
        </TabTwoStack.Navigator>
    );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
    return (
        <TabThreeStack.Navigator>
            <TabThreeStack.Screen
                name="liveChatScreen"
                component={liveChatScreen}
                options={{ headerTitle: "live chat" }}
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
