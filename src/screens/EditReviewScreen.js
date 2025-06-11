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
import { avaliacoesAPI } from '../services/api';
import RatingStars from '../components/RatingStars';
import LoadingSpinner from '../components/LoadingSpinner';

const EditReviewScreen = ({ route, navigation }) => {
  const { book, avaliacao } = route.params;
  const [nota, setNota] = useState(avaliacao.nota);
  const [comentario, setComentario] = useState(avaliacao.comentario || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nota === 0) {
      Alert.alert('Erro', 'Por favor, selecione uma nota de 1 a 5 estrelas');
      return;
    }

    setLoading(true);
    try {
      await avaliacoesAPI.atualizar(avaliacao.id, {
        nota,
        comentario: comentario.trim(),
      });

      Alert.alert(
        'Sucesso',
        'Avaliação atualizada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      const errorMessage = error.response?.data?.erro || 'Erro ao atualizar avaliação';
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
          <Text style={styles.title}>✏️ Editar Avaliação</Text>
          <Text style={styles.bookTitle}>{book.titulo}</Text>
          {book.autor && (
            <Text style={styles.bookAuthor}>{book.autor}</Text>
          )}
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Sua nota *</Text>
          <View style={styles.ratingContainer}>
            <RatingStars
              rating={nota}
              onRatingChange={setNota}
              editable={true}
              size={32}
            />
            <Text style={styles.ratingText}>
              {nota > 0 ? `${nota} estrela${nota > 1 ? 's' : ''}` : 'Toque para avaliar'}
            </Text>
          </View>

          <Text style={styles.label}>Comentário (opcional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comentario}
            onChangeText={setComentario}
            placeholder="Compartilhe sua opinião sobre o livro..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Atualizar Avaliação</Text>
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
    marginBottom: 16,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
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
    marginBottom: 12,
  },
  ratingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 20,
  },
  ratingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#f9fafb',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#f59e0b',
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

export default EditReviewScreen;