import React, { useState, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: '1', text: 'E aí! Tudo certo?', sender: 'João', senderId: 'joao123' },
    { id: '2', text: 'Tudo sim! E você?', sender: 'Maria', senderId: 'maria456' },
  ]);
  const [input, setInput] = useState('');
  const flatListRef = useRef(null);

  // Usuário atual (quem tá usando o app)
  const currentUser = { id: 'user123', name: 'Você' };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: String(Date.now()),
      text: input,
      sender: currentUser.name,
      senderId: currentUser.id,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderItem = ({ item }) => (
    <View style={[
      styles.message,
      item.senderId === currentUser.id ? styles.user : styles.other
    ]}>
      <Text style={styles.senderName}>{item.sender}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💬 Chat de Grupo</Text>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ref={flatListRef}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        style={styles.chatBox}
      />

      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F3F4F6' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  chatBox: { flex: 1, marginBottom: 10 },
  message: {
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
    maxWidth: '75%',
  },
  user: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  other: {
    backgroundColor: '#E2E3E5',
    alignSelf: 'flex-start',
  },
  messageText: { fontSize: 16 },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 2,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
  },
  input: { flex: 1, paddingVertical: 10, fontSize: 16 },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    marginLeft: 5,
  },
  sendText: { color: '#fff', fontWeight: 'bold' },
});
