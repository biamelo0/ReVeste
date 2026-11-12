package br.com.fatec.reveste.dto;

import br.com.fatec.reveste.model.ItemDoacao;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.LocalDateTime;

/**
 * Data Transfer Object (DTO) para respostas das requisições na API ReVeste.
 */
@Schema(description = "Dados retornados de um item de doação")
public class ItemDoacaoResponseDTO {

    @Schema(description = "Identificador único do item", example = "1")
    private Long id;

    @Schema(description = "Código de rastreio ReVeste", example = "REV-8841")
    private String codigo;

    @Schema(description = "URL ou imagem da peça de roupa")
    private String fotoUrl;

    @Schema(description = "Título da peça", example = "Jaqueta Jeans Sustentável")
    private String titulo;

    @Schema(description = "Descrição detalhada", example = "Em perfeito estado, sem rasgos, 100% algodão")
    private String descricao;

    @Schema(description = "Categoria do vestuário", example = "Jaquetas")
    private String categoria;

    @Schema(description = "Tamanho da peça", example = "M")
    private String tamanho;

    @Schema(description = "Quantidade de peças no lote", example = "1")
    private Integer quantidade;

    @Schema(description = "Modalidade", example = "Doação")
    private String modalidade;

    @Schema(description = "Preço quando aplicável", example = "0.0")
    private Double preco;

    @Schema(description = "Ponto de coleta de entrega", example = "Faculdade de Tecnologia (FATEC)")
    private String pontoColeta;

    @Schema(description = "Nome do doador", example = "Mariana Silva")
    private String doador;

    @Schema(description = "Telefone ou WhatsApp", example = "15991234567")
    private String whatsapp;

    @Schema(description = "Status atual do item", example = "DISPONIVEL")
    private String status;

    @Schema(description = "Pontos ecológicos gerados (calculados por POO)", example = "50")
    private Integer pontosSustentaveis;

    @Schema(description = "Data e hora de cadastro no sistema", example = "2026-11-11T19:30:00")
    private LocalDateTime dataCadastro;

    public ItemDoacaoResponseDTO() {}

    public ItemDoacaoResponseDTO(ItemDoacao item) {
        this.id = item.getId();
        this.codigo = item.getCodigo();
        this.fotoUrl = item.getFotoUrl();
        this.titulo = item.getTitulo();
        this.descricao = item.getDescricao();
        this.categoria = item.getCategoria();
        this.tamanho = item.getTamanho();
        this.quantidade = item.getQuantidade();
        this.modalidade = item.getModalidade();
        this.preco = item.getPreco();
        this.pontoColeta = item.getPontoColeta();
        this.doador = item.getDoador();
        this.whatsapp = item.getWhatsapp();
        this.status = item.getStatus();
        this.pontosSustentaveis = item.getPontosSustentaveis();
        this.dataCadastro = item.getDataCadastro();
    }

    // Getters e Setters
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
}
