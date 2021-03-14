import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import UserContext from "../../UserContext";
import { Button, Input, Text, ButtonGroup } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import CategoryPicker from "../../screens/pickers/CategoryPicker";
import db from "../../db";
// import ModelByCategoryPicker from '../Aya/ModelByCategoryPicker';

export default function PromotionsAsmarScreen() {
    const { user } = useContext(UserContext);
    const [category, setCategory] = useState(null);
    useEffect(() => setCategory(null), [user]);
    const [modelId, setModelId] = useState(null);
    useEffect(() => setModelId(null), [category]);
    const [code, setCode] = useState("");
    const [expiry, setExpiry] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [max, setMax] = useState(0);

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
        console.log("Discount: ", disc);
    };

    const buttons = ["Percent", "Flat"];
    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Text h2>Create Promotion Code</Text>
                {user && <CategoryPicker set={setCategory} />}
                {user &&
                    category &&
                    {
                        /* <ModelByCategoryPicker category={category} set={setModelId} /> */
                    }}
                <Input
                    label="Code"
                    placeholder="Code"
                    value={code}
                    onChangeText={(value) => setCode(value)}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={expiry}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    onDateChange={(value) => setExpiry(value)}
                    label="Expiry Date"
                />
                <ButtonGroup
                    onPress={(idx) => setSelectedIdx(idx)}
                    selectedIndex={selectedIdx}
                    buttons={buttons}
                />
                {selectedIdx == 0 && (
                    <>
                        <Input
                            label="Percent Discount"
                            placeholder="0-100"
                            value={discount + ""}
                            //regex to only allow 0-9 as input
                            onChangeText={(value) => setDiscount(value.replace(/[^0-9]/g, ""))}
                            keyboardType="numeric"
                        />
                        <Input
                            label="Maximum Deductible"
                            value={max}
                            //regex to only allow 0-9 as input
                            onChangeText={(value) => setMax(value.replace(/[^0-9]/g, ""))}
                            keyboardType="numeric"
                        />
                    </>
                )}
                {selectedIdx == 1 && (
                    <Input
                        label="Flat Discount"
                        placeholder="Discount"
                        value={discount + ""}
                        //regex to only allow 0-9 as input
                        onChangeText={(value) => setDiscount(value.replace(/[^0-9]/g, ""))}
                        keyboardType="numeric"
                    />
                )}
                <Button title="Submit" onPress={submit} disabled={!isValid()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
