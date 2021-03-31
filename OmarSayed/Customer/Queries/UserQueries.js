import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../../../components/Themed";
import Colors from "../../../constants/Colors";
import { StatusBar } from "react-native";
import styles from "./StyleAttributes";

export default function UserQueries({ allQueries, setTabs, setSelectedSensorId }) {
    return allQueries.map((i) => (
        <View
            key={i.id}
            style={{
                borderWidth: 2,
                padding: 7,
                margin: 7,
                alignSelf: "center",
                width: 500,
                alignItems: "center",
            }}
        >
            <View style={styles.sensorBlocks}>
                <Text>{i.question}</Text>
            </View>
            <View style={styles.sensorBlocksReply}>
                <Text>{i.reply !== "" ? i.reply : "No Reply Yet"}</Text>
            </View>
            <TouchableOpacity
                onPress={() => {
                    setTabs("Sensor");
                    setSelectedSensorId(i.sensorId);
                }}
                style={styles.title}
            >
                <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                    See Sensor
                </Text>
            </TouchableOpacity>
        </View>
    ));
}
