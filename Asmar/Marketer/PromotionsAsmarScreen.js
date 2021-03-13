import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import UserContext from '../../UserContext'
import { Button, Input, Text, ButtonGroup } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import CategoryPicker from '../../screens/pickers/CategoryPicker';
import db from '../../db';
// import ModelByCategoryPicker from '../Aya/ModelByCategoryPicker';   

export default function PromotionsAsmarScreen() {

    const { user } = useContext(UserContext)
    const [category, setCategory] = useState(null)
    useEffect(() => setCategory(null), [user])
    const [modelID, setModelId] = useState(null);
    useEffect(() => setModelId(null), [category])
    const [code, setCode] = useState("");
    const [expiry, setExpiry] = useState(null);
    const [discMode, setDiscMode] = useState("Percent");
    const [discount, setDiscount] = useState(0);
    const [max, setMax] = useState(0);

    const [selectedIdx, setSelectedIdx] = useState(0);

    const isValid = () => code && expiry && (discMode == "Flat" || (discMode == "Percent" && discount >= 0 && discount <= 100));

    const submit = async () => {
        db.Promotions.create({
            modelId, code, expiry, discount, max
        }); //TODO: NEEDS TESTING
        //console.log("Promotion made!");
    }

    const buttons = [<Button
        title="Percent"
        onPress={setDiscMode("Percent")}
    />, <Button
        title="Flat"
        onPress={setDiscMode("Flat")}
    />];
    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Text h1>Create Promotion Code</Text>
                {
                    user
                    &&
                    <CategoryPicker set={setCategory} />
                }
                {
                    user
                    &&
                    category
                    &&
                    {/* <ModelByCategoryPicker category={category} set={setModelId} /> */ }
                }
                <Input
                    label='Code'
                    placeholder='Code'
                    value={code}
                    onChangeText={value => setCode(value)}
                />
                <DatePicker
                    style={{ width: 200 }}
                    date={expiry}
                    mode="datetime"
                    format="YYYY-MM-DD HH:mm"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    minuteInterval={30}
                    onDateChange={(value) => setExpiry(value)}
                />
                <ButtonGroup
                    onPress={idx => setSelectedIdx(idx)}
                    selectedIndex={selectedIdx}
                    buttons={buttons}
                    containerStyle={{ height: 100 }} />
                {
                    discMode == "Flat"
                    &&
                    <Input
                        label='Flat Discount'
                        placeholder='Discount'
                        value={discount}
                        //regex to only allow 0-9 as input
                        onChangeText={value => setDiscount(value.replace(/[^0-9]/g, ''))}
                        keyboardType="numeric"
                    />
                }
                {
                    discMode == "Percent"
                    &&
                    <>
                        <Input
                            label='Percent Discount'
                            placeholder='0-100'
                            value={discount}
                            //regex to only allow 0-9 as input
                            onChangeText={value => setDiscount(value.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                        />
                        <Input
                            label='Maximum Deductible'
                            value={max}
                            //regex to only allow 0-9 as input
                            onChangeText={value => setMax(value.replace(/[^0-9]/g, ''))}
                            keyboardType="numeric"
                        />
                    </>
                }
                <Button
                    title="Submit"
                    onPress={submit}
                    disabled={isValid()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
