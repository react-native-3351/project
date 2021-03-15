import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';
import { View, Text } from '../../../components/Themed';
import db from '../../../db'

export default function ViewSensorsWishListScreen({ wishlist }) {

    const [sensor, setSensor] = useState([]);
    const [cat, setCat] = useState([]);
    const [model, setModel] = useState([]);

    useEffect(() => db.Categories.listenOneByName(setCat, wishlist.category), [wishlist])

    useEffect(() => cat.length !== 0 ? db.Categories.Models.listenModelByWishList(setModel, cat[0].id, wishlist) : undefined, [wishlist, cat])

    useEffect(() => cat.length !== 0 && model.length !== 0 ? db.Sensors.listenItemsForWishlist(setSensor, cat[0].id, model[0].id) : undefined, [cat, model])

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <ScrollView>
                    {
                        sensor.length !== 0
                            ?
                            sensor.map(sen =>
                                <Card>
                                    <Card.Title>Sensor Details</Card.Title>
                                    <Card.Divider />
                                    <Text style={{ marginBottom: 10 }}>SensorID: {sen.id}</Text>
                                    <Text style={{ marginBottom: 10 }}>Sensor Location: {sen.location}</Text>
                                    <Text style={{ marginBottom: 10 }}>Category: {cat && cat[0].name}</Text>
                                    <Text style={{ marginBottom: 10 }}>Model ID: {model && model[0].id}</Text>
                                    {
                                        cat && cat[0].name == "Temperature"
                                            ?
                                            <>
                                                <Text style={{ marginBottom: 10 }}>Min: {model && model[0].min}</Text>
                                                <Text style={{ marginBottom: 10 }}>Max: {model && model[0].max}</Text>
                                            </>
                                            :
                                            <></>

                                    }
                                    {
                                        cat && cat.name == "Light"
                                            ?
                                            <>
                                                <Text style={{ marginBottom: 10 }}>Luminence: {model && model[0].luminence}</Text>
                                            </>
                                            :
                                            <></>

                                    }
                                    {
                                        cat && cat.name == "Area"
                                            ?
                                            <>
                                                <Text style={{ marginBottom: 10 }}>Radius: {model && model[0].radius}</Text>
                                            </>
                                            :
                                            <></>

                                    }
                                </Card>)
                            :
                            <Card>
                                <Card.Title>No sensors yet</Card.Title>
                            </Card>

                    }
                </ScrollView>
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
