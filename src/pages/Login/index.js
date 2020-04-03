import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, KeyboardAvoidingView, Alert, Image, TextInput, Text, Platform,
    TouchableWithoutFeedback, TouchableOpacity, Keyboard, Animated, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo-light.png';
import styles from './styles';
import api from './../../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [offset] = useState(new Animated.ValueXY({ x: 0, y: 95 }));
    const [opacity] = useState(new Animated.Value(0));
    const [logo] = useState(new Animated.ValueXY({ x: 250, y: 105 }));
    const navigation = useNavigation();
    function handleLogon() {
        const data = {
            email,
            password
        }

        api.post('sessions/user', data)
        .then(response => {
            AsyncStorage.setItem('@BeTheHero:user',response.data.user);
            AsyncStorage.setItem('@BeTheHero:token',response.data.token);
            navigation.navigate('Incidents');
        })
        .catch(error => {
            Alert.alert(
                'Erro',
                `Ops...Algo deu errado. ${error.message}`,
                [{ text: 'OK', onPress: () => {} }],
                { cancelable: false }
              );
        });
    }
    function navigateToRegister() {
        navigation.navigate('Register');
    }
    function keyBoardDidShow() {
        console.log('show')
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 133,
                duration: 100
            }),
            Animated.timing(logo.y, {
                toValue: 56,
                duration: 100
            })
        ]).start();
    }
    function keyBoardDidHide() {
        console.log('hide')
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 250,
                duration: 100
            }),
            Animated.timing(logo.y, {
                toValue: 105,
                duration: 100
            })
        ]).start();
    }
    useEffect(() => {
        keybordDidShowListener = Keyboard.addListener('keyBoardDidShow', keyBoardDidShow);
        keybordDidHideListener = Keyboard.addListener('keyBoardDidHide', keyBoardDidHide);

        Animated.parallel([
            Animated.spring(offset.y, {
                toValue: 0,
                speed: 4,
                bounciness: 20
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 200
            })]
        ).start();
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <View style={styles.logoContainer}>
                        <Animated.Image source={logoImg} style={{ width: logo.x, height: logo.y }} />
                    </View>
                    <Animated.View
                        style={[styles.formContainer,
                        {
                            opacity: opacity,
                            transform: [{
                                translateY: offset.y
                            }]
                        }]}>
                        <TextInput placeholder="Login" style={styles.textInput} value={email} onChangeText={email => setEmail(email)}/>
                        <TextInput secureTextEntry={true} placeholder="Senha" style={styles.textInput} value={password} onChangeText={password => setPassword(password)}/>
                        <TouchableOpacity style={styles.enterButton} onPress={handleLogon}>
                            <Text style={styles.enterButtonText}>Entrar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.registerButton} onPress={() => navigateToRegister()}>
                            <Feather name="log-in" sise={16} color="#FFF" />
                            <Text style={styles.registerButtonText}>Não sou registrado</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

export default Login;
