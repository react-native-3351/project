import React, { useState } from "react";
import { StyleSheet, TextInput, Image } from "react-native";
import { Text, View } from "../../../components/Themed";
import db from "../../../db";
import { Button } from "react-native-elements";
import { StatusBar } from "react-native";
import styles from "./StyleAttributes";

export default function ProductsAndProductsDetails({ user, sensors }) {
    const [descriptionView, setDescriptionView] = useState(false);
    const [sensor, setSensor] = useState({});

    const getSensor = (sn) => {
        setSensor(sn);
        setDescriptionView(!descriptionView);
    };
    const [inq, setInq] = useState("");
    const submitInq = () => {
        db.Queries.createQueries({
            sender: user.id,
            sensorId: sensor.id,
            question: inq,
            reply: "",
            repliedBy: "",
            sendDate: new Date(),
        });
        setInq("");
        alert("Submitted, well contact with you soon ✔");
    };

    return (
        <View style={styles.getStartedContainer}>
            {!descriptionView ? (
                sensors.map((sn) => (
                    <Button
                        title={sn.name}
                        onPress={() => getSensor(sn)}
                        buttonStyle={{ width: 300, margin: 5, backgroundColor: "purple" }}
                        key={sn.id}
                    />
                ))
            ) : (
                <>
                    <View>
                        <Button
                            title="<< Back"
                            onPress={() => setDescriptionView(!descriptionView)}
                        />
                        <Text style={styles.title}>{sensor.name}</Text>
                        <Text style={{ alignSelf: "center", padding: 7 }}>
                            {sensor.description}
                        </Text>
                        <Image
                            style={{ height: 170, width: 270, alignSelf: "center" }}
                            source={{
                                uri: sensor.url,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderColor: "lightgreen",
                            borderStartWidth: 3,
                            marginHorizontal: 50,
                            marginBottom: 100,
                            padding: 9,
                        }}
                    >
                        <Text style={{ ...styles.title, marginBottom: 30 }}>
                            Any question feel free to ask 😀
                        </Text>
                        <TextInput
                            style={{
                                height: 40,
                                width: 300,
                                marginBottom: 10,
                                borderColor: "lightgray",
                                alignSelf: "center",
                                borderWidth: 1,
                                paddingLeft: 11,
                            }}
                            onChangeText={(text) => setInq(text)}
                            value={inq}
                        />
                        <Button
                            title="  Send"
                            onPress={() => submitInq()}
                            buttonStyle={{ width: 200, alignSelf: "center" }}
                            disabled={inq === "" ? true : false}
                        />
                    </View>
                </>
            )}
        </View>
    );
}
