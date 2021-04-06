import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, ScrollView, TextInput, ImageBackground, Text, Pressable } from "react-native";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import { Button, ButtonGroup } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import CategoryPicker from "../../screens/pickers/CategoryPicker";
import db from "../../db";
import ModelByCategoryPicker from '../Aya/ModelByCategoryPicker';

export default function PromotionsAsmarScreen() {
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState(null);
    const [modelId, setModelId] = useState(null);
    useEffect(() => setModelId(null), [category]);
    const [code, setCode] = useState("");
    const [expiry, setExpiry] = useState(new Date());
    const [discount, setDiscount] = useState(0);
    const [max, setMax] = useState(0);
    const [showExpiryPicker, setShowExpiryPicker] = useState(false);

    const [selectedIdx, setSelectedIdx] = useState(0); //0 is Percent, 1 is Flat

    const isValid = () =>
        code &&
        expiry &&
        (selectedIdx == 1 || (selectedIdx == 0 && discount >= 0 && discount <= 100));

    const submit = async () => {
        //Percent is represented as a number between 0 and 1, flat is represented as flat number
        const disc = selectedIdx == 0 ? discount / 100 : discount;
        db.Promotions.create({
            modelId,
            code,
            expiry,
            discount: disc,
            ...(selectedIdx == 0 && { max }),
        }); //TODO: NEEDS TESTING
        //console.log("Discount: ", disc);
    };

    const formatDate = (date) => {
        return date instanceof Date
            ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
            : "";
    };

    const buttons = ["Percent", "Flat"];
    return (
        <View style={styles.container}>
            <ImageBackground
                source={{
                    uri:
                        "https://wallpaperaccess.com/full/1105968.jpg",
                }}
                style={styles.image}
            >
                <ScrollView>
                    <Text style={styles.mainTitle}>Create Promotion Code{"\n"}</Text>
                    <Text style={styles.label}>Applies to</Text>
                    <CategoryPicker
                        set={setCategory}
                        style={styles.input}
                        defaultLabel="All Categories"
                    />
                    {category &&
                        <ModelByCategoryPicker category={category} set={setModelId} />
                    }
                    <Text style={styles.label}>Code</Text>
                    <TextInput
                        placeholder="Code"
                        value={code}
                        onChangeText={(value) => setCode(value)}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Expiry</Text>
                    <Pressable onPress={() => setShowExpiryPicker(true)}>
                        <Text style={[styles.input, styles.inputDisplay]}>
                            {formatDate(expiry)}
                        </Text>
                    </Pressable>
                    {showExpiryPicker && (
                        <DateTimePicker
                            minimumDate={new Date()}
                            value={expiry}
                            onChange={(event, date) => {
                                setShowExpiryPicker(false);
                                date instanceof Date && setExpiry(date);
                            }}
                        />
                    )}
                    <ButtonGroup
                        onPress={(idx) => {
                            setSelectedIdx(idx);
                            setDiscount(0);
                        }}
                        selectedIndex={selectedIdx}
                        buttons={buttons}
                    />
                    {selectedIdx == 0 && (
                        <>
                            <Text style={styles.label}>Percent Discount</Text>
                            <TextInput
                                placeholder="0-100"
                                value={discount + ""}
                                onChangeText={(value) => setDiscount(value.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                            <Text style={styles.label}>Maximum Deductible</Text>
                            <TextInput
                                placeholder="Maximum"
                                value={max}
                                onChangeText={(value) => setMax(value.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </>
                    )}
                    {selectedIdx == 1 && (
                        <>
                            <Text style={styles.label}>Flat Discount</Text>
                            <TextInput
                                placeholder="Discount"
                                value={discount + ""}
                                onChangeText={(value) => setDiscount(value.replace(/[^0-9]/g, ""))}
                                keyboardType="numeric"
                                style={styles.input}
                            />
                        </>
                    )}
                    <Button
                        title="Submit"
                        onPress={submit}
                        disabled={!isValid()}
                        buttonStyle={styles.button}
                    />
                </ScrollView>
            </ImageBackground>
        </View>
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
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        color: "black",
        borderRadius: 30,
        padding: 10,
        paddingLeft: 15,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    inputDisplay: {
        paddingTop: 20,
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
    label: {
        fontSize: 16,
        color: "white",
        textAlign: "left",
        marginHorizontal: 40,
        marginBottom: -10,
    },
});
