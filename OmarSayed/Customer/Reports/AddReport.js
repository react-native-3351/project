import React, { useEffect, useState } from "react";
import db from '../../../db'
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput
} from "react-native";
import { SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CategoryByUserPicker from "../../../screens/pickers/CategoryByUserPicker";
import SensorByUserAndCategoryPicker from "../../../screens/pickers/SensorByUserAndCategoryPicker";
import styleExt from './style'
import { Button } from 'react-native-elements'

export default function AddSuggestion({ user }) {
    const [about, setAbout] = useState('app')

    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')

    useEffect(() => setCategory(null), [user])
    const [category, setCategory] = useState(null)
    useEffect(() => setSensor(null), [category])
    const [sensor, setSensor] = useState(null)

    const addReport = () => {
        // console.log({ userId: user.id, description, likes: 0, dislikes: 0, typedDate: new Date() })
        db.Reports.create({ title, sensorId: sensor && sensor.id !== null ? sensor.id : '', userId: user.id, description, typedDate: new Date(), about, status: 'new', reply: '', repliedBy: '' })
        setDescription('')
        setTitle('')
        Alert.alert('Will Contact with You Soon 🌹')
    }



    let validate = () => {
        if (description === '' || title === '') {
            return false
        }
        else if (about === 'sensor' && !sensor) {
            return false
        }
        return true
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styleExt.secTitle}>
                Make Report
            </Text>
            <View>
                <Text style={styleExt.thirdTitle}>
                    About
                 </Text>
                <Picker
                    selectedValue={about}
                    onValueChange={setAbout}
                    style={{ ...styleExt.input, color: 'black' }}
                >
                    <Picker.Item label='Bug in the App' value="app" />
                    <Picker.Item label='Your Sensor' value="sensor" />

                </Picker>
            </View>
            {
                about === 'sensor' &&
                <View style={{ alignSelf: "center", }}>
                    {
                        user
                        &&
                        <CategoryByUserPicker set={setCategory} />
                    }
                    {
                        user
                        &&
                        category
                        &&
                        <SensorByUserAndCategoryPicker category={category} set={setSensor} />
                    }
                </View>
            }
            <TextInput
                placeholder="Title"
                style={styleExt.input}
                onChangeText={setTitle}
                value={title}
            />
            <View>
                <TextInput
                    multiline={true}
                    numberOfLines={10}
                    placeholder="Describe the Issue"
                    style={styleExt.textarea}
                    onChangeText={setDescription}
                    value={description}
                />
                <Button
                    title="Add"
                    onPress={() => addReport()}
                    buttonStyle={styleExt.button}
                    disabled={!validate()}
                />
                {/* {
                    console.log(description === '' ? about === 'app' && title === ''? true:false : true)
                } */}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: 6,
        backgroundColor: 'rgba(71, 1, 120, 0.27)',
        marginTop: 10
    },
    loremIpsum: {
        color: "#121212",
        fontSize: 15,
        marginTop: 10,
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
        borderWidth: 1,
        borderColor: 'lightgray',
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

