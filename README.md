# 📚 API Leia Comigo - Backend

API RESTful para o projeto **Leia Comigo**, uma plataforma de biblioteca social com foco em acesso gratuito ou acessível a livros, especialmente para pessoas com baixa renda.

---

## 🚀 Como rodar

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/leia-comigo-backend.git
cd leia-comigo-backend
```

2. **Configure o arquivo `.env`** com suas variáveis:
```env
DB_NAME=nome_do_banco
DB_USER=usuario
DB_PASSWORD=senha
GOOGLE_BOOKS_API_KEY=sua_api_key
JWT_SECRET=sua_chave_jwt
```

3. **Instale as dependências**
```bash
npm install
```

4. **Inicie o servidor**
```bash
node server.js
```

---

## 🔑 Autenticação

### Cadastro
`POST /usuarios/cadastrar`
```json
{
  "nome": "Nome",
  "email": "email@exemplo.com",
  "senha": "senha",
  "renda": 1200,
  "pessoasNaCasa": 3
}
```
⚠️ Apenas usuários com **renda per capita até R$ 1.500** podem se cadastrar.

### Login
`POST /usuarios/login`
```json
{
  "email": "email@exemplo.com",
  "senha": "senha"
}
```

**Resposta**
```json
{ "token": "JWT_TOKEN" }
```
Use esse token no header das requisições protegidas:
```
Authorization: Bearer JWT_TOKEN
```

---

## 📖 Livros

### Buscar e salvar da API Google Books
`POST /livros/salvar-livros`
```json
{ "titulo": "React Native" }
```

### Cadastrar manualmente
`POST /livros/cadastrar` *(protegido)*
```json
{
  "titulo": "Livro Manual",
  "descricao": "Descrição",
  "autor": "Autor",
  "imagem": "http://url-da-imagem.com",
  "tipo": "manual"
}
```

### Listar livros
`GET /livros/listar` *(protegido)*  
Query params: `page`, `limit`, `titulo`, `autor`, `tipo`, `meusLivros`

Exemplo:
```
/livros/listar?page=1&limit=5&titulo=React
```

---

## ⭐ Avaliações

### Criar avaliação
`POST /avaliacoes/cadastrar` *(protegido)*
```json
{
  "nota": 5,
  "comentario": "Muito bom!",
  "id_livro": 1
}
```

### Listar avaliações
`GET /avaliacoes/:id_livro` *(protegido)*

### Atualizar avaliação
`PUT /avaliacoes/atualizar/:id` *(protegido)*
```json
{
  "nota": 4,
  "comentario": "Atualizei meu comentário"
}
```

### Excluir avaliação
`DELETE /avaliacoes/excluir/:id` *(protegido)*

---

## 📌 Observações

- Sempre envie o token JWT no header Authorization nas rotas protegidas.
- Use `meusLivros=true` na listagem para filtrar livros cadastrados pelo usuário logado.
- A renda per capita é validada no cadastro (renda total ÷ número de pessoas ≤ R$ 1500).

---

## 📱 Integração futura com frontend

A API será consumida por um aplicativo **React Native** que incluirá:
- Login e cadastro com autenticação JWT
- Listagem de livros com filtros
- Busca pela API do Google Books
- Cadastro manual de livros
- Avaliação de livros (criar, editar, excluir)
- Perfil de usuário

📦 Quando o frontend estiver pronto, essa seção será expandida com instruções detalhadas de integração.

---

## 📄 Licença

Este projeto está sob a licença MIT.