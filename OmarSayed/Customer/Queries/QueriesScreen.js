import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import styles from "./StyleAttributes";
import { View } from "../../../components/Themed";
import UserContext from "../../../UserContext";
import db from "../../../db";
import { SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import { StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ProductsAndProductsDetails from "./ProductsAndProductsDetails";
import UserQueries from "./UserQueries";
import SensorDetails from "./SensorDetails";
export default function QueriesScreen() {
    const { user } = useContext(UserContext);

    const [sensors, setSensors] = useState([]);
    useEffect(() => db.Sensors.listenAllSamples(setSensors), [sensor]);

    const [tabs, setTabs] = useState("AllSensors");

    const [sensor, setSensor] = useState({});

    const [allQueries, setAllQueries] = useState({});
    useEffect(() => db.Queries.listenAllForUser(user.id, setAllQueries), [user]);

    const [selectedSensorId, setSelectedSensorId] = useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.fixToText}>
                    <Button
                        title="Show Products"
                        buttonStyle={{ width: 125 }}
                        onPress={() => setTabs("AllSensors")}
                    />
                    <Button
                        title="My Queries"
                        onPress={() => setTabs("Queries")}
                        buttonStyle={{ width: 125 }}
                    />
                </View>

                {tabs === "AllSensors" && (
                    <ProductsAndProductsDetails user={user} sensors={sensors} />
                )}
                {tabs === "Queries" && (
                    <UserQueries
                        allQueries={allQueries}
                        setTabs={setTabs}
                        setSelectedSensorId={setSelectedSensorId}
                    />
                )}
                {tabs === "Sensor" && (
                    <SensorDetails
                        selectedSensorId={selectedSensorId}
                        setSelectedSensorId={setSelectedSensorId}
                        setTabs={setTabs}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
