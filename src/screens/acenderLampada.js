// Cibely Cristiny dos Santos

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LampadaScreen = () => {
  const [lampadaAcesa, setLampadaAcesa] = useState(false);
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const imageSize = width * 0.4;

  const alternarLampada = () => {
    setLampadaAcesa(!lampadaAcesa);
  };

  return (
    <View style={[styles.container, { backgroundColor: lampadaAcesa ? '#fff' : '#1C1C1C' }]}>      
      <Text style={[styles.titulo, { color: lampadaAcesa ? '#000' : '#fff' }]}>
        {lampadaAcesa ? 'Lâmpada Acesa' : 'Lâmpada Apagada'}
      </Text>

      <Image
        source={lampadaAcesa 
          ? require('../assets/luzac.png') 
          : require('../assets/luzap.png')}
        style={[styles.lampadaImagem, { width: imageSize, height: imageSize }]}
      />

      <TouchableOpacity
        style={styles.lampButton}
        onPress={alternarLampada}
        accessibilityLabel={lampadaAcesa ? 'Apagar lâmpada' : 'Acender lâmpada'}
      >
        <Text style={styles.lampText}>{lampadaAcesa ? 'Apagar' : 'Acender'}</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
        accessibilityLabel="Voltar para a tela anterior"
      >
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
};

const baseButton = {
  padding: 15,
  borderRadius: 10,
  alignItems: 'center',
  width: 220,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },
  lampadaImagem: {
    resizeMode: 'contain',
    marginBottom: 25,
  },
  lampButton: {
    ...baseButton,
    backgroundColor: '#FFFFFF', 
    borderWidth: 2,
    borderColor: 'rgba(14, 35, 73, 0.85)', 
  },
  lampText: {
    color: 'rgba(14, 35, 73, 0.85)', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    ...baseButton,
    backgroundColor: 'rgba(14, 35, 73, 0.85)', 
    marginTop: 15,
  },
  backButtonText: {
    color: '#FFFFFF', 
    fontSize: 17,
    fontWeight: 'bold',
  },
});

export default LampadaScreen;