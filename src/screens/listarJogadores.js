// Cibely Cristiny dos Santos

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Modal, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { db } from '../../firebaseConfig';
import { Timestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function App() {
    const [dados, setDados] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [jogadorAtual, setJogadorAtual] = useState(null);
    const [nome, setNome] = useState('');
    const [altura, setAltura] = useState('');
    const [camisa, setCamisa] = useState('');
    const [nascimento, setNascimento] = useState('');
    const navigation = useNavigation();
  
  const buscarDados = async () => {
    try {
      const lista = [];
      const querySnapshot = await getDocs(collection(db, 'real-madrid'));
      querySnapshot.forEach((doc) => {
        lista.push({ id: doc.id, ...doc.data() });
      });

      const listaOrdenada = lista.sort((a, b) => a.nome.localeCompare(b.nome));
      setDados(listaOrdenada);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    buscarDados();
  }, []);

  const editarJogador = (jogador) => {
    setJogadorAtual(jogador);
    setNome(jogador.nome);
    setAltura(jogador.altura.toString());
    setCamisa(jogador.camisa);
    const dataFormatada = format(jogador.nascimento.toDate(), 'dd/MM/yyyy');
    setNascimento(dataFormatada);
    setModalVisible(true);
  };

  const excluirJogador = async (id) => {
    try {
      await deleteDoc(doc(db, 'real-madrid', id));
      Alert.alert('Sucesso', 'Jogador excluído com sucesso!');
      buscarDados(); 
    } catch (error) {
      console.error('Erro ao excluir jogador:', error);
      Alert.alert('Erro', 'Não foi possível excluir o jogador.');
    }
  };

  const salvarJogador = async () => {
    try {
      const [day, month, year] = nascimento.split('/');
      const nascimentoDate = new Date(`${year}-${month}-${day}T00:00:00`);
      const nascimentoTimestamp = Timestamp.fromDate(nascimentoDate);

      if (jogadorAtual) {
        const jogadorRef = doc(db, 'real-madrid', jogadorAtual.id);
        await updateDoc(jogadorRef, {
          nome,
          altura: parseFloat(altura),
          camisa,
          nascimento: nascimentoTimestamp,
        });
        alert('Sucesso', 'Jogador atualizado com sucesso!');
      } else {
        await addDoc(collection(db, 'real-madrid'), {
          nome,
          altura: parseFloat(altura),
          camisa,
          nascimento: nascimentoTimestamp,
        });
        alert('Sucesso', 'Jogador adicionado com sucesso!');
      }

      buscarDados(); 

      
      setJogadorAtual(null);
      setNome('');
      setAltura('');
      setCamisa('');
      setNascimento('');
      setModalVisible(false);
    } catch (error) {
      console.error('Erro ao salvar jogador:', error);
      alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.info}>Altura: {item.altura}m</Text>
      <Text style={styles.info}>Camisa: {item.camisa}</Text>
      <Text style={styles.info}>
        Nascimento: {format(item.nascimento.toDate(), 'dd MMM yyyy', { locale: ptBR })}
      </Text>
      <View style={styles.botoes}>
        <TouchableOpacity onPress={() => editarJogador(item)} style={styles.botaoEditar}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => excluirJogador(item.id)} style={styles.botaoExcluir}>
          <Text style={styles.textoBotao}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/backgroundpaginic.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.titulo}>Elenco Real Madrid</Text>
        <FlatList
          data={dados}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.botaoAdicionar}>
          <Text style={[styles.textoBotao, { color: 'black' }]}>Adicionar Jogador</Text>
        </TouchableOpacity>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
              <TextInput placeholder="Altura (ex: 1.82)" value={altura} onChangeText={setAltura} keyboardType="numeric" style={styles.input} />
              <TextInput placeholder="Número da Camisa" value={camisa} onChangeText={setCamisa} style={styles.input} />
              <TextInput placeholder="Nascimento (dd/mm/aaaa)" value={nascimento} onChangeText={setNascimento} style={styles.input} />
              <TouchableOpacity onPress={salvarJogador} style={styles.botaoSalvar}>
                <Text style={styles.textoBotao}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.botaoCancelar}>
                <Text style={styles.textoBotao}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity 
          style={styles.buttonSecondary} 
          onPress={() => navigation.navigate('PaginaPrincipal')} 
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, { color: 'black' }]}>
            Voltar para a página principal
          </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: 'rgba(10, 20, 40, 0.85)',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  info: {
    fontSize: 16,
    color: '#EEEEEE',
  },
  textoBotao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  item: {
    backgroundColor: 'rgba(255, 255, 255, 0.28)',
    padding: 20,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  botaoEditar: {
    backgroundColor: 'rgba(14, 35, 73, 0.85)',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginRight: 6,
  },
  botaoExcluir: {
    backgroundColor: 'rgba(14, 35, 73, 0.85)',
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginLeft: 6,
  },
  botaoAdicionar: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 24,
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  botaoSalvar: {
    backgroundColor: 'rgba(14, 35, 73, 0.85)',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: 'rgba(14, 35, 73, 0.85)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
});