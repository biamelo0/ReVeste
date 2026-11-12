package br.com.fatec.reveste;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal de inicialização da API ReVeste.
 * Desenvolvida para a disciplina de Programação Orientada a Objetos (FATEC).
 */
@SpringBootApplication
public class RevesteApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(RevesteApiApplication.class, args);
        System.out.println("==========================================================");
        System.out.println("  🌿 API ReVeste - Spring Boot inicializada com sucesso!");
        System.out.println("  📖 Documentação Swagger UI: http://localhost:8080/swagger-ui/index.html");
        System.out.println("  💾 Console Banco H2:        http://localhost:8080/h2-console");
        System.out.println("==========================================================");
    }
}
