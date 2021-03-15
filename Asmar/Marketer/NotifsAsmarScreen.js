import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Alert } from "react-native";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import { Button, Input, Text } from "react-native-elements";
import UserPicker from "../../screens/pickers/UserPicker";
import db from "../../db";

//TODO: schedule notifications
//TODO: better picker for links
export default function NotifsAsmarScreen() {
    const { user } = useContext(UserContext);
    const [userNotif, setUserNotif] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [link, setLink] = useState("");

    const isValid = () => title && body && link;

    const submit = async () => {
        if (userNotif) {
            await db.Users.Notifications.send(userNotif.id, title, body, link);
        } else {
            const users = await db.Users.findAll();
            Promise.all(users.map((u) => db.Users.Notifications.send(u.id, title, body, link)));
        }
        setTitle("");
        setBody("");
        setLink("");
        Alert.alert("Notification Sent!", null, null, { cancelable: true });
        //console.log("Notification sent!");
    };

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Text h2>Send Notification</Text>
                <UserPicker set={setUserNotif} />
                <Text>Leave empty to send to all</Text>
                <Input
                    label="Title"
                    placeholder="Title"
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                />
                <Input
                    label="Body"
                    placeholder="Body"
                    value={body}
                    onChangeText={(value) => setBody(value)}
                />
                <Input
                    label="Link"
                    placeholder="Link"
                    value={link}
                    onChangeText={(value) => setLink(value)}
                />
                <Button title="Submit" onPress={submit} disabled={!isValid()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
