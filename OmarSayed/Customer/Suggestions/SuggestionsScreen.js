import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../../UserContext'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ImageBackground
} from "react-native";
import { SafeAreaView, Alert } from 'react-native';
import { Dimensions } from 'react-native';
import { Button } from 'react-native-elements'
import AddSuggestion from './AddSuggestion'
import ShowSuggestions from './ShowSuggestions'
import UserPrevSuggestions from './UserPrevSuggestions'

const image = {
    uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
};

export default function SuggestionsScreen() {
    const [tab, setTab] = useState('AddSuggestion')
    const { user } = useContext(UserContext)

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.loremIpsum}>
                    {/* What would you like to see in our app? 😀 */}
                </Text>
                <View style={styles.fixToText}>
                    <Button
                        title="+ Suggestion"
                        onPress={() => setTab('AddSuggestion')}
                        buttonStyle={{ width: (windowWidth / 3) - 15 }}
                    />
                    <Button
                        title="Show Prev"
                        onPress={() => setTab('PrevSuggestions')}
                        buttonStyle={{ width: (windowWidth / 3) - 15 }}
                    />
                    <Button
                        title="Vote"
                        onPress={() => setTab('Vote')}
                        buttonStyle={{ width: (windowWidth / 3) - 15 }}
                    />
                </View>

                {
                    /* section to submit the suggestion*/
                    tab === 'AddSuggestion' && <AddSuggestion user={user} /> ||
                    /* section two: to check previous suggestions */
                    tab === 'PrevSuggestions' && <UserPrevSuggestions user={user} /> ||
                    /*secion three: to see and vote for others*/
                    tab === 'Vote' && <ShowSuggestions user={user} />
                }
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // marginHorizontal: 16,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    loremIpsum: {
        color: "#121212",
        fontSize: 15,
        marginTop: 70,
        alignSelf: "center",
        marginBottom: 10
    },
    button: {
        width: 151,
        height: 35,
        backgroundColor: "#E6E6E6",
        borderRadius: 10
    },
    button2: {
        width: 151,
        height: 35,
        backgroundColor: "rgba(44,133,149,1)",
        borderRadius: 10,
        marginLeft: 27,
        textAlign: 'center'
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
        marginTop: 35,
        marginLeft: 23,
        marginBottom: 30,

        padding: 11
    },

    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

