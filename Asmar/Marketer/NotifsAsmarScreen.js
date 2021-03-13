import React, { useState, useContext } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import UserContext from '../../UserContext'
import { Button, Input, Text, } from 'react-native-elements';
import UserPicker from '../../screens/pickers/UserPicker';
import db from '../../db';

//TODO: schedule notifications
//TODO: better picker for links
export default function NotifsAsmarScreen() {

    const { user } = useContext(UserContext)
    const [userId, setUserId] = useState(null);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [link, setLink] = useState("");


    const isValid = () => userId && title && body && link;

    const submit = async () => {
        await db.Users.Notifications.send(userId, title, body, link);
        //console.log("Notification sent!");
    }

    return (
        <View>
            <View style={styles.getStartedContainer}>
                <Text h1>Send Notification</Text>
                <UserPicker set={setUserId} />
                <Input
                    label='Title'
                    placeholder='Title'
                    value={title}
                    onChangeText={value => setTitle(value)}
                />
                <Input
                    label='Body'
                    placeholder='Body'
                    value={body}
                    onChangeText={value => setBody(value)}
                />
                <Input
                    label='Link'
                    placeholder='Link'
                    value={link}
                    onChangeText={value => setLink(value)}
                />
                <Button
                    title="Submit"
                    onPress={submit}
                    disabled={isValid()}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
