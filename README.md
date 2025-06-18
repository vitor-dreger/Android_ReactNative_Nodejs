# 📚 Leia Comigo - Biblioteca Social

Projeto completo da biblioteca social **Leia Comigo**, com frontend em React Native e backend em Node.js + MySQL.

-----

## 🧩 Tecnologias Utilizadas

### 📱 Frontend (React Native)

  - **React Native 0.72.6**
  - **React Navigation 6** (Stack + Bottom Tabs)
  - **Axios** para requisições HTTP
  - **AsyncStorage** para persistência local
  - **Context API** para gerenciamento de estado
  - **JWT** para autenticação

### 🌐 Backend (Node.js)

  - **Node.js**
  - **Express**
  - **Sequelize (ORM)** + **MySQL**
  - **dotenv**
  - **bcrypt** para senhas
  - **jsonwebtoken** para autenticação JWT
  - **Google Books API** para integração externa
  - **swagger-jsdoc** e **swagger-ui-express** para documentação de API

-----

## 🚀 Funcionalidades

### 👤 Usuários

  - Cadastro e login com autenticação JWT
  - Validação de **renda per capita (≤ R$ 1.500)** no cadastro
  - Logout automático se o token expirar

### 📚 Livros

  - Listagem de livros com filtros (título, autor, tipo, "meus livros")
  - Cadastro manual de livros
  - Integração com a **Google Books API** para busca e salvamento
  - Relacionamento com o usuário que cadastrou

### ⭐ Avaliações

  - Avaliar livros com estrelas e comentários
  - Editar e excluir avaliações próprias

-----

## 🛠️ Instalação e Execução

### 🔧 Backend

1.  **Clone o repositório**

<!-- end list -->

```bash
git clone <url-backend>
cd leia-comigo-backend
```

2.  **Configure o arquivo `.env`**

<!-- end list -->

```
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
GOOGLE_BOOKS_API_KEY=sua_api_key
JWT_SECRET=sua_chave_jwt
```

3.  **Instale as dependências**

<!-- end list -->

```bash
npm install
```

4.  **Inicie o servidor**

<!-- end list -->

```bash
node server.js
```

5.  **Acesse a Documentação**
    Após iniciar, a documentação interativa da API estará disponível em:
    **[http://localhost:5000/api-docs](https://www.google.com/search?q=http://localhost:5000/api-docs)** 🚀

### 📲 Frontend

1.  **Clone o repositório**

<!-- end list -->

```bash
git clone <url-frontend>
cd leia-comigo-app
```

2.  **Instale as dependências**

<!-- end list -->

```bash
npm install
```

3.  **Configure o backend em `src/services/api.js`**

<!-- end list -->

```js
const api = axios.create({
  baseURL: 'http://localhost:5000'
});
```

4.  **Execute o app**

<!-- end list -->

  - Android:

<!-- end list -->

```bash
npx react-native run-android
```

  - iOS:

<!-- end list -->

```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

-----

## 📡 Rotas da API

Para uma visualização completa, interativa e com a possibilidade de testar as rotas em tempo real, acesse a documentação gerada pelo Swagger:

➡️ **[http://localhost:5000/api-docs](https://www.google.com/search?q=http://localhost:5000/api-docs)**

Abaixo está um resumo das rotas disponíveis.

### 🔐 Autenticação

  - `POST /usuarios/cadastrar` → Cadastro
  - `POST /usuarios/login` → Login

### 📚 Livros

  - `GET /livros/listar` → Listar com filtros
  - `GET /livros/todos` → Listar todos
  - `POST /livros/cadastrar` → Cadastrar manualmente
  - `POST /livros/salvar-livros` → Buscar na Google Books

### ⭐ Avaliações

  - `GET /avaliacoes/:id_livro` → Listar por livro
  - `POST /avaliacoes/cadastrar` → Avaliar livro
  - `PUT /avaliacoes/atualizar/:id` → Editar avaliação
  - `DELETE /avaliacoes/excluir/:id` → Excluir avaliação

> ⚠️ Todas essas rotas (exceto login e cadastro) requerem envio do token JWT no cabeçalho:

```
Authorization: Bearer SEU_TOKEN_JWT
```

-----

## 📱 Estrutura do App (React Native)

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

### Componentes Reutilizáveis

  - **BookCard** → Card para livros
  - **RatingStars** → Estrelas de avaliação
  - **LoadingSpinner** → Indicador de carregamento

-----

## 🎨 Design e Navegação

  - **Cores principais**: Azul (\#2563eb), Verde (\#16a34a), Amarelo (\#fbbf24)
  - **Componentes com sombras e botões arredondados**
  - **Bottom tabs com ícones emoji**
  - **Mensagens de erro e sucesso integradas**

-----

## ✅ Como Usar

1.  Cadastre-se com renda per capita até R$ 1.500
2.  Faça login com suas credenciais
3.  Explore livros cadastrados ou buscados da Google Books
4.  Avalie livros e veja avaliações de outros usuários
5.  Gerencie seus próprios livros e avaliações

-----

## 🤝 Contribuindo

1.  Fork o projeto
2.  Crie uma branch
3.  Commit suas mudanças
4.  Envie um Pull Request

-----

## 📄 Licença

Este projeto está licenciado sob os termos da licença MIT.