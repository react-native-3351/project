import React, { useState, useEffect } from 'react';
import { Button, Icon, ListItem, Input } from 'react-native-elements';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '../../../components/Themed';
import db from '../../../db'

export default function ViewUnreadMessagesScreen({ chat, setId }) {

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
        <View>
            <View style={styles.getStartedContainer}>
                <View style={styles.getStartedContainer}>
                    <Text>Live Chat Support</Text>
                    <ScrollView style={styles.scrollView}>
                        {messages.length !== 0 ?
                            messages.map((message) => {
                                return (
                                    <ListItem style={{ width: 350, textAlign: "right", backgroundColor: "#ebebeb" }} key={message.id} bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title>{message.message}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                )
                            })
                            :
                            <ListItem style={{ width: 350 }} key={1}>
                                <ListItem.Content>
                                    <ListItem.Title>Loading...</ListItem.Title>
                                </ListItem.Content>
                            </ListItem>
                        }
                    </ScrollView>
                    <View style={{ flexDirection: "row" }}>
                        <Input
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
                                            color='#339FFF'
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
                    <Button title="Close Chat" onPress={toggleOverlay} />
                </View>
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
