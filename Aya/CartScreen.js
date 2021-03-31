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

export default function CartScreen() {
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState(null);
    useEffect(() => setCategory(null), [user]);
    const [model, setModel] = useState(null);
    useEffect(() => setModel(null), [category]);
    const [cart, setCart] = useState(null);
    const [items, setItems] = useState(null);
    const [total, setTotal] = useState(0);
    const [checkOut, setCheckOut] = useState(false);
    useEffect(() => db.Carts.listenLastNotFinished(setCart, user.id), [user]);
    //console.log(cart);
    useEffect(() => (cart ? db.Carts.Items.listenAllItems(setItems, cart.id) : undefined), [cart]);
    useEffect(() => (items ? calTotal() : setTotal(0)), [items]);
    const calTotal = () => {
        let TotalPrice = 0;
        items.map((item) => (TotalPrice = TotalPrice + item.price));
        setTotal(TotalPrice);
    };

    const AddToCart = () => {
        db.Carts.Items.createItem(cart.id, {
            categoryId: category.id,
            category: category.name,
            price: model.price,
            model: model.id,
        });
    };
    const CheckOut = () => {
        // db.Carts.update(cart.id)
        setCheckOut(true);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={require("../assets/images/kitten.jpg")}
                //You can also set image from your project folder
                //require('./images/background_image.jpg')        //
            >
                {checkOut ? (
                    cart && <Payment Total={total} Cart={cart.id} />
                ) : (
                    <SafeAreaView style={styles.container}>
                        <Text style={styles.mainTitle} lightColor={Colors.dark.tint}>
                            Cart{" "}
                        </Text>
                        {user && (
                            <CategoryPicker
                                style={{
                                    color: "white",
                                    height: 40,
                                    width: 300,
                                    alignSelf: "center",
                                }}
                                set={setCategory}
                            />
                        )}
                        {user && category && (
                            <ModelByCategoryPicker category={category} set={setModel} />
                        )}
                        {user && category && model && (
                            <>
                                <Button
                                    title="add to  cart"
                                    onPress={() => AddToCart()}
                                    buttonStyle={styles.button}
                                    lightColor={Colors.dark.tint}
                                />
                            </>
                        )}
                        {user && cart && items && (
                            <>
                                {items.map((item) => (
                                    <Text
                                        key={item.id}
                                        style={styles.paragraph}
                                        lightColor={Colors.dark.tint}
                                    >
                                        item: {item.category}
                                        price: {item.price}
                                    </Text>
                                ))}
                            </>
                        )}
                        <Text style={styles.paragraph} lightColor={Colors.dark.tint}>
                            Total: {total}
                        </Text>
                        <Button
                            title="CheckOut"
                            onPress={() => CheckOut()}
                            buttonStyle={styles.button}
                            lightColor={Colors.dark.tint}
                        />
                    </SafeAreaView>
                )}
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
