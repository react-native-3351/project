import React, { useState, useEffect, useContext } from 'react';
import { Button, Overlay, ListItem, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, ScrollView } from 'react-native';
import { View, Text } from '../../../components/Themed';
import UserContext from '../../../UserContext'
import db from '../../../db'

export default function LiveChatScreen() {

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
        <View>
            <View style={styles.getStartedContainer}>
                <Button
                    title="Open Chat"
                    onPress={toggleOverlay}
                    width={60}
                    height={60}
                    borderRadius={30}
                    backgroundColor='#ee6e73'
                    position='absolute'
                    bottom={10}
                    right={10}
                />

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={styles.getStartedContainer}>
                        <Text>Live Chat</Text>
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
                                        <ListItem.Title>Need Help ? Post Your Message Here</ListItem.Title>
                                    </ListItem.Content>
                                </ListItem>
                            }
                        </ScrollView>
                        <View style={{ flexDirection: "row" }}>
                            <Input
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
                </Overlay>
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
