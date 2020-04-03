import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, KeyboardAvoidingView, Alert, Image, TextInput, Text, Platform, TouchableWithoutFeedback, TouchableOpacity, Picker, Keyboard, AsyncStorage } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import logoImg from '../../assets/logo-light.png';
import styles from './styles';
import api from './../../services/api';
import { ScrollView } from 'react-native-gesture-handler';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const navigation = useNavigation();
    function navigateToLogin() {
        navigation.goBack();
    }
    function handleRegister() {
        const data = {
            name,
            email,
            password,
            phone,
            city,
            uf
        }
        api.post('users', data)
            .then(response => {
                AsyncStorage.setItem('user', response.user);
                AsyncStorage.setItem('token', response.token);
                navigation.navigate('Login');
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

    return (
        <KeyboardAvoidingView
            behavior={Platform.Os == "ios" ? "padding" : "height"}
            style={styles.container}>
            <ScrollView>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <View style={styles.header}>
                            <Image source={logoImg}></Image>
                            <TouchableOpacity onPress={navigateToLogin}>
                                <Feather name="arrow-left" size={28} color="#FFF" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formContainer}>
                            <TextInput placeholder="Nome" style={styles.textInput} value={name} onChangeText={name => setName(name)} />
                            <TextInput placeholder="E-mail" style={styles.textInput} value={email} onChangeText={email => setEmail(email)} />
                            <TextInput secureTextEntry={true} placeholder="Senha" style={styles.textInput} value={password} onChangeText={password => setPassword(password)} />
                            <TextInput placeholder="Telefone" style={styles.textInput} value={phone} onChangeText={phone => setPhone(phone)} />
                            <TextInput placeholder="Cidade" style={styles.textInput} value={city} onChangeText={city => setCity(city)} />
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={uf}
                                    onValueChange={(itemValue, itemIndex) => setUf(itemValue)}
                                    mode="dialog"
                                    textStyle={styles.pickerText}
                                >
                                    <Picker.Item label="-" value="" />
                                    <Picker.Item label="RJ" value="RJ" />
                                    <Picker.Item label="SP" value="SP" />
                                    <Picker.Item label="MG" value="MG" />
                                    <Picker.Item label="ES" value="ES" />
                                </Picker>
                            </View>
                            <TouchableOpacity style={styles.enterButton} onPress={handleRegister}>
                                <Text style={styles.enterButtonText}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Register;
