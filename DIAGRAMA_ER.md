# Diagrama de Entidade e Relacionamento (DER) - ReVeste

Este documento descreve o modelo conceitual e relacional do banco de dados do projeto **ReVeste** (PostgreSQL no Supabase via Prisma ORM).

---

## 📊 Diagrama Visual (Mermaid)

```mermaid
erDiagram
    User ||--o{ Doacao : "realiza / possui"
    User ||--o{ Movimentacao : "possui extrato"
    User ||--o{ LojaItem : "resgata"
    Campanha ||--o{ Doacao : "arrecada"

    User {
        String id PK "cuid()"
        String nome
        String email UK
        String documento
        String endereco
        String tipo "pf | pj | admin"
        Boolean isAdmin
        Boolean pontoColeta
        Int pontos
        Int pecasDoadas
        DateTime createdAt
        DateTime updatedAt
    }

    Doacao {
        String id PK "cuid()"
        String codigo UK "REV-XXXX"
        String titulo
        String descricao
        Int quantidade
        String tamanho
        String modalidade "Doação | Troca | Venda"
        Float preco
        String pontoDestino
        String whatsapp
        String doadorNome
        String fotoUrl
        String status "Aguardando entrega | Recebido | Validado | Reprovado"
        Int pontosGerados
        String motivoReprovacao
        String campanhaId FK
        String userId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Campanha {
        String id PK "cuid()"
        String nome
        String organizador
        String local
        String descricao
        String[] itensPrioritarios
        String periodo
        Int arrecadado
        Int meta
        Int familiasAtendidas
        String status "Ativa | Encerrada"
        DateTime createdAt
        DateTime updatedAt
    }

    LojaItem {
        String id PK "cuid()"
        String nome
        String ong
        String enderecoRetirada
        String descricao
        String categoria "camisa | jaqueta | ecobag | sueter | calca | cachecol"
        String tamanho
        Int pontos
        String corFundo
        String corPeca
        Boolean resgatado
        String voucherCodigo
        String resgatadoPorId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Movimentacao {
        String id PK "cuid()"
        String titulo
        String subtitulo
        String pontosTexto
        String tipo "credito | debito"
        String userId FK
        DateTime createdAt
    }
```

---

## 🔗 Descrição dos Relacionamentos

1. **`User` ➔ `Doacao` (1:N)**: Um usuário pode cadastrar múltiplas doações. Uma doação pertence a um usuário (ou é anônima).
2. **`Campanha` ➔ `Doacao` (1:N)**: Uma campanha comunitária pode agrupar várias doações vinculadas a ela.
3. **`User` ➔ `LojaItem` (1:N)**: Um usuário pode resgatar itens na loja solidária usando seus pontos acumulados (`resgatadoPorId`).
4. **`User` ➔ `Movimentacao` (1:N)**: O histórico de pontos de cada usuário registra transações de crédito (ao doar) e débito (ao resgatar).
