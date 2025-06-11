import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { livrosAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const AddBookScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    autor: '',
    imagem: '',
    tipo: 'manual',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.titulo.trim()) {
      Alert.alert('Erro', 'O título é obrigatório');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await livrosAPI.cadastrar(formData);
      
      Alert.alert(
        'Sucesso',
        'Livro cadastrado com sucesso!',
        [
          {
            text: 'Ver Livros',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: 'Cadastrar Outro',
            onPress: () => {
              setFormData({
                titulo: '',
                descricao: '',
                autor: '',
                imagem: '',
                tipo: 'manual',
              });
            },
            style: 'cancel',
          },
        ]
      );
    } catch (error) {
      const errorMessage = error.response?.data?.erro || 'Erro ao cadastrar livro';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>📖 Cadastrar Livro</Text>
          <Text style={styles.subtitle}>
            Adicione um livro manualmente à biblioteca
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={formData.titulo}
            onChangeText={(value) => handleInputChange('titulo', value)}
            placeholder="Digite o título do livro"
          />

          <Text style={styles.label}>Autor</Text>
          <TextInput
            style={styles.input}
            value={formData.autor}
            onChangeText={(value) => handleInputChange('autor', value)}
            placeholder="Digite o nome do autor"
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={formData.descricao}
            onChangeText={(value) => handleInputChange('descricao', value)}
            placeholder="Digite uma descrição do livro"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>URL da Imagem</Text>
          <TextInput
            style={styles.input}
            value={formData.imagem}
            onChangeText={(value) => handleInputChange('imagem', value)}
            placeholder="https://exemplo.com/imagem.jpg"
            keyboardType="url"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Dica: Você pode encontrar URLs de imagens de livros no Google Imagens ou sites de livrarias
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Cadastrar Livro</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#f9fafb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  infoBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#1e40af',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddBookScreen;