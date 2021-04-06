import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { View, Text } from "../../components/Themed";
import db from "../../db";
import UserContext from "../../UserContext";
import { Card } from "react-native-elements";
import { styles as styleExt, image as img } from "../../OmarSayed/StyleComponents";
export default function NotifsAsmarScreen({ navigation }) {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications] = useState(null);
    useEffect(() => db.Users.Notifications.listenAll(setNotifications, user.id), []);

    const handleVisit = (link) => {
        navigation.navigate(link);
    }

    const handleDismiss = (id) => {
        db.Users.Notifications.dismiss(user.id, id);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={img} style={styleExt.image}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.helpLinkText}>Your Notifications!</Text>
                    {notifications
                        ? notifications.map(
                            (notif) =>
                                !notif.isRead && (
                                    <Card key={notif.id}>
                                        <Card.Title>{notif.title}</Card.Title>
                                        <Text>{notif.body}</Text>
                                        <Text>
                                            {new Date(
                                                notif.timestamp.seconds * 1000
                                            ).toLocaleString()}
                                        </Text>
                                        <Card.Divider />
                                        <View>
                                            <TouchableOpacity onPress={() => handleVisit(notif.link)} styles={styles.title}>
                                                <Text style={{ alignSelf: 'flex-start' }}>Visit</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDismiss(notif.id)} styles={styles.title}>
                                                <Text style={{ alignSelf: 'flex-end' }}>Dismiss</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </Card>
                                )
                        )
                        : <Text>
                            No notifications to show.
                    </Text>}

                </ScrollView>
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
        color: '#2e78b7',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        // paddingTop: 50
    },
});
