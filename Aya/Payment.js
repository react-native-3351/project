import React, { useState, useContext } from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import db from '../db';
import DatePicker from 'react-native-datepicker'
import UserContext from '../UserContext'


export default function Payment({ Total, Cart }) {
    console.log(Cart)
    const { user } = useContext(UserContext)

    const [paymentMethod, setPaymentMethod] = useState("")
    const [cardnum, setCardNum] = useState("")
    const [finished, setFinished] = useState(false)
    const [CSV, setCSV] = useState("")
    const [password, setPassword] = useState("")
    const [pin, setPIN] = useState("")
    const [months, setMonths] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"])
    const [years, setYears] = useState(["21", "22", "23", "24", "25", "26", "27"])
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const Pay = async () => {
        let expireDate= month + " " + year
        console.log(expireDate)
        await db.Carts.createCart(Cart, { userid: user.id, checkOut: false })
        await db.Payments.create({ cart: Cart, total: Total, cardnum, paymentMethod, expireDate, CSV, password, pin })

        setFinished(true)
    }
    return (
        <SafeAreaView style={styles.container}>

            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={require('../assets/images/kitten.jpg')}
            //You can also set image from your project folder
            //require('./images/background_image.jpg')        //
            >
                {finished ? <Text style={styles.title} lightColor={Colors.light.tint}>
                    Successfull Payment  </Text> :

                    <>
                        <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                            Total Payment is {Total}    </Text>
                        <Picker
                            style={{ color: 'white', height: 40, width: 300, alignSelf: 'center' }}
                            selectedValue={paymentMethod}
                            onValueChange={setPaymentMethod}
                        >
                            <Picker.Item label='Payment Method' value="" />
                            <Picker.Item label='Debit Card' value="debit" />

                            <Picker.Item label='credit Card' value="credit" />


                        </Picker>

                        <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                            Card number    </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setCardNum(text)}
                            value={cardnum}
                        />
                        
                       
                        <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                    Expire Date    </Text>
                        <Text>
                            <Picker
                                style={{ color: 'white', height: 40, width: 150 }}
                                selectedValue={month}
                                onValueChange={setMonth}
                            >
                                <Picker.Item label='month' value="" />
                                {months.map(m => <Picker.Item label={m} value={m} />)}


                            </Picker>

                            <Picker
                                style={{ color: 'white', height: 40, width: 150  }}
                                selectedValue={year}
                                onValueChange={setYear}
                            >
                                <Picker.Item label='year' value="" />
                                {years.map(y => <Picker.Item label={y} value={y} />)}


                            </Picker>
                        </Text>

                        {
                            paymentMethod == "debit" && <>
                                <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                    PiN    </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setPIN(text)}
                                    value={pin}
                                />

                            </>
                        }
                        {
                            paymentMethod == "credit" && <>
                                <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                    CSV    </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setCSV(text)}
                                    value={CSV}
                                />
                                <Text style={styles.paragraph} lightColor={Colors.light.tint}>
                                    password    </Text>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={text => setPassword(text)}
                                    value={password}
                                />

                            </>
                        }

                        <Button
                            title="Pay"
                            onPress={() => Pay()}
                            buttonStyle={styles.button}
                            lightColor={Colors.dark.tint}
                        />
                    </>}
            </ImageBackground>
        </SafeAreaView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50
    },
    mainTitle: {
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    secTitle: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    thirdTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
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
        color: "white"
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: 'purple',
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
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        backgroundColor: 'transparent',
        fontSize: 23,
        lineHeight: 24,
        textAlign: 'left',
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 23,
        textAlign: 'center',
    },
    title: {
        padding: 15,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});