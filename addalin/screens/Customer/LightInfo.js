import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput
} from "react-native";
import { Button } from 'react-native-elements';
import db from '../../../db'

const image = {
    uri: "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif"
    // uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
};

export default function LightInfo({ user, category, sensor }) {

    const [reading, setReading] = useState(null)
    useEffect(() => sensor ? db.Sensors.Readings.listenLatestOne(setReading, sensor.id) : undefined, [sensor])

    const [model, setModel] = useState(null);
    useEffect(() => sensor ? db.Categories.Models.listenOneById(setModel, sensor.categoryid, sensor.modelId) : undefined, [sensor])

    return (
        <View style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.thirdTitle}>Maximum Luminence: {model.luminence}</Text>
                {
                    reading
                    &&
                    <Text>
                        Current: {reading.current}
                    </Text>
                }
                <Text>
                    Alert: {sensor.alert}
                </Text>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50
    },
    mainTitle: {
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    secTitle: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    thirdTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    input: {
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    paragraph: {
        fontSize: 12,
        textAlign: "center",
        color: "white"
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: 'purple',
        borderRadius: 30,
        marginHorizontal: 50,
        marginVertical: 7,
    }
});