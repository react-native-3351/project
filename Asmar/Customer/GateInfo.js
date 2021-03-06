import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { Text, View } from "../../components/Themed";
import db from "../../db";

// all picker values should be non-object (number, string, etc.)

export default function GateInfo({ sensor }) {
    const [readings, setReadings] = useState(null);
    const [reading, setReading] = useState(null);
    const [reading2, setReading2] = useState(null);
    useEffect(
        () => (sensor ? db.Sensors.Readings.listen2OrderByWhen(setReadings, sensor.id) : undefined),
        [sensor]
    );

    useEffect(() => {
        if (readings) {
            setReading(readings[0]);
            setReading2(readings[1]);
        }
    }, [readings]);
    const updateMode = (newMode) => {
        var newStatus = sensor.status;
        if (newMode == "Opened") {
            newStatus = "Open";
        } else if (newMode == "Closed") {
            newStatus = "Closed";
        }
        db.Sensors.update({ ...sensor, mode: newMode, status: newStatus });
    };

    return (
        <View>
            <View>
                <Text
                    style={[
                        { alignSelf: "center" },
                        {
                            color:
                                sensor.status == "Closed" || sensor.status == "Closing"
                                    ? "red"
                                    : "green",
                        },
                    ]}
                >
                    {sensor.status}
                </Text>
                {sensor.status == "Closed" ? (
                    <Icon size={150} name="gate" type="material-community" />
                ) : (
                        <View>
                            <Icon size={150} name="gate-open" type="material-community" />
                            {sensor.status !== "Open" &&
                                (sensor.status == "Opening" ? (
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            position: "absolute",
                                            marginRight: 0,
                                            marginLeft: -24,
                                            padding: 0,
                                            left: "50%",
                                            top: "50%",
                                            width: 50,
                                        }}
                                    >
                                        <Icon name="navigate-before" type="material" />
                                        <Icon name="navigate-next" type="material" />
                                    </View>
                                ) : (
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                position: "absolute",
                                                marginRight: 0,
                                                marginLeft: -24,
                                                padding: 0,
                                                left: "50%",
                                                top: "50%",
                                                width: 50,
                                            }}
                                        >
                                            <Icon name="navigate-next" type="material" />
                                            <Icon name="navigate-before" type="material" />
                                        </View>
                                    ))}
                        </View>
                    )}
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    {reading2 &&
                        reading2.spots.map((r, idx) => (
                            <Icon
                                key={idx + 5}
                                type="ionicon"
                                name={r ? "md-person" : "md-person-outline"}
                            />
                        ))}
                </View>
                <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    {reading &&
                        reading.spots.map((r, idx) => (
                            <Icon
                                key={idx}
                                type="ionicon"
                                name={r ? "md-person" : "md-person-outline"}
                            />
                        ))}
                </View>
            </View>
            <Text
                style={styles.getStartedText}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
            >
                Accesses: {sensor.accesses}
            </Text>
            <Text
                style={sensor.mode == "auto" ? { color: "green" } : { color: "red" }}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)"
            >
                Mode: {sensor.mode}
            </Text>
            <Text>{"\n"}</Text>
            <TouchableOpacity onPress={() => updateMode("Opened")} style={styles.title}>
                <Text style={styles.helpLinkText}>Keep Gate Open</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateMode("Closed")} style={styles.title}>
                <Text style={styles.helpLinkText}>Keep Gate Closed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updateMode("auto")} style={styles.title}>
                <Text style={styles.helpLinkText}>Make Gate Automatic</Text>
            </TouchableOpacity>
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
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        color: "black",
        borderRadius: 30,
        padding: 10,
        paddingLeft: 15,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    inputDisplay: {
        paddingTop: 20,
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
    label: {
        fontSize: 16,
        color: "white",
        textAlign: "left",
        marginHorizontal: 40,
        marginBottom: -10,
    },
    helpLinkText: {
        textAlign: "center",
        color: "blue",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
