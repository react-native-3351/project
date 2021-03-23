import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput, Alert, Modal, Pressable } from 'react-native';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import UserContext from '../../../UserContext'
import fb from '../../../fb'
import db from '../../../db'
import { SafeAreaView } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { ScrollView, StatusBar } from 'react-native';
import { Picker } from '@react-native-picker/picker';
export default function ReportsScreen() {
    const { user } = useContext(UserContext)

    const [allReports, setAllReports] = useState([])
    useEffect(() => db.Reports.listenAllForCS(user.id, setAllReports), [user])

    // console.log(allReports)
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const [status, setStatus] = useState('ongoing')


    const newFollowUpForm = async () => {
        await db.Reports.FollowUpForm.newFollowUpForm(selectedRepo.id, { title, details, by: [user.id, user.name], createdDate: new Date() })
        db.Reports.update({ ...selectedRepo, status })
        setSelectedRepo({ ...selectedRepo, status })
        setTitle('')
        setDetails('')
        setStatus('ongoing')
        setModalVisible(!modalVisible)
        Alert.alert('Created ✔')
    }
    // console.log(selectedRepo)
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedRepo, setSelectedRepo] = useState(null)
    const [prevForms, setPrevForms] = useState([])
    useEffect(() => selectedRepo ? db.Reports.FollowUpForm.listenAllByRepo(selectedRepo.id, setPrevForms) : undefined, [selectedRepo])
    const [selectedForm, setSelectedForm] = useState(null)


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
                            style={{ width: 300, borderColor: 'lightgray', backgroundColor: 'white', marginBottom: 10, borderWidth: 1, paddingLeft: 11 }}
                            onChangeText={text => setTitle(text)}
                            value={title}
                            placeholder='Title ...'
                        />
                        <TextInput
                            style={{ width: 300, borderColor: 'lightgray', backgroundColor: 'white', marginBottom: 10, borderWidth: 1, paddingLeft: 11 }}
                            onChangeText={text => setDetails(text)}
                            value={details}
                            placeholder='Details ...'
                            multiline={true}
                            numberOfLines={15}
                        />
                        <Text>
                            Issue Solved ?
                        </Text>
                        <Picker
                            style={{ height: 50, width: 200 }}
                            selectedValue={status}
                            onValueChange={setStatus}
                        >
                            <Picker.Item label='No' value="ongoing" />
                            <Picker.Item label='Yes' value="closed" />

                        </Picker>
                        <Button
                            title="Create"
                            onPress={() => newFollowUpForm()}
                            buttonStyle={{ backgroundColor: 'green', marginTop: 20, marginBottom: 5 }}
                            disabled={title !== '' && details !== '' ? false : true}
                        />
                        <Button
                            title="  Close"
                            onPress={() => setModalVisible(!modalVisible)}
                            buttonStyle={{ backgroundColor: 'red' }}
                        />
                    </View>
                </View>
            </Modal>
            {
                !selectedRepo && !selectedForm &&
                <>
                    <Text style={styles.title}>Users unAnswered Questions</Text>
                    <ScrollView style={styles.scrollView}>
                        {
                            allReports.map((i, index) =>
                                <View key={i.id} style={{ borderWidth: 2, padding: 7, margin: 7, display: 'flex', justifyContent: 'center' }}>
                                    {/* <View style={styles.sensorBlocks}> */}
                                    <Text>Title: {i.title}</Text>
                                    <Text>Status: {i.status}</Text>
                                    <Button
                                        title="Details"
                                        onPress={() => setSelectedRepo(i)}
                                        buttonStyle={{ backgroundColor: 'blue', marginTop: 10 }}
                                    />
                                </View>
                            )
                        }
                    </ScrollView>
                </>
            }
            {
                selectedRepo && !selectedForm &&
                <>
                    <View style={{ ...styles.user, backgroundColor: 'lightblue', marginBottom: 10, padding: 10 }}>
                        <Text style={styles.name}>{selectedRepo.title}</Text>
                        <Text style={styles.name}>{selectedRepo.description}</Text>
                        {
                            selectedRepo.status !== 'closed' ?
                                <Button
                                    title="+ New Appoinment"
                                    onPress={() => setModalVisible(true)}
                                    buttonStyle={{ backgroundColor: 'green', marginBottom: 5, marginTop: 20 }}
                                />
                                :
                                <Button
                                    title="Closed"
                                    disabled={true}
                                    buttonStyle={{ backgroundColor: 'green', marginBottom: 5, marginTop: 20 }}
                                />

                        }

                        <Button
                            title="<< Back"
                            onPress={() => setSelectedRepo(null)}
                            buttonStyle={{ marginBottom: 20 }}
                        />
                        <Text>Followup Forms</Text>
                        {
                            prevForms.map(f =>
                                <Button
                                    key={f.id}
                                    title={f.title}
                                    onPress={() => setSelectedForm(f)}
                                    buttonStyle={{ marginBottom: 1, backgroundColor: 'gray' }}
                                />
                            )
                        }
                    </View>
                </>
            }
            {
                selectedRepo && selectedForm &&
                <>
                    <View style={{ ...styles.user, backgroundColor: 'lightyellow', marginBottom: 10, padding: 10 }}>
                        <Text style={styles.name}>{selectedForm.title}</Text>
                        <Text style={styles.name}>{selectedForm.details}</Text>
                        <Button
                            title="<< Back"
                            onPress={() => setSelectedForm(null)}
                            buttonStyle={{ marginBottom: 20 }}
                        />
                    </View>
                </>
            }

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
        padding: 10,
        marginBottom: 20
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
        backgroundColor: 'lightgrey',
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
