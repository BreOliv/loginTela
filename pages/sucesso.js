import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { Ionicons } from '@expo/vector-icons';


export default function Sucesso() {
      const navigation = useNavigation();
    
  return (
    <View style={styles.container}>
      <Text style={styles.successMessage}>Seu login foi feito com sucesso!</Text>
                    <TouchableOpacity 
                      onPress={() => navigation.navigate('Bem_Vindo')}
                      style={{ padding: 10, backgroundColor: '#880000', borderRadius: 5, marginTop:20, alignItems: 'center' }}>
                      <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  successMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#008000', // Cor verde para sucesso
  },
});