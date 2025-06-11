# 📚 Leia Comigo - React Native App

Aplicativo móvel da biblioteca social "Leia Comigo", desenvolvido em React Native para consumir a API backend Node.js.

## 🚀 Funcionalidades

- **Autenticação JWT**: Login e cadastro de usuários com validação de renda per capita
- **Biblioteca de Livros**: Listagem com filtros por título, autor, tipo e "meus livros"
- **Busca Google Books**: Integração com API do Google Books para buscar e salvar livros
- **Cadastro Manual**: Adicionar livros manualmente à biblioteca
- **Sistema de Avaliações**: Avaliar livros com estrelas e comentários
- **Gerenciamento de Reviews**: Editar e excluir suas próprias avaliações
- **Interface Responsiva**: Design moderno com navegação por abas

## 🛠️ Tecnologias

- **React Native 0.72.6**
- **React Navigation 6** (Stack + Bottom Tabs)
- **Axios** para requisições HTTP
- **AsyncStorage** para persistência local
- **Context API** para gerenciamento de estado
- **JWT** para autenticação

## 📱 Estrutura do App

### Telas de Autenticação
- **LoginScreen**: Login com email e senha
- **RegisterScreen**: Cadastro com validação de renda per capita

### Telas Principais
- **HomeScreen**: Lista de livros com filtros e busca
- **SearchBooksScreen**: Buscar livros na API do Google Books
- **AddBookScreen**: Cadastrar livros manualmente
- **BookDetailsScreen**: Detalhes do livro com avaliações
- **AddReviewScreen**: Avaliar um livro
- **EditReviewScreen**: Editar avaliação existente
- **ProfileScreen**: Perfil do usuário e logout

### Componentes Reutilizáveis
- **BookCard**: Card de livro para listagens
- **RatingStars**: Componente de estrelas para avaliações
- **LoadingSpinner**: Indicador de carregamento

## 🔧 Configuração

### Pré-requisitos
- Node.js 16+
- React Native CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd leia-comigo-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure o backend**
   - Certifique-se de que o backend está rodando em `http://localhost:5000`
   - Ajuste a URL da API em `src/services/api.js` se necessário

4. **Para Android**
```bash
npx react-native run-android
```

5. **Para iOS**
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## 📡 Integração com Backend

O app consome as seguintes rotas da API:

### Autenticação
- `POST /usuarios/cadastrar-usuario` - Cadastro
- `POST /usuarios/login` - Login

### Livros
- `GET /livros/listar` - Listar com filtros e paginação
- `POST /livros/cadastrar` - Cadastrar livro manual
- `POST /livros/salvar-livros` - Buscar e salvar do Google Books

### Avaliações
- `GET /avaliacoes/:id_livro` - Listar avaliações
- `POST /avaliacoes/cadastrar` - Criar avaliação
- `PUT /avaliacoes/atualizar/:id` - Atualizar avaliação
- `DELETE /avaliacoes/excluir/:id` - Excluir avaliação

## 🔐 Autenticação

- Token JWT armazenado no AsyncStorage
- Interceptor Axios adiciona token automaticamente
- Logout automático em caso de token inválido
- Validação de renda per capita no cadastro

## 🎨 Design

- **Cores principais**: Azul (#2563eb), Verde (#16a34a), Amarelo (#fbbf24)
- **Tipografia**: Sistema padrão com pesos variados
- **Componentes**: Cards com sombras, botões arredondados
- **Navegação**: Bottom tabs com ícones emoji
- **Estados**: Loading spinners e mensagens de erro/sucesso

## 📱 Navegação

```
AuthStack (não logado)
├── LoginScreen
└── RegisterScreen

MainTabs (logado)
├── HomeTab
│   ├── HomeScreen
│   ├── BookDetailsScreen
│   ├── AddReviewScreen
│   └── EditReviewScreen
├── SearchTab
│   └── SearchBooksScreen
├── AddBookTab
│   └── AddBookScreen
└── ProfileTab
    └── ProfileScreen
```

## 🚀 Como Usar

1. **Cadastre-se** com renda per capita até R$ 1.500
2. **Faça login** com suas credenciais
3. **Explore livros** na tela inicial
4. **Busque novos livros** na API do Google Books
5. **Cadastre livros** manualmente se desejar
6. **Avalie livros** que você conhece
7. **Filtre** por "Meus Livros" para ver apenas os seus

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.