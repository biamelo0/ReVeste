# 🌿 ReVeste — Back-end em Java (Spring Boot)
### Projeto de Programação Orientada a Objetos (POO) & Engenharia de Software — FATEC

API RESTful completa desenvolvida com **Java 17** e **Spring Boot 3**, com persistência via Spring Data JPA, banco de dados H2, documentação interativa automatizada com **Swagger/OpenAPI (springdoc)** e integração direta com a interface web React / Next.js do ReVeste.

---

## 🚀 Como Executar o Back-end

### Pré-requisitos
* **Java Development Kit (JDK) 17 ou superior**
* **Apache Maven 3.8+** (ou executar via IntelliJ IDEA / VS Code com a extensão Java Extension Pack)

### Executando pelo terminal
Dentro da pasta `backend-java`:
```bash
# Compilar e iniciar o servidor
mvn clean spring-boot:run
```
Ou no Windows, basta dar dois cliques no arquivo:
```cmd
iniciar-backend.bat
```

Após iniciar, o servidor estará escutando na porta **`8080`**.

---

## 📖 Documentação Interativa Swagger / OpenAPI

Com o back-end em execução, acesse no seu navegador:

👉 **[http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)**

JSON da especificação OpenAPI v3:
👉 **[http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)**

---

## 💾 Banco de Dados H2 em Memória

O projeto já vem configurado com banco H2 em memória e carga inicial de 5 itens no arquivo `data.sql`.
* **URL do Console:** [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
* **JDBC URL:** `jdbc:h2:mem:revestedb`
* **Usuário:** `sa`
* **Senha:** *(deixe em branco)*

---

## 📡 Endpoints e Verbos HTTP (CRUD)

| Operação | Método | Endpoint | Descrição | Códigos de Resposta |
| :--- | :--- | :--- | :--- | :--- |
| **Criar Item** | `POST` | `/api/itens` | Cadastra uma nova peça/lote e calcula pontos POO | `201 Created`, `400 Bad Request` |
| **Listar Todos** | `GET` | `/api/itens` | Retorna todos os itens cadastrados | `200 OK` |
| **Buscar por ID** | `GET` | `/api/itens/{id}` | Retorna um item específico pelo seu ID | `200 OK`, `404 Not Found` |
| **Atualizar Item**| `PUT` | `/api/itens/{id}` | Atualiza todas as informações do item | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **Deletar Item** | `DELETE`| `/api/itens/{id}` | Remove um item específico pelo ID | `204 No Content`, `404 Not Found` |

### Exemplo de Payload JSON para POST / PUT:
```json
{
  "titulo": "Casaco de Lã Sustentável",
  "descricao": "Casaco térmico higienizado, sem furos ou manchas, 100% lã natural",
  "categoria": "Agasalhos",
  "tamanho": "G",
  "quantidade": 1,
  "modalidade": "Doação",
  "preco": null,
  "pontoColeta": "Faculdade de Tecnologia (FATEC)",
  "doador": "Beatriz Melo",
  "whatsapp": "15998765432",
  "status": "DISPONIVEL"
}
```

---

## 🏛️ Conceitos de POO Aplicados
1. **Encapsulamento:** Atributos privados na entidade `ItemDoacao`, com getters/setters e métodos de domínio.
2. **Métodos de Domínio:** A lógica de cálculo de pontos ecológicos (`calcularPontosSustentaveis()`) está encapsulada dentro do modelo de objeto.
3. **Divisão em Camadas (Separation of Concerns):**
   - `model`: Entidades JPA de domínio.
   - `dto`: Validações de entrada (`@NotBlank`, `@Min`, `@Size`) e desacoplamento de transporte.
   - `repository`: Interfaces estendendo `JpaRepository`.
   - `service`: Camada de regras de negócio com controle transacional (`@Transactional`).
   - `controller`: Exposição RESTful com anotações OpenAPI (`@Operation`, `@ApiResponse`, `@Tag`).
   - `exception`: Manipulador global de exceções padronizado (`@RestControllerAdvice`).
