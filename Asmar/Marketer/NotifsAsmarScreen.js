import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, Alert, TextInput, Text, ImageBackground } from "react-native";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import { Button } from "react-native-elements";
import UserPicker from "../../screens/pickers/UserPicker";
import LinkPicker from "../../screens/pickers/LinkPicker";
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
        Alert.alert("Sent!", null, null, { cancelable: true });
        ////console.log("Notification sent!");
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri:
                        "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif",
                }}
                style={styles.image}
            >
                <Text style={styles.mainTitle}>Send Notification{"\n"}</Text>
                <Text style={styles.label}>Receiver</Text>
                <UserPicker set={setUserNotif} style={styles.input} defaultLabel="Send to All" />
                <Text style={styles.label}>Title</Text>
                <TextInput
                    placeholder="Title"
                    value={title}
                    onChangeText={(value) => setTitle(value)}
                    style={styles.input}
                />
                <Text style={styles.label}>Body</Text>
                <TextInput
                    placeholder="Body"
                    value={body}
                    onChangeText={(value) => setBody(value)}
                    style={styles.input}
                />
                <Text style={styles.label}>Link</Text>
                <LinkPicker set={setLink} style={styles.input} />

                <Button
                    title="Submit"
                    onPress={submit}
                    disabled={!isValid()}
                    buttonStyle={styles.button}
                />
            </ImageBackground>
        </View>
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
        color: "black",
        borderRadius: 30,
        padding: 10,
        paddingLeft: 15,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    inputDisplay: {
        paddingTop: 20,
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
    label: {
        fontSize: 16,
        color: "white",
        textAlign: "left",
        marginHorizontal: 40,
        marginBottom: -10,
    },
    picker: {
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        color: "black",
        borderRadius: 30,
        padding: 10,
        paddingLeft: 15,
        marginHorizontal: 30,
        marginVertical: 12,
    },
});
