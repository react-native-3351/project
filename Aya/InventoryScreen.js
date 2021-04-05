import React, { useState, useEffect } from "react";
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
} from "react-native";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import CategoryPicker from "../screens/pickers/CategoryPicker";
import { Picker } from "@react-native-picker/picker";
import db from "../db";
import { Button } from "react-native-elements";

export default function InventoryScreen() {
    const [category, setCategory] = useState(null);
    const [active, setActive] = useState("");
    const [contact, setContact] = useState("");
    const [material, setMaterial] = useState("");
    const [techUsed, setTechUsed] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [radius, setRadius] = useState("");
    const [luminescence, setLuminescence] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");

    const SubmitInventory = () => {
        let intquantity = Number(quantity);
        let intprice = Number(price);
        let bolactive = Boolean(active);
        let bolcontact = Boolean(contact);
        if (category.name === "Motion") {
            let intradius = Number(radius);
            db.Categories.Models.createModel(category.id, {
                active: bolactive,
                contact: bolcontact,
                material,
                techUsed,
                radius: intradius,
                quantity: intquantity,
                price: intprice,
            });
        }
        if (category.name === "Temperature") {
            let minimum = Number(min);
            let maximum = Number(max);
            db.Categories.Models.createModel(category.id, {
                active: bolactive,
                contact: bolcontact,
                material,
                techUsed,
                min: maximum,
                max: maximum,
                quantity: intquantity,
                price: intprice,
            });
        }
        if (category.name === "Light") {
            db.Categories.Models.createModel(category.id, {
                active: bolactive,
                contact: bolcontact,
                material,
                techUsed,
                luminescence,
                quantity: intquantity,
                price: intprice,
            });
        }
    };
    return (
        <SafeAreaView style={styles.container}>
                        <ScrollView>

            <ImageBackground style={{ flex: 1 }} 
            
            source={{uri: "https://i.pinimg.com/originals/7e/c0/c8/7ec0c8a050546e72ea781d8aa047c48c.jpg"}}
            >
                <CategoryPicker
                    style={{ color: "white", height: 40, width: 300, alignSelf: "center" }}
                    set={setCategory}
                />

                <Picker
                    style={{ color: "white", height: 40, width: 300, alignSelf: "center" }}
                    selectedValue={active}
                    onValueChange={setActive}
                >
                    <Picker.Item label="Active" value="" />
                    <Picker.Item label="True" value="true" />

                    <Picker.Item label="False" value="false" />
                </Picker>
                <Picker
                    style={{ color: "white", height: 40, width: 300, alignSelf: "center" }}
                    selectedValue={contact}
                    onValueChange={setContact}
                >
                    <Picker.Item label="Contact" value="" />
                    <Picker.Item label="True" value="true" />

                    <Picker.Item label="False" value="false" />
                </Picker>
                <Text style={styles.paragraph} lightColor={Colors.dark.tint}>
                    Choose material{" "}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setMaterial(text)}
                    value={material}
                />
                <Text style={styles.paragraph} lightColor={Colors.dark.tint}>
                    Choose used technology{" "}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTechUsed(text)}
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
                <Text style={styles.paragraph} lightColor={Colors.dark.tint}>
                    Choose quantity{" "}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setQuantity(text)}
                    value={quantity}
                />

                <Text style={styles.paragraph} lightColor={Colors.dark.tint}>
                    Choose price{" "}
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPrice(text)}
                    value={price}
                />
                <Button
                    title="Submit"
                    onPress={() => SubmitInventory()}
                    buttonStyle={styles.button}
                    lightColor={Colors.dark.tint}
                />
            </ImageBackground>
            </ScrollView>
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
