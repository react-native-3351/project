import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Button, Overlay, ListItem, Icon } from "react-native-elements";
import UserContext from "../../../UserContext";
import db from "../../../db";
import ViewSensor from "./ViewFavoritesSensorScreen";

export default function ViewFavoritesScreen() {
    const image = {
        uri: "https://wallpaperaccess.com/full/1105968.jpg",
    };

    const { user } = useContext(UserContext);
    const userId = user.id ? user.id : "-";

    const [favorites, setFavorites] = useState([]);

    const [id, setId] = useState(null);

    const toggleOverlay = async (id) => {
        setId(id);
    };

    const deleteList = async (id) => {
        //console.log("Delete", id)
        await db.Users.Favorite.deleteFavorite(userId, id);
    };

    useEffect(() => db.Users.Favorite.listenToUsersFavorite(setFavorites, userId), [userId]);

    return (
        <ImageBackground source={image} style={styles.image}>
            <View>
                <View>
                    <ScrollView>
                        {favorites.length !== 0 ? (
                            favorites.map((favorite) => {
                                return (
                                    <ListItem
                                        style={{ width: 450 }}
                                        containerStyle={{ backgroundColor: "purple" }}
                                        key={favorite.id}
                                        bottomDivider
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title>
                                                <Text style={styles.paragraph}>
                                                    ID: {favorite.sensorId}
                                                </Text>
                                            </ListItem.Title>
                                            <View style={{ flexDirection: "row" }}>
                                                <Button
                                                    buttonStyle={{ backgroundColor: "purple" }}
                                                    title="View Sensor Details"
                                                    onPress={() => toggleOverlay(favorite.sensorId)}
                                                />
                                                <Button
                                                    type="clear"
                                                    icon={
                                                        <Icon name="delete" size={25} color="red" />
                                                    }
                                                    iconRight
                                                    onPress={async () =>
                                                        await deleteList(favorite.id)
                                                    }
                                                />
                                            </View>
                                            <Overlay
                                                isVisible={id == favorite.sensorId}
                                                onBackdropPress={() => toggleOverlay(null)}
                                            >
                                                <ViewSensor sensorId={favorite.sensorId} />
                                            </Overlay>
                                        </ListItem.Content>
                                    </ListItem>
                                );
                            })
                        ) : (
                            <ListItem
                                style={{ width: 400 }}
                                containerStyle={{ backgroundColor: "purple" }}
                                key={1}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>
                                        <Text style={styles.thirdTitle}>
                                            You have currently no favorites !
                                        </Text>
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        )}
                    </ScrollView>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50,
    },
    mainTitle: {
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    secTitle: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    thirdTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    input: {
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        width: 250,
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    paragraph: {
        fontSize: 15,
        textAlign: "center",
        color: "white",
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: "purple",
        borderRadius: 30,
        marginHorizontal: 50,
        marginVertical: 7,
    },
});
