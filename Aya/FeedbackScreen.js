import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import UserContext from "../UserContext";
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from "react-native";
import db from "../db";
import { setTokenSourceMapRange } from "typescript";
import { Picker } from "@react-native-picker/picker";
import CategoryPicker from "../screens/pickers/CategoryPicker";
import ModelByCategoryPicker from "./ModelByCategoryPicker";
import { Button } from "react-native-elements";

export default function FaadbackScreen() {
    const { user } = useContext(UserContext);
    const [feedbacks, setFeedbacks] = useState(null);
    const [feedbackabout, setFeedbackAbout] = useState("");
    const [category, setCategory] = useState(null);
    const [model, setModel] = useState(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        db.Feedbacks.listenAll(setFeedbacks);
    }, []);

    const handleSave = () => {
        db.Feedbacks.create({
            userid: user.id,
            category: category.name,
            model: model.material,
            feedbackabout,
            comment,
        });
        setComment("");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={{ flex: 1 }} 
                source={{uri:
                    "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif"
                }}
                >
                <Text style={styles.mainTitle} lightColor={Colors.dark.tint}>
                    Add a feedback{" "}
                </Text>
                <Picker
                    style={{ color: "white", height: 40, width: 300, alignSelf: "center" }}
                    selectedValue={feedbackabout}
                    onValueChange={setFeedbackAbout}
                >
                    <Picker.Item label="Feedback about" value="" />
                    <Picker.Item label="sensor" value="sensor" />

                    <Picker.Item label="application" value="application" />
                </Picker>
                {feedbackabout == "sensor" && (
                    <CategoryPicker
                        style={{ color: "white", height: 40, width: 300, alignSelf: "center" }}
                        set={setCategory}
                    />
                )}
                {feedbackabout == "sensor" && category && (
                    <ModelByCategoryPicker category={category} set={setModel} />
                )}
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                />
                {feedbackabout == "sensor" ? (
                    comment!=""&&
                    category &&
                    model && (
                        <Button
                            title="save"
                            onPress={() => handleSave()}
                            buttonStyle={styles.button}
                            lightColor={Colors.dark.tint}
                        />
                    )
                ) : (
                    comment!=""&&
                    <Button
                        title="save"
                        onPress={() => handleSave()}
                        buttonStyle={styles.button}
                        lightColor={Colors.dark.tint}
                    />
                )}

                {feedbacks && (
                    <>
                        {feedbacks.map((feedback) =>
                            feedback.feedbackabout == "sensor" ? (
                                <Text
                                    key={feedback.id}
                                    lightColor={Colors.dark.tint}
                                    style={styles.paragraph}
                                >
                                    - category: {feedback.category}
                                    {"\n"}- sensor: {feedback.model}
                                    {"\n"}- {feedback.comment}
                                </Text>
                            ) : (
                                <Text
                                    key={feedback.id}
                                    lightColor={Colors.dark.tint}
                                    style={styles.paragraph}
                                >
                                    - {feedback.comment}
                                </Text>
                            )
                        )}
                    </>
                )}
            </ImageBackground>
        </SafeAreaView>
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
        borderWidth: 1,
        borderColor: "purple",
        backgroundColor: "white",
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 12,
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
        marginHorizontal: 50,
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
        backgroundColor: "transparent",
        fontSize: 23,
        lineHeight: 24,
        textAlign: "left",
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
        fontSize: 23,
        textAlign: "center",
    },
    title: {
        padding: 15,
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
