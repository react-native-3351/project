import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Card } from "react-native-elements";
import db from "../../../db";

export default function ViewSensorsWishListScreen({ wishlist }) {
    const image = {
        uri: "https://wallpaperaccess.com/full/1105968.jpg",
    };

    const [sensor, setSensor] = useState([]);
    const [cat, setCat] = useState([]);
    const [model, setModel] = useState([]);

    useEffect(() => db.Categories.listenOneByName(setCat, wishlist.category), [wishlist]);

    useEffect(
        () =>
            cat.length !== 0
                ? db.Categories.Models.listenModelByWishList(setModel, cat[0].id, wishlist)
                : undefined,
        [cat]
    );

    useEffect(
        () =>
            cat.length !== 0 && model.length !== 0
                ? db.Sensors.listenItemsForWishlist(setSensor, cat[0].id, model[0].id)
                : undefined,
        [model]
    );

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <ScrollView>
                    {sensor.length !== 0 ? (
                        sensor.map((sen) => (
                            <Card>
                                <Card.Title>Sensor Details</Card.Title>
                                <Card.Divider />
                                <Text style={{ marginBottom: 10 }}>SensorID: {sen.id}</Text>
                                <Text style={{ marginBottom: 10 }}>
                                    Sensor Location: {sen.location}
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    Category: {cat && cat[0].name}
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    Model ID: {model && model[0].id}
                                </Text>
                                {cat && cat[0].name == "Temperature" ? (
                                    <>
                                        <Text style={{ marginBottom: 10 }}>
                                            Min: {model && model[0].min}
                                        </Text>
                                        <Text style={{ marginBottom: 10 }}>
                                            Max: {model && model[0].max}
                                        </Text>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {cat && cat.name == "Light" ? (
                                    <>
                                        <Text style={{ marginBottom: 10 }}>
                                            Luminence: {model && model[0].luminence}
                                        </Text>
                                    </>
                                ) : (
                                    <></>
                                )}
                                {cat && cat.name == "Area" ? (
                                    <>
                                        <Text style={{ marginBottom: 10 }}>
                                            Radius: {model && model[0].radius}
                                        </Text>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </Card>
                        ))
                    ) : (
                        <Card>
                            <Card.Title>No sensors yet</Card.Title>
                        </Card>
                    )}
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: 300,
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
