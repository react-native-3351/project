import React, { useState } from "react";
import db from '../../../db'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
import { SafeAreaView, Alert } from 'react-native';
import {Button} from 'react-native-elements'
import styleExt from './style'

export default function AddSuggestion({user}) {
    const [description, setDescription] = useState('')
    const addSuggestion = () => {
        // console.log({ userId: user.id, description, likes: 0, dislikes: 0, typedDate: new Date() })
        db.Suggestions.create({ userId: user.id, description, totalVotes: 0, typedDate: new Date() })
        setDescription('')
        Alert.alert('Thanks for your Suggestion ❤')
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styleExt.thirdTitle}>
                What would you like to see in our app? 😀
            </Text>
            <View>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Describe the suggestion"
                    style={styleExt.textarea}
                    onChangeText={setDescription}
                    value={description}
                />
                <Button
                    title="Add"
                    onPress={() => addSuggestion()}
                    disabled={description.length === 0 ? true : false}
                    buttonStyle={styleExt.button}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 6,
        marginTop: 20
    },
    loremIpsum: {
        color: "#121212",
        fontSize: 15,
        marginTop: 70,
        alignSelf: "center",
        marginBottom: 10
    },
    placeholder: {
        color: "#121212",
        height: 150,
        width: 328,
        textAlign: "left",
        borderRadius: 6,
        shadowColor: "rgba(0,0,0,1)",
        shadowOffset: {
            width: 0,
            height: 3
        },
        elevation: 5,
        shadowOpacity: 1,
        shadowRadius: 0,
        marginTop: 10,
        marginLeft: 23,
        marginBottom: 40,

        padding: 11
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

