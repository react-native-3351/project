import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Overlay, ListItem, Card, Icon } from 'react-native-elements';
import { View, Text } from '../../../components/Themed';
import UserContext from '../../../UserContext'
import db from '../../../db'
import CreateWishListScreen from './CreateWishListScreen'
import ViewSensorsWishListScreen from './ViewSensorsWishListScreen'

export default function WishListScreen() {

    const { user } = useContext(UserContext)
    const userId = user.id ? user.id : '-'

    const [lists, setLists] = useState([]);

    const [id, setId] = useState(null);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = async (id) => {
        setId(id)
    };

    const viewCreate = () => {
        setVisible(!visible)
    };

    const deleteList = async (id) => {
        console.log("Delete", id)
        await db.Users.Wishlist.deleteWishlist(userId, id)
    }

    useEffect(() => db.Users.Wishlist.listenAllWishlists(setLists, userId), [userId])

    return (
        <View>
            <Button title="Create Wishlist" onPress={() => viewCreate()} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.getStartedContainer}>
                    <Overlay isVisible={visible} onBackdropPress={() => viewCreate()}>
                        <CreateWishListScreen viewCreate={viewCreate} />
                    </Overlay>
                    {lists.length !== 0 ?
                        lists.map((list) => {
                            return (
                                <ListItem style={{ width: 350 }} key={list.id} bottomDivider>
                                    <ListItem.Content>
                                        <Card>
                                            <Card.Title>Your List</Card.Title>
                                            <Card.Divider />
                                            <Text style={{ marginBottom: 10 }}>Category: {list.category}</Text>
                                            <Text style={{ marginBottom: 10 }}>Material: {list.material}</Text>
                                            <Text style={{ marginBottom: 10 }}>Tech: {list.techUsed}</Text>
                                            <Text style={{ marginBottom: 10 }}>Active: {list.active ? "yes" : "no"}</Text>
                                            <Text style={{ marginBottom: 10 }}>Contact: {list.contact ? "yes" : "no"}</Text>
                                            {
                                                list.category == "Temperature"
                                                    ?
                                                    <>
                                                        <Text style={{ marginBottom: 10 }}>Min: {list.min}</Text>
                                                        <Text style={{ marginBottom: 10 }}>Max: {list.max}</Text>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {
                                                list.category == "Radius"
                                                    ?
                                                    <>
                                                        <Text style={{ marginBottom: 10 }}>Radius: {list.radius} m</Text>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            {
                                                list.category == "Light"
                                                    ?
                                                    <>
                                                        <Text style={{ marginBottom: 10 }}>Luminence: {list.luminence}</Text>
                                                    </>
                                                    :
                                                    <></>
                                            }
                                            <View style={{ flexDirection: "row" }}>
                                                <Button title="View Sensors" onPress={() => toggleOverlay(list.id)} />
                                                <Button
                                                    type="clear"
                                                    icon={
                                                        <Icon
                                                            name="delete"
                                                            size={25}
                                                            color="red"
                                                        />
                                                    }
                                                    iconRight
                                                    onPress={async () => await deleteList(list.id)}
                                                />
                                            </View>
                                        </Card>


                                        <Overlay isVisible={id == list.id} onBackdropPress={() => toggleOverlay(null)}>
                                            <ViewSensorsWishListScreen wishlist={list} />
                                        </Overlay>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        })
                        :
                        <ListItem style={{ width: 350 }} key={1}>
                            <ListItem.Content>
                                <ListItem.Title>You have currently no wishlists !</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    }
                </View>
            </ScrollView>
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
