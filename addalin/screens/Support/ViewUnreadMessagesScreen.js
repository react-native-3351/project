import React, { useState, useEffect } from 'react';
import { Button, Icon, ListItem, Input } from 'react-native-elements';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput
} from "react-native";
import db from '../../../db'

export default function ViewUnreadMessagesScreen({ chat, setId }) {
    const image = {
        uri: "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif"
        // uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
    };
    const [messages, setMessages] = useState([]);
    const [chatMessage, setChatMessage] = useState("")

    useEffect(() => {
        chat ? db.LiveChat.listenMessagesAdmin(setMessages, chat.id) : undefined
    }, [chat])

    const toggleOverlay = async () => {
        await db.LiveChat.updateChatStatus(chat)
        setId(null)
    };

    const sendMessage = async () => {
        await db.LiveChat.createMessageAdmin(chat.id, { message: chatMessage, messageDate: new Date(), sender: 'support' })
        setChatMessage('')
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <View>
                <View>
                    <Text style={styles.secTitle}>Live Chat Support</Text>
                    <ScrollView>
                        {messages.length !== 0 ?
                            messages.map((message) => {
                                return (
                                    <ListItem style={{ width: 350 }} containerStyle={{ backgroundColor: "black" }} key={message.id} bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title><Text style={styles.thirdTitle}>{message.message}</Text></ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                )
                            })
                            :
                            <ListItem style={{ width: 350 }} containerStyle={{ backgroundColor: "black" }} key={1}>
                                <ListItem.Content>
                                    <ListItem.Title><Text style={styles.thirdTitle}>Loading...</Text></ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <TextInput
                            style={styles.input}
                            placeholder='Type Your Message...'
                            onChangeText={value => setChatMessage(value)}
                        />
                        {
                            chatMessage !== ""
                                ?
                                <Button
                                    type="clear"
                                    icon={
                                        <Icon
                                            size={40}
                                            name='telegram'
                                            type='font-awesome'
                                            color='#d554fb'
                                        />
                                    }
                                    iconRight
                                    onPress={sendMessage}
                                />
                                :
                                <Button
                                    type="clear"
                                    onPress={() => { }}
                                    icon={
                                        <Icon
                                            size={40}
                                            name='telegram'
                                            type='font-awesome'
                                            color='#808080'
                                        />
                                    }
                                />
                        }
                    </View>
                    <Button buttonStyle={styles.button} title="Close Chat" onPress={toggleOverlay} />
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
