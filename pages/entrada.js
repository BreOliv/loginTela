import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import React, { useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 
import { useFonts } from "expo-font";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando o AsyncStorage
import { StatusBar } from 'expo-status-bar';

export default function Acesso() {
  // Declarando o estado para e-mail, senha e loading
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  // Função para obter os itens do AsyncStorage
  async function obterItem(chave) {
    try {
      const tokens = await AsyncStorage.getItem(chave);
      return JSON.parse(tokens) || []; // Retorna um array vazio se não houver nada
    } catch (erro) {
      Alert.alert('Erro ao obter itens', erro.message);
      return [];
    }
  }

  const handleLogin = async () => {
    if (email === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setIsLoading(true);
  
    try {
      // Obtém a lista de usuários cadastrados
      const usuarios = await obterItem('usuarios');
    
      // Verifica se existe um usuário com o mesmo e-mail e senha
      const usuario = usuarios.find(user => user.email === email && user.senha === senha);
    
      if (usuario) {
        // Login bem-sucedido
        setIsLoading(false);
        navigation.navigate('Sucesso');
      } else {
        // Login falhou
        setIsLoading(false);
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Erro', 'Não foi possível verificar as informações.');
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <StatusBar style="light"/>
          <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
            <Text style={styles.message}>Bem-vindo(a)</Text>
          </Animatable.View>
          <View style={styles.containerForm}>
            <Text style={styles.title}>
              E-mail
            </Text>
            <TextInput
              placeholder='Digite um email...'
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder='Sua senha'
              style={styles.input}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>             
              <Text style={styles.buttonText}>
                {isLoading ? 'Acessando...' : 'Acessar'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRegister}
              onPress={() => navigation.navigate('Cadastro')}>
              <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={navigation.goBack} 
              style={{ padding: 10, backgroundColor: '#880000', borderRadius: 5, marginTop:400, alignItems: 'center' }}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#880000",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontFamily: "Oswald",
    color: "#FFF",
  },
  containerForm: {
    backgroundColor: "#FFF",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#880000",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
});
