import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import { ScrollView, TextInput, ImageBackground, Text, Pressable } from "react-native";

import db from "../../db";
import {LineChart} from "react-native-chart-kit";
export default function DashboardScreen() {

    const [promotions, setPromotions] = useState([]);
    useEffect(() => db.Promotions.listenNotExpires(setPromotions), []);
     console.log(promotions)
    const [Ads, setAds] = useState([]);
     useEffect(() => db.Advertisements.listenAll(setAds), []);
     console.log(Ads)
    
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
                source={{uri: "https://i.pinimg.com/originals/7e/c0/c8/7ec0c8a050546e72ea781d8aa047c48c.jpg"
            }}
            >  
            
                  <Text style={styles.title}> 
                  {"\n"}
                  {"\n"}
                  {"\n"}
                  There are  
            {promotions.length} 
              available promotions              
               {"\n"}
</Text>
              <Text style={styles.title}>There are  
            {Ads.length} 
              available advrtisments</Text>
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
        textAlign:"center",
        fontSize: 20,
        fontWeight: "bold",
        color:'white',
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
