import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

// Auth Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/HomeScreen';
import SearchBooksScreen from '../screens/SearchBooksScreen';
import AddBookScreen from '../screens/AddBookScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen';
import AddReviewScreen from '../screens/AddReviewScreen';
import EditReviewScreen from '../screens/EditReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2563eb',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Login" 
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{ title: 'Cadastro' }}
    />
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2563eb',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ title: 'Biblioteca' }}
    />
    <Stack.Screen 
      name="BookDetails" 
      component={BookDetailsScreen}
      options={{ title: 'Detalhes do Livro' }}
    />
    <Stack.Screen 
      name="AddReview" 
      component={AddReviewScreen}
      options={{ title: 'Avaliar Livro' }}
    />
    <Stack.Screen 
      name="EditReview" 
      component={EditReviewScreen}
      options={{ title: 'Editar Avaliação' }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2563eb',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="SearchBooks" 
      component={SearchBooksScreen}
      options={{ title: 'Buscar Livros' }}
    />
  </Stack.Navigator>
);

const AddBookStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2563eb',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="AddBook" 
      component={AddBookScreen}
      options={{ title: 'Cadastrar Livro' }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2563eb',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: 'Perfil' }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#2563eb',
      tabBarInactiveTintColor: '#64748b',
      tabBarStyle: {
        backgroundColor: '#ffffff',
        borderTopColor: '#e2e8f0',
        paddingBottom: 5,
        paddingTop: 5,
        height: 60,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        fontWeight: '500',
      },
      headerShown: false,
    }}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeStack}
      options={{
        title: 'Biblioteca',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>📚</Text>
        ),
      }}
    />
    <Tab.Screen 
      name="SearchTab" 
      component={SearchStack}
      options={{
        title: 'Buscar',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>🔍</Text>
        ),
      }}
    />
    <Tab.Screen 
      name="AddBookTab" 
      component={AddBookStack}
      options={{
        title: 'Cadastrar',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>➕</Text>
        ),
      }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileStack}
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color }) => (
          <Text style={{ fontSize: 20, color }}>👤</Text>
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <NavigationContainer>
      {signed ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;