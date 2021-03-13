import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import UserContext from '../UserContext'
import { ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import db from '../db';
import { Rating, AirbnbRating } from 'react-native-ratings';

import { setTokenSourceMapRange } from 'typescript';

export default function FAQScreen() {

    const { user } = useContext(UserContext)

    const [faqs, setFAQS] = useState(null)
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const [rate, setRate] = useState(0)
    console.log(rate)
    useEffect(() => {
        db.Faqs.listenAll(setFAQS)
    }, [])


    const handleAsk = () => {
        db.Faqs.create({ userid: user.id, question, answer: "" })
        setQuestion("")
    }
    const handleAnswer = (id) => {
        db.Faqs.update(id, answer)
    }
    const AddRate = (rate, id) => {
        db.Faqs.Rates.create(id, { rate, userid: user.id })
    }
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={require('../assets/images/kitten.jpg')}

            >
                {user &&
                    user.role == "Customer"
                    && <>
                        <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                            Ask a question    </Text>
                        <TextInput
                            style={{
                                color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center',
                            }} onChangeText={text => setQuestion(text)}
                            value={question}
                        />
                        <TouchableOpacity onPress={() => handleAsk()} style={styles.title}>
                            <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                                ask    </Text>
                        </TouchableOpacity>
                        {
                            faqs
                            && <>
                                {
                                    faqs.map(faq =>
                                        faq.answer !== "" &&
                                        <SafeAreaView key={faq.id}
                                            style={{
                                                borderBottomWidth: 1,
                                                borderColor: 'white'
                                            }}
                                        >
                                            <Text
                                                lightColor={Colors.dark.tint}
                                                style={styles.getStartedText}

                                            >
                                                {faq.question}?
                                            </Text>
                                            <TextInput
                                        style={{
                                           textAlign:'center', fontSize: 23,
                                            color: 'white', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center',
                                        }}
                                        editable={false}
                                        value={faq.answer}
                                    />
                                            <AirbnbRating
                                                count={5}
                                                defaultRating={11}
                                                size={20}
                                                onFinishRating={rating => AddRate(rating, faq.id)}
                                            />
                                        </SafeAreaView>

                                    )
                                }
                            </>
                        }
                    </>
                }
                {user &&
                    user.role == "Admin"
                    &&
                    faqs
                    && <>
                        {
                            faqs.map(faq =>
                                faq.answer == "" &&
                                <SafeAreaView key={faq.id}
                                    style={{
                                        borderBottomWidth: 1,
                                        borderColor: 'white'
                                    }}
                                >

                                    <Text

                                        style={styles.getStartedText}
                                        lightColor={Colors.dark.tint}
                                    >
                                        {faq.question}
                                        {faq.answer}
                                    </Text>
                                    <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                                        add answer    </Text>
                                    <TextInput
                                        style={{
                                            color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center',
                                        }}
                                        onChangeText={text => setAnswer(text)}
                                        value={answer}
                                    />
                                    <TouchableOpacity onPress={() => handleAnswer(faq.id)} style={styles.title}>
                                        <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                                            answer    </Text>
                                    </TouchableOpacity>

                                </SafeAreaView>
                            )

                        }
                    </>

                }
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        backgroundColor: 'transparent',
        fontSize: 23,
        lineHeight: 24,
        textAlign: 'left',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 23,
        textAlign: 'center',
    },
    title: {
        padding: 15,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});