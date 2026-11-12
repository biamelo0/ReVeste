package br.com.fatec.reveste.controller;

import br.com.fatec.reveste.dto.ItemDoacaoRequestDTO;
import br.com.fatec.reveste.dto.ItemDoacaoResponseDTO;
import br.com.fatec.reveste.exception.ErrorResponse;
import br.com.fatec.reveste.service.ItemDoacaoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador RESTful para a gestão de Itens de Doação da ReVeste.
 * Implementa todas as operações CRUD exigidas e documentação completa via Swagger / OpenAPI.
 */
@RestController
@RequestMapping("/api/itens")
@Tag(name = "Itens de Doação", description = "Operações CRUD para gerenciamento de roupas e peças sustentáveis")
public class ItemDoacaoController {

    private final ItemDoacaoService service;

    public ItemDoacaoController(ItemDoacaoService service) {
        this.service = service;
    }

    // ===================================================================
    // 1. POST - Inserir um item
    // ===================================================================
    @PostMapping
    @Operation(
            summary = "Inserir um novo item de doação",
            description = "Cadastra uma nova peça de roupa ou lote de doação no sistema ReVeste e calcula automaticamente a pontuação sustentável."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "201",
                    description = "Item de doação cadastrado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ItemDoacaoResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados de requisição inválidos ou campos obrigatórios ausentes",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ItemDoacaoResponseDTO> criarItem(
            @Parameter(description = "Dados do item a ser cadastrado", required = true)
            @Valid @RequestBody ItemDoacaoRequestDTO dto) {
        ItemDoacaoResponseDTO criado = service.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    // ===================================================================
    // 2. GET - Retornar todos os itens
    // ===================================================================
    @GetMapping
    @Operation(
            summary = "Retornar todos os itens",
            description = "Recupera a lista completa com todas as peças e lotes de doação cadastrados na plataforma."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Lista de itens retornada com sucesso",
                    content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = ItemDoacaoResponseDTO.class)))
            )
    })
    public ResponseEntity<List<ItemDoacaoResponseDTO>> listarTodos(
            @Parameter(description = "Filtro opcional por categoria (ex: Jaquetas, Camisas, Calças)")
            @RequestParam(required = false) String categoria) {
        if (categoria != null && !categoria.isBlank()) {
            return ResponseEntity.ok(service.buscarPorCategoria(categoria));
        }
        return ResponseEntity.ok(service.listarTodos());
    }

    // ===================================================================
    // 3. GET - Retornar somente um item pelo ID
    // ===================================================================
    @GetMapping("/{id}")
    @Operation(
            summary = "Retornar um item pelo ID",
            description = "Obtém as informações detalhadas de um item específico com base no seu identificador numérico único."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Item encontrado e retornado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ItemDoacaoResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Item de doação não encontrado para o ID informado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ItemDoacaoResponseDTO> buscarPorId(
            @Parameter(description = "Identificador único (ID) do item", example = "1", required = true)
            @PathVariable Long id) {
        ItemDoacaoResponseDTO item = service.buscarPorId(id);
        return ResponseEntity.ok(item);
    }

    // ===================================================================
    // 4. PUT - Atualizar informações de um item específico pelo ID
    // ===================================================================
    @PutMapping("/{id}")
    @Operation(
            summary = "Atualizar informações de um item específico pelo ID",
            description = "Atualiza todos os dados de uma peça de doação já existente e recalcula a pontuação sustentável."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Item atualizado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ItemDoacaoResponseDTO.class))
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Dados enviados no corpo da requisição são inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Item com o ID fornecido não foi encontrado para atualização",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<ItemDoacaoResponseDTO> atualizarItem(
            @Parameter(description = "Identificador único (ID) do item a ser atualizado", example = "1", required = true)
            @PathVariable Long id,
            @Parameter(description = "Novos dados atualizados do item", required = true)
            @Valid @RequestBody ItemDoacaoRequestDTO dto) {
        ItemDoacaoResponseDTO atualizado = service.atualizar(id, dto);
        return ResponseEntity.ok(atualizado);
    }

    // ===================================================================
    // 5. DELETE - Deletar um item específico pelo ID
    // ===================================================================
    @DeleteMapping("/{id}")
    @Operation(
            summary = "Deletar um item específico pelo ID",
            description = "Exclui permanentemente o registro de um item de doação a partir do seu identificador."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "204",
                    description = "Item deletado com sucesso (sem conteúdo de retorno)"
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Item não encontrado com o ID especificado",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    public ResponseEntity<Void> deletarItem(
            @Parameter(description = "Identificador único (ID) do item a ser excluído", example = "1", required = true)
            @PathVariable Long id) {
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
