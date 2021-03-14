import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Overlay, Card } from 'react-native-elements';
import { View, Text } from '../../../components/Themed';
import UserContext from '../../../UserContext'
import db from '../../../db'

export default function ViewFavoritesSensorScreen({ sensorId }) {

    const [sensor, setSensor] = useState(null);
    const [cat, setCat] = useState(null);
    const [model, setModel] = useState(null);

    useEffect(() => db.Sensors.listenOne(setSensor, sensorId), [sensorId])

    useEffect(() => sensor ? db.Categories.listenOne(setCat, sensor.categoryid) : undefined, [sensor])

    useEffect(() => sensor ? db.Categories.Models.listenOneById(setModel, sensor.categoryid, sensor.modelId) : undefined, [sensor])

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Card>
                    <Card.Title>Sensor Details</Card.Title>
                    <Card.Divider />
                    <Text style={{ marginBottom: 10 }}>Category: {cat ? cat.name : ""}</Text>
                    <Text style={{ marginBottom: 10 }}>Location: {sensor ? sensor.location : ""}</Text>
                    <Text style={{ marginBottom: 10 }}>Material: {model ? model.material : ""}</Text>
                    <Text style={{ marginBottom: 10 }}>techUsed: {model ? model.techUsed : ""}</Text>
                    <Text style={{ marginBottom: 10 }}>Active: {model ? model.active ? "yes" : "no" : ""}</Text>
                    <Text style={{ marginBottom: 10 }}>Contact: {model ? model.contact ? "yes" : "no" : ""}</Text>
                    {
                        cat && cat.name == "Temperature"
                            ?
                            <>
                                <Text style={{ marginBottom: 10 }}>Min: {sensor ? sensor.min : ""}</Text>
                                <Text style={{ marginBottom: 10 }}>Max: {sensor ? sensor.max : ""}</Text>
                            </>
                            :
                            <></>

                    }
                </Card>
            </View>
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
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
