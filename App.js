import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RealizarLogin from './src/screens/realizarLogin';
import PaginaPrincipal from './src/screens/paginaPrincipal';
import EditarPerfil from './src/screens/editarPerfil';
import SobreNos from './src/screens/sobreNos';
import AcenderLampada from './src/screens/acenderLampada';
import ListarJogadores from './src/screens/listarJogadores';
import CalcularIMC from './src/screens/calcularIMC';
import UploadImag from './src/screens/uploadImag';
import ListarImag from './src/screens/listarImag';
import UploadVideo from './src/screens/uploadVideos';  
import listarVideo from './src/screens/listaVideo';  
import CadastroUsuario from './src/screens/cadastroUsuario';
import SplashScreen from './src/screens/splashScreen';
import Server from './src/screens/server';
import ChatScreen from './src/screens/chatScreen';
import Post from './src/screens/post';

const Stack = createNativeStackNavigator();

const app = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen" options={{ headerShown: false }}>
      <Stack.Screen name="RealizarLogin" component={RealizarLogin} options={{ headerShown: false }}/>
      <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} options={{ headerShown: false }}/>
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }}/>
      <Stack.Screen name="SobreNos" component={SobreNos} options={{ headerShown: false }}/>
      <Stack.Screen name="AcenderLampada" component={AcenderLampada} options={{ headerShown: false }}/>
      <Stack.Screen name="ListarJogadores" component={ListarJogadores} options={{ headerShown: false }}/>
      <Stack.Screen name="CalcularIMC" component={CalcularIMC} options={{ headerShown: false }}/>
      <Stack.Screen name="UploadImag" component={UploadImag} options={{ headerShown: false }}/>
      <Stack.Screen name="ListarImag" component={ListarImag} options={{ headerShown: false }} />
      <Stack.Screen name="UploadVideo" component={UploadVideo} options={{ headerShown: false }}/>
      <Stack.Screen name="listarVideo" component={listarVideo} options={{ headerShown: false }}/>
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false }}/>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Server" component={Server} options={{ headerShown: false }} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Post" component={Post} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default app;
