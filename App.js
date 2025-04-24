import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RealizarLogin from './src/screens/realizarLogin';
import PaginaPrincipal from './src/screens/paginaPrincipal';
import EditarPerfil from './src/screens/editarPerfil';
import CadastroUsuario from './src/screens/cadastroUsuario';
import SplashScreen from './src/screens/splashScreen';
import ChatScreen from './src/screens/chatScreen';
import Chat from './src/screens/chat';
import Post from './src/screens/post';

const Stack = createNativeStackNavigator();

const app = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen" options={{ headerShown: false }}>
      <Stack.Screen name="RealizarLogin" component={RealizarLogin} options={{ headerShown: false }}/>
      <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} options={{ headerShown: false }}/>
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false }}/>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
      <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default app;
