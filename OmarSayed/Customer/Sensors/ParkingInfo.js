import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../../../components/Themed';
import db from '../../../db'
import { Dimensions } from "react-native";
// all picker values should be non-object (number, string, etc.)
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function ParkingInfo({ user, category, sensor }) {

    const [reading, setReading] = useState([])
    useEffect(() => sensor ? db.Sensors.Readings.listenCarsInParkings(setReading, sensor.id) : undefined, [sensor])
    console.log(reading)
    return (
        <View style={styles.app}>
            <View style={styles.carView}>
                {
                    sensor.spots.map((r, index) =>
                        <React.Fragment key={index}>
                        {r === '' ? <Text style={{...styles.spot, backgroundColor:'green'}}>*</Text>
                        :
                        <Text style={{...styles.spot, backgroundColor:'red'}}>{ sensor.spots[index]}</Text>}
                            {
                                index % 2 == 0 &&
                                <Text style={styles.street}>|</Text>
                            }

                        </React.Fragment>
                    )
                }
            </View>
            <Text style={styles.text}>Total Parkings: 20</Text>
            <Text style={styles.text}>Free Parkings: {20 - sensor.currentCars}</Text>
            <Text style={styles.text}>Reserved Parkings: {sensor.currentCars}</Text>
            {/* <Text
                style={sensor.alert ? styles.getStartedGreen : styles.getStartedRed}
                lightColor="rgba(0,0,0,0.8)"
                darkColor="rgba(255,255,255,0.8)">
                Parking Currently: {sensor.open ? "Open" : "Close"}
            </Text> */}
        </View>
    );
}
const styles = StyleSheet.create({
    app: {
        //   marginHorizontal: "auto",
        width: windowWidth
    },
    text: {
        //   fontSize: "1.125rem",
        marginVertical: 2,
        textAlign: "center"
    },
    carView: {
        backgroundColor: "lightgray",
        //   height: windowHeight/1.4,
        marginBottom: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"
    },
    spot: {
        width: windowWidth / 3,
        height: 40,
        backgroundColor: "gray",
        marginVertical: 1,
        textAlign: "center"
    },
    street: {
        width: windowWidth / 3,
        height: 15,
        backgroundColor: "lightgray",
        marginVertical: 1,
        textAlign: "center"
    },
    getStartedGreen: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
        color: 'green'
    },
    getStartedRed: {
        // fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
        color: 'red'
    },
});