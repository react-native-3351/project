import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import CategoryPicker from '../screens/pickers/CategoryPicker';
import ModelByCategoryPicker from './ModelByCategoryPicker'
import UserContext from '../UserContext'
import {ImageBackground, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native';
import db from '../db';
import Payment from './Payment'
import { setTokenSourceMapRange } from 'typescript';

export default function CartScreen() {

  const { user } = useContext(UserContext)
  const [category, setCategory] = useState(null)
  useEffect(() => setCategory(null), [user])
  const [model, setModel] = useState(null)
  useEffect(() => setModel(null), [category])
  const[cart, setCart]=useState(null)
  const [items, setItems]=useState(null)
  const[total, setTotal]=useState(0)
  const [checkOut, setCheckOut]=useState(false)
  useEffect(() => db.Carts.listenLastNotFinished(setCart,user.id),[user])
 console.log(cart)
  useEffect(() => cart?db.Carts.Items.listenAllItems(setItems,cart.id):undefined,[cart])
  useEffect(() =>items?calTotal():setTotal(0),[items])
const calTotal=()=>{
  let TotalPrice=0
  items.map(item=> TotalPrice=TotalPrice+item.price)
  setTotal(TotalPrice)
}

const AddToCart=()=>{
  db.Carts.Items.createItem(cart.id, {categoryId:category.id, category:category.name, price: model.price, model:model.id})
}
const CheckOut=()=>{
  db.Carts.update(cart.id)
  db.Carts.create({userid:user.id, checkOut:false })
  setCheckOut(true)
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
    {
       checkOut ?
       <Payment Total={total} Cart={cart.id}/>

    :

      <SafeAreaView style={styles.container}>
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
          <ModelByCategoryPicker category={category} set={setModel} />
        }
        {
          user
          &&
          category
          &&
          model
          &&
          <>
             <TouchableOpacity onPress={() => AddToCart()} style={styles.title}>
                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                  add to  cart    </Text>
            </TouchableOpacity>
          </>
        }
        {
          user 
          &&
          cart
          &&
          items
          &&<>
          {
            items.map(item=><Text
            key={item.id}
              style={styles.getStartedText}
              lightColor={Colors.dark.tint}
          >
              item: {item.category}
              price: {item.price}

          </Text>)
          }
          
          </>
        }
        <Text
          
              style={styles.getStartedText}
              lightColor={Colors.dark.tint}
          >
              Total: {total}

          </Text>
          <TouchableOpacity onPress={() => CheckOut()} style={styles.title}>
                <Text style={styles.helpLinkText} lightColor={Colors.dark.tint}>
                  CheckOut    </Text>
            </TouchableOpacity>
      </SafeAreaView>}
    </ImageBackground>
    </SafeAreaView>
      );
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
      backgroundColor: 'transparent',
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