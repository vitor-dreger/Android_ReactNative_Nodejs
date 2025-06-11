import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { livrosAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchBooksScreen = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      Alert.alert('Erro', 'Por favor, digite um termo para buscar');
      return;
    }

    setLoading(true);
    try {
      const response = await livrosAPI.salvarLivros(searchTerm.trim());
      
      Alert.alert(
        'Sucesso',
        `Livros sobre "${searchTerm}" foram salvos com sucesso!`,
        [
          {
            text: 'Ver Livros',
            onPress: () => navigation.navigate('Home'),
          },
          {
            text: 'Buscar Mais',
            style: 'cancel',
          },
        ]
      );
      
      setSearchTerm('');
    } catch (error) {
      const errorMessage = error.response?.data?.erro || 'Erro ao buscar livros';
      Alert.alert('Erro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const suggestedTerms = [
    'JavaScript',
    'React Native',
    'Python',
    'Machine Learning',
    'Harry Potter',
    'Romance',
    'Ficção Científica',
    'História',
    'Biografia',
    'Autoajuda',
  ];

  const handleSuggestionPress = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
        <Text style={styles.loadingText}>
          Buscando livros na API do Google Books...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Buscar Livros</Text>
        <Text style={styles.subtitle}>
          Encontre livros na API do Google Books
        </Text>
      </View>

      <View style={styles.searchSection}>
        <Text style={styles.label}>Termo de busca</Text>
        <TextInput
          style={styles.input}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Digite o título, autor ou assunto..."
          onSubmitEditing={handleSearch}
        />

        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Buscar e Salvar Livros</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.suggestionsSection}>
        <Text style={styles.suggestionsTitle}>Sugestões populares:</Text>
        <View style={styles.suggestionsContainer}>
          {suggestedTerms.map((term, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionTag}
              onPress={() => handleSuggestionPress(term)}
            >
              <Text style={styles.suggestionText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Como funciona?</Text>
        <Text style={styles.infoText}>
          • Digite um termo de busca (título, autor, assunto)
        </Text>
        <Text style={styles.infoText}>
          • Os livros encontrados serão salvos automaticamente
        </Text>
        <Text style={styles.infoText}>
          • Você poderá vê-los na tela inicial
        </Text>
        <Text style={styles.infoText}>
          • Avalie e comente os livros que conhece
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  header: {
    padding: 20,
    alignItems: 'center',
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
  searchSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
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
  searchButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  suggestionsSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  suggestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  suggestionTag: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    margin: 4,
  },
  suggestionText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  infoSection: {
    backgroundColor: '#ffffff',
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default SearchBooksScreen;