import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Switch, TouchableOpacity } from "react-native";
import Colors from "../../../constants/Colors";
import { Text, View } from "../../../components/Themed";
import db from "../../../db";
import UserContext from "../../../UserContext";

export default function ParkingController({ sensor }) {
    const { user } = useContext(UserContext);
    useEffect(() => handleStopSimulator(), [user]);

    // return "stop simulator function", to be called on component unmount, stopping the timer
    useEffect(() => handleStopSimulator, []);

    const [reading, setReading] = useState(null);
    useEffect(() => db.Sensors.Readings.listenLatestOne(setReading, sensor.id), [sensor]);

    // const handleToggleAlert = async () => await db.Sensors.toggleAlert(sensor)

    const [delay, setDelay] = useState(7);
    const [intervalId, setIntervalId] = useState(0);

    // start uploading random readings every 5 seconds
    const handleStartSimulator = () => setIntervalId(setInterval(newReading, delay * 1000));

    const newReading = async () => {
        let countCars = await db.Sensors.Readings.findAllCarsInParkings(sensor.id);
        // let countCars = sensor.currentCars
        // new car set in the parking yes/no
        let dec = Math.floor(Math.random() * 5);
        // let dec = 0
        // decision is yes, add new car
        if (dec === 1 || dec === 3 || dec === 4) {
            let carPlate = Math.floor(Math.random() * 9999999) + "";
            // //console.log(countCars.length)
            // //console.log('================')
            if (countCars.length < 20) {
                await db.Sensors.Readings.createReading(sensor.id, {
                    carPlate,
                    in: new Date(),
                    out: "",
                });
                let setInSpot = Math.floor(Math.random() * 20);
                while (sensor.spots[setInSpot] !== "") {
                    setInSpot = Math.floor(Math.random() * 20);
                }
                sensor.spots[setInSpot] = carPlate;
                sensor.currentCars = countCars.length + 1;
                await db.Sensors.update({ ...sensor });
            } else {
                //console.log('Parkings are Full')
            }
        }
        // remove from spot
        else if (dec === 0) {
            if (countCars.length > 0) {
                let carPlate = "";
                let setInSpot = Math.floor(Math.random() * 20);
                while (sensor.spots[setInSpot] === "") {
                    setInSpot = Math.floor(Math.random() * 20);
                }
                carPlate = sensor.spots[setInSpot];
                sensor.spots[setInSpot] = "";
                let a = await db.Sensors.Readings.findByPlate(sensor.id, carPlate);
                await db.Sensors.Readings.updatePlate(sensor.id, { ...a, out: new Date() });
                sensor.currentCars = countCars.length - 1;
                await db.Sensors.update({ ...sensor });
            }
        } else if (dec === 2) {
            console.log(' Stay Same - ')
        }
    };

    const handleStopSimulator = () => {
        clearInterval(intervalId);
        setIntervalId(0);
    };

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    useEffect(() => (isEnabled ? handleStartSimulator() : handleStopSimulator()), [isEnabled]);
    return (
        <View style={styles.helpContainer}>
            <Text style={{ ...styles.title, marginTop: 10 }}>Simulator ON/OFF</Text>
            <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{
                    alignSelf: "center",
                    height: 30,
                    transform: [{ scaleX: 2 }, { scaleY: 2 }],
                    marginVertical: 30,
                }}
            />
            <Text>Simulator Status: {isEnabled + ""}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
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
