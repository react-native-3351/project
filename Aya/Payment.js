import React, { useState, useContext, useEffect } from "react";
import {
    ImageBackground,
    StyleSheet,
    TextInput,
    SafeAreaView,
    Alert,
    ScrollView
} from "react-native";
import { View, Text } from "../components/Themed";
import Colors from "../constants/Colors";
import { Button } from "react-native-elements";
import { Picker } from "@react-native-picker/picker";
import db from "../db";
import UserContext from "../UserContext";
import UseGift from "../Asmar/UseGift";


//Asmar: implemented using gifts and promo codes on checkout
export default function Payment({ Total, Cart }) {
    //console.log(Cart);
    const { user } = useContext(UserContext);

    const [paymentMethod, setPaymentMethod] = useState("");
    const [cardnum, setCardNum] = useState("");
    const [finished, setFinished] = useState(false);
    const [CSV, setCSV] = useState("");
    const [password, setPassword] = useState("");
    const [pin, setPIN] = useState("");
    const months = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
    ];
    const years = ["21", "22", "23", "24", "25", "26", "27"];
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);


    const [promotions, setPromotions] = useState(null);
    useEffect(() => db.Promotions.listenAll(setPromotions), []);
    const [promoCode, setPromoCode] = useState("");
    const [codesUsed, setCodesUsed] = useState([]);

    const [flatDisc, setFlatDisc] = useState(0);
    const [percDisc, setPercDisc] = useState(1);
    const [sumTotal, setSumTotal] = useState(Total);
    useEffect(() => setSumTotal(Math.max(((Total * percDisc) - flatDisc), 0)), [Total, percDisc, flatDisc]);

    console.log(Total, percDisc, flatDisc, ((Total * percDisc) - flatDisc));

    const applyPromo = () => {
        if (codesUsed.includes(promoCode)) {
            Alert.alert(`This code has already been used!`, null, null, { cancelable: true });
            return
        }

        const promo = promotions.find(p => p.code == promoCode);

        if (promo) {
            codesUsed.push(promo.code)
            if (promo.discount < 1) {
                setPercDisc(prevDisc => prevDisc - promo.discount);
                Alert.alert(`Discount Code Applied! Enjoy your ${promo.discount * 100}% discount!`, null, null, { cancelable: true });
            } else {
                setFlatDisc(prevDisc => Number(prevDisc) + Number(promo.discount));
                Alert.alert(`Discount Code Applied! You are saving QAR ${promo.discount}!`, null, null, { cancelable: true });
            }
        } else {
            Alert.alert("Invalid Code!", null, null, { cancelable: true });
        }
    }

    const Pay = async () => {
        let expireDate = month + " " + year;
        //console.log(expireDate);
        await db.Carts.createCart(Cart, { userid: user.id, checkOut: false });
        await db.Payments.create({
            cart: Cart,
            total: sumTotal,
            cardnum,
            paymentMethod,
            expireDate,
            CSV,
            password,
            pin,
        });

        setFinished(true);
    };
    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={{ flex: 1 }}

                source={{ uri: "https://wallpaperaccess.com/full/1105968.jpg" }}
            >
                {finished ?
                    <Text style={styles.title} lightColor={Colors.light.tint}>
                        Successfull Payment{" "}
                    </Text>
                    :
                    <>
                        <ScrollView>
                            <UseGift setDiscount={setFlatDisc} />
                            <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                Promo Code{" "}
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setPromoCode(text)}
                                value={promoCode}
                            />
                            <Button
                                title="Apply"
                                onPress={applyPromo}
                                buttonStyle={styles.button}
                                lightColor={Colors.dark.tint}
                            />
                            <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                Total Payment is {sumTotal}{" "}
                            </Text>
                            <Picker
                                style={{ color: "white", height: 40, width: 300, alignSelf: "center" }}
                                selectedValue={paymentMethod}
                                onValueChange={setPaymentMethod}
                            >
                                <Picker.Item label="Payment Method" value="" />
                                <Picker.Item label="Debit Card" value="debit" />

                                <Picker.Item label="credit Card" value="credit" />
                            </Picker>

                            <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                Card number{" "}
                            </Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={(text) => setCardNum(text)}
                                value={cardnum}
                            />

                            <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                Expire Date{" "}
                            </Text>
                            <Text>
                                <Picker
                                    style={{ color: "white", height: 40, width: 150 }}
                                    selectedValue={month}
                                    onValueChange={setMonth}
                                >
                                    <Picker.Item label="month" value="" />
                                    {months.map((m) => (
                                        <Picker.Item label={m} value={m} key={m} />
                                    ))}
                                </Picker>

                                <Picker
                                    style={{ color: "white", height: 40, width: 150 }}
                                    selectedValue={year}
                                    onValueChange={setYear}
                                >
                                    <Picker.Item label="year" value="" />
                                    {years.map((y) => (
                                        <Picker.Item label={y} value={y} key={y} />
                                    ))}
                                </Picker>
                            </Text>

                            {paymentMethod == "debit" && (
                                <>
                                    <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                        PiN{" "}
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => setPIN(text)}
                                        value={pin}
                                    />
                                </>
                            )}
                            {paymentMethod == "credit" && (
                                <>
                                    <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                        CSV{" "}
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => setCSV(text)}
                                        value={CSV}
                                    />
                                    <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                        password{" "}
                                    </Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => setPassword(text)}
                                        value={password}
                                    />
                                </>
                            )}
                            {
                                paymentMethod == "credit" && cardnum != "" && month > 0 && year > 0 && CSV != "" && password !== "" &&
                                <Button
                                    title="Pay"
                                    onPress={() => Pay()}
                                    buttonStyle={styles.button}
                                    lightColor={Colors.dark.tint}
                                />}
                            {
                                paymentMethod == "debit" && cardnum != "" && month > 0 && year > 0 && pin !== "" &&
                                <Button
                                    title="Pay"
                                    onPress={() => Pay()}
                                    buttonStyle={styles.button}
                                    lightColor={Colors.dark.tint}
                                />
                            }
                        </ScrollView>
                    </>
                }
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
        marginVertical: 22,
    },
    paragraph: {
        fontSize: 22,
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
