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
import { Rating, AirbnbRating } from "react-native-ratings";
import { setTokenSourceMapRange } from "typescript";
import { Button } from "react-native-elements";
const image = {
    uri: "https://wallpaperaccess.com/full/1105968.jpg",
};
export default function FAQScreen() {
    const { user } = useContext(UserContext);

    const [faqs, setFAQS] = useState(null);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [rate, setRate] = useState(0);
    //console.log(rate)
    useEffect(() => {
        db.Faqs.listenAll(setFAQS);
    }, []);

    const handleAsk = () => {
        db.Faqs.create({ userid: user.id, question, answer: answer });
        setQuestion("");
        setAnswer("");
    };
    const handleAnswer = (id) => {
        db.Faqs.update(id, answer);
    };
    const AddRate = (rate, id) => {
        db.Faqs.Rates.create(id, { rate, userid: user.id });
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={image}
            >
                {user && user.role == "Admin" && (
                    <>
                        <Text style={styles.mainTitle} lightColor={Colors.dark.tint}>
                            Add a question{" "}
                        </Text>
                        <TextInput
                            style={styles.input}
                            lightColor={Colors.dark.tint}
                            onChangeText={(text) => setQuestion(text)}
                            value={question}
                        />
                        <TextInput
                            style={styles.input}
                            lightColor={Colors.dark.tint}
                            onChangeText={(text) => setAnswer(text)}
                            value={answer}
                        />
                        {answer !== "" && question !== "" && (
                            <Button
                                title="add"
                                onPress={() => handleAsk()}
                                buttonStyle={styles.button}
                                lightColor={Colors.dark.tint}
                            />
                        )}

                        {faqs && (
                            <>
                                {faqs.map(
                                    (faq) =>
                                        faq.answer !== "" && (
                                            <SafeAreaView
                                                key={faq.id}
                                                style={{
                                                    borderBottomWidth: 1,
                                                    borderColor: "white",
                                                }}
                                            >
                                                <Text
                                                    lightColor={Colors.dark.tint}
                                                    style={styles.paragraph}
                                                >
                                                    {faq.question}?
                                                </Text>
                                                <TextInput
                                                    style={styles.input}
                                                    editable={false}
                                                    value={faq.answer}
                                                />
                                            </SafeAreaView>
                                        )
                                )}
                            </>
                        )}
                    </>
                )}
                {user && user.role == "Customer" && faqs && (
                    <>
                        {faqs.map((faq) => (
                            <SafeAreaView
                                key={faq.id}
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: "white",
                                }}
                            >
                                <Text lightColor={Colors.dark.tint} style={styles.getStartedText}>
                                    {faq.question}?
                                </Text>
                                <TextInput
                                    style={{
                                        textAlign: "center",
                                        fontSize: 23,
                                        color: "white",
                                        height: 40,
                                        width: 300,
                                        borderColor: "white",
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        alignSelf: "center",
                                    }}
                                    editable={false}
                                    value={faq.answer}
                                />
                                <AirbnbRating
                                    count={5}
                                    defaultRating={11}
                                    size={20}
                                    onFinishRating={(rating) => AddRate(rating, faq.id)}
                                />
                            </SafeAreaView>
                        ))}
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
        fontSize: 28,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    paragraph: {
        fontSize: 28,
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
