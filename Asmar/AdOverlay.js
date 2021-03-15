import * as React from "react";

import { Text, Overlay, Image, Icon } from "react-native-elements";
import { ImageBackground, ActivityIndicator, Dimensions } from "react-native";
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
                <Icon
                    name="close"
                    type="material"
                    style={{
                        // position: "absolute",
                        left: Dimensions.get("window").width / 2 - 10,
                        top: 5,
                    }}
                    onPress={() => setVisible(false)}
                />
                <ImageBackground
                    source={{ uri: currentAd?.url }}
                    resizeMode="center"
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                    }}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </Overlay>
        </>
    );
}
