import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import app from '../../firebaseConfig';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (input.trim().length === 0) return;

    if (!user) {
      alert('Você precisa estar logado para enviar mensagens!');
      return;
    }

    const messagesRef = collection(firestore, 'messages');

    await addDoc(messagesRef, {
      text: input,
      createdAt: serverTimestamp(),
      userId: user.uid,
      userEmail: user.email,
    });

    setInput('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Botão de Voltar */}
      <View style={styles.backButtonContainer}>
        <Button title="Voltar à Página Inicial" onPress={() => navigation.navigate('PaginaPrincipal')} />
      </View>

      <FlatList
        inverted
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.userId === user?.uid ? styles.myMessage : styles.otherMessage]}>
            <Text style={styles.user}>{item.userEmail}</Text>
            <Text style={styles.message}>{item.text}</Text>
          </View>
        )}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
        />
        <Button title="Enviar" onPress={sendMessage} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#0e2349' },
  backButtonContainer: {
    marginBottom: 10,
  },
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#1c3d72',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#2a4a8a',
    alignSelf: 'flex-start',
  },
  user: {
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: 3,
  },
  message: {
    fontSize: 16,
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderColor: '#1c3d72',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 40,
    marginRight: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: 'white',
  },
});
