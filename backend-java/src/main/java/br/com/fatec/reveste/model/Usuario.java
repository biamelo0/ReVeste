package br.com.fatec.reveste.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidade de Usuário no sistema ReVeste.
 * Representa Doadores, Pontos de Coleta, ONGs e Administradores com persistência em banco.
 */
@Entity
@Table(name = "usuarios")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, length = 100)
    private String senha;

    @Column(length = 30)
    private String documento;

    @Column(length = 250)
    private String endereco;

    @Column(nullable = false, length = 20)
    private String tipo; // "pf", "pj" ou "admin"

    @Column(nullable = false)
    private Boolean pontoColeta;

    @Column(nullable = false)
    private Boolean isAdmin;

    @Column(nullable = false)
    private Integer pontos;

    @Column(nullable = false)
    private Integer pecasDoadas;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;

    public Usuario() {
        this.tipo = "pf";
        this.pontoColeta = false;
        this.isAdmin = false;
        this.pontos = 50;
        this.pecasDoadas = 0;
        this.dataCadastro = LocalDateTime.now();
    }

    public Usuario(Long id, String nome, String email, String senha, String documento,
                   String endereco, String tipo, Boolean pontoColeta, Boolean isAdmin) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.documento = documento;
        this.endereco = endereco;
        this.tipo = tipo != null ? tipo : "pf";
        this.pontoColeta = pontoColeta != null ? pontoColeta : false;
        this.isAdmin = isAdmin != null ? isAdmin : false;
        this.pontos = "pj".equalsIgnoreCase(tipo) ? 100 : 50;
        this.pecasDoadas = 0;
        this.dataCadastro = LocalDateTime.now();
    }

    public void adicionarPontos(int pts, int pecas) {
        this.pontos += pts;
        this.pecasDoadas += pecas;
    }

    // Getters e Setters
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Usuario usuario = (Usuario) o;
        return Objects.equals(id, usuario.id) && Objects.equals(email, usuario.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email);
    }
}
