package br.com.fatec.reveste.controller;

import br.com.fatec.reveste.dto.UsuarioCadastroDTO;
import br.com.fatec.reveste.dto.UsuarioLoginDTO;
import br.com.fatec.reveste.dto.UsuarioResponseDTO;
import br.com.fatec.reveste.exception.ErrorResponse;
import br.com.fatec.reveste.service.UsuarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

@RestController
@RequestMapping("/api")
@Tag(name = "Autenticação & Usuários", description = "Endpoints de cadastro no banco, autenticação real e gestão de perfis")
public class AuthController {

    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/auth/cadastro")
    @Operation(summary = "Cadastrar novo usuário no banco de dados", description = "Persiste um novo usuário no banco com senha criptografada ou validada.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Usuário cadastrado com sucesso",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "E-mail já cadastrado ou dados inválidos",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<UsuarioResponseDTO> cadastrar(@Valid @RequestBody UsuarioCadastroDTO dto) {
        UsuarioResponseDTO response = usuarioService.cadastrar(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/auth/login")
    @Operation(summary = "Autenticar usuário", description = "Valida o e-mail e a senha fornecidos contra os registros do banco de dados.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Autenticação bem-sucedida",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UsuarioResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "Senha incorreta",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "404", description = "E-mail não encontrado no banco de dados",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)))
    })
    public ResponseEntity<UsuarioResponseDTO> login(@Valid @RequestBody UsuarioLoginDTO dto) {
        UsuarioResponseDTO response = usuarioService.autenticar(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/usuarios/{id}")
    @Operation(summary = "Buscar usuário por ID", description = "Retorna os dados do perfil de um usuário cadastrado.")
    public ResponseEntity<UsuarioResponseDTO> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(usuarioService.buscarPorId(id));
    }

    @GetMapping("/usuarios")
    @Operation(summary = "Listar todos os usuários", description = "Retorna a listagem de usuários cadastrados no banco.")
    public ResponseEntity<List<UsuarioResponseDTO>> listarTodos() {
        return ResponseEntity.ok(usuarioService.listarTodos());
    }

    @PutMapping("/usuarios/{id}/pontos")
    @Operation(summary = "Adicionar pontos ao usuário", description = "Credita pontos e peças doadas na conta do usuário no banco.")
    public ResponseEntity<UsuarioResponseDTO> adicionarPontos(
            @PathVariable Long id,
            @Parameter(description = "Quantidade de pontos a adicionar") @RequestParam int pontos,
            @Parameter(description = "Quantidade de peças doadas") @RequestParam int pecas) {
        return ResponseEntity.ok(usuarioService.adicionarPontos(id, pontos, pecas));
    }
}
