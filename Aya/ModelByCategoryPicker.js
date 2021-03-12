import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import db from '../db'
import { Picker } from '@react-native-picker/picker';
import Colors from '../constants/Colors';

export default function ModelByCategoryPicker({ category, set }) {
console.log(category)
    const [models, setModels] = useState([])
    useEffect(() => db.Categories.Models.listenAllModels(setModels, category?.id || ""), [category])
console.log(models)
    const [modelId, setModelId] = useState("")
    useEffect(() =>modelId!==""? db.Categories.Models.listenOneModel(set, modelId, category?.id ):undefined, [modelId])

    return (
        <Picker
            style={{ height: 50, width: 200 }}
            selectedValue={modelId}
            onValueChange={setModelId}
        >
            <Picker.Item label='Select Model' value="" />
            {
                models.map(model => <Picker.Item key={model.id} label={model.material} value={model.id} />)
            }
        </Picker>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
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
        fontSize: 17,
        lineHeight: 24,
        textAlign: 'center',
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
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
