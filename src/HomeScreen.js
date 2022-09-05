import { React } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';

const image = require('../assets/background.png');
const imageOK = require('../assets/ok.png');

export function HomeScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <Image style={{ width: 200, height: 200}} source={imageOK} />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
});
  