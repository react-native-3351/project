import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Card } from 'react-native-elements';
import { View } from '../../../components/Themed';
import UserContext from '../../../UserContext'
import { Picker } from '@react-native-picker/picker';
import db from '../../../db'
import CategoryPicker from '../../../screens/pickers/CategoryPicker'

export default function CreateWishListScreen({viewCreate}) {
    const { user } = useContext(UserContext)
    const userId = user.id ? user.id : '-'

    const [active, setActive] = useState('');
    const [contact, setContact] = useState('');
    const [category, setCategory] = useState('');
    const [material, setMaterial] = useState('');
    const [techUsed, setTechUsed] = useState('');
    const [min, setMin] = useState('');
    const [max, setMax] = useState('');
    const [radius, setRadius] = useState('');
    const [luminence, setLuminence] = useState('');

    const createWishlist = async () => {
        await db.Users.Wishlist.createWishlist({ active, contact, category: category.name, material, techUsed, min, max, radius, luminence }, userId)
        setActive("")
        setContact("")
        setMaterial("")
        setTechUsed("")
        setMin("")
        setMax("")
        setRadius("")
        setLuminence("")
        viewCreate()
    }

    const validate = () => {
        // if (category !== null || category !== '') {
        //     return true
        // }
    }

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Card>
                    <Card.Title>Create Your WishList</Card.Title>
                    <Card.Divider />
                    <>
                        <CategoryPicker set={setCategory} />
                        <Input
                            placeholder='Material'
                            onChangeText={value => setMaterial(value)}
                        />
                        <Input
                            placeholder='techUsed'
                            onChangeText={value => setTechUsed(value)}
                        />
                        <Picker
                            style={{ height: 50, width: 200 }}
                            selectedValue={active}
                            onValueChange={setActive}
                        >
                            <Picker.Item label='Select Active' value="" />
                            <Picker.Item key={0} label="Yes" value={true} />
                            <Picker.Item key={1} label="No" value={false} />
                        </Picker>
                        <Picker
                            style={{ height: 50, width: 200 }}
                            selectedValue={contact}
                            onValueChange={setContact}
                        >
                            <Picker.Item label='Select Contact' value="" />
                            <Picker.Item key={0} label="Yes" value={true} />
                            <Picker.Item key={1} label="No" value={false} />
                        </Picker>
                        {
                            category && category.name == "Temperature"
                                ?
                                <View>
                                    <Input
                                        placeholder='Min Temperature'
                                        onChangeText={value => setMin(value)}
                                    />
                                    <Input
                                        placeholder='Max Temperature'
                                        onChangeText={value => setMax(value)}
                                    />
                                </View>
                                :
                                <></>
                        }
                        {
                            category && category.name == "Area"
                                ?
                                <Input
                                    placeholder='Radius'
                                    onChangeText={value => setRadius(value)}
                                />
                                :
                                <></>
                        }
                        {
                            category && category.name == "Light"
                                ?
                                <Input
                                    placeholder='Luminence'
                                    onChangeText={value => setLuminence(value)}
                                />
                                :
                                <></>
                        }
                        <Button disabled={validate()} title="Create WishList" onPress={createWishlist} />
                    </>
                </Card>
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
