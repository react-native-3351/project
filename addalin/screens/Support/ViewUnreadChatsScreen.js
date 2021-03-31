import React, { useState, useEffect, useContext } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput
} from "react-native";
import { Button, Overlay, ListItem } from 'react-native-elements';
import UserContext from '../../../UserContext'
import db from '../../../db'
import ViewUnreadMessagesScreen from './ViewUnreadMessagesScreen'

export default function ViewUnreadChatsScreen() {

    const image = {
        uri: "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif"
        // uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
    };

    const { user } = useContext(UserContext)
    const userId = user.id ? user.id : '-'

    const [chats, setChats] = useState([]);

    const [id, setId] = useState(null);

    const toggleOverlay = async (chat) => {
        await db.LiveChat.selectUser(chat, userId)
        setId(chat.id)
    };

    useEffect(() => db.LiveChat.listenNewChatAdmin(setChats, userId), [userId])

    return (
        <ImageBackground source={image} style={styles.image}>
        <View>
            <View>
                <ScrollView>
                    {chats.length !== 0 ?
                        chats.map((chat) => {
                            return (
                                <ListItem style={{ width: 350}} containerStyle={{ backgroundColor: "black" }} key={11} bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title><Text style={styles.thirdTitle}>Chat ID: {chat.id}</Text></ListItem.Title>
                                        <ListItem.Title><Text style={styles.thirdTitle}>User ID: {chat.userId}</Text></ListItem.Title>
                                        <Button style={{backgroundColor:"purple"}} title="Open Chat" onPress={() => toggleOverlay(chat)} />

                                        <Overlay isVisible={id == chat.id}>
                                            <ViewUnreadMessagesScreen chat={chat} setId={setId} />
                                        </Overlay>
                                    </ListItem.Content>
                                </ListItem>
                            )
                        })
                        :
                        <ListItem style={{ width: 350 }} containerStyle={{ backgroundColor: "black" }} key={1}>
                            <ListItem.Content>
                                <ListItem.Title><Text style={styles.thirdTitle}>You have currently no new chats !</Text></ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    }
                </ScrollView>
            </View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        // justifyContent: "center"
        paddingTop: 50
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
        fontSize: 12,
        textAlign: "center",
        color: "white"
    },
    button: {
        // backgroundColor:'#2a2a2a',
        backgroundColor: 'purple',
        borderRadius: 30,
        marginHorizontal: 50,
        marginVertical: 7,
    },
});
