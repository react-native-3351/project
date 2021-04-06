import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, ImageBackground, ScrollView } from "react-native";
import { Text } from "../../components/Themed";
import db from "../../db";
import UserContext from "../../UserContext";
import { Icon, Card } from "react-native-elements";
import { styles as styleExt, image as img } from "../../OmarSayed/StyleComponents";


export default function ActionsScreen() {
    const { user } = useContext(UserContext);
    const [gifts, setGifts] = useState(null);
    useEffect(() => db.Users.Gifts.listenNotExpired(setGifts, user.id), []);
    console.log(gifts)
    // useEffect(() => //console.log("Gifts: ", gifts), [gifts]);
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={img} style={styleExt.image}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.helpLinkText}>Your Gifts!</Text>
                    {gifts
                        ? gifts.map(
                            (gift) =>
                                !gift.isUsed && (
                                    <Card key={gift.id} bottomDivider>
                                        <Icon name="pricetag" type="ionicon" />
                                        <Card.Title>{gift.name}</Card.Title>
                                        <Text>
                                            Expires in
                                          {" " +
                                                Math.ceil(
                                                    (gift.expiry.seconds * 1000 - Date.now()) /
                                                    86400000
                                                ) +
                                                " "}
                                          days!
                                      </Text>
                                    </Card>
                                )
                        )
                        : null}
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
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
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
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
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#2e78b7',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        // paddingTop: 50
    },
});
