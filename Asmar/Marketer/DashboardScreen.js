import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { ImageBackground, Text } from "react-native";

import db from "../../db";
export default function DashboardScreen() {

    const [promotions, setPromotions] = useState([]);
    useEffect(() => db.Promotions.listenNotExpired(setPromotions), []);
    console.log(promotions)
    const [Ads, setAds] = useState([]);
    useEffect(() => db.Advertisements.listenAll(setAds), []);
    console.log(Ads)

    const lastPromotion = promotions && promotions.length > 0
        ? promotions.reduce((prev, current) => (prev.expiry > current.expiry) ? prev : current)
        : undefined;

    console.log(lastPromotion);

    const lastAdvertisement = Ads && Ads.length > 0
        ? Ads.reduce((prev, current) => (prev.endDate > current.endDate) ? prev : current)
        : undefined;
    //     const [sensor, setSensor] = useState(null);
    //     const [categories, setCategories] = useState([]);
    //     useEffect(() => db.Categories.listenAll(setCategories), []);
    //    useEffect(() => categories.length>5? countSensorsPerCategory:undefined, [categories]);
    //     const [sensorCount, setSensorCount] = useState([]);

    //     const countSensorsPerCategory=async()=>{
    //         let countsens=[]
    //         categories.map(async(cat)=>{
    //           let  currenrCount= await db.Sensors.getCount(cat.id)
    //             countsens.push({count:currenrCount, cat:cat.name})
    //           if(countsens.length>5){
    //             setSensorCount(countsens)
    //            console.log(sensorCount.length)

    //           }

    //         }
    //             )
    //     }

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                //We are using online image to set background
                source={{
                    uri: "https://wallpaperaccess.com/full/1105968.jpg"
                }}
            >

                <Text style={styles.title}>
                    There are {promotions.length} available promotions {"\n"}
                </Text>
                {
                    lastPromotion
                    &&
                    <Text style={styles.title}>
                        There are no more promotions after {new Date(lastPromotion.expiry).toDateString()} {"\n"}
                    </Text>
                }
                <Text style={styles.title}>There are {Ads.length} available advertisments</Text>
                {
                    lastAdvertisement
                    &&
                    <Text style={styles.title}>
                        There are no more advertisements after {new Date(lastAdvertisement.endDate).toDateString()} {"\n"}
                    </Text>
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
    title: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: 'white',
        paddingTop: 50,

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
        paddingTop: 50,
    },
});
