import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import fb from "../../fb";

export default function ServicesScreen({ navigation }) {
    const { user } = useContext(UserContext);

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Notifications")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Your Notifications
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Sensors")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Sensors
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Actions")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Actions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Queries")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Queries
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Reports")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Reports
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Suggestions")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Suggestions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Gifts")} style={styles.title}>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Gifts
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Favorites")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Favorites
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("AddalinSensors")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        AddalinSensors
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Wishlist")}
                    style={styles.title}
                >
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Wishlist
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center",
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)",
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: "center",
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
