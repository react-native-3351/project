import React, { useState, useEffect, useContext } from "react";
import { ImageBackground, StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Button, Overlay, ListItem, Card, Icon } from "react-native-elements";
import UserContext from "../../../UserContext";
import db from "../../../db";
import CreateWishListScreen from "./CreateWishListScreen";
import ViewSensorsWishListScreen from "./ViewSensorsWishListScreen";

export default function WishListScreen() {
    const image = {
        uri: "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif",
        // uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
    };

    const { user } = useContext(UserContext);
    const userId = user.id ? user.id : "-";

    const [lists, setLists] = useState([]);

    const [id, setId] = useState(null);
    const [visible, setVisible] = useState(false);

    const toggleOverlay = async (id) => {
        setId(id);
    };

    const viewCreate = () => {
        setVisible(!visible);
    };

    const deleteList = async (id) => {
        //console.log("Delete", id)
        await db.Users.Wishlist.deleteWishlist(userId, id);
    };

    useEffect(() => db.Users.Wishlist.listenAllWishlists(setLists, userId), [userId]);

    return (
        <ImageBackground source={image} style={styles.image}>
            <View>
                <Button
                    buttonStyle={styles.button}
                    title="Create Wishlist"
                    onPress={() => viewCreate()}
                />
                <ScrollView>
                    <View style={styles.container}>
                        <Overlay isVisible={visible} onBackdropPress={() => viewCreate()}>
                            <CreateWishListScreen viewCreate={viewCreate} />
                        </Overlay>
                        {lists.length !== 0 ? (
                            lists.map((list) => {
                                return (
                                    <ListItem
                                        style={{ width: 250 }}
                                        containerStyle={{ backgroundColor: "black" }}
                                        key={list.id}
                                        bottomDivider
                                    >
                                        <ListItem.Content>
                                            <Card>
                                                <Card.Title>Your List</Card.Title>
                                                <Card.Divider />
                                                <Text style={{ marginBottom: 10 }}>
                                                    Category: {list.category}
                                                </Text>
                                                <Text style={{ marginBottom: 10 }}>
                                                    Material: {list.material}
                                                </Text>
                                                <Text style={{ marginBottom: 10 }}>
                                                    Tech: {list.techUsed}
                                                </Text>
                                                <Text style={{ marginBottom: 10 }}>
                                                    Active: {list.active ? "yes" : "no"}
                                                </Text>
                                                <Text style={{ marginBottom: 10 }}>
                                                    Contact: {list.contact ? "yes" : "no"}
                                                </Text>
                                                {list.category == "Temperature" ? (
                                                    <>
                                                        <Text style={{ marginBottom: 10 }}>
                                                            Min: {list.min}
                                                        </Text>
                                                        <Text style={{ marginBottom: 10 }}>
                                                            Max: {list.max}
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                {list.category == "Radius" ? (
                                                    <>
                                                        <Text style={{ marginBottom: 10 }}>
                                                            Radius: {list.radius} m
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                {list.category == "Light" ? (
                                                    <>
                                                        <Text style={{ marginBottom: 10 }}>
                                                            Luminence: {list.luminence}
                                                        </Text>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                                <View style={{ flexDirection: "row" }}>
                                                    <Button
                                                        buttonStyle={{ backgroundColor: "purple" }}
                                                        title="View Sensors"
                                                        onPress={() => toggleOverlay(list.id)}
                                                    />
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
                                                        onPress={async () =>
                                                            await deleteList(list.id)
                                                        }
                                                    />
                                                </View>
                                            </Card>

                                            <Overlay
                                                isVisible={id == list.id}
                                                onBackdropPress={() => toggleOverlay(null)}
                                            >
                                                <ViewSensorsWishListScreen wishlist={list} />
                                            </Overlay>
                                        </ListItem.Content>
                                    </ListItem>
                                );
                            })
                        ) : (
                            <ListItem
                                style={{ width: 350 }}
                                containerStyle={{ backgroundColor: "black" }}
                                key={1}
                            >
                                <ListItem.Content>
                                    <ListItem.Title>
                                        <Text style={styles.thirdTitle}>
                                            You have currently no wishlists !
                                        </Text>
                                    </ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        )}
                    </View>
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50,
    },
    mainTitle: {
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    secTitle: {
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    thirdTitle: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        color: "white",
    },
    input: {
        borderWidth: 5,
        borderColor: "#2a2a2a",
        backgroundColor: "white",
        width: 250,
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 30,
        marginVertical: 12,
    },
    paragraph: {
        fontSize: 15,
        textAlign: "center",
        color: "white",
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: "purple",
        borderRadius: 30,
        marginHorizontal: 50,
        marginVertical: 7,
    },
});
