import React, { useState, useEffect } from 'react';
import { View, Button, Image, TextInput, Text, ActivityIndicator, Alert, FlatList, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import s3 from '../../awsConfig';

const bucket = "bucket-storage-senai-19";

export default function PostagemScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false); // controle do menu

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permissão necessária", "Precisamos da permissão para acessar suas imagens.");
      }
    };
    requestPermissions();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("Erro", "Por favor, selecione uma imagem antes de tentar fazer o upload.");
      return;
    }

    setUploading(true);
    const response = await fetch(image);
    const blob = await response.blob();

    const filename = `imagens/${Date.now()}.jpg`;

    const params = {
      Key: filename,
      Bucket: bucket,
      Body: blob,
      ContentType: 'image/jpeg',
      ACL: 'public-read',
    };

    s3.upload(params, (err, data) => {
      setUploading(false);
      if (err) {
        Alert.alert("Erro ao fazer upload", "Houve um erro ao tentar fazer o upload da imagem.");
        console.log(err);
      } else {
        Alert.alert("Upload realizado", "A imagem foi carregada com sucesso!");
        createPost(data.Location);
      }
    });
  };

  const createPost = (imageUrl) => {
    const newPost = {
      id: Date.now().toString(),
      text: text,
      imageUrl: imageUrl || '',
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setText('');
    setImage(null);
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    }));
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#f5f5f5' }}>
      <TouchableOpacity
        onPress={() => setMenuVisible(!menuVisible)}
        style={{ padding: 10, backgroundColor: '#ccc', borderRadius: 5, marginBottom: 10 }}
      >
        <Text>{menuVisible ? 'Fechar Menu ▲' : 'Abrir Menu ▼'}</Text>
      </TouchableOpacity>

      {menuVisible && (
        <View style={{ marginBottom: 20 }}>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              marginBottom: 10,
              borderRadius: 5,
              backgroundColor: '#fff'
            }}
            placeholder="Escreva algo..."
            value={text}
            onChangeText={setText}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
            <TouchableOpacity onPress={pickImage} style={{ backgroundColor: '#ddd', padding: 8, borderRadius: 5 }}>
              <Text>Selecionar Imagem</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={uploadImage} style={{ backgroundColor: '#ffa500', padding: 8, borderRadius: 5 }}>
              <Text>Fazer Upload</Text>
            </TouchableOpacity>
          </View>
          {image && <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginTop: 10, borderRadius: 5 }} />}
          {uploading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 10 }} />}
        </View>
      )}

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 16, padding: 10, backgroundColor: '#fff', borderRadius: 5 }}>
            {item.imageUrl ? <Image source={{ uri: item.imageUrl }} style={{ width: '100%', height: 200, borderRadius: 5 }} /> : null}
            <Text style={{ marginVertical: 10 }}>{item.text}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => handleLike(item.id)} style={{ padding: 6, backgroundColor: '#e0e0e0', borderRadius: 5 }}>
                <Text>Curtir ({item.likes})</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  const comment = prompt("Digite seu comentário:");
                  if (comment) handleComment(item.id, comment);
                }}
                style={{ padding: 6, backgroundColor: '#e0e0e0', borderRadius: 5 }}
              >
                <Text>Comentar</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={item.comments}
              keyExtractor={(index) => index.toString()}
              renderItem={({ item: comment }) => <Text style={{ marginTop: 5, color: '#555' }}>• {comment}</Text>}
            />
          </View>
        )}
      />
    </View>
  );
}
