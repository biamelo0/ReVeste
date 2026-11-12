package br.com.fatec.reveste.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidade de Domínio representando um Item / Peça de Doação no sistema ReVeste.
 * Aplica os conceitos fundamentais de POO: Encapsulamento, Construtores e Métodos de Negócio.
 */
@Entity
@Table(name = "itens_doacao")
public class ItemDoacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 30)
    private String codigo;

    @Column(nullable = false, length = 100)
    private String titulo;

    @Column(nullable = false, length = 500)
    private String descricao;

    @Column(nullable = false, length = 50)
    private String categoria;

    @Column(nullable = false, length = 20)
    private String tamanho;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false, length = 30)
    private String modalidade; // "Doação", "Troca" ou "Venda"

    @Column
    private Double preco;

    @Column(name = "ponto_coleta", nullable = false, length = 120)
    private String pontoColeta;

    @Column(nullable = false, length = 100)
    private String doador;

    @Column(length = 20)
    private String whatsapp;

    @Column(name = "foto_url", length = 1000)
    private String fotoUrl;

    @Column(nullable = false, length = 50)
    private String status; // "Aguardando entrega", "Recebido no ponto", "Validado pela ONG", "Reprovado", "DISPONIVEL"

    @Column(name = "pontos_sustentaveis", nullable = false)
    private Integer pontosSustentaveis;

    @Column(name = "data_cadastro", nullable = false)
    private LocalDateTime dataCadastro;

    // Construtor Padrão (exigido pelo JPA / Hibernate)
    public ItemDoacao() {
        this.dataCadastro = LocalDateTime.now();
        this.status = "DISPONIVEL";
        this.modalidade = "Doação";
        this.quantidade = 1;
        this.pontosSustentaveis = 30;
    }

    // Construtor Completo (Prática POO)
    public ItemDoacao(Long id, String titulo, String descricao, String categoria, String tamanho,
                      Integer quantidade, String modalidade, Double preco, String pontoColeta,
                      String doador, String whatsapp, String status) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.categoria = categoria;
        this.tamanho = tamanho;
        this.quantidade = (quantidade != null && quantidade > 0) ? quantidade : 1;
        this.modalidade = (modalidade != null) ? modalidade : "Doação";
        this.preco = preco;
        this.pontoColeta = pontoColeta;
        this.doador = doador;
        this.whatsapp = whatsapp;
        this.status = (status != null) ? status : "DISPONIVEL";
        this.dataCadastro = LocalDateTime.now();
        this.pontosSustentaveis = calcularPontosSustentaveis();
    }

    /**
     * Regra de Negócio Orientada a Objetos:
     * Calcula o total de pontos ecológicos / sustentáveis gerados por este lote/peça
     * com base na quantidade e na categoria da vestimenta.
     */
    public int calcularPontosSustentaveis() {
        int fatorCategoria = switch (this.categoria != null ? this.categoria.toLowerCase() : "") {
            case "jaquetas", "casacos", "agasalhos" -> 50;
            case "calças", "calcas" -> 40;
            case "camisas", "camisetas" -> 30;
            case "calçados", "calcados" -> 35;
            default -> 25;
        };

        int qtd = (this.quantidade != null && this.quantidade > 0) ? this.quantidade : 1;
        return fatorCategoria * qtd;
    }

    // ===================================================================
    // Getters e Setters (Encapsulamento POO)
    // ===================================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }

    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
        this.pontosSustentaveis = calcularPontosSustentaveis();
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
        this.pontosSustentaveis = calcularPontosSustentaveis();
    }

    public String getModalidade() {
        return modalidade;
    }

    public void setModalidade(String modalidade) {
        this.modalidade = modalidade;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getPontoColeta() {
        return pontoColeta;
    }

    public void setPontoColeta(String pontoColeta) {
        this.pontoColeta = pontoColeta;
    }

    public String getDoador() {
        return doador;
    }

    public void setDoador(String doador) {
        this.doador = doador;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getPontosSustentaveis() {
        return pontosSustentaveis;
    }

    public void setPontosSustentaveis(Integer pontosSustentaveis) {
        this.pontosSustentaveis = pontosSustentaveis;
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
        ItemDoacao that = (ItemDoacao) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "ItemDoacao{" +
                "id=" + id +
                ", titulo='" + titulo + '\'' +
                ", categoria='" + categoria + '\'' +
                ", quantidade=" + quantidade +
                ", doador='" + doador + '\'' +
                ", status='" + status + '\'' +
                ", pontosSustentaveis=" + pontosSustentaveis +
                '}';
    }
}
