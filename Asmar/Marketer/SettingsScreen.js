import React from "react";
import { StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native";
import { Text } from "../../components/Themed";
import Colors from "../../constants/Colors";
import fb from "../../fb";

export default function SettingsScreen() {

    const logout = async () => {
        await fb.auth().signOut();
    };

    //console.log(user);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={{
                    uri: "https://wallpaperaccess.com/full/1105968.jpg"
                }}
            >
                <TouchableOpacity onPress={logout} style={styles.title}>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
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
