import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import UserContext from '../UserContext'
import {ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import db from '../db';
import { setTokenSourceMapRange } from 'typescript';

export default function FaadbackScreen() {

    const { user } = useContext(UserContext)

    const [feedbacks, setFeedbacks] = useState(null)
    const [comment, setComment] = useState("")

    useEffect(() => {
        db.Feedbacks.listenAll(setFeedbacks)
    }, [])


    const handleSave = () => {

        db.Feedbacks.create({ userid: user.id, comment: comment })
        setComment("")

    }

    return (
        

            <SafeAreaView style={styles.container}>
          
          <ImageBackground
        style={{ flex: 1 }}
        //We are using online image to set background
        source={require('../assets/images/kitten.jpg')}
        //You can also set image from your project folder
        //require('./images/background_image.jpg')        //
      >
                <Text style={styles.title} lightColor={Colors.dark.tint}>
                    Add a feedback    </Text>
                <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2 , borderRadius:10, alignSelf:'center',
                }}
                    onChangeText={text => setComment(text)}
                    value={comment}
                />
                <TouchableOpacity onPress={() => handleSave()} style={styles.title}>
                    <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                        save    </Text>
                </TouchableOpacity>
                
                
                {
         feedbacks
          &&<>
          {
            feedbacks.map(feedback=><Text
            key={feedback.id}
            lightColor={Colors.dark.tint}
              style={styles.getStartedText}
              
          >
             -  {feedback.comment}
              

          </Text>)
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
        fontSize: 23,
        lineHeight: 24,
        textAlign: 'left',
        padding:15,
        borderBottomWidth:1,
        borderColor:'white'
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
        padding:15,
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
