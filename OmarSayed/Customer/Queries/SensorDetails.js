import React, { useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { Button } from 'react-native-elements';
import { StatusBar } from 'react-native';
import db from '../../../db';
import styles from './StyleAttributes'

export default function SensorDetails({selectedSensorId, setSelectedSensorId, setTabs}) {

    const [selectedSensor, setSelectedSensor] = useState(null)
    useEffect(() => selectedSensorId ? db.Sensors.listenOne(setSelectedSensor, selectedSensorId) : undefined, [selectedSensorId])

    return (
        selectedSensor &&
        <View>
            <Text style={styles.title}>{selectedSensor.name}</Text>
            <Text style={{ alignSelf: 'center', padding: 7 }}>{selectedSensor.description}</Text>
            <Image
                style={{ height: 170, width: 270, alignSelf: 'center' }}
                source={{
                    uri: selectedSensor.url
                }}
            />
            <Button
                title="<< Back"
                onPress={() => {
                    setTabs('Queries')
                    setSelectedSensor(null)
                    setSelectedSensorId(null)
                }}
            />
        </View>
    );
}
