// Cibely, Júlia e Luiz

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../firebaseConfig';

const backgroundImage = require('../assets/fundoBranco.png');
const logo = require('../assets/LogoPC.png'); // Adicione sua logo nessa pasta

const RealizarLogin = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const tentarLogar = () => {
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigation.navigate('PaginaPrincipal');
            })
            .catch((error) => {
                console.error('Falha no login:', error.message);
            });
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.background}>
            <View style={styles.overlay}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.text}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.botao} onPress={tentarLogar}>
                    <Text style={styles.botaoText}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
                    <Text style={styles.linkText}>Não tem uma conta? Cadastre-se.</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(71, 29, 69, 0.5)',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'rgba(83, 83, 83, 0.5)',
        borderRadius: 5,
        backgroundColor: 'white',
    },
    botao: {
        backgroundColor: 'rgba(63, 26, 57, 0.5)',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
    },
    botaoText: {
        color: 'white',
        fontSize: 16,
    },
    linkText: {
        color: 'white',
        marginTop: 15,
        fontSize: 14,
    },
});

export default RealizarLogin;
