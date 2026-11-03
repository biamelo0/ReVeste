# Guia de Deploy e Banco de Dados na Vercel (ReVeste)

Este projeto está pronto para deploy na **Vercel** com suporte a **PostgreSQL (Neon / Vercel Postgres)** e **Prisma ORM**.

---

## 🚀 Passo 1: Subir o código para o GitHub

No terminal do projeto, envie as alterações mais recentes para o seu repositório:

```bash
git add .
git commit -m "feat: responsividade completa e suporte a banco de dados Vercel Postgres com Prisma"
git push origin main
```

---

## 🌐 Passo 2: Importar o Projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com sua conta do GitHub.
2. Clique no botão **"Add New..."** no canto superior direito e selecione **"Project"**.
3. Na lista de repositórios do seu GitHub, localize o repositório **`ReVeste`** (ou `biamelo0/ReVeste`) e clique em **"Import"**.
4. Em **Framework Preset**, deixe **Next.js**.
5. Clique no botão **"Deploy"**.

---

## 🗄️ Passo 3: Criar o Banco de Dados PostgreSQL na Vercel

1. No painel do seu projeto na Vercel, acesse a aba **"Storage"** no menu superior.
2. Clique no botão **"Create Database"** (ou **"Connect Store"**).
3. Selecione a opção **"Postgres"** (powered by Neon).
4. Escolha um nome para o banco (ex: `reveste-db`) e selecione a região mais próxima (ex: `Washington, D.C. (iad1)` ou `São Paulo (gru1)` se disponível no seu plano).
5. Aceite os termos e clique em **"Create"**.
6. Na tela seguinte, clique em **"Connect to Project"** e vincule ao seu projeto `ReVeste`.
   - *A Vercel injetará automaticamente as variáveis de ambiente necessárias (`POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING`, etc.) no seu projeto!*

---

## ⚡ Passo 4: Criar as Tabelas e Popular os Dados Iniciais (Seed)

Após conectar o banco, o esquema de tabelas do Prisma precisa ser criado no Postgres. Você pode fazer isso de duas formas simples:

### Opção A (Via Navegador - Mais Rápida):
1. Com o deploy finalizado, acesse a URL do seu site com o caminho `/api/seed`:
   ```
   https://seu-projeto.vercel.app/api/seed
   ```
2. Você receberá uma confirmação em JSON indicando que o banco foi inicializado com sucesso e os dados de campanhas, lojas e usuários foram criados!

### Opção B (Via Terminal Local com as variáveis da Vercel):
1. Baixe as variáveis da Vercel para o seu `.env`:
   ```bash
   npx vercel env pull .env.development.local
   ```
2. Execute a criação das tabelas e o seed:
   ```bash
   npm run db:push
   npm run db:seed
   ```

Pronto! Seu projeto estará 100% online, responsivo no celular e conectado ao banco de dados PostgreSQL na nuvem da Vercel!
