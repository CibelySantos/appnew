// Cibely Cristiny dos Santos

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../../firebaseConfig';

const backgroundImage = require('../assets/backgroundpaginic.jpg');
const auth = getAuth(app);
const firestore = getFirestore(app);

export default function EditarPerfil({ navigation }) {
  const user = auth.currentUser;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [novaSenha, setNovaSenha] = useState('');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [foto, setFoto] = useState('https://via.placeholder.com/100');

  useEffect(() => {
    const carregarDados = async () => {
      const nomeSalvo = await AsyncStorage.getItem('nome');
      const fotoSalva = await AsyncStorage.getItem('foto');
      if (nomeSalvo) setNome(nomeSalvo);
      if (fotoSalva) setFoto(fotoSalva);
    };
    carregarDados();
  }, []);

  const escolherFoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a galeria é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, aspect: [1, 1], base64: false });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFoto(uri);
      await AsyncStorage.setItem('foto', uri);
    }
  };

  const salvarAlteracoes = async () => {
    if (!nome.trim() || !email.trim()) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    try {
      await AsyncStorage.setItem('nome', nome);

      if (senhaAtual && (email !== user.email || novaSenha)) {
        const credential = EmailAuthProvider.credential(user.email, senhaAtual);
        await reauthenticateWithCredential(user, credential);

        if (email !== user.email) {
          await updateEmail(user, email);
        }

        if (novaSenha.length >= 6) {
          await updatePassword(user, novaSenha);
        } else if (novaSenha.length > 0) {
          Alert.alert('Erro', 'A nova senha deve ter pelo menos 6 caracteres.');
          return;
        }
      }

      // Atualizar no Firestore
      const userDocRef = doc(firestore, 'usuarios', user.uid);
      await updateDoc(userDocRef, {
        nome,
        email,
        foto,
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', error.message || 'Falha ao atualizar perfil');
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Editar Perfil</Text>

        <TouchableOpacity onPress={escolherFoto}>
          <Image source={{ uri: foto }} style={styles.profileImage} />
          <Text style={styles.uploadText}>Trocar foto</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#ddd"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail atual:</Text>
        <Text style={styles.oldData}>{user.email}</Text>

        <TextInput
          style={styles.input}
          placeholder="Novo e-mail"
          placeholderTextColor="#ddd"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha atual"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={senhaAtual}
          onChangeText={setSenhaAtual}
        />

        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#ddd"
          secureTextEntry
          value={novaSenha}
          onChangeText={setNovaSenha}
        />

        <TouchableOpacity style={styles.buttonPrimary} onPress={salvarAlteracoes}>
          <Text style={styles.buttonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => navigation.navigate('PaginaPrincipal')}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 35, 73, 0.85)',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  uploadText: {
    color: '#ccc',
    textDecorationLine: 'underline',
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    width: '90%',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    color: '#fff',
  },
  label: {
    fontSize: 16,
    color: '#ddd',
    alignSelf: 'flex-start',
    marginLeft: '5%',
    marginTop: 5,
  },
  oldData: {
    fontSize: 16,
    color: '#bbb',
    fontWeight: 'bold',
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: '5%',
  },
  buttonPrimary: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 15,
    width: '90%',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
