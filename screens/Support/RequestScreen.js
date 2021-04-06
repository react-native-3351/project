import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Button, Overlay, ListItem } from "react-native-elements";
import Colors from '../../constants/Colors';
import fb from '../../fb'
import db from '../../db'
import { Picker } from '@react-native-picker/picker';

export default function RequestScreen() {

    const image = {
        uri: "https://wallpaperaccess.com/full/1105968.jpg",
    };

    const [requests, setRequests] = useState([])
    // useEffect(() => db.Requests.listenToAllUnaccepted(setRequests), [])

    const logout = async () => {
        await fb.auth().signOut()
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.container}>
                <Button
                    title="Logout"
                    onPress={logout}
                    buttonStyle={styles.button}
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50,
    },
    mainTitle: {
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    secTitle: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    thirdTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    input: {
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        width: 250,
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    paragraph: {
        fontSize: 12,
        textAlign: "center",
        color: "white",
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: "purple",
        borderRadius: 30,
        marginHorizontal: 50,
        marginVertical: 7,
    },
});
