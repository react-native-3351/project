import * as React from "react";

import { Text, Overlay, Icon } from "react-native-elements";
import {
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import db from "../db";
import { useNavigation } from '@react-navigation/native';


export default function AdOverlay({ visible, setVisible }) {
    const navigation = useNavigation();
    const [ads, setAds] = React.useState([]);
    React.useEffect(() => db.Advertisements.listenAll(setAds), []);
    // React.useEffect(() => //console.log(ads), [ads]);

    const [currentAd, setCurrentAd] = React.useState(null);
    const randomizeCurrentAd = () => setCurrentAd(ads[Math.floor(Math.random() * ads.length)]);
    React.useEffect(randomizeCurrentAd, [ads, visible]);

    return (
        <>
            <Overlay
                fullScreen={true}
                isVisible={currentAd ? visible : false}
                onBackdropPress={() => setVisible(false)}
                overlayStyle={{ paddingLeft: 0 }}
            >
                <TouchableWithoutFeedback
                    onPress={() => { navigation.navigate(currentAd.link); setVisible(false) }}
                >

                    <ImageBackground
                        source={{ uri: currentAd?.url }}
                        resizeMode="center"
                        style={{
                            width: Dimensions.get("window").width,
                            height: Dimensions.get("window").height,
                        }}
                        PlaceholderContent={<ActivityIndicator />}
                    >
                        <TouchableHighlight
                            style={{ position: "absolute", right: 13, top: 13 }}
                            onPress={() => setVisible(false)}
                            underlayColor="white"
                        >
                            <Icon
                                name="close"
                                type="material"
                                // raised
                                reverse
                            />
                        </TouchableHighlight>
                        <View
                            style={{
                                position: "absolute",
                                bottom: 35,
                                left: 0,
                                right: 0,
                                alignItems: "center",
                                backgroundColor: "lightgray",
                            }}
                        >
                            <Text>Advertisement placeholder text!</Text>
                        </View>
                    </ImageBackground>
                </TouchableWithoutFeedback>
            </Overlay>
        </>
    );
}
