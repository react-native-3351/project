import React, { useState, useEffect } from "react";
import { StyleSheet , SafeAreaView, ImageBackground} from "react-native";
import { View } from "../../components/Themed";
import CategoryPicker from "../pickers/CategoryPicker";
import SensorByCategoryPicker from "../pickers/SensorByCategoryPicker";
import TemperatureActions from "./TemperatureActions";
import MotionActions from "./MotionActions";
import db from "../../db";
import ParkingInfo from "../../OmarSayed/Customer/Sensors/ParkingInfo";
import WeightInfo from "../../Aya/WeightInfo"
import {LineChart} from "react-native-chart-kit";
export default function DashboardScreen() {
    const [category, setCategory] = useState(null);
    useEffect(() => setSensor(null), [category]);
    const [sensor, setSensor] = useState(null);
    const [categories, setCategories] = useState([]);
    useEffect(() => db.Categories.listenAll(setCategories), []);
   useEffect(() => categories.length>5? countSensorsPerCategory:undefined, [categories]);
    const [sensorCount, setSensorCount] = useState([]);

    const countSensorsPerCategory=async()=>{
        let countsens=[]
        categories.map(async(cat)=>{
          let  currenrCount= await db.Sensors.getCount(cat.id)
            countsens.push({count:currenrCount, cat:cat.name})
          if(countsens.length>5){
            setSensorCount(countsens)
           console.log(sensorCount.length)

          }

        }
            )
    }

    return (
      <SafeAreaView style={styles.container}>
      <ImageBackground
          style={{ flex: 1 }}
          //We are using online image to set background
          source={{uri: "https://i.pinimg.com/originals/7e/c0/c8/7ec0c8a050546e72ea781d8aa047c48c.jpg"
      }}
      >  
            <CategoryPicker set={setCategory} />
            {category && <SensorByCategoryPicker category={category} set={setSensor} />}
            {category && sensor && category.name === "Motion" &&( <MotionActions sensor={sensor} />)  }
            {category && sensor && category.name === "Temperature" && (
                <TemperatureActions sensor={sensor} />
            )}
            {category && sensor && category.name === "Ultrasonic" && (
                <ParkingInfo sensor={sensor} />
            )}
            {category && sensor && category.name === "Weight" && (
                <WeightInfo sensor={sensor} />
            )}
           {sensorCount.length>5&&  <LineChart
    data={{
      labels: [sensorCount[0].cat, sensorCount[1].cat,sensorCount[2].cat,sensorCount[3].cat,sensorCount[4].cat,sensorCount[5].cat],
      datasets: [
        {
          data: [
            sensorCount[0].count,
            sensorCount[1].count,
            sensorCount[2].count,
            sensorCount[3].count,
            sensorCount[4].count,
            sensorCount[5].count
          ]
        }
      ]
    }}
    width={450} // from react-native
    height={220}
     yAxisLabel="$"
     yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />        }
    </ImageBackground>
        </SafeAreaView>       );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
     //   alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
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
