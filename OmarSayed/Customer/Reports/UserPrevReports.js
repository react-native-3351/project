import React, { Component, useEffect, useState } from "react";
import { StyleSheet, SafeAreaView, View, Text, Alert } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import db from "../../../db";

export default function UserPrevReports({ user }) {
    const [userPrevReports, setUserPrevReports] = useState([]);

    useEffect(() => db.Reports.listenAllByUser(user.id, setUserPrevReports), [user]);

    const [selectedRepo, setSelectedRepo] = useState(null);
    const [prevForms, setPrevForms] = useState([]);
    useEffect(
        () =>
            selectedRepo
                ? db.Reports.FollowUpForm.listenAllByRepo(selectedRepo.id, setPrevForms)
                : undefined,
        [selectedRepo]
    );
    const [selectedForm, setSelectedForm] = useState(null);
    return (
        <SafeAreaView style={styles.container}>
            <Card>
                <Card.Title>My Reports</Card.Title>
                <Card.Divider />
                {!selectedRepo &&
                    !selectedForm &&
                    userPrevReports.map((u, i) => (
                        <View
                            key={i}
                            style={{
                                ...styles.user,
                                backgroundColor: "lightblue",
                                marginBottom: 10,
                                padding: 10,
                            }}
                        >
                            <Text style={styles.name}>{u.title}</Text>
                            <Text style={styles.name}>{u.description}</Text>
                            <Button title="Details" onPress={() => setSelectedRepo(u)} />
                        </View>
                    ))}
                {selectedRepo && !selectedForm && (
                    <View
                        style={{
                            ...styles.user,
                            backgroundColor: "lightblue",
                            marginBottom: 10,
                            padding: 10,
                        }}
                    >
                        <Text style={styles.name}>{selectedRepo.title}</Text>
                        <Button title="<< Back" onPress={() => setSelectedRepo(null)} />
                        <Text>Followup Forms</Text>
                        {prevForms.map((f) => (
                            <Button
                                key={f.id}
                                title={f.title}
                                onPress={() => setSelectedForm(f)}
                                buttonStyle={{ marginBottom: 1, backgroundColor: "gray" }}
                            />
                        ))}
                    </View>
                )}
                {selectedRepo && selectedForm && (
                    <>
                        <View
                            style={{
                                ...styles.user,
                                backgroundColor: "lightyellow",
                                marginBottom: 10,
                                padding: 10,
                            }}
                        >
                            <Text style={styles.name}>{selectedForm.title}</Text>
                            <Text style={styles.name}>{selectedForm.details}</Text>
                            <Button
                                title="<< Back"
                                onPress={() => setSelectedForm(null)}
                                buttonStyle={{ marginBottom: 20 }}
                            />
                        </View>
                    </>
                )}
            </Card>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 16,
    },
});
