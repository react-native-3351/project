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
import { Button, SafeAreaView, Alert } from 'react-native';
import styleExt from './style'
import AddReport from './AddReport'
import UserPrevReports from './UserPrevReports'
const image = {
    uri: "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif"
    // uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
  };
export default function ReportsScreen() {
    const [tab, setTab] = useState('AddReport')
    const { user } = useContext(UserContext)
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} style={styleExt.image}>
                <Text style={styles.loremIpsum}>
                </Text>
                <View>
                    <View style={styles.fixToText}>
                        <Button
                            title="Make Report"
                            onPress={() => setTab('AddReport')}
                        />
                        <Button
                            title="Show Prev"
                            onPress={() => setTab('PrevReports')}
                        />
                    </View>
                </View>

                {
                    /* section to submit the suggestion*/
                    tab === 'AddReport' && <AddReport user={user} /> ||
                    /* section two: to check previous suggestions */
                    tab === 'PrevReports' && <UserPrevReports user={user} />
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

