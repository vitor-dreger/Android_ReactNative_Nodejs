import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    renda: '',
    pessoasMorando: '',
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const { nome, email, senha, confirmarSenha, renda, pessoasMorando } = formData;

    if (!nome || !email || !senha || !confirmarSenha || !renda || !pessoasMorando) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return false;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    const rendaNum = parseFloat(renda);
    const pessoasNum = parseInt(pessoasMorando);

    if (isNaN(rendaNum) || rendaNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira uma renda válida');
      return false;
    }

    if (isNaN(pessoasNum) || pessoasNum <= 0) {
      Alert.alert('Erro', 'Por favor, insira um número válido de pessoas');
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    const { confirmarSenha, ...userData } = formData;
    userData.renda = parseFloat(userData.renda);
    userData.pessoasMorando = parseInt(userData.pessoasMorando);

    const result = await signUp(userData);
    setLoading(false);

    if (result.success) {
      Alert.alert(
        'Sucesso',
        'Cadastro realizado com sucesso! Faça login para continuar.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Erro', result.error);
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
          <Text style={styles.title}>Cadastro</Text>
          <Text style={styles.subtitle}>
            Junte-se à nossa biblioteca social
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo</Text>
          <TextInput
            style={styles.input}
            value={formData.nome}
            onChangeText={(value) => handleInputChange('nome', value)}
            placeholder="Digite seu nome completo"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            placeholder="Digite seu email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={formData.senha}
            onChangeText={(value) => handleInputChange('senha', value)}
            placeholder="Digite sua senha"
            secureTextEntry
          />

          <Text style={styles.label}>Confirmar senha</Text>
          <TextInput
            style={styles.input}
            value={formData.confirmarSenha}
            onChangeText={(value) => handleInputChange('confirmarSenha', value)}
            placeholder="Confirme sua senha"
            secureTextEntry
          />

          <Text style={styles.label}>Renda familiar (R$)</Text>
          <TextInput
            style={styles.input}
            value={formData.renda}
            onChangeText={(value) => handleInputChange('renda', value)}
            placeholder="Digite sua renda familiar"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Pessoas morando na casa</Text>
          <TextInput
            style={styles.input}
            value={formData.pessoasMorando}
            onChangeText={(value) => handleInputChange('pessoasMorando', value)}
            placeholder="Número de pessoas"
            keyboardType="numeric"
          />

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 Nossa plataforma é voltada para pessoas com renda per capita até R$ 1.500
            </Text>
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText}>
              Já tem conta? Faça login
            </Text>
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
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
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
  registerButton: {
    backgroundColor: '#16a34a',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default RegisterScreen;