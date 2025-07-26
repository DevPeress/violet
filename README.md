# 🌸 Violet

Sistema de gerenciamento simples desenvolvido com **Next.js**, **Tailwind CSS** e **Prisma**. Este projeto tem como objetivo permitir o cadastro, edição e visualização de usuários com dados básicos como nome, CPF, telefone e data de nascimento.

## ✨ Funcionalidades

- 📥 Cadastro de usuários
- 📝 Edição de informações
- 🗑️ Remoção de usuários
- 🔎 Visualização em tabela
- 🧠 Backend integrado com Prisma ORM
- 🛡️ Validações de dados e mensagens de erro

## 🧰 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MongoDB](https://www.mongodb.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Hot Toast](https://react-hot-toast.com/)

## 🚀 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/DevPeress/violet

# Acesse a pasta
cd violet

# Instale as dependências
npm install

# Configure o banco de dados
# Edite o arquivo .env com sua DATABASE_URL do MongoDB

# Rode as migrations
npx prisma db push

# Inicie o servidor
npm run dev
```

## 🗂️ Estrutura do Projeto

```
violet/
├── app/
│   ├── page.tsx
│   ├── api/
│   │   └── agricultores/ (CRUD)
├── prisma/
│   └── schema.prisma
```

## 📌 Base URL

```
http://localhost:3000/api
```

## 🔐 Autenticação

Atualmente, os endpoints **não exigem autenticação**. (Atualize aqui se for implementado JWT, API Key etc.)

## 📁 Endpoints

### ✅ `GET /api/agricultores`

Retorna todos os usuários cadastrados.

#### 🔄 Exemplo de resposta:
```json
[
  {
    "id": 1,
    "fullName": "João Silva",
    "cpf": "123.456.789-11",
    "phone": "(11) 99999-9999",
    "birthDate": "2000-01-01T00:00:00.000Z"
  }
]
```

### 📥 `POST /api/agricultores`

Cria um novo usuário.

#### 📦 Body (JSON):
```json
{
  "id": 1,
  "fullName": "João Silva",
  "cpf": "123.456.789-11",
  "phone": "(11) 99999-9999",
  "birthDate": "2000-01-01"
}
```

#### 🔄 Resposta:
```json
{
  "status": 201
}
```

### ✏️ `PUT /api/agricultores`

Atualiza os dados de um usuário existente com base no CPF.

#### 📦 Body (JSON):
```json
{
  "cpf": "12345678900",
  "tipo": "fullName",
  "texto": "Fabrício"
}
```

#### 🔄 Resposta:
```json
{
  "status": 200
}
```

### ❌ `DELETE /api/agricultores`

Deleta um usuário com base no CPF.

#### 📦 Body (JSON):
```json
{
  "cpf": "12345678900"
}
```

#### 🔄 Resposta:
```json
{
  "status": 204
}
```



Desenvolvido por [@DevPeress](https://github.com/DevPeress) 💜