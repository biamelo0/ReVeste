package br.com.fatec.reveste.service;

import br.com.fatec.reveste.dto.ItemDoacaoRequestDTO;
import br.com.fatec.reveste.dto.ItemDoacaoResponseDTO;
import br.com.fatec.reveste.exception.ResourceNotFoundException;
import br.com.fatec.reveste.model.ItemDoacao;
import br.com.fatec.reveste.repository.ItemDoacaoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Camada de Serviço (Service Layer) contendo as regras de negócio para itens de doação.
 * Realiza as conversões de DTO e chamadas ao repositório JPA.
 */
@Service
public class ItemDoacaoService {

    private final ItemDoacaoRepository repository;

    public ItemDoacaoService(ItemDoacaoRepository repository) {
        this.repository = repository;
    }

    /**
     * Retorna todos os itens cadastrados no sistema.
     */
    @Transactional(readOnly = true)
    public List<ItemDoacaoResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(ItemDoacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Busca um item específico pelo ID.
     */
    @Transactional(readOnly = true)
    public ItemDoacaoResponseDTO buscarPorId(Long id) {
        ItemDoacao item = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item de Doação", id));
        return new ItemDoacaoResponseDTO(item);
    }

    /**
     * Cadastra um novo item de doação e calcula seus pontos de sustentabilidade.
     */
    @Transactional
    public ItemDoacaoResponseDTO cadastrar(ItemDoacaoRequestDTO dto) {
        ItemDoacao item = new ItemDoacao();
        preencherDados(item, dto);

        ItemDoacao salvo = repository.save(item);
        return new ItemDoacaoResponseDTO(salvo);
    }

    /**
     * Atualiza os dados de um item existente pelo ID.
     */
    @Transactional
    public ItemDoacaoResponseDTO atualizar(Long id, ItemDoacaoRequestDTO dto) {
        ItemDoacao item = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Item de Doação", id));

        preencherDados(item, dto);

        ItemDoacao atualizado = repository.save(item);
        return new ItemDoacaoResponseDTO(atualizado);
    }

    /**
     * Remove um item pelo ID.
     */
    @Transactional
    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Item de Doação", id);
        }
        repository.deleteById(id);
    }

    /**
     * Filtra itens por categoria.
     */
    @Transactional(readOnly = true)
    public List<ItemDoacaoResponseDTO> buscarPorCategoria(String categoria) {
        return repository.findByCategoriaIgnoreCase(categoria)
                .stream()
                .map(ItemDoacaoResponseDTO::new)
                .collect(Collectors.toList());
    }

    /**
     * Método auxiliar de mapeamento do DTO para a Entidade, invocando a lógica POO de recálculo de pontos.
     */
    private void preencherDados(ItemDoacao item, ItemDoacaoRequestDTO dto) {
        if (dto.getCodigo() != null && !dto.getCodigo().isBlank()) {
            item.setCodigo(dto.getCodigo());
        } else if (item.getCodigo() == null) {
            int randomNum = (int) (1000 + Math.random() * 9000);
            item.setCodigo("REV-" + randomNum);
        }
        item.setFotoUrl(dto.getFotoUrl());
        item.setTitulo(dto.getTitulo());
        item.setDescricao(dto.getDescricao());
        item.setCategoria(dto.getCategoria());
        item.setTamanho(dto.getTamanho());
        item.setQuantidade(dto.getQuantidade());
        item.setModalidade(dto.getModalidade() != null ? dto.getModalidade() : "Doação");
        item.setPreco(dto.getPreco());
        item.setPontoColeta(dto.getPontoColeta());
        item.setDoador(dto.getDoador());
        item.setWhatsapp(dto.getWhatsapp());
        item.setStatus(dto.getStatus() != null ? dto.getStatus() : "DISPONIVEL");
        // O método setQuantidade e setCategoria já recalculam os pontos ecológicos via POO
    }
}
