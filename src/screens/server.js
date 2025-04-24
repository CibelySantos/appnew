// No componente Server.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Server() {
  return (
    <View style={styles.container}>
      <Text>Servidor aqui, tudo certo!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e', // mesma cor de fundo das outras telas
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("Usuário conectado:", socket.id);

  socket.on("sendMessage", (msg) => {
    console.log("Mensagem recebida:", msg);
    io.emit("receiveMessage", msg); // Broadcast
  });

  socket.on("disconnect", () => {
    console.log("Usuário desconectado:", socket.id);
  });
});

server.listen(8081, () => {
  console.log("Servidor rodando na porta 8081");
});
