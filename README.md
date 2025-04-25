# 📚 LeiaComigo - Backend - Biblioteca Social

Plataforma social para facilitar o acesso a livros gratuitos ou acessíveis para pessoas com baixa renda. Permite a doação, venda de livros, avaliação, e discussões sobre livros.

## 💡 Objetivo do Projeto

A Biblioteca Social tem como objetivo criar uma plataforma onde as pessoas possam doar ou vender livros, além de avaliar e participar de clubes de leitura. Focando em acessibilidade e integração social, o projeto busca dar mais acesso a livros para quem possui baixa renda.

## 🚀 Tecnologias Utilizadas - Backend

- Node.js - Servidor backend
- Express - Framework HTTP
- MySQL - Banco de dados relacional
- Sequelize - ORM para MySQL
- Axios - Requisições HTTP externas (para integrar com a API do Google Books)
- dotenv - Variáveis de ambiente
- bcrypt - Criptografia de senhas (ainda a ser implementado)

## 📋 Funcionalidades

- Cadastro e login de usuários 💻
- Doação e venda de livros 📚
- Clube de leitura e discussão ✉️
- Avaliação de livros ⭐
- Acessibilidade 🔧

## 🛠️ Como Rodar o Projeto

### 1. Clonando o repositório

```bash
git clone https://github.com/SEU_USUARIO/biblioteca-social-backend.git
cd biblioteca-social-backend
```

### 2. Instalando as dependências

```bash
npm install
```

### 3. Configurando as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis (com seus valores):

```bash
MYSQL_USER=root
MYSQL_PASSWORD=sua-senha
MYSQL_DB=biblioteca_social
GOOGLE_BOOKS_API_KEY=sua-chave-api-do-google-books
```

### 4. Rodando o servidor

```bash
npm start
```

O servidor vai rodar em [http://localhost:5000](http://localhost:5000).

## 📝 Rotas

Aqui estão as rotas disponíveis para a API:

- `POST /usuarios/cadastrar` - Cadastrar um novo usuário
- `POST /usuarios/login` - Realizar o login de um usuário
- `GET /livros/buscar-livros` - Buscar livros usando a API do Google Books
- `POST /livros` - Cadastrar um novo livro
- `GET /livros` - Listar todos os livros cadastrados
- `POST /avaliar` - Avaliar um livro
- `GET /avaliacoes/:idLivro` - Buscar avaliações de um livro específico

## 🧑‍💻 Como Contribuir

1. Faça um fork deste repositório.
2. Crie uma branch para a sua funcionalidade (`git checkout -b nome-da-sua-branch`).
3. Commit suas mudanças (`git commit -am 'Adiciona funcionalidade X'`).
4. Faça o push para a sua branch (`git push origin nome-da-sua-branch`).
5. Abra um pull request explicando as alterações.

## 👥 Autores

- Vitor Augusto Santana Dreger (vitor-dreger) - Desenvolvimento backend
- Thiago Lacerda (Twayff) - Desenvolvimento frontend

## 📄 Licença

Este projeto é licenciado sob a MIT License.
