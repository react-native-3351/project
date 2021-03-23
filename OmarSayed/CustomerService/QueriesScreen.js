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
export default function QueriesScreen() {

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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={{  width: 200, borderColor: 'gray', backgroundColor: 'snow', borderWidth: 1, paddingLeft: 11 }}
                            onChangeText={text => setAns(text)}
                            value={ans}
                            placeholder='Answer ...'
                            multiline={true}
                            numberOfLines={10}
                        />
                        <Button
                            title="  Submit"
                            onPress={() => submitAns()}
                            buttonStyle={{ backgroundColor: 'green', marginTop: 10 }}
                            disabled={ans === '' ? true : false}
                        />
                        <Button
                            title="  Close"
                            onPress={() => setModalVisible(!modalVisible)}
                            buttonStyle={{ backgroundColor: 'red', marginTop: 10 }}
                        />
                        {/* <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable> */}
                    </View>
                </View>
            </Modal>

            <Text style={styles.title}>Users Queries</Text>
            <ScrollView style={styles.scrollView}>
                {
                    allQueries.map((i, index) =>
                        <View key={i.id} style={{ borderWidth: 1, padding: 7, margin: 7, }}>
                            <View style={styles.sensorBlocks}>
                                <Text>Question {i.question}</Text>
                            </View>
                            <View style={styles.sensorBlocks}>
                                <Text> Sensor ID: {i.sensorId}</Text>
                            </View>
                            {/* <View style={styles.sensorBlocksReply}> */}
                            {i.reply === '' ?
                                <>
                                    <Pressable
                                        style={[styles.button, styles.buttonOpen]}
                                        onPress={() => {
                                            setSensor(i)
                                            setModalVisible(true)
                                        }}
                                    >
                                        <Text style={styles.textStyle}>Answer</Text>
                                    </Pressable>

                                </>
                                :
                                <></>
                            }
                        </View>
                    )
                }
                <Text style={styles.title2}>
                    {allQueries.length === 0 && 'No Questions yet'}
                </Text>
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
        backgroundColor: 'lightblue',
        padding: 10
    },
    title2: {
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'red',
        padding: 15,
        marginTop: 30
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    sensorBlocks: {
        // backgroundColor: '#fc86d9',
        backgroundColor: 'white',
        padding: 11,
        width: '100%',
        // margin: 3
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
        backgroundColor: 'white'
    },
    scrollView: {
        backgroundColor: 'white',
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
        borderRadius: 5,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "blue",
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
