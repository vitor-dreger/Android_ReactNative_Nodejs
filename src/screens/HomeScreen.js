import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { livrosAPI } from '../services/api';
import BookCard from '../components/BookCard';
import LoadingSpinner from '../components/LoadingSpinner';

const HomeScreen = ({ navigation }) => {
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({
    titulo: '',
    autor: '',
    tipo: '',
    meusLivros: false,
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    paginas: 0,
  });

  const fetchLivros = useCallback(async (page = 1, isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else if (page === 1) {
        setLoading(true);
      }

      const params = {
        page,
        limit: pagination.limit,
        ...filters,
      };

      // Remove filtros vazios
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === false) {
          delete params[key];
        }
      });

      const response = await livrosAPI.listar(params);
      const { livros: novosLivros, total, paginas } = response.data;

      if (page === 1) {
        setLivros(novosLivros);
      } else {
        setLivros(prev => [...prev, ...novosLivros]);
      }

      setPagination(prev => ({
        ...prev,
        page,
        total,
        paginas,
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os livros');
      console.error('Erro ao buscar livros:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [filters, pagination.limit]);

  useEffect(() => {
    fetchLivros(1);
  }, [filters]);

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      titulo: searchText,
    }));
  };

  const handleFilterToggle = (filterType) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const handleLoadMore = () => {
    if (pagination.page < pagination.paginas && !loading) {
      fetchLivros(pagination.page + 1);
    }
  };

  const handleBookPress = (book) => {
    navigation.navigate('BookDetails', { book });
  };

  const onRefresh = () => {
    fetchLivros(1, true);
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>📚 Leia Comigo</Text>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Buscar por título..."
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filters.meusLivros && styles.filterButtonActive
          ]}
          onPress={() => handleFilterToggle('meusLivros')}
        >
          <Text style={[
            styles.filterButtonText,
            filters.meusLivros && styles.filterButtonTextActive
          ]}>
            Meus Livros
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {pagination.total} livros encontrados
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    if (pagination.page >= pagination.paginas) return null;
    
    return (
      <TouchableOpacity style={styles.loadMoreButton} onPress={handleLoadMore}>
        <Text style={styles.loadMoreText}>Carregar mais</Text>
      </TouchableOpacity>
    );
  };

  if (loading && livros.length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={livros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <BookCard book={item} onPress={handleBookPress} />
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 48,
  },
  searchButtonText: {
    fontSize: 18,
  },
  filtersContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  statsContainer: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    color: '#64748b',
  },
  loadMoreButton: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  loadMoreText: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HomeScreen;