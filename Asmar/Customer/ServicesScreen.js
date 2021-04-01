import React, { useContext } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { View } from "../../components/Themed";
import { ListItem, Icon } from "react-native-elements";
import UserContext from "../../UserContext";

export default function ServicesScreen({ navigation }) {
    const { user } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <ScrollView>
                <ListItem
                    onPress={() => navigation.navigate("Notifications")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="notifications" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Notifications</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Sensors")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="control-camera" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Sensors</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Queries")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="feedback" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Queries</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Reports")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="report" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Reports</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Suggestions")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="speech" type="simple-line-icon" />
                    <ListItem.Content>
                        <ListItem.Title>Suggestions</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Gifts")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="gift" type="material-community" />
                    <ListItem.Content>
                        <ListItem.Title>Gifts</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Favorites")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="favorite" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Favorites</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("Wishlist")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="list-alt" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Wishlist</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("CartScreen")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="shopping-cart" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Your Cart</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("FeedbackScreen")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="rate-review" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Feedback</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
                <ListItem
                    onPress={() => navigation.navigate("FAQs")}
                    style={styles.listItem}
                    bottomDivider
                >
                    <Icon name="question-answer" type="material" />
                    <ListItem.Content>
                        <ListItem.Title>Frequently Asked Questions</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron size={30} />
                </ListItem>
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
        backgroundColor: "#fff",
    },
    developmentModeText: {
        marginBottom: 20,
        fontSize: 14,
        lineHeight: 19,
        textAlign: "center",
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: "center",
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: "rgba(96,100,109, 0.8)",
    },
    codeHighlightContainer: {
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        lineHeight: 24,
        textAlign: "center",
    },
    helpContainer: {
        marginTop: 15,
        marginHorizontal: 20,
        alignItems: "center",
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        textAlign: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%",
    },
});
