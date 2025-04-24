import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  Image, StyleSheet, Alert, ScrollView, ImageBackground
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from '../../firebaseConfig';
import { updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { uploadImageToS3 } from '../utils/s3Upload'; // Função utilitária para subir imagem no S3

const backgroundImage = require('../assets/fundoBranco.png');

export default function EditarPerfil({ navigation }) {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [fotoUrl, setFotoUrl] = useState(null);
  const [novaImagemUri, setNovaImagemUri] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const docRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setNome(data.nome || '');
          setFotoUrl(data.foto || null);
        }
      };
      fetchUserData();
    }
  }, []);

  const escolherNovaImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setNovaImagemUri(result.assets[0].uri);
    }
  };

  const salvarAlteracoes = async () => {
    try {
      if (!nome) {
        Alert.alert('Erro', 'O nome não pode estar vazio.');
        return;
      }

      let novaUrlFoto = fotoUrl;

      // Envia imagem para o S3 se for nova
      if (novaImagemUri) {
        novaUrlFoto = await uploadImageToS3(novaImagemUri, user.uid);
      }

      // Atualiza senha se fornecida
      if (senha.length >= 6) {
        await updatePassword(user, senha);
      }

      // Atualiza Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        nome,
        foto: novaUrlFoto,
      });

      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro ao atualizar perfil', error.message);
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <Text style={styles.helloText}>Olá, {nome || 'usuário'} </Text>

        {novaImagemUri || fotoUrl ? (
          <Image
            source={{ uri: novaImagemUri || fotoUrl }}
            style={styles.image}
          />
        ) : null}

        <TouchableOpacity style={styles.botao} onPress={escolherNovaImagem}>
          <Text style={styles.botaoText}>Alterar Foto</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Seu nome"
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Nova senha (opcional)"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.botao} onPress={salvarAlteracoes}>
          <Text style={styles.botaoText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(112, 84, 112, 0.9)',
    padding: 50,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  helloText: {
    fontSize: 22,
    color: 'white',
    marginBottom: 15,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#5e366e',
    paddingVertical: 14,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginVertical: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
});
