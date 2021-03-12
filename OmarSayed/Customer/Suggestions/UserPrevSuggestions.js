import React, { Component, useEffect, useState } from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    Alert
} from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import db from "../../../db";

export default function UserPrevSuggestions({ user }) {
    const [userPrevSuggs, setUserPrevSuggs] = useState([])

    useEffect(() => db.Suggestions.listenAllByUser(user.id, setUserPrevSuggs), [user])
    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Card.Title>My Prevoius Suggestions</Card.Title>
                <Card.Divider />
                {
                    userPrevSuggs.map((u, i) =>
                        <View key={i} style={{...styles.user, backgroundColor: 'lightblue', marginBottom:10, padding:10}}>
                            <Text style={styles.name}>{u.description}</Text>
                            <Text style={styles.name}>👍🏻{u.totalVotes + ''}</Text>
                        </View>
                    )
                }
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
    },
});

