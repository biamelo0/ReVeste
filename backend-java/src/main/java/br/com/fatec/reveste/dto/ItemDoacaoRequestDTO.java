package br.com.fatec.reveste.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object (DTO) para criação e atualização de um Item de Doação.
 * Possui regras de validação (Bean Validation) e documentação Swagger (@Schema).
 */
@Schema(description = "Dados para cadastro ou atualização de um item de doação")
public class ItemDoacaoRequestDTO {

    @Schema(description = "Título ou nome descritivo da peça de roupa", example = "Jaqueta Jeans Sustentável", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O título é obrigatório")
    @Size(min = 3, max = 100, message = "O título deve conter entre 3 e 100 caracteres")
    private String titulo;

    @Schema(description = "Descrição detalhada do estado de conservação e tecido", example = "Em perfeito estado, sem rasgos, 100% algodão", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "A descrição é obrigatória")
    @Size(min = 5, max = 500, message = "A descrição deve conter entre 5 e 500 caracteres")
    private String descricao;

    @Schema(description = "Categoria do vestuário", example = "Jaquetas", allowableValues = {"Camisas", "Jaquetas", "Calças", "Agasalhos", "Calçados", "Acessórios"}, requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "A categoria é obrigatória")
    private String categoria;

    @Schema(description = "Tamanho da peça", example = "M", allowableValues = {"PP", "P", "M", "G", "GG", "Único", "38", "40", "42"}, requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O tamanho é obrigatório")
    private String tamanho;

    @Schema(description = "Quantidade de peças no lote", example = "1", defaultValue = "1", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotNull(message = "A quantidade é obrigatória")
    @Min(value = 1, message = "A quantidade mínima deve ser 1")
    private Integer quantidade;

    @Schema(description = "Modalidade do item no ecossistema ReVeste", example = "Doação", allowableValues = {"Doação", "Troca", "Venda"}, defaultValue = "Doação")
    private String modalidade;

    @Schema(description = "Preço simbólico caso a modalidade seja Venda (opcional)", example = "25.00")
    private Double preco;

    @Schema(description = "Nome do Ponto de Coleta credenciado de entrega", example = "Faculdade de Tecnologia (FATEC)", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O ponto de coleta é obrigatório")
    private String pontoColeta;

    @Schema(description = "Nome completo do doador ou usuário responsável", example = "Mariana Silva", requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "O nome do doador é obrigatório")
    private String doador;

    @Schema(description = "Telefone ou WhatsApp de contato", example = "15991234567")
    private String whatsapp;

    @Schema(description = "Código de rastreio ReVeste (ex: REV-8841)", example = "REV-8841")
    private String codigo;

    @Schema(description = "URL ou Base64 da foto da peça de roupa")
    private String fotoUrl;

    @Schema(description = "Status atual da peça", example = "Aguardando entrega", defaultValue = "Aguardando entrega")
    private String status;

    public ItemDoacaoRequestDTO() {
        this.quantidade = 1;
        this.modalidade = "Doação";
        this.status = "DISPONIVEL";
    }

    // Getters e Setters
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
