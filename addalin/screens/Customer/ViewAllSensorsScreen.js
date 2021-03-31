import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Overlay, ListItem, Card, Icon } from "react-native-elements";
import { View, Text } from "../../../components/Themed";
import UserContext from "../../../UserContext";
import db from "../../../db";

export default function ViewAllSensorsScreen() {
    const { user } = useContext(UserContext);
    const userId = user.id ? user.id : "-";

    const [sensors, setSensors] = useState([]);

    const [favorites, setFavorites] = useState([]);

    useEffect(() => db.Sensors.listenAll(setSensors), []);

    useEffect(() => db.Users.Favorite.listenToUsersFavorite(setFavorites, userId), [userId]);

    const markedFav = (sensorId) => {
        if (sensorId) {
            return favorites.filter((item) => item.sensorId === sensorId).length;
        } else {
            return -1;
        }
    };

    const saveFav = async (sensorId) => {
        await db.Users.Favorite.saveFavorite(sensorId, userId);
    };

    const deleteFav = async (sensorId) => {
        const found = favorites.filter((item) => item.sensorId === sensorId);
        await db.Users.Favorite.deleteFavorite(userId, found[0].id);
    };

    return (
        <View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.getStartedContainer}>
                    {sensors.length !== 0 ? (
                        sensors.map((sensor) => {
                            return (
                                <ListItem style={{ width: 350 }} key={sensor.id} bottomDivider>
                                    <ListItem.Content>
                                        <Card>
                                            <Card.Title>Sensor Details</Card.Title>
                                            <Card.Divider />
                                            <Text style={{ marginBottom: 10 }}>
                                                Category ID: {sensor.categoryid}
                                            </Text>
                                            <Text style={{ marginBottom: 10 }}>
                                                Model ID: {sensor.modelId}
                                            </Text>
                                            <Text style={{ marginBottom: 10 }}>
                                                Location: {sensor.location}
                                            </Text>
                                            {markedFav(sensor.id) == 0 ? (
                                                <Button
                                                    type="clear"
                                                    icon={
                                                        <Icon
                                                            size={40}
                                                            name="heart-o"
                                                            type="font-awesome"
                                                            color="#FF69B4"
                                                        />
                                                    }
                                                    iconRight
                                                    onPress={() => saveFav(sensor.id)}
                                                />
                                            ) : (
                                                <Button
                                                    type="clear"
                                                    icon={
                                                        <Icon
                                                            size={40}
                                                            name="heart"
                                                            type="font-awesome"
                                                            color="#FF69B4"
                                                        />
                                                    }
                                                    iconRight
                                                    onPress={() => deleteFav(sensor.id)}
                                                />
                                            )}
                                        </Card>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        })
                    ) : (
                        <ListItem style={{ width: 350 }} key={1}>
                            <ListItem.Content>
                                <ListItem.Title>Loading...</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )}
                </View>
            </ScrollView>
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
