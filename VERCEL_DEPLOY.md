# Guia Completo: Supabase + Vercel + Prisma (ReVeste)

Este guia ensina o passo a passo exato para hospedar o banco de dados PostgreSQL no **Supabase** e mantê-lo 100% conectado com o seu projeto Next.js na **Vercel**.

---

## 📌 Visão Geral da Conexão

O Prisma no ambiente Serverless da Vercel necessita de duas URLs:
1. **`DATABASE_URL`**: Conexão com **Pooler (Supavisor)** na porta `6543` (usada pela aplicação para evitar esgotamento de conexões).
2. **`DIRECT_URL`**: Conexão **Direta** na porta `5432` (usada pelo Prisma para rodar migrações e seed).

---

## 🚀 Passo 1: Criar o Projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita (ou faça login com o GitHub).
2. No painel, clique em **"New Project"**.
3. Preencha as informações:
   - **Name**: `reveste-db` (ou o nome que preferir).
   - **Database Password**: Crie uma senha forte e **guarde essa senha com você**!
     > ⚠️ *Dica importante: Se sua senha contiver caracteres especiais como `@`, `#`, `?`, `&` ou `%`, eles devem ser codificados em URL (por exemplo, `@` vira `%40`), caso contrário o Prisma pode acusar erro de autenticação.*
   - **Region**: Selecione `São Paulo (sa-east-1)` para menor latência no Brasil.
4. Clique em **"Create new project"** e aguarde cerca de 1 a 2 minutos até o banco ser provisionado.

---

## 🔑 Passo 2: Copiar as URLs de Conexão no Supabase

1. No painel do seu projeto no Supabase, clique no botão **"Connect"** no menu superior (ou vá em **Project Settings** ⚙️ -> **Database**).
2. Na janela que abrir, selecione a aba **"ORMs"** e clique em **"Prisma"**.
3. O Supabase exibirá exatamente o modelo pronto com as duas variáveis:
   - Uma com `DATABASE_URL` (com porta `6543` e `?pgbouncer=true`).
   - Outra com `DIRECT_URL` (com porta `5432`).
4. Copie essas duas strings e substitua `[YOUR-PASSWORD]` pela senha que você definiu no Passo 1.

---

## 💻 Passo 3: Configurar Localmente e Criar as Tabelas no Supabase

1. Na raiz do projeto `reveste`, crie um arquivo chamado `.env` (ou duplique o [.env.example](file:///C:/Users/bzmel/Documents/FATEC/Eng. Soft/reveste/.env.example)):
   ```env
   DATABASE_URL="postgresql://postgres.[SEU-PROJECT-REF]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[SEU-PROJECT-REF]:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
   ```

2. No terminal do projeto, crie todas as tabelas (`User`, `Doacao`, `Campanha`, `LojaItem`, `Movimentacao`) no Supabase executando:
   ```bash
   npm run db:push
   ```
   *(Você verá a mensagem confirmando que o schema foi sincronizado com o banco).*

3. Popule o banco com os dados iniciais do ReVeste (usuários, campanhas e itens):
   ```bash
   npm run db:seed
   ```
4. Se quiser conferir, abra o painel do Supabase e clique em **"Table Editor"** no menu lateral esquerdo: você verá todas as tabelas e dados criados!

---

## ☁️ Passo 4: Conectar o Supabase na Vercel

Você pode fazer a conexão de duas formas:

### Opção A: Manual via Variáveis de Ambiente (Mais Rápida e Direta)

1. Acesse o seu painel na [vercel.com](https://vercel.com) e clique no seu projeto **ReVeste**.
2. Vá em **Settings** ⚙️ (no menu superior) -> **Environment Variables** (no menu lateral esquerdo).
3. Adicione as duas variáveis:
   - **Key**: `DATABASE_URL`
     - **Value**: Sua string de conexão com pooler (porta 6543 com `?pgbouncer=true`).
     - Marque: Production, Preview e Development.
     - Clique em **Save**.
   - **Key**: `DIRECT_URL`
     - **Value**: Sua string de conexão direta (porta 5432).
     - Marque: Production, Preview e Development.
     - Clique em **Save**.

### Opção B: Integração Oficial Supabase (Marketplace)
1. No painel da Vercel, acesse a aba **Integrations**.
2. Pesquise por **Supabase** e clique em **Install / Add Integration**.
3. Selecione sua conta e vincule ao projeto `ReVeste` e ao banco `reveste-db` do Supabase. As variáveis serão injetadas automaticamente.

---

## 🚀 Passo 5: Atualizar o Código no GitHub e Fazer Deploy

1. Envie as configurações atualizadas para o seu repositório:
   ```bash
   git add .
   git commit -m "feat: configurado banco postgres no Supabase com Prisma e Vercel"
   git push origin main
   ```
2. Na Vercel, vá na aba **Deployments** e faça um **Redeploy** (ou aguarde o deploy automático do push).
3. Após o deploy, teste a conexão acessando:
   ```
   https://seu-projeto.vercel.app/api/seed
   ```
   Você receberá a confirmação em JSON de que a Vercel conectou e comunicou perfeitamente com o Supabase!
