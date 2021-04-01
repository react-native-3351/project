import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, TextInput, ImageBackground, Text, Pressable, Alert } from "react-native";
import { Button } from "react-native-elements";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import UserPicker from "../../screens/pickers/UserPicker";
import LinkPicker from "../../screens/pickers/LinkPicker";
import * as ImagePicker from "expo-image-picker";
import db from "../../db";
import DateTimePicker from "@react-native-community/datetimepicker";
import fb from "../../fb";
import { Link } from "@react-navigation/native";

export default function NotifsAsmarScreen() {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Sorry, we need camera roll permissions to make this work!");
                }
            }
        })();
    }, []);

    const { user } = useContext(UserContext);
    const [link, setLink] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [showStartDate, setShowStartDate] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDate, setShowEndDate] = useState(false);

    const isValid = () => link && startDate && endDate && startDate < endDate;

    const submit = async () => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!image.cancelled) {
            const doc = await db.Advertisements.create({
                userId: user.id,
                startDate,
                endDate,
                link,
            });
            // image's name is the ad's id
            const imageRef = await fb.storage().ref(`ads/${user.id}/images/${doc.id}.jpg`);

            const response = await fetch(image.uri);
            const blob = await response.blob();
            await imageRef.put(blob);
            const url = await imageRef.getDownloadURL();
            //console.log("url", url);
            blob.close();

            //TODO: make sure is necessary
            await db.Advertisements.update(doc.id, { url });
            setLink("");
            setStartDate(new Date());
            setEndDate(new Date());
            Alert.alert("Advertisement uploaded!", null, null, { cancelable: true });
        }
    };

    const formatDate = (date) => {
        return date instanceof Date
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            : "";
    };

    useEffect(() => console.log(link), [link]);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri:
                        "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif",
                }}
                style={styles.image}
            >
                <Text style={styles.mainTitle}>Upload Advertisement{"\n"}</Text>
                <Text style={styles.label}>Link</Text>
                <LinkPicker set={setLink} style={styles.input}/>
                <Text style={styles.label}>Start Date</Text>
                <Pressable onPress={() => setShowStartDate(true)}>
                    <Text style={[styles.input, styles.inputDisplay]}>{formatDate(startDate)}</Text>
                </Pressable>
                {showStartDate && (
                    <DateTimePicker
                        minimumDate={new Date()}
                        value={startDate}
                        onChange={(event, date) => {
                            setShowStartDate(false);
                            setStartDate(date);
                            if (startDate > endDate) setEndDate(startDate);
                            //console.log(startDate, endDate);
                        }}
                    />
                )}
                <Text style={styles.label}>End Date</Text>
                <Pressable onPress={() => setShowEndDate(true)}>
                    <Text style={[styles.input, styles.inputDisplay]}>{formatDate(endDate)}</Text>
                </Pressable>
                {showEndDate && (
                    <DateTimePicker
                        value={endDate}
                        onChange={(event, date) => {
                            setShowEndDate(false);
                            setEndDate(date);
                            if (startDate > endDate) setStartDate(endDate);
                        }}
                    />
                )}
                <Button
                    buttonStyle={styles.button}
                    title="Upload Image"
                    onPress={submit}
                    disabled={!isValid()}
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
});
