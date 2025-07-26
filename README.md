# 🌸 Violet

Sistema de gerenciamento simples desenvolvido com **Next.js**, **Tailwind CSS** e **Prisma**. Este projeto tem como objetivo permitir o cadastro, edição e visualização de usuários com dados básicos como nome, CPF, telefone e data de nascimento.

## ✨ Funcionalidades

- 📥 Cadastro de usuários
- 📝 Edição de informações
- 🗑️ Remoção de registros
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
│   │   └── users/ (CRUD)
├── components/
│   ├── Table.tsx
│   └── Form.tsx
├── lib/
│   └── prisma.ts
├── styles/
├── prisma/
│   └── schema.prisma
```

## 📸 Capturas de Tela

*Adicione aqui prints do sistema para demonstrar as funcionalidades.*

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido por [@DevPeress](https://github.com/DevPeress) 💜