package br.com.fatec.reveste.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Dados para autenticação / login de usuário")
public class UsuarioLoginDTO {

    @Schema(description = "E-mail cadastrado", example = "beatriz@fatec.sp.gov.br", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    private String email;

    @Schema(description = "Senha de acesso", example = "123456", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "A senha é obrigatória")
    private String senha;

    public UsuarioLoginDTO() {}

    public UsuarioLoginDTO(String email, String senha) {
        this.email = email;
        this.senha = senha;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }
}
