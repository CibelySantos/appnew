import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';

const backgroundImage = require('../assets/fundoBranco.png');

export default function CadastroUsuario({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');


  const registerUser = async () => {
    if (!email || !senha || !nome) {
      Alert.alert('Preencha todos os campos');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;

      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        nome,
        email,
      });

      Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!');
      navigation.navigate('realizarLogin');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      Alert.alert('Erro ao cadastrar', error.code + '\n' + error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro</Text>

        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
          placeholder="Digite seu nome"
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          onChangeText={setSenha}
          value={senha}
          placeholder="Digite sua senha"
          placeholderTextColor="#ccc"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate('RealizarLogin')}
        >
          <Text style={styles.buttonSecondaryText}>Já tem uma conta? Faça login.</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(196, 196, 196, 0.28)',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#1c3d72',
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    color: 'white',
    backgroundColor: 'rgba(99, 32, 109, 0.5)',
  },
  button: {
    backgroundColor: 'rgba(99, 32, 109, 0.59)',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSecondary: {
    marginTop: 10,
    alignItems: 'center',
  },
  buttonSecondaryText: {
    color: 'black',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 15,
    borderRadius: 50,
  },
});