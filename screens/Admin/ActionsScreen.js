import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import CategoryPicker from "../pickers/CategoryPicker";
import SensorByCategoryPicker from "../pickers/SensorByCategoryPicker";
import TemperatureActions from "./TemperatureActions";
import MotionActions from "./MotionActions";
import ParkingController from "../../OmarSayed/Customer/Sensors/ParkingController";
import LightActions from "../../addalin/screens/Admin/LightActions";
import GateActions from "../../Asmar/GateActions";

export default function ActionsScreen() {
    const [category, setCategory] = useState(null);
    useEffect(() => setSensor(null), [category]);
    const [sensor, setSensor] = useState(null);

    return (
        <View style={styles.container}>
            <CategoryPicker set={setCategory} />
            {category && <SensorByCategoryPicker category={category} set={setSensor} />}
            {category && sensor && category.name === "Motion" && <MotionActions sensor={sensor} />}
            {category && sensor && category.name === "Temperature" && (
                <TemperatureActions sensor={sensor} />
            )}
            {category && sensor && category.name === "Ultrasonic" && (
                <ParkingController sensor={sensor} />
            )}
            {category && sensor && category.name === "Light" && <LightActions sensor={sensor} />}
            {category && sensor && category.name === "Gate" && <GateActions sensor={sensor} />}
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
