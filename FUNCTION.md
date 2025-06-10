# 📚 API Biblioteca - Backend

Este projeto é uma API RESTful para gerenciamento de livros e avaliações, integrando com a API do Google Books. Ideal para ser consumido por um app React Native.

---

## 🚀 Como rodar

1. **Clone o repositório**
2. **Configure o arquivo .env** com:
    
DB_NAME=nome_do_banco
    DB_USER=usuario
    DB_PASSWORD=senha
    GOOGLE_BOOKS_API_KEY=sua_api_key
    JWT_SECRET=sua_chave_jwt

3. **Instale as dependências**
    
bash
    npm install

4. **Inicie o servidor**
    
bash
    node server.js


---

## 🔑 Autenticação

- **Cadastro:**  
  POST /usuarios/cadastrar
  
json
  {
    "nome": "Nome",
    "email": "email@exemplo.com",
    "senha": "senha"
  }


- **Login:**  
  POST /usuarios/login
  
json
  {
    "email": "email@exemplo.com",
    "senha": "senha"
  }

  **Resposta:**  
  
json
  { "token": "JWT_TOKEN" }

  Use este token no header Authorization: Bearer JWT_TOKEN nas rotas protegidas.

---

## 📖 Livros

- **Buscar e salvar livros da API do Google Books:**  
  POST /livros/salvar-livros
  
json
  { "titulo": "React Native" }


- **Cadastrar livro manualmente:**  
  POST /livros/cadastrar  
  (protegido, precisa de token)
  
json
  {
    "titulo": "Livro Manual",
    "descricao": "Descrição",
    "autor": "Autor",
    "imagem": "http://url-da-imagem.com",
    "tipo": "manual"
  }


- **Listar livros com paginação e filtros:**  
  GET /livros/listar  
  (protegido, precisa de token)
  - Query params: page, limit, titulo, autor, tipo, meusLivros
  - Exemplo: /livros/listar?page=1&limit=5&titulo=React

- **Listar todos os livros (sem paginação):**  
  GET /livros/todos

---

## ⭐ Avaliações

- **Cadastrar avaliação:**  
  POST /avaliacoes/cadastrar  
  (protegido, precisa de token)
  
json
  {
    "nota": 5,
    "comentario": "Muito bom!",
    "id_livro": 1
  }


- **Listar avaliações de um livro:**  
  GET /avaliacoes/:id_livro  
  (protegido, precisa de token)

- **Atualizar avaliação:**  
  PUT /avaliacoes/atualizar/:id  
  (protegido, precisa de token)
  
json
  {
    "nota": 4,
    "comentario": "Atualizei meu comentário"
  }


- **Excluir avaliação:**  
  DELETE /avaliacoes/excluir/:id  
  (protegido, precisa de token)

---

## 📝 Observações

- Sempre envie o token JWT no header Authorization nas rotas protegidas.
- Para buscar livros da API do Google Books, use /livros/salvar-livros e depois liste pelo /livros/listar.
- Para mostrar apenas os livros cadastrados pelo usuário, use /livros/listar?meusLivros=true.
- Para avaliações, sempre envie o id_livro ao cadastrar e use o id da avaliação para editar/excluir.

---

## 👨‍💻 Time de Frontend

- Use as rotas acima para autenticação, busca, cadastro, listagem e avaliações.
- Consulte este README para exemplos de requisições e respostas.
- Em caso de dúvida, consulte o backend ou peça exemplos de integração!

---

> ⚠️ Atenção: Preencha o arquivo `.env` com seus próprios dados de banco, API key e JWT secret. **NUNCA** coloque dados reais neste arquivo público.
