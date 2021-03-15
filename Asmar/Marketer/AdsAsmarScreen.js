import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import { Button, Input, Text } from "react-native-elements";
import UserPicker from "../../screens/pickers/UserPicker";
import * as ImagePicker from "expo-image-picker";
import db from "../../db";
import DatePicker from "react-native-datepicker";
import fb from "../../fb";

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
    const [altText, setAltText] = useState("");
    const [link, setLink] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const isValid = () => altText && link && startDate && endDate && startDate < endDate;

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
                altText,
                link,
            });
            // image's name is the ad's id
            const imageRef = await fb.storage().ref(`ads/${user.id}/images/${doc.id}.jpg`);

            const response = await fetch(image.uri);
            const blob = await response.blob();
            await imageRef.put(blob);
            const url = await imageRef.getDownloadURL();
            console.log("url", url);
            blob.close();

            //TODO: make sure is necessary
            await db.Advertisements.update(doc.id, { url });
        }
    };

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Text h2>Upload Advertisement</Text>
                <Input
                    label="Describe the Advertisement"
                    placeholder="Alt Text"
                    value={altText}
                    onChangeText={(value) => setAltText(value)}
                />
                <Input
                    label="Link"
                    placeholder="Link"
                    value={link}
                    onChangeText={(value) => setLink(value)}
                />
                <Text>Start Date</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={startDate}
                    onDateChange={(value) => setStartDate(value)}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                />
                <Text>End Date</Text>
                <DatePicker
                    style={{ width: 200 }}
                    date={endDate}
                    onDateChange={(value) => setEndDate(value)}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                />
                <Button title="Submit" onPress={submit} disabled={isValid()} />
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
