import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';
import fb from '../../fb'
import db from '../../db'
import { Picker } from '@react-native-picker/picker';

export default function RequestScreen() {

    const [requests, setRequests] = useState([])
    useEffect(() => db.Requests.listenToAllUnaccepted(setRequests), [])

    const logout = async () => {
        await fb.auth().signOut()
    }

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <TouchableOpacity onPress={logout} style={styles.title}>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>Logout</Text>
                </TouchableOpacity>
            </View>
            {
                requests.length != 0
                    ?
                    <View>
                        {
                            requests.map(r =>
                                <Text key={r.userId}>{r.userId}</Text>
                            )
                        }
                    </View>
                    :
                    <Text>You have no requests !</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
