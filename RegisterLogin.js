import React, { useState } from "react";
import fb from "./fb";
import db from "./db";
import Colors from "./constants/Colors";
import LoginPicker from "./screens/pickers/LoginPicker";
import { StyleSheet, TextInput, TouchableOpacity, ImageBackground, Text, View } from "react-native";

export default function RegisterLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        await fb.auth().signInWithEmailAndPassword(email, password);
    };

    const register = async () => {
        console.log("register");
        try {
            await fb.auth().createUserWithEmailAndPassword(email, password);
            const uid = fb.auth().currentUser.uid;
            await db.Users.update({ id: uid, role: "Customer" });
            await db.Users.Gifts.create(uid, {
                name: "Welcome Gift: Get QAR 100 off on any sensor of your choice!",
                value: 100,
                expiry: new Date(Date.now() + 604800000), //604800000 is the number of milliseconds in one week
                isUsed: false,
            });
            await db.Users.Notifications.send(
                uid,
                "Welcome to TechMart!",
                "Check your gifts for a special offer just for you!",
                "Gifts"
            );
        } catch (error) {
            alert(error.message);
        }
    };

    const image = {
        uri: "https://i.pinimg.com/originals/7e/c0/c8/7ec0c8a050546e72ea781d8aa047c48c.jpg",
        // uri: "https://www.itl.cat/pngfile/big/7-73431_true-black-wallpapers-for-the-iphone-x-iphone.jpg"
    };

    const valid = () => email !== "" && password !== "";

    return (
        <ImageBackground source={image} style={styles.image}>
            <View style={styles.container}>
                <Text style={styles.logo}>TechMart</Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Email..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        secureTextEntry
                        style={styles.inputText}
                        placeholder="Password..."
                        placeholderTextColor="#003f5c"
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <TouchableOpacity disabled={!valid()} onPress={login} style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity disabled={!valid()} onPress={register} style={styles.loginBtn}>
                    <Text style={styles.loginText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'black',
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50,
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#ecdbff",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#ca9aff",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "white",
    },
    forgot: {
        color: "white",
        fontSize: 11,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#c577ff",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
    loginText: {
        color: "white",
    },
});
