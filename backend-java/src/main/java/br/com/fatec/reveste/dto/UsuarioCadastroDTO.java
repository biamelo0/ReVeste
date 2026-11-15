package br.com.fatec.reveste.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Dados para cadastro de novo usuário na base de dados")
public class UsuarioCadastroDTO {

    @Schema(description = "Nome completo ou Razão Social", example = "Beatriz Melo", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O nome é obrigatório")
    private String nome;

    @Schema(description = "E-mail único de acesso", example = "beatriz@fatec.sp.gov.br", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    private String email;

    @Schema(description = "Senha de acesso", example = "123456", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "A senha é obrigatória")
    @Size(min = 4, message = "A senha deve ter no mínimo 4 caracteres")
    private String senha;

    @Schema(description = "CPF ou CNPJ", example = "123.456.789-00")
    private String documento;

    @Schema(description = "Endereço completo", example = "Rua das Flores, 120 - Centro")
    private String endereco;

    @Schema(description = "Tipo de conta", example = "pf", allowableValues = {"pf", "pj", "admin"})
    private String tipo;

    @Schema(description = "Indica se atua como Ponto de Coleta", example = "false")
    private Boolean pontoColeta;

    public UsuarioCadastroDTO() {
        this.tipo = "pf";
        this.pontoColeta = false;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
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

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Boolean getPontoColeta() {
        return pontoColeta;
    }

    public void setPontoColeta(Boolean pontoColeta) {
        this.pontoColeta = pontoColeta;
    }
}
