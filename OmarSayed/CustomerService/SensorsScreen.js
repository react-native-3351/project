import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, TextInput, Alert, Modal, Pressable } from "react-native";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import fb from "../../fb";
import db from "../../db";
import { SafeAreaView } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import { ScrollView, StatusBar } from "react-native";
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function SensorsScreen() {
    const { user } = useContext(UserContext);
    const [allQueries, setAllQueries] = useState([]);
    useEffect(() => db.Queries.listenAll(setAllQueries), [user]);


    const [allReports, setAllReports] = useState([]);
    useEffect(() => db.Reports.listenAllForCS(user.id, setAllReports), [user]);

    const [allQueriesUnRead, setAllQueriesUnRead] = useState([]);
    useEffect(() => db.Queries.listenAllForCS(user.id, setAllQueriesUnRead), [user]);

    const [allReportsNew, setAllReportsNew] = useState([]);
    const [allReportsOnGoing, setAllReportsOnGoing] = useState([]);
    const [allReportsClosed, setAllReportsClosed] = useState([]);

    useEffect(() => db.Reports.listenAllForCSStatus('new', setAllReportsNew), [user]);
    useEffect(() => db.Reports.listenAllForCSStatus('ongoing', setAllReportsOnGoing), [user]);
    useEffect(() => db.Reports.listenAllForCSStatus('closed', setAllReportsClosed), [user]);
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>

                <Text style={styles.title}>Welcome to the Dashboard Mr./Ms. {user.name}</Text>
                <View style={styles.fixToText}>
                    <Text style={styles.tableTdm}>All Queries:</Text>
                    <Text style={styles.tableTdm}>{allQueries.length}</Text>
                </View>
                <View style={styles.fixToText}>
                    <Text style={styles.tableTd}>All replied Queries:</Text>
                    <Text style={styles.tableTd}>{allQueriesUnRead.length}</Text>
                </View>
                <View style={styles.fixToText}>
                    <Text style={styles.tableTd}>All unreplied Queries:</Text>
                    <Text style={styles.tableTd}>{allQueries.length - allQueriesUnRead.length}</Text>
                </View>
               
               
                <View style={styles.fixToText}>
                    <Text style={styles.tableTdm}>All Reports:</Text>
                    <Text style={styles.tableTdm}>{allReports.length}</Text>
                </View>
                <View style={styles.fixToText}>
                    <Text style={styles.tableTd}>All new Reports:</Text>
                    <Text style={styles.tableTd}>{allReportsNew.length}</Text>
                </View>
                <View style={styles.fixToText}>
                    <Text style={styles.tableTd}>All ongoing Reports:</Text>
                    <Text style={styles.tableTd}>{allReportsOnGoing.length}</Text>
                </View>
                <View style={styles.fixToText}>
                    <Text style={styles.tableTd}>All closed Reports:</Text>
                    <Text style={styles.tableTd}>{allReportsClosed.length}</Text>
                </View>
             
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
        textAlign: "center",
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: "center",
        marginTop: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)",
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: "center",
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: "center",
        color: "white",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        backgroundColor: "lightblue",
        padding: 10,
        marginBottom: 30
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    //Omar Sayed
    sensorBlocks: {
        backgroundColor: "#fc86d9",
        padding: 11,
        width: "80%",
        margin: 3,
    },
    sensorBlocksReply: {
        backgroundColor: "lightgreen",
        padding: 11,
        width: "80%",
        margin: 3,
        height: 100,
        justifyContent: "center",
    },
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        backgroundColor: "snow",
        marginHorizontal: 0,
    },
    text: {
        fontSize: 42,
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
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
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
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        marginHorizontal: 11
    },
    tableTd:{
        padding: 10,
        backgroundColor: '#F5F858',
        width: windowWidth/2,
        fontWeight: 'bold'
        // color: 'white'
    },
    tableTdm:{
        padding: 10,
        backgroundColor: '#D56BC7',
        width: windowWidth/2,
        fontWeight: 'bold'
    }
});
