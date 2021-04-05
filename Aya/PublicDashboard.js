import React, { useState, useEffect, useContext } from "react";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import CategoryPicker from "../screens/pickers/CategoryPicker";
import ModelByCategoryPicker from "./ModelByCategoryPicker";
import UserContext from "../UserContext";
import {
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
} from "react-native";
import db from "../db";
import Payment from "./Payment";
import { setTokenSourceMapRange } from "typescript";
import { Button } from "react-native-elements";
import RegisterLogin from "../RegisterLogin";

export default function PublicDashboard() {
    const [category, setCategory] = useState(null);
    const [models, setModels] = useState([]);
    const [login, setLogin]=useState(false)
    useEffect(() =>category? db.Categories.Models.listenAllModels(setModels, category.id):undefined, [category]);
    
    return (
        login?
        <RegisterLogin/>:

        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={{uri: "https://i.pinimg.com/originals/7e/c0/c8/7ec0c8a050546e72ea781d8aa047c48c.jpg"}}
                //You can also set image from your project folder
                //require('./images/background_image.jpg')        //
            >
                <Text>
                    {"\n"}
                    {"\n"}
                    {"\n"}
                </Text>
                
                     <Button
                            title="Login or Register"
                            onPress={() => setLogin(true)}
                            buttonStyle={styles.button}
                            lightColor={Colors.dark.tint}
                        /> 
                        <Text  style={{
                                    color: "white",
                                    height: 40,
                                    width: 200,
                                    alignSelf: "center",
                                    fontSize: 32,
                                    fontWeight: "bold",
                                    
                                }} lightColor={Colors.dark.tint}>
                    Our Products                        </Text>
                        
                            <CategoryPicker
                                style={{
                                    color: "white",
                                    height: 40,
                                    width: 200,
                                    alignSelf: "center",
                                }}
                                set={setCategory}
                            />
                        
                        { category &&models&&
                         models.map(model=><Text  style={styles.thirdTitle}>


                           material: {model.material}
                           {"\n"}
                          Technology:{model.techUsed}
                          {"\n"}
                            </Text>)}
                        
            </ImageBackground>
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
