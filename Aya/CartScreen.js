import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from '../components/Themed';
import Colors from '../constants/Colors';
import CategoryPicker from '../screens/pickers/CategoryPicker';
import ModelByCategoryPicker from './ModelByCategoryPicker'
import UserContext from '../UserContext'
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import db from '../db';
import { setTokenSourceMapRange } from 'typescript';

export default function CartScreen() {

  const { user } = useContext(UserContext)
  const [category, setCategory] = useState(null)
  useEffect(() => setCategory(null), [user])
  const [model, setModel] = useState(null)
  useEffect(() => setModel(null), [category])
  const[cart, setCart]=useState(null)
  const [items, setItems]=useState([])
  const[total, setTotal]=useState(0)
  useEffect(() => db.Carts.listenLastNotFinished(setCart,user.id),[user])
 console.log(cart)
  useEffect(() => cart?db.Carts.Items.listenAllItems(setItems,cart.id):undefined,[cart])
  useEffect(() =>items.length>1?
 items.map(item=> setTotal(total+item.price)):setTotal(0),[items.length>0])


const AddToCart=()=>{
  let Carttotal=total+model.price
  setTotal(Carttotal)
  db.Carts.Items.createItem(cart.id, {categoryId:category.id, category:category.name, price: model.price, model:model.id})
}
const CheckOut=()=>{
  db.Carts.update(cart.id)
  db.Carts.create({userid:user.id, checkOut:false })
}
  return (
    <View>
      <View style={styles.getStartedContainer}>
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
                <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
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
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
          >
              item: {item.category}
              price: {item.price}

          </Text>)
          }
          
          </>
        }
        <Text
          
              style={styles.getStartedText}
              lightColor="rgba(0,0,0,0.8)"
              darkColor="rgba(255,255,255,0.8)"
          >
              Total: {total}

          </Text>
          <TouchableOpacity onPress={() => CheckOut()} style={styles.title}>
                <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
                  CheckOut    </Text>
            </TouchableOpacity>
      </View>
    </View>
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
});
