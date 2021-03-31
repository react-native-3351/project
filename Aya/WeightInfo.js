import React, { useState, useEffect } from "react";
import { TextInput, StyleSheet, ImageBackground, Image } from "react-native";
import { Text, View } from "../components/Themed";
import db from "../db";
import { Button } from "react-native-elements";
import Colors from "../constants/Colors";

// all picker values should be non-object (number, string, etc.)

export default function WeightInfo({ sensor }) {
    const [reading, setReading] = useState(null);
    useEffect(
        () => (sensor ? db.Sensors.Readings.listenLatestOne(setReading, sensor.id) : undefined),
        [sensor]
    );

    const [product, setProduct] = useState(null);
    const [totalprice, setTotalPrice] = useState(0);
    const [randomItems, setRandomItems] = useState([
        { name: "orange", img: require("../assets/images/orange.jpg"), price: 10.5 },
        { name: "apple", img: require("../assets/images/apple.png"), price: 12 },
        { name: "banana", img: require("../assets/images/banana.jpg"), price: 9 },
        { name: "pineapple", img: require("../assets/images/pineapple.jpg"), price: 12 },
        { name: "cherry", img: require("../assets/images/cherry.jpg"), price: 12.5 },
        { name: "mango", img: require("../assets/images/mango.jpg"), price: 12.5 },
    ]);
    useEffect(() => (reading ? handleSimulate() : undefined), [reading]);
    const handleSimulate = () => {
        let item = randomItems[Math.floor(Math.random() * randomItems.length)];
        //console.log(item);
        setProduct(item);
        let total = item.price * reading.current;
        setTotalPrice(total);
    };

    return (
        <View>
            {product && (
                <>
                    <Text
                        style={styles.paragraph}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"
                    >
                        Product : {product.name}
                    </Text>

                    <Text
                        style={styles.paragraph}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"
                    >
                        Pric per gram: {product.price}
                    </Text>
                    <Image style={styles.img} source={product.img} />
                    {reading && (
                        <Text
                            style={styles.paragraph}
                            lightColor="rgba(0,0,0,0.8)"
                            darkColor="rgba(255,255,255,0.8)"
                        >
                            Current Weight: {reading.current}
                        </Text>
                    )}
                    <Text
                        style={styles.paragraph}
                        lightColor="rgba(0,0,0,0.8)"
                        darkColor="rgba(255,255,255,0.8)"
                    >
                        price: {totalprice}
                    </Text>
                </>
            )}
        </View>
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
        borderWidth: 1,
        borderColor: "purple",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 12,
        width: 300,
        height: 30,
    },
    paragraph: {
        fontSize: 12,
        textAlign: "center",
        color: "black",
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: "purple",
        borderRadius: 30,
        marginHorizontal: 50,
        marginVertical: 7,
    },
    tinyLogo: {
        width: 150,
        height: 150,
    },

    img: {
        width: 300,
        height: 300,
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
        backgroundColor: "transparent",
        fontSize: 23,
        lineHeight: 24,
        textAlign: "left",
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
        fontSize: 23,
        textAlign: "center",
    },
    title: {
        padding: 15,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
