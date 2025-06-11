import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { avaliacoesAPI } from '../services/api';
import RatingStars from '../components/RatingStars';
import LoadingSpinner from '../components/LoadingSpinner';

const BookDetailsScreen = ({ route, navigation }) => {
  const { book } = route.params;
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAvaliacoes = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await avaliacoesAPI.listar(book.id);
      setAvaliacoes(response.data);
    } catch (error) {
      if (error.response?.status !== 404) {
        Alert.alert('Erro', 'Não foi possível carregar as avaliações');
      }
      setAvaliacoes([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAvaliacoes();
  }, [book.id]);

  const handleAddReview = () => {
    navigation.navigate('AddReview', { book });
  };

  const handleEditReview = (avaliacao) => {
    navigation.navigate('EditReview', { book, avaliacao });
  };

  const handleDeleteReview = async (avaliacaoId) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta avaliação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await avaliacoesAPI.excluir(avaliacaoId);
              Alert.alert('Sucesso', 'Avaliação excluída com sucesso');
              fetchAvaliacoes();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a avaliação');
            }
          },
        },
      ]
    );
  };

  const onRefresh = () => {
    fetchAvaliacoes(true);
  };

  const calculateAverageRating = () => {
    if (avaliacoes.length === 0) return 0;
    const sum = avaliacoes.reduce((acc, avaliacao) => acc + avaliacao.nota, 0);
    return (sum / avaliacoes.length).toFixed(1);
  };

  const renderAvaliacao = (avaliacao, index) => (
    <View key={index} style={styles.avaliacaoCard}>
      <View style={styles.avaliacaoHeader}>
        <RatingStars rating={avaliacao.nota} size={16} />
        <View style={styles.avaliacaoActions}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => handleEditReview(avaliacao)}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteReview(avaliacao.id)}
          >
            <Text style={styles.deleteButtonText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {avaliacao.comentario && (
        <Text style={styles.avaliacaoComentario}>{avaliacao.comentario}</Text>
      )}
      
      <Text style={styles.avaliacaoData}>
        {new Date(avaliacao.createdAt).toLocaleDateString('pt-BR')}
      </Text>
    </View>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.bookHeader}>
        <View style={styles.imageContainer}>
          {book.imagem ? (
            <Image source={{ uri: book.imagem }} style={styles.bookImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>📚</Text>
            </View>
          )}
        </View>
        
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{book.titulo}</Text>
          
          {book.autor && (
            <Text style={styles.bookAuthor}>{book.autor}</Text>
          )}
          
          <View style={styles.typeContainer}>
            <Text style={[
              styles.typeTag,
              book.tipo === 'api' ? styles.apiTag : styles.manualTag
            ]}>
              {book.tipo === 'api' ? 'Google Books' : 'Manual'}
            </Text>
          </View>
          
          {avaliacoes.length > 0 && (
            <View style={styles.ratingContainer}>
              <RatingStars rating={Math.round(calculateAverageRating())} size={20} />
              <Text style={styles.ratingText}>
                {calculateAverageRating()} ({avaliacoes.length} avaliações)
              </Text>
            </View>
          )}
        </View>
      </View>

      {book.descricao && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.description}>{book.descricao}</Text>
        </View>
      )}

      <View style={styles.reviewsSection}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>
            Avaliações ({avaliacoes.length})
          </Text>
          <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
            <Text style={styles.addReviewButtonText}>+ Avaliar</Text>
          </TouchableOpacity>
        </View>

        {avaliacoes.length === 0 ? (
          <View style={styles.noReviewsContainer}>
            <Text style={styles.noReviewsText}>
              Nenhuma avaliação ainda. Seja o primeiro a avaliar!
            </Text>
          </View>
        ) : (
          <View style={styles.avaliacoesList}>
            {avaliacoes.map(renderAvaliacao)}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  bookHeader: {
    backgroundColor: '#ffffff',
    padding: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  imageContainer: {
    marginRight: 20,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  bookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#64748b',
    marginBottom: 12,
  },
  typeContainer: {
    marginBottom: 12,
  },
  typeTag: {
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    fontWeight: '500',
  },
  apiTag: {
    backgroundColor: '#dbeafe',
    color: '#2563eb',
  },
  manualTag: {
    backgroundColor: '#dcfce7',
    color: '#16a34a',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#64748b',
  },
  descriptionContainer: {
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  reviewsSection: {
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
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addReviewButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addReviewButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  noReviewsContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  noReviewsText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  avaliacoesList: {
    gap: 12,
  },
  avaliacaoCard: {
    backgroundColor: '#f8fafc',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  avaliacaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  avaliacaoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 4,
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 4,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  avaliacaoComentario: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 18,
  },
  avaliacaoData: {
    fontSize: 12,
    color: '#9ca3af',
  },
});

export default BookDetailsScreen;