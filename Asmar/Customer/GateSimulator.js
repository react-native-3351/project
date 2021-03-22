import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../components/Themed";
import UserContext from "../../UserContext";
import db from "../../db";

// all picker values should be non-object (number, string, etc.)

export default function GateSimulator({ sensor }) {
    const { user } = useContext(UserContext);
    useEffect(() => handleStopSimulator(), [user]);

    // return "stop simulator function", to be called on component unmount, stopping the timer
    useEffect(() => handleStopSimulator, []);

    const [intervalId, setIntervalId] = useState(0);

    // start uploading random readings every second
    const handleStartSimulator = () => setIntervalId(setInterval(insertRandomReading, 2500));

    const handleStopSimulator = () => {
        clearInterval(intervalId);
        setIntervalId(0);
    };
    const insertRandomReading = async () => {
        const spots = [
            Boolean(Math.round(Math.random() - 0.4)),
            Boolean(Math.round(Math.random() - 0.4)),
            Boolean(Math.round(Math.random() - 0.4)),
            Boolean(Math.round(Math.random() - 0.4)),
            Boolean(Math.round(Math.random() - 0.4)),
        ];
        console.log("spots", spots);
        await db.Sensors.Readings.createReading(sensor.id, {
            when: new Date(),
            spots: spots,
        });
    };

    return (
        <View>
            <TouchableOpacity
                onPress={handleStartSimulator}
                style={styles.title}
                disabled={intervalId !== 0}
            >
                <Text style={styles.helpLinkText}>Start simulator</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleStopSimulator}
                style={styles.title}
                disabled={intervalId === 0}
            >
                <Text style={styles.helpLinkText}>Stop simulator</Text>
            </TouchableOpacity>
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
    getStartedGreen: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
        color: "green",
    },
    getStartedRed: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
        color: "red",
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
        color: "blue",
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
