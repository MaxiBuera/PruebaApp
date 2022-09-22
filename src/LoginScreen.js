import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Modal, BackHandler, Image } from 'react-native';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebase-config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    /*useEffect(() => {
        //Evita ir para atras(boton del celu)
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true);
        return () => backHandler.remove();
    }, []);*/
      
    const image = require('../assets/background2.png');
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const navigation = useNavigation();

    //function cerrar(){
    //    signOut()
    //    .then(function() {
    //        console.log('Salir');
    //    })
    //    .catch(function() {
    //        console.log('Salir');
    //    })
    //}

    const handleCreateAccount = () => {

        try {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/.test(email)) {
                throw new Error('Bad email');
            }
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Acount created');
                const user = userCredential.user;
            //console.log(user);
                navigation.navigate('Home');
            })
            .catch(err => {
                if (email == '' || password == '') {
                    console.log('MENSAJE DE ERROR');
                    setModalVisible(!modalVisible);
                }
                console.log(err);
            })
        } catch(err) {
            console.log(err);
            setModalVisible(!modalVisible);
        }
    }

    const handleSignInAccount = () => {

        try {
            if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{3}$/.test(email)) {
                throw new Error('Bad email');
            }
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('Signed in created');
                const user = userCredential.user;
                //console.log(user);
                navigation.navigate('Home');
            })
            .catch(err => {
                if (email == '' || password != '') {
                    console.log('MENSAJE DE ERROR');
                    setModalVisible(!modalVisible);
                }
                console.log(err);
            })
        } catch(err) {
            console.log(err);
            setModalVisible(!modalVisible);
        }
    }

    const signInPreDefinedUser = user => {

        if(user == 1) {
            setEmail('admin@admin.com');
            setPassword('111111');
        } else if(user == 2) {
            setEmail('tester@tester.com');
            setPassword('555555');
        } else if(user == 3) {
            setEmail('invitado@invitado.com');
            setPassword('222222');
        } else {
            setEmail('');
            setPassword('');
        }
        
    }

    const AppButton = ({ onPress, title, buttonColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, {backgroundColor: buttonColor}]}>
          <Text style={styles.appButtonText}>{title}</Text>
        </TouchableOpacity>
    );

//validaciones a los campos
//mensajes de error. no alert
//funcional con firebase
//3 botones de acceso rapido. usuarios diferentes
    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.background}>
                    <View style={{marginHorizontal: 40, marginTop: 10}}>
                        <Text style={{fontSize: 40, fontWeight: "bold", textAlign: "center"}}>Acceda a su cuenta</Text>
                        <View style={{marginTop: 20, height: '70%', display: 'flex', justifyContent: 'space-between'}}>
                            <View style={{height: '25%', display: 'flex', justifyContent: 'space-between'}}>
                                <TextInput style={{ borderBottomWidth: 0.5 , borderColor: '#9b9b9b' , fontSize: 20}} placeholder="Correo electrónico" value={email} onChangeText={(email) => setEmail(email)}/>
                                <TextInput style={{ borderBottomWidth: 0.5, borderColor: '#9b9b9b', fontSize: 20}} placeholder="Clave" secureTextEntry={true} value={password} onChangeText={(password) => setPassword(password)}/>                         
                            </View>
                            <View style={{marginTop: 20, height: '30%', display: 'flex', justifyContent: 'space-between'}}>
                                <AppButton onPress={handleSignInAccount} title="Login" buttonColor='black' size="sm" backgroundColor="#007bff" />
                                <AppButton onPress={handleCreateAccount} title="Create Account" buttonColor='black' size="sm" backgroundColor="#007bff" />
                            </View>
                            <View style={{marginTop: 25, height: '50%', display: 'flex', justifyContent: 'space-between'}}>
                                <AppButton onPress={() => signInPreDefinedUser(1)} title="Administrador" buttonColor='red' size="sm" backgroundColor="#007bff" />
                                <AppButton onPress={() => signInPreDefinedUser(2)} title="Tester" buttonColor='green' size="sm" backgroundColor="#007bff" />
                                <AppButton onPress={() => signInPreDefinedUser(3)} title="Invitado" buttonColor='grey' size="sm" backgroundColor="#007bff" />
                            </View>
                        </View>
                    </View>
                    <View style={styles.centeredView}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Image
                                        style={styles.tinyLogo}
                                        source={require('../assets/error.png')}
                                    />
                                    <Text style={{fontSize: 30, marginTop: 10, fontWeight: 'bold', color: '#F15249'}}>Error</Text>
                                    <Text style={{fontSize: 20, marginVertical: 18}}>Correo o clave no válido</Text>
                                    <AppButton onPress={() => setModalVisible(!modalVisible)} title="Cerrar" buttonColor='black' buttonStyle={styles.appButtonContainer} size="sm" backgroundColor="#007bff" />
                                </View>
                            </View>
                        </Modal>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 100,
        height: 100,
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    background:{
        backgroundColor: '#fafafa',
        width: '90%',
        height: 600,
        marginHorizontal: 30,
        borderRadius: 15,
        elevation: 8
    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
  