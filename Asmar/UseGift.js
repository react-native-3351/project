import React, { useState, useContext, useEffect } from "react";
import {
    ImageBackground,
    StyleSheet,
    ScrollView,
} from "react-native";
import { View, Text } from "../components/Themed";
import { Button, Overlay, Card, Icon } from "react-native-elements";
import db from "../db";
import UserContext from "../UserContext";

export default function UseGift({ setDiscount }) {
    const { user } = useContext(UserContext);
    const image = {
        uri: "https://wallpaperaccess.com/full/1105968.jpg",
    };
    const [visible, setVisible] = useState(false);
    const [gifts, setGifts] = useState(null);
    useEffect(() => db.Users.Gifts.listenAll(setGifts, user.id), []);
    const [selectedGift, setSelectedGift] = useState(null);
    const [giftUsed, setGiftUsed] = useState(false);

    useEffect(() => {
        if (!giftUsed) {
            const giftDisc = selectedGift ? selectedGift.value : 0;
            if (giftDisc > 0) {
                setGiftUsed(true);
                db.Users.Gifts.makeUsed(user.id, selectedGift.id);
            }
            setDiscount(flatDisc => flatDisc + giftDisc);
        }
    }, [selectedGift]);

    return (
        <>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(false)}>
                <View style={styles.container}>
                    <ImageBackground source={image} style={styles.image}>
                        <Text style={styles.secTitle}>Gift Picker</Text>
                        <ScrollView>
                            {gifts
                                ? gifts.map(
                                    (gift) =>
                                        !gift.isUsed && (
                                            <Card key={gift.id} bottomDivider>
                                                <Icon name="pricetag" type="ionicon" />
                                                <Card.Title>{gift.name}</Card.Title>
                                                <Button
                                                    buttonStyle={styles.button}
                                                    title="Use Gift"
                                                    onPress={() => setSelectedGift(gift)}
                                                />
                                            </Card>
                                        )
                                )
                                : null}
                        </ScrollView>
                        <Button
                            buttonStyle={styles.button}
                            title="Close"
                            onPress={() => setVisible(false)}
                        />
                    </ImageBackground>
                </View>
            </Overlay>
            <View>
                <Button
                    buttonStyle={styles.button}
                    title="Use Gifts"
                    onPress={() => setVisible(!visible)}
                />
            </View>
        </>)
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
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        width: 250,
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
});
