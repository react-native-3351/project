import { StatusBar } from 'react-native';
import { StyleSheet } from 'react-native';
export default  StyleSheet.create({
    tinyLogo: {
      width: 150,
      height: 150,
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
      backgroundColor: 'snow',
      marginHorizontal: 2,
  
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
      marginTop: 50,
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
      fontSize: 17,
      lineHeight: 24,
      textAlign: 'center',
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
      textAlign: 'center',
      // color: 'white'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      alignSelf: 'center'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    //Omar Sayed
    sensorBlocks: {
      backgroundColor: '#fc86d9',
      padding: 11,
      width: '80%',
      margin: 3
    },
    sensorBlocksReply: {
      backgroundColor: 'lightgreen',
      padding: 11,
      width: '80%',
      margin: 3
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10
    }
  });
  