import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Button, Overlay, ListItem, Icon } from 'react-native-elements';
import { View, Text } from '../../../components/Themed';
import UserContext from '../../../UserContext'
import db from '../../../db'
import ViewSensor from './ViewFavoritesSensorScreen'

export default function ViewFavoritesScreen() {

    const { user } = useContext(UserContext)
    const userId = user.id ? user.id : '-'

    const [favorites, setFavorites] = useState([]);

    const [id, setId] = useState(null);

    const toggleOverlay = async (id) => {
        setId(id)
    };

    const deleteList = async (id) => {
        console.log("Delete", id)
        await db.Users.Favorite.deleteFavorite(userId, id)
    }

    useEffect(() => db.Users.Favorite.listenToUsersFavorite(setFavorites, userId), [userId])

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <ScrollView style={styles.scrollView}>
                    {favorites.length !== 0 ?
                        favorites.map((favorite) => {
                            return (
                                <ListItem style={{ width: 350, textAlign: "right", backgroundColor: "#ebebeb" }} key={favorite.id} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>ID: {favorite.sensorId}</ListItem.Title>
                                        <View style={{ flexDirection: "row" }}>
                                            <Button title="View Sensor Details" onPress={() => toggleOverlay(favorite.sensorId)} />
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
                                                onPress={async () => await deleteList(favorite.id)}
                                            />
                                        </View>
                                        <Overlay isVisible={id == favorite.sensorId} onBackdropPress={() => toggleOverlay(null)}>
                                            <ViewSensor sensorId={favorite.sensorId} />
                                        </Overlay>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        })
                        :
                        <ListItem style={{ width: 350 }} key={1}>
                            <ListItem.Content>
                                <ListItem.Title>You have currently no favorites !</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    }
                </ScrollView>
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
