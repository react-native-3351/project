import React, { useState, useEffect } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import db from '../../../db'

export default function LightInfo({ user, category, sensor }) {

    const [reading, setReading] = useState(null)
    useEffect(() => sensor ? db.Sensors.Readings.listenLatestOne(setReading, sensor.id) : undefined, [sensor])

    const [model, setModel] = useState(null);
    useEffect(() => sensor ? db.Categories.Models.listenOneById(setModel, sensor.categoryid, sensor.modelId) : undefined, [sensor])

    const barValue = reading && model ? reading.current / model.luminence * 200 : 0

    console.log("barValue", barValue)
    return (
        <View style={styles.container}>
            <Text style={styles.secTitle}>Luminence: {model && model.luminence}</Text>
            {
                reading
                &&
                <Text style={styles.thirdTitle}>
                    Current: {reading.current}
                </Text>
            }
            <View style={styles.progressBar}>
                <View style={{
                    height: 20,
                    width: barValue > 101 ? 200 : barValue < 0 ? 0 : barValue,
                    backgroundColor: '#d554fb',
                    borderRadius: 5
                }}>
                </View>
            </View>
            {
                barValue > 100 ?
                    <Icon
                        style={{ marginLeft: 130, marginTop: 20, marginBottom: 20 }}
                        size={40}
                        name='sun-o'
                        type='font-awesome-5'
                        color='yellow'
                    />
                    :
                    <Icon
                        style={{ marginLeft: 130, marginTop: 20, marginBottom: 20 }}
                        size={40}
                        name='moon-o'
                        type='font-awesome-5'
                        color='white'
                    />
            }
            <View>
                {
                    sensor
                        &&
                        sensor.alert == "high"
                        ?
                        <Text style={styles.thirdTitle}>
                            Very Bright ! Turning Lights Off...
                            </Text>
                        :
                        sensor.alert == "equal"
                            ?
                            <Text style={styles.thirdTitle}>
                                Lights are just right ! Turning Lights Off...
                                </Text>
                            :
                            <Text style={styles.thirdTitle}>
                                Lights are Low ! Turning Lights On...
                            </Text>
                }
            </View>
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
    },
    progressBar: {
        height: 20,
        width: 200,
        marginLeft: 50,
        marginTop: 10,
        // backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5
    }
});