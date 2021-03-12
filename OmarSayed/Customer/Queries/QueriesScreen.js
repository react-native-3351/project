import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Text, View } from '../../../components/Themed';
import Colors from '../../../constants/Colors';
import UserContext from '../../../UserContext'
import fb from '../../../fb'
import db from '../../../db'
import { SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

export default function QueriesScreen() {

  const { user } = useContext(UserContext)

  const [sensors, setSensors] = useState([])
  useEffect(() => db.Sensors.listenAllSamples(setSensors), [sensor])

  const [tabs, setTabs] = useState('AllSensors')

  const [descriptionView, setDescriptionView] = useState(false)
  const [sensor, setSensor] = useState({})

  const getSensor = (sn) => {
    setSensor(sn)
    setDescriptionView(!descriptionView)
  }
  const [inq, setInq] = useState('')
  const submitInq = () => {
    db.Queries.createQueries({ sender: user.id, sensorId: sensor.id, question: inq, reply: '', repliedBy: '', sendDate: new Date() })
    setInq('')
    alert('Submitted, well contact with you soon ✔')
  }
  const [allQueries, setAllQueries] = useState({})
  useEffect(() => db.Queries.listenAllForUser(user.id, setAllQueries), [user])
  console.log(allQueries)
  return (
    <SafeAreaView style={{ marginTop: 50 }}>
      <Button
        title="Show All Products"
        style={{ width: 30 }}
        onPress={() => setTabs('AllSensors')}
      />
      <Button
        title="My Queries"
        onPress={() => setTabs('Queries')}
      />
      {
        tabs === 'AllSensors' ?
          <View style={styles.getStartedContainer}>
            {
              !descriptionView ?
                sensors.map(sn =>
                  <View key={sn.id} style={styles.sensorBlocks}>
                    {/* <Text>{sensor.name}</Text> */}
                    <TouchableOpacity onPress={() => getSensor(sn)} style={styles.title}>
                      <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>{sn.name}</Text>
                    </TouchableOpacity>
                  </View>
                )
                :
                <>
                  <View>
                    <Button
                      icon={
                        <Icon
                          name="arrow-left"
                          size={15}
                          color="white"
                        />
                      }
                      title="  Back"
                      onPress={() => setDescriptionView(!descriptionView)}
                    />
                    <Text style={styles.title}>{sensor.name}</Text>
                    <Text style={styles.title}>{sensor.description}</Text>
                  </View>
                  <View style={{ borderColor: 'lightgreen', borderStartWidth: 3, marginTop: 70, padding: 9 }}>
                    <Text style={{ ...styles.title, marginBottom: 30 }}>Any question feel free to ask 😀</Text>
                    <TextInput
                      style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, paddingLeft: 11 }}
                      onChangeText={text => setInq(text)}
                      value={inq}
                    />
                    <Button
                      title="  Send"
                      onPress={() => submitInq()}
                    />
                  </View>
                </>
            }
          </View>
          :
          allQueries.map(i =>
            <View key={i.id} style={{borderWidth:2, padding:7, margin:7}}>
              <View style={styles.sensorBlocks}>
                <Text>{i.question}</Text>
              </View>
              <View style={styles.sensorBlocksReply}>
                <Text>{i.reply !== '' ? i.reply : 'No Reply Yet' }</Text>
              </View>
            </View>

          )
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 150,
    height: 150,
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
    color: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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
});
