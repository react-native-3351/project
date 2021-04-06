import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Icon } from "react-native-elements";

import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import SensorsScreen from "../../screens/Customer/SensorsScreen";
import HomeScreen from "../../screens/Customer/placeholders/HomeScreen";
import ActionsScreen from "../../screens/Customer/ActionsScreen";
import SettingsScreen from "../../screens/Customer/SettingsScreen";
//Asmar
import ServicesScreen from "../../Asmar/Customer/ServicesScreen";
import GiftsAsmarScreen from "../../Asmar/Customer/GiftsAsmarScreen";
import NotifsAsmarScreen from "../../Asmar/Customer/NotifsAsmarScreen";
import AdOverlay from "../../Asmar/AdOverlay";
//Omar
import QueriesScreen from "../../OmarSayed/Customer/Queries/QueriesScreen";
import SuggestionsScreen from "../../OmarSayed/Customer/Suggestions/SuggestionsScreen";
import ReportsScreen from "../../OmarSayed/Customer/Reports/ReportsScreen";
//---Addalin
import liveChatScreen from "../../addalin/screens/Customer/LiveChatScreen";
import ViewFavoritesScreen from "../../addalin/screens/Customer/ViewFavoritesScreen";
import WishListScreen from "../../addalin/screens/Customer/WishListScreen";
import ViewAllSensorsScreen from "../../addalin/screens/Customer/ViewAllSensorsScreen";
//---Addalin
//Aya Start
import CartScreen from "../../Aya/CartScreen";
import FeedbackScreen from "../../Aya/FeedbackScreen";
import FAQScreen from "../../Aya/FAQScreen";
import { BackgroundImage } from "react-native-elements/dist/config";
//Aya End

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const showAdsEvery = 5;
    const [screens, setScreens] = React.useState(showAdsEvery);
    const [visible, setVisible] = React.useState(false);

    const adListener = (e) => {
        if (screens == showAdsEvery) {
            setVisible(true);
            setScreens(0);
        } else {
            setScreens((prevCount) => prevCount + 1);
        }
    };

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
                    listeners={{
                        focus: adListener
                    }}
                />
                <BottomTab.Screen
                    name="Notifications"
                    component={TabFiveNavigator}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="notifications" color={color} />,
                    }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <BottomTab.Screen
                    name="Services"
                    component={TabTwoNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <AntDesign name="appstore-o" size={24} color="white" size={30} style={{ marginBottom: 15, backgroundColor: 'purple', padding: 10, borderRadius: 50 }} />
                            // <TabBarIcon name="file-tray-stacked" color={color} style={{BackgroundColor: 'red'}}/>
                        ),
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
                />
                <BottomTab.Screen
                    name="Settings"
                    component={TabFourNavigator}
                    options={{
                        tabBarIcon: ({ color }) => <TabBarIcon name="settings" color={color} />,
                    }}
                    listeners={{
                        focus: adListener
                    }}
                />
            </BottomTab.Navigator>
        </>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator();

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

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
    const showAdsEvery = 5;
    const [screens, setScreens] = React.useState(showAdsEvery);
    const [visible, setVisible] = React.useState(false);

    const adListener = (e) => {
        if (screens == showAdsEvery) {
            setVisible(true);
            setScreens(0);
        } else {
            setScreens((prevCount) => prevCount + 1);
        }
    };

    return (
        <>
            <AdOverlay visible={visible} setVisible={setVisible} />
            <TabTwoStack.Navigator>
                <TabTwoStack.Screen
                    name="ServicesScreen"
                    component={ServicesScreen}
                    options={{ headerTitle: "Services" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Sensors"
                    component={SensorsScreen}
                    options={{ headerTitle: "Sensors" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Actions"
                    component={ActionsScreen}
                    options={{ headerTitle: "Actions" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Notifications"
                    component={NotifsAsmarScreen}
                    options={{ headerTitle: "Notifications" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Gifts"
                    component={GiftsAsmarScreen}
                    options={{ headerTitle: "Gifts" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Queries"
                    component={QueriesScreen}
                    options={{ headerTitle: "Queries" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Suggestions"
                    component={SuggestionsScreen}
                    options={{ headerTitle: "Suggestions" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Reports"
                    component={ReportsScreen}
                    options={{ headerTitle: "Reports" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Favorites"
                    component={ViewFavoritesScreen}
                    options={{ headerTitle: "Favorites" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="AddalinSensors"
                    component={ViewAllSensorsScreen}
                    options={{ headerTitle: "All Sensors" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="Wishlist"
                    component={WishListScreen}
                    options={{ headerTitle: "WishList" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="CartScreen"
                    component={CartScreen}
                    options={{ headerTitle: "Cart" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="FeedbackScreen"
                    component={FeedbackScreen}
                    options={{ headerTitle: "Feedback" }}
                    listeners={{
                        focus: adListener
                    }}
                />
                <TabTwoStack.Screen
                    name="FAQs"
                    component={FAQScreen}
                    options={{ headerTitle: "FAQ" }}
                    listeners={{
                        focus: adListener
                    }}
                />
            </TabTwoStack.Navigator>
        </>
    );
}

const TabThreeStack = createStackNavigator();

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

const TabFourStack = createStackNavigator();

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

const TabFiveStack = createStackNavigator();

function TabFiveNavigator() {
    return (
        <TabFiveStack.Navigator>
            <TabFiveStack.Screen
                name="Notifications"
                component={NotifsAsmarScreen}
                options={{ headerTitle: "Notifications" }}
            />
        </TabFiveStack.Navigator>
    );
}
