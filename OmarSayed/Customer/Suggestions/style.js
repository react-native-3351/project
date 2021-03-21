import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column"
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      // justifyContent: "center"
    //   paddingTop: 50
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
      paddingHorizontal:30,
      marginHorizontal: 30,
      marginVertical: 12,
    },
    textarea: {
      borderWidth: 1,
      borderColor: "purple",
      backgroundColor: "white",
      borderRadius: 5,
      padding: 10,
      paddingHorizontal:30,
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
      backgroundColor:'purple',
      borderRadius: 30,
      marginHorizontal: 50,
      marginVertical: 7,
    }
  });