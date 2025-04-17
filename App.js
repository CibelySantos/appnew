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

const Stack = createNativeStackNavigator();

const app = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="RealizarLogin" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="RealizarLogin" component={RealizarLogin} />
      <Stack.Screen name="PaginaPrincipal" component={PaginaPrincipal} />
      <Stack.Screen name="EditarPerfil" component={EditarPerfil} />
      <Stack.Screen name="SobreNos" component={SobreNos} />
      <Stack.Screen name="AcenderLampada" component={AcenderLampada} />
      <Stack.Screen name="ListarJogadores" component={ListarJogadores} />
      <Stack.Screen name="CalcularIMC" component={CalcularIMC} />
      <Stack.Screen name="UploadImag" component={UploadImag} />
      <Stack.Screen name="ListarImag" component={ListarImag} />
      <Stack.Screen name="UploadVideo" component={UploadVideo} />
      <Stack.Screen name="listarVideo" component={listarVideo} />
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default app;
