import React, { useState, useEffect, useContext } from 'react';
import { Overlay, ListItem, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TextInput
} from "react-native";
import { Button } from 'react-native-elements';
import UserContext from '../../../UserContext'
import db from '../../../db'

export default function LiveChatScreen() {

    const image = {
        uri: "https://i.pinimg.com/originals/7b/60/c0/7b60c0e5e9f0168cd0889bae9a72b460.gif"
        // uri: "https://cdn.nohat.cc/image_by_url.php?url=https://image.freepik.com/free-vector/blue-tones-blurred-background_1107-128.jpg"
    };

    const { user } = useContext(UserContext)
    const userId = user.id ? user.id : '-'

    const [messages, setMessages] = React.useState([]);
    const [chat, setChat] = React.useState("")
    const [liveChat, setLiveChat] = React.useState("")

    useEffect(() => {
        db.LiveChat.listenChat(setMessages, userId)
        db.LiveChat.listenChatOnly(setLiveChat, userId)
    }, [userId])

    const [visible, setVisible] = useState(false);

    const toggleOverlay = async () => {
        setVisible(!visible);
        liveChat[0] ? await db.LiveChat.updateChatStatus(liveChat[0]) : undefined
        visible == false ? setMessages([]) : undefined
    };

    const sendMessage = async () => {
        if (messages.length !== 0) {
            await db.LiveChat.createMessageUser({ message: chat, messageDate: new Date(), sender: 'user' }, liveChat[0])
        }
        else {
            await db.LiveChat.createLivechat({ message: chat, messageDate: new Date(), sender: 'user' }, userId)
        }
        setChat('')
    }

    return (
        <ImageBackground source={image} style={styles.image}>
            <View>
                <View>
                    <Button
                        title="Open Chat"
                        onPress={toggleOverlay}
                        buttonStyle={styles.button}
                        position='absolute'
                        bottom={10}
                        right={10}
                    />

                    <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                        <View style={styles.container}>
                            <ImageBackground source={image} style={styles.image}>
                                <Text style={styles.secTitle}>Live Chat</Text>
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
                                                <ListItem.Title><Text style={styles.thirdTitle}>Need Help ? Post Your Message Here</Text></ListItem.Title>
                                            </ListItem.Content>
                                        </ListItem>
                                    }
                                </ScrollView>
                                <View style={{ flexDirection: "row" }}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder='Type Your Message...'
                                        onChangeText={value => setChat(value)}
                                        value={chat}
                                    />
                                    {
                                        chat !== ""
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
                                                marginTop="20"
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
                            </ImageBackground>
                        </View>
                    </Overlay>
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
