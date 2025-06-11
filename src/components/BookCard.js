import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const BookCard = ({ book, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(book)}>
      <View style={styles.imageContainer}>
        {book.imagem ? (
          <Image source={{ uri: book.imagem }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>📚</Text>
          </View>
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.titulo}
        </Text>
        
        <Text style={styles.author} numberOfLines={1}>
          {book.autor || 'Autor desconhecido'}
        </Text>
        
        <View style={styles.typeContainer}>
          <Text style={[
            styles.typeTag,
            book.tipo === 'api' ? styles.apiTag : styles.manualTag
          ]}>
            {book.tipo === 'api' ? 'Google Books' : 'Manual'}
          </Text>
        </View>
        
        {book.descricao && (
          <Text style={styles.description} numberOfLines={3}>
            {book.descricao}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginRight: 16,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  typeContainer: {
    marginBottom: 8,
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
  description: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
  },
});

export default BookCard;