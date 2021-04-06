import React, { useState, useEffect } from "react";
import { Button, Card } from "react-native-elements";
import { ImageBackground, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import db from "../../../db";

export default function ViewFavoritesSensorScreen({ sensorId }) {
    const image = {
        uri: "https://wallpaperaccess.com/full/1105968.jpg",
    };
    const [sensor, setSensor] = useState(null);
    const [cat, setCat] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => db.Sensors.listenOne(setSensor, sensorId), [sensorId]);

    useEffect(() => (sensor ? db.Categories.listenOne(setCat, sensor.categoryid) : undefined), [
        sensor,
    ]);

    useEffect(
        () =>
            sensor
                ? db.Categories.Models.listenOneById(setModel, sensor.categoryid, sensor.modelId)
                : undefined,
        [sensor]
    );

    return (
        <View>
            <View style={styles.container}>
                <ImageBackground source={image} style={styles.image}>
                    <Card>
                        <Card.Title>Sensor Details</Card.Title>
                        <Card.Divider />
                        <Text style={{ marginBottom: 10 }}>Category: {cat ? cat.name : ""}</Text>
                        <Text style={{ marginBottom: 10 }}>
                            Location: {sensor ? sensor.location : ""}
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            Material: {model ? model.material : ""}
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            techUsed: {model ? model.techUsed : ""}
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            Active: {model ? (model.active ? "yes" : "no") : ""}
                        </Text>
                        <Text style={{ marginBottom: 10 }}>
                            Contact: {model ? (model.contact ? "yes" : "no") : ""}
                        </Text>
                        {cat && cat.name == "Temperature" ? (
                            <>
                                <Text style={{ marginBottom: 10 }}>
                                    Min: {model ? model.min : ""}
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    Max: {model ? model.max : ""}
                                </Text>
                            </>
                        ) : (
                            <></>
                        )}
                        {cat && cat.name == "Light" ? (
                            <>
                                <Text style={{ marginBottom: 10 }}>
                                    Luminence: {model ? model.luminence : ""}
                                </Text>
                            </>
                        ) : (
                            <></>
                        )}
                    </Card>
                </ImageBackground>
            </View>
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
        fontSize: 12,
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
