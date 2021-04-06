import React, { Component, useEffect, useState } from "react";
import { Modal } from "react-native";
import { StatusBar } from "react-native";
import { StyleSheet, SafeAreaView, View, Text, Alert } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import db from "../../../db";
import ModalVotingForSuggestion from "./ModalVotingForSuggestion";

export default function ShowSuggestions({ user }) {
    const [suggs, setSuggs] = useState(null);
    useEffect(() => db.Suggestions.listenAll(setSuggs), [user]);

    // update auto
    const [allVotes, setAllVotes] = useState([]);
    useEffect(() => db.Suggestions.Votes.listenAll(setAllVotes), [user]);
    const [suggsVotes, setSuggsVotes] = useState(null);
    // useEffect(() => suggs && (async ()=>{await db.Suggestions.Votes.getVotes(suggs, setSuggsVotes)})() , [suggs])
    useEffect(() => {
        if (suggs) {
            (async () => await db.Suggestions.Votes.getVotes(suggs, setSuggsVotes, user.id))();
        }
    }, [suggs, allVotes]);

    const [selectedSugg, setSelectedSugg] = useState({});

    // const [votes, setVotes] = useState([])
    // useEffect(() => {
    //     selectedSugg && db.Suggestions.Votes.listenAllBySugg(selectedSugg.id, setVotes)
    // }, [selectedSugg])

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ModalVotingForSuggestion
                selectedSugg={selectedSugg}
                user={user}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />

            <Card
                containerStyle={{ marginTop: 10, width: "100%", alignSelf: "center", height: 600 }}
            >
                <Card.Title>Vote for Suggestion</Card.Title>
                <Card.Divider />
                <SafeAreaView>
                    <ScrollView style={{ maxHeight: 500 }}>
                        {suggsVotes &&
                            suggsVotes?.map(
                                (u, i) =>
                                    u.userId !== user.id && (
                                        <View
                                            key={i}
                                            style={{
                                                ...styles.user,
                                                backgroundColor: "lightblue",
                                                marginBottom: 10,
                                                padding: 10,
                                                minHeight: 230,
                                            }}
                                        >
                                            <Text style={styles.titleText}>{u.description}</Text>
                                            <Text style={{ fontWeight: "bold" }}>
                                                Total Votes: {u.totalVotes + ""}
                                            </Text>
                                            {/* <Text style={{ fontWeight: 'bold' }}>{u.voted + ''}</Text> */}
                                            <Card.Divider />
                                            <Text>Comments</Text>

                                            <SafeAreaView style={styles.containerScroll}>
                                                <ScrollView style={styles.scrollView}>
                                                    {u.v &&
                                                        u.v.map((vote) => (
                                                            // vote.userId === u.userId &&
                                                            <View
                                                                key={vote.id}
                                                                style={{
                                                                    backgroundColor: "snow",
                                                                    minHeight: 50,
                                                                    borderWidth: 1,
                                                                    borderColor: "lightgray",
                                                                }}
                                                            >
                                                                <Text>{vote.comment}</Text>
                                                            </View>
                                                        ))}
                                                </ScrollView>
                                            </SafeAreaView>
                                            <View style={styles.fixToText}>
                                                <Button
                                                    title="Comments"
                                                    onPress={() => {
                                                        setSelectedSugg(u);
                                                        setModalVisible(true);
                                                    }}
                                                    disabled={
                                                        u.v
                                                            ? u.v.filter(
                                                                (vote) => vote.userId === user.id
                                                            ).length === 0
                                                                ? false
                                                                : true
                                                            : false
                                                    }
                                                />
                                            </View>
                                        </View>
                                    )
                            )}
                    </ScrollView>
                </SafeAreaView>
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        // marginHorizontal: 16,
    },
    containerScroll: {
        flex: 1,
        paddingTop: 5,
    },
    scrollView: {
        backgroundColor: "lightgray",
        marginHorizontal: 20,
        width: 270,
        maxHeight: 100,
    },
    fixToText: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        // backgroundColor: 'snow',
        padding: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: 500,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
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
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
