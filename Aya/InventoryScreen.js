import React, { useState, useEffect } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import CategoryPicker from '../screens/pickers/CategoryPicker'
import TemperatureActions from '../screens/Admin/TemperatureActions'
import MotionActions from '../screens/Admin/MotionActions'
import { Picker } from '@react-native-picker/picker';
import db from '../db';


export default function InventoryScreen() {

    const [category, setCategory] = useState(null)
    const [active, setActive] = useState("")
    const [contact, setContact] = useState("")
    const [material, setMaterial] = useState("")
    const [techUsed, setTechUsed] = useState("")
    const [min, setMin] = useState("")
    const [max, setMax] = useState("")
    const [radius, setRadius] = useState("")
    const [luminescence, setLuminescence] = useState("")
    const [quantity, setQuantity] = useState("")
    const [price, setPrice] = useState("")

    const SubmitInventory = () => {
        let intquantity = Number(quantity)
        let intprice = Number(price)
        let bolactive = Boolean(active)
        let bolcontact = Boolean(contact)
        if (category.name === "Motion") {
            let intradius = Number(radius)
            db.Categories.Models.createModel(category.id, { active: bolactive, contact: bolcontact, material, techUsed, radius: intradius, quantity: intquantity, price: intprice })

        }
        if (category.name === "Temperature") {
            let minimum = Number(min)
            let maximum = Number(max)
            db.Categories.Models.createModel(category.id, { active: bolactive, contact: bolcontact, material, techUsed, min: maximum, max: maximum, quantity: intquantity, price: intprice })

        }
        if (category.name === "Light") {
            db.Categories.Models.createModel(category.id, { active: bolactive, contact: bolcontact, material, techUsed, luminescence, quantity: intquantity, price: intprice })

        }

    }
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground
                style={{ flex: 1 }}
                source={require('../assets/images/kitten.jpg')}  >
                <CategoryPicker set={setCategory} />

                <Picker
                    style={{ color: 'white', height: 40, width: 300, alignSelf: 'center' }}
                    selectedValue={active}
                    onValueChange={setActive}
                >
                    <Picker.Item label='Active' value="" />
                    <Picker.Item label='True' value="true" />

                    <Picker.Item label='False' value="false" />


                </Picker>
                <Picker
                    style={{ color: 'white', height: 40, width: 300, alignSelf: 'center' }}
                    selectedValue={contact}
                    onValueChange={setContact}
                >
                    <Picker.Item label='Contact' value="" />
                    <Picker.Item label='True' value="true" />

                    <Picker.Item label='False' value="false" />


                </Picker>
                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                    Choose material    </Text>
                <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center', }}
                    onChangeText={text => setMaterial(text)}
                    value={material}
                />
                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                    Choose used technology    </Text>
                <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center', }}
                    onChangeText={text => setTechUsed(text)}
                    value={techUsed}
                />

                {/* 
            {   

                category.name === "Motion"
                && <>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Choose radius    </Text>
                    <TextInput
                        style={{ color: 'black', height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setRadius(text)}
                        value={radius}
                    />       </>}
            {

                category.name === "Temperature"
                &&
                <>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Choose  min   </Text>
                    <TextInput
                        style={{ color: 'black', height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setMin(text)}
                        value={min}
                    />
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Choose   max  </Text>
                    <TextInput
                        style={{ color: 'black', height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setMax(text)}
                        value={max}
                    />

                </>}{
                category.name === "Light"
                &&
                <>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Choose  luminescence   </Text>
                    <TextInput
                        style={{ color: 'black', height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => setLuminescence(text)}
                        value={luminescence}
                    />


                </>} */}
                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                    Choose quantity   </Text>
                <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center', }}
                    onChangeText={text => setQuantity(text)}
                    value={quantity}
                />

                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                    Choose  price   </Text>
                <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2, borderRadius: 10, alignSelf: 'center', }}
                    onChangeText={text => setPrice(text)}
                    value={price}
                />
                <TouchableOpacity onPress={() => SubmitInventory()} style={styles.title}>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        Submit    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>);
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
        padding: 15,
        borderBottomWidth: 1,
        borderColor: 'white'
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