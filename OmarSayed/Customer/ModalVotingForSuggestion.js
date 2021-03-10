import React, { Component, useEffect, useState } from "react";
import { Modal } from "react-native";
import { StatusBar } from "react-native";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert
} from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { ScrollView, TextInput } from "react-native-gesture-handler";
import db from "../../db";

export default function ModalVotingForSuggestion({ user, selectedSugg, modalVisible, setModalVisible }) {
    const [comment, setComment] = useState('')

    const addComment = async () => {
        await db.Suggestions.Votes.addUserComment(selectedSugg.id, { userId: user.id, comment })
        let data = selectedSugg
        delete data.v;
        await db.Suggestions.update({ ...data, totalVotes: selectedSugg.totalVotes + 1 })
        setComment('')
        setModalVisible(false)
        Alert.alert('Thanks for participating ❤')
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Button
                        color='red'
                        title="x"
                        onPress={() => setModalVisible(false)}
                        buttonStyle={{ backgroundColor: 'red' }}
                    />
                    <View style={{ marginTop: 15, alignSelf: 'center' }}>
                        <Text style={styles.titleText}>{selectedSugg.description}</Text>
                    </View>

                    <View style={{ marginTop: 15, alignSelf: 'center' }}>
                        <TextInput
                            multiline={true}
                            numberOfLines={2}
                            placeholder="comment..."
                            style={{ borderWidth: 1, borderColor: 'lightgray', width: 250, padding: 7, marginBottom: 7 }}
                            onChangeText={setComment}
                            value={comment}
                        />
                        <Button
                            title='Vote'
                            onPress={() => addComment()}
                        />
                    </View>

                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginHorizontal: 16,
    },
    containerScroll: {
        flex: 1,
        paddingTop: 5,
    },
    scrollView: {
        backgroundColor: 'lightgray',
        marginHorizontal: 20,
        width: 270,
        maxHeight: 100
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        // backgroundColor: 'snow',
        padding: 5
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
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 500
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
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold"
    }
});

