import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';  // Para navegação


export default function Cadastro() {
    // Funções de armazenamento para obter, salvar e remover itens do AsyncStorage
async function obterItem(chave) {
    try {
      const tokens = await AsyncStorage.getItem(chave);
      return JSON.parse(tokens) || []; // Retorna um array vazio se não houver nada
    } catch (erro) {
      Alert.alert('Erro ao obter itens', erro.message);
      return [];
    }
  }
  
  async function salvarItem(chave, valor) {
    try {
      let tokens = await obterItem(chave);
      tokens.push(valor); // Adiciona o novo item à lista existente
      await AsyncStorage.setItem(chave, JSON.stringify(tokens));
    } catch (erro) {
      Alert.alert('Erro ao salvar item', erro.message);
    }
  }
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation();

  const handleCadastro = async () => {
    if (nome === '' || email === '' || senha === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Criando um objeto com os dados do usuário
    const usuario = {
      nome,
      email,
      senha,
    };

    try {
      // Salvando os dados do usuário no AsyncStorage
      await salvarItem('usuarios', usuario);
      
      // Exibe o alert com um callback para a navegação
      Alert.alert('Cadastro realizado', 'Você foi cadastrado com sucesso!', [
        {
          text: 'OK',
          onPress: () => {
            // Navega para a tela de login (Acesso)
            navigation.navigate('Acesso'); 
          }
        },
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as informações.');
    }
  };

  const BotaoVoltar = () => {
    navigation.goBack(); // Isso retorna para a tela anterior (Acesso)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={BotaoVoltar}>
        <Text style={styles.buttonText}>Voltar para o Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#880000',
    width: '100%',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
