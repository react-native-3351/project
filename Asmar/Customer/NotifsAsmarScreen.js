import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "../../components/Themed";
import db from "../../db";
import UserContext from "../../UserContext";
import { ListItem, Icon, Card } from "react-native-elements";

export default function NotifsAsmarScreen() {
    const { user } = useContext(UserContext);
    const [notifications, setNotifications] = useState(null);
    useEffect(() => db.Users.Notifications.listenAll(setNotifications, user.id), []);

    return (
        <View>
            <View style={styles.getStartedContainer}>
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
                                  </Card>
                              )
                      )
                    : null}
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
