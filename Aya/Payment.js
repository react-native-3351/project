import React, { useState, useContext } from 'react';
import {ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';

import { Picker } from '@react-native-picker/picker';
import db from '../db';
import DatePicker from 'react-native-datepicker'
import UserContext from '../UserContext'


export default function Payment({ Total, Cart }) {
    console.log(Cart)
    const { user } = useContext(UserContext)

    const [paymentMethod, setPaymentMethod] = useState("")
    const [cardnum, setCardNum] = useState("")
    const [expireDate, setExpireDate] = useState(new Date())
    const[finished, setFinished]= useState(false)
    const [CSV, setCSV] = useState("")
    const [password, setPassword] = useState("")

    const [pin, setPIN] = useState("")
    const Pay = () => {
        db.Payments.create({ cart: Cart, total: Total, cardnum, paymentMethod, expireDate, CSV, password, pin })
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
      {finished?<Text style={styles.title} lightColor={Colors.light.tint}>
                Successfull Payment  </Text>:

      <>
      <Text style={styles.helpLinkText} lightColor={Colors.light.tint}> 
                Total Payment is {Total}    </Text>
            <Picker
                style={{ color: 'white', height: 40, width: 300,  alignSelf:'center' }}
                selectedValue={paymentMethod}
                onValueChange={setPaymentMethod}
            >
                <Picker.Item label='Payment Method' value="" />
                <Picker.Item label='Debit Card' value="debit" />

                <Picker.Item label='credit Card' value="credit" />


            </Picker>

            <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                Card number    </Text>
            <TextInput
                    style={{ color: 'white', height: 40, width: 300, borderColor: 'white', borderWidth: 2 , borderRadius:10, alignSelf:'center',}}
                    onChangeText={text => setCardNum(text)}
                value={cardnum}
            />
            <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                Expire date    </Text>
            <DatePicker
                style={{ width: 200, alignSelf:'center',borderColor: 'white', borderWidth: 2 , borderRadius:10}}
                date={expireDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2016-03-12"
                maxDate="2024-03-12"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                }}
                onDateChange={(date) => setExpireDate(date)}
            />
            {
                paymentMethod == "debit" && <>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        PiN    </Text>
                    <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2 , borderRadius:10, alignSelf:'center',}}
                    onChangeText={text => setPIN(text)}
                        value={pin}
                    />

                </>
            }
            {
                paymentMethod == "credit" && <>
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        CSV    </Text>
                    <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2 , borderRadius:10, alignSelf:'center',}}
                    onChangeText={text => setCSV(text)}
                        value={CSV}
                    />
                    <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                        password    </Text>
                    <TextInput
                    style={{ color: 'black', height: 40, width: 300, borderColor: 'white', borderWidth: 2 , borderRadius:10, alignSelf:'center',}}
                    onChangeText={text => setPassword(text)}
                        value={password}
                    />

                </>
            }


            <TouchableOpacity onPress={() => Pay()} style={styles.title}>
                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                    Pay    </Text>
            </TouchableOpacity></>}
</ImageBackground>
</SafeAreaView>    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 150,
        height: 150,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        fontSize: 23,
        lineHeight: 24,
        textAlign: 'left',
        padding:15,
        borderBottomWidth:1,
        borderColor:'white'
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
        padding:15,
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