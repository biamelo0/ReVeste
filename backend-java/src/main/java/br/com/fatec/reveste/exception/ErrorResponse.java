package br.com.fatec.reveste.exception;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Estrutura padronizada para retorno de erros na API RESTful.
 */
@Schema(description = "Estrutura padrão de erro retornado pela API")
public class ErrorResponse {

    @Schema(description = "Data e hora do erro", example = "2026-11-11T19:35:00")
    private LocalDateTime timestamp;

    @Schema(description = "Código de status HTTP", example = "404")
    private int status;

    @Schema(description = "Nome do erro HTTP", example = "Not Found")
    private String error;

    @Schema(description = "Mensagem explicativa do erro", example = "Item não encontrado com ID: 99")
    private String message;

    @Schema(description = "Caminho da requisição que gerou o erro", example = "/api/itens/99")
    private String path;

    @Schema(description = "Lista detalhada de inconsistências de validação (quando aplicável)")
    private List<String> details;

    public ErrorResponse(int status, String error, String message, String path, List<String> details) {
        this.timestamp = LocalDateTime.now();
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.details = details;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public String getPath() {
        return path;
    }

    public List<String> getDetails() {
        return details;
    }
}
