import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const image = require('../assets/background.png');

export function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const navigation = useNavigation();

    const handleCreateAccount = () => {

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Acount created');
            const user = userCredential.user;
            console.log(user);
            navigation.navigate('Home');
        })
        .catch(err => {
            console.log(err);
        })
    }

    const handleSignInAccount = () => {

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Signed in created');
            const user = userCredential.user;
            console.log(user);
           navigation.navigate('Home');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View>
                    <View style={{marginBottom: 50}}>
                        <Text style={{fontSize: 20}}>E-Mail: </Text>
                        <TextInput style={{ borderWidth: 1, fontSize: 20}} onChangeText={(email) => setEmail(email)}/>
                    </View>
                    <View style={{marginBottom: 50}}>
                        <Text style={{fontSize: 20}}>Password: </Text>
                        <TextInput style={{ borderWidth: 1, fontSize: 20}} secureTextEntry={true} onChangeText={(password) => setPassword(password)}/>
                    </View>
                    <View style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: 100}}>
                        <Button title="Login" onPress={handleSignInAccount} />
                        <Button title="Create Account" onPress={handleCreateAccount} />
                    </View>
                </View>
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
        justifyContent: "center"
    },
});
  