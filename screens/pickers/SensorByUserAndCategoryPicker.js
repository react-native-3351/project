import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';
import db from '../../db'
import { Picker } from '@react-native-picker/picker';
import UserContext from '../../UserContext'

export default function SensorByUserAndCategoryPicker({ category, set }) {

    const { user } = useContext(UserContext)

    const [sensors, setSensors] = useState([])
    useEffect(() => db.Sensors.listenByUserAndCategory(setSensors, user?.id || "", category?.id || ""), [user, category])

    const [sensorId, setSensorId] = useState("")
    useEffect(() => db.Sensors.listenOne(set, sensorId), [sensorId])

    return (
        <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={sensorId}
            onValueChange={setSensorId}
        >
            <Picker.Item label='Select Sensor' value="" />
            {
                sensors.map(sensor => <Picker.Item key={sensor.id} label={sensor.location} value={sensor.id} />)
            }
        </Picker>
    )
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
        marginHorizontal: 50,
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
