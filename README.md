# IBM Book Review

Esta API permite aos usuários se registrarem, fazerem login, postar e deletar resenhas de livros. Ela também fornece acesso público a informações sobre os livros disponíveis na biblioteca.

## Índice

- [Instalação](#instalação)
- [Rotas Públicas](#rotas-públicas)
- [Rotas Autenticadas](#rotas-autenticadas)

## Instalação

Para instalar e executar o projeto, siga os seguintes passos:

1. Clone o repositório:
    ```bash
    git clone <URL_DO_REPOSITÓRIO>
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Inicie o servidor:
    ```bash
    npm start
    ```

O servidor estará em execução na porta 5000.

## Rotas Públicas

### Registrar Usuário

**Endpoint:** `/register`  
**Método:** `POST`  
**Descrição:** Registra um novo usuário.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "User <username> Registered Successfully"
}
```

### Obter Todos os Livros

**Endpoint:** `/`  
**Método:** `GET`  
**Descrição:** Retorna todos os livros disponíveis.

**Resposta de Sucesso:**
```json
[
  {
    "author": "string",
    "title": "string",
    "reviews": {}
  },
  ...
]
```

### Obter Livro por ISBN

**Endpoint:** `/isbn/:isbn`  
**Método:** `GET`  
**Descrição:** Retorna o livro correspondente ao ISBN fornecido.

**Resposta de Sucesso:**
```json
{
  "author": "string",
  "title": "string",
  "reviews": {}
}
```

### Obter Livros por Autor

**Endpoint:** `/author/:author`  
**Método:** `GET`  
**Descrição:** Retorna todos os livros do autor especificado.

**Resposta de Sucesso:**
```json
[
  {
    "author": "string",
    "title": "string",
    "reviews": {}
  },
  ...
]
```

### Obter Livros por Título

**Endpoint:** `/title/:title`  
**Método:** `GET`  
**Descrição:** Retorna todos os livros com o título especificado.

**Resposta de Sucesso:**
```json
{
  "author": "string",
  "title": "string",
  "reviews": {}
}
```

### Obter Resenhas de um Livro

**Endpoint:** `/review/:isbn`  
**Método:** `GET`  
**Descrição:** Retorna todas as resenhas do livro correspondente ao ISBN fornecido.

**Resposta de Sucesso:**
```json
{
  "review": {}
}
```

## Rotas Autenticadas

### Login

**Endpoint:** `/login`  
**Método:** `POST`  
**Descrição:** Autentica um usuário registrado.

**Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "User <username> logged in successfully"
}
```

### Postar Resenha

**Endpoint:** `/auth/review/:isbn`  
**Método:** `PUT`  
**Descrição:** Posta uma resenha para o livro correspondente ao ISBN fornecido. Requer autenticação.

**Body:**
```json
{
  "review": "string"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "The user <username> posted a review."
}
```

### Deletar Resenha

**Endpoint:** `/auth/review/:isbn`  
**Método:** `DELETE`  
**Descrição:** Deleta a resenha do livro correspondente ao ISBN fornecido. Requer autenticação.

**Resposta de Sucesso:**
```json
{
  "message": "The user <username> deleted a review."
}
```
