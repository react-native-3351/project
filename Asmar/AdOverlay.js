import * as React from "react";

import { Text, Overlay, Image, Icon } from "react-native-elements";
import {
    ImageBackground,
    ActivityIndicator,
    Dimensions,
    TouchableHighlight,
    View,
} from "react-native";
import db from "../db";

export default function AdOverlay({ visible, setVisible }) {
    const [ads, setAds] = React.useState([]);
    React.useEffect(() => db.Advertisements.listenAll(setAds), []);

    const [currentAd, setCurrentAd] = React.useState(null);
    const randomizeCurrentAd = () => setCurrentAd(ads[Math.floor(Math.random() * ads.length)]);
    React.useEffect(randomizeCurrentAd, [ads, visible]);

    return (
        <>
            <Overlay
                fullScreen={true}
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
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
            </Overlay>
        </>
    );
}
