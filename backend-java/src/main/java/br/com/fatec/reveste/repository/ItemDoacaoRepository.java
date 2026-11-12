package br.com.fatec.reveste.repository;

import br.com.fatec.reveste.model.ItemDoacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Repositório Spring Data JPA para operações de persistência da entidade ItemDoacao.
 */
public interface ItemDoacaoRepository extends JpaRepository<ItemDoacao, Long> {

    List<ItemDoacao> findByCategoriaIgnoreCase(String categoria);

    List<ItemDoacao> findByStatusIgnoreCase(String status);

    List<ItemDoacao> findByDoadorContainingIgnoreCase(String doador);
}
