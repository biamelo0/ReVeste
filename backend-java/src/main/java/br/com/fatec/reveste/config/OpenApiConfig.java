package br.com.fatec.reveste.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * Configuração personalizada da documentação Swagger / OpenAPI.
 * Atende aos requisitos de personalização de metadados da API para a disciplina de POO.
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("🌿 ReVeste API — Moda Circular & Gestão de Doações")
                        .version("1.0.0")
                        .description("API RESTful desenvolvida em Java com Spring Boot para o projeto interdisciplinar de " +
                                "Engenharia de Software e Programação Orientada a Objetos (FATEC). " +
                                "Permite realizar todas as operações CRUD sobre os itens e lotes de doação, " +
                                "cálculo de pontuação ecológica sustentável e integração completa com a interface gráfica web.")
                        .contact(new Contact()
                                .name("Equipe ReVeste - FATEC")
                                .email("contato@reveste.fatec.br")
                                .url("https://github.com/beatrizmelo/reveste"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Servidor de Desenvolvimento Local")
                ));
    }
}
