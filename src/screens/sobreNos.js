// Cibely Cristiny dos Santos

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, Dimensions } from 'react-native';

const backgroundImage = require('../assets/backgroundpaginic.jpg'); 

const { width } = Dimensions.get('window');

export default function Stack({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <ScrollView contentContainerStyle={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.title}>Sobre nós</Text>

          <View style={styles.card}>
            <Text style={styles.description}>
              Bem-vindo ao nosso aplicativo! Desenvolvido para oferecer praticidade e eficiência, nosso aplicativo foi criado
              pensando em todos os públicos, proporcionando uma experiência intuitiva e funcional.
            </Text>
          </View>

          <Text style={styles.subTitle}>Principais Recursos:</Text>

          <View style={styles.card}>
            <Text style={styles.feature}>💡 <Text style={styles.featureHighlight}>Interação:</Text> Você pode interagir com uma lâmpada digital, ligando e desligando.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.feature}>⚕️ <Text style={styles.featureHighlight}>Saúde:</Text> Temos uma aba onde você pode descobrir seu IMC colocando seu peso e altura.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.feature}>⚽ <Text style={styles.featureHighlight}>Novidades:</Text> Descubra todos os jogadores do Real Madrid.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.feature}>📝 <Text style={styles.featureHighlight}>Perfil:</Text> Edite seu perfil sempre que quiser.</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.finalText}>
              Com uma interface moderna e fácil de usar, acesse a qualquer momento e em qualquer lugar.
            </Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PaginaPrincipal')}>
            <Text style={styles.buttonText}>Voltar para página inicial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(14, 35, 73, 0.85)', 
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  content: {
    width: width * 0.9, 
    maxWidth: 600,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
    padding: 15,
    borderRadius: 10,
    width: '100%',
    maxWidth: 500,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 24,
  },
  feature: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 22,
  },
  featureHighlight: {
    fontWeight: 'bold',
    color: '#fff',
  },
  finalText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'justify',
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#black',
    fontSize: 18,
    fontWeight: 'bold',
  },
});