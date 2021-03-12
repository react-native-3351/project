import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import UserContext from '../../UserContext'
import fb from '../../fb'
import db from '../../db'
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { ScrollView, StatusBar } from 'react-native';
export default function SensorsScreen() {

    const { user } = useContext(UserContext)

    const [inq, setInq] = useState('')
    // const submitInq = () => {
    //     db.Queries.createQueries({ sender: user.id, sensorId: sensor.id, question: inq, reply: '', repliedBy: '', sendDate: new Date() })
    //     setInq('')
    //     alert('Submitted, well contact with you soon ✔')
    // }

    const [allQueries, setAllQueries] = useState([])
    useEffect(() => db.Queries.listenAllForCS(user.id, setAllQueries), [user])
    console.log(allQueries)
    const [ans, setAns] = useState('')

    const [sensor, setSensor] = useState([])
    const submitAns = () => {
        db.Queries.update({ ...sensor, reply: ans })
        setAns('')
        setModalVisible(!modalVisible)
        alert('Submitted ✔')
    }
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <Text style={styles.title}>Welcome to the Dashboard Mr./Ms. {user.name}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
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
        marginTop: 50,
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
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor:'lightblue',
        padding: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    //Omar Sayed
    sensorBlocks: {
        backgroundColor: '#fc86d9',
        padding: 11,
        width: '80%',
        margin: 3
    },
    sensorBlocksReply: {
        backgroundColor: 'lightgreen',
        padding: 11,
        width: '80%',
        margin: 3,
        height: 100,
        justifyContent: 'center'
    }, container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: 'snow',
        marginHorizontal: 0,
    },
    text: {
        fontSize: 42,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});
