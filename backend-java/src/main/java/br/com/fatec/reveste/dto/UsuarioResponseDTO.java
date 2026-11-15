package br.com.fatec.reveste.dto;

import br.com.fatec.reveste.model.Usuario;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

@Schema(description = "Perfil do usuário retornado após autenticação ou consulta")
public class UsuarioResponseDTO {

    @Schema(description = "ID único do usuário", example = "1")
    private Long id;

    @Schema(description = "Nome do usuário ou instituição", example = "Beatriz Melo")
    private String nome;

    @Schema(description = "E-mail de acesso", example = "beatriz@fatec.sp.gov.br")
    private String email;

    @Schema(description = "CPF ou CNPJ", example = "123.456.789-00")
    private String documento;

    @Schema(description = "Endereço", example = "Rua das Flores, 120 - Centro")
    private String endereco;

    @Schema(description = "Tipo de perfil", example = "pf")
    private String tipo;

    @Schema(description = "Ponto de coleta credenciado", example = "false")
    private Boolean pontoColeta;

    @Schema(description = "Administrador geral", example = "false")
    private Boolean isAdmin;

    @Schema(description = "Saldo de Pontos Verdes sustentáveis", example = "450")
    private Integer pontos;

    @Schema(description = "Total de peças doadas validadas", example = "12")
    private Integer pecasDoadas;

    @Schema(description = "Data de cadastro no sistema")
    private LocalDateTime dataCadastro;

    public UsuarioResponseDTO() {}

    public UsuarioResponseDTO(Usuario u) {
        this.id = u.getId();
        this.nome = u.getNome();
        this.email = u.getEmail();
        this.documento = u.getDocumento();
        this.endereco = u.getEndereco();
        this.tipo = u.getTipo();
        this.pontoColeta = u.getPontoColeta();
        this.isAdmin = u.getIsAdmin();
        this.pontos = u.getPontos();
        this.pecasDoadas = u.getPecasDoadas();
        this.dataCadastro = u.getDataCadastro();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Boolean getIsAdmin() {
        return isAdmin;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Integer getPontos() {
        return pontos;
    }

    public void setPontos(Integer pontos) {
        this.pontos = pontos;
    }

    public Integer getPecasDoadas() {
        return pecasDoadas;
    }

    public void setPecasDoadas(Integer pecasDoadas) {
        this.pecasDoadas = pecasDoadas;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
}
