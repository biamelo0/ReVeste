package br.com.fatec.reveste.service;

import br.com.fatec.reveste.dto.UsuarioCadastroDTO;
import br.com.fatec.reveste.dto.UsuarioLoginDTO;
import br.com.fatec.reveste.dto.UsuarioResponseDTO;
import br.com.fatec.reveste.exception.ResourceNotFoundException;
import br.com.fatec.reveste.model.Usuario;
import br.com.fatec.reveste.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private final UsuarioRepository repository;

    public UsuarioService(UsuarioRepository repository) {
        this.repository = repository;
    }

    @Transactional
    public UsuarioResponseDTO cadastrar(UsuarioCadastroDTO dto) {
        String emailClean = dto.getEmail().toLowerCase().trim();
        if (repository.existsByEmailIgnoreCase(emailClean)) {
            throw new IllegalArgumentException("Este e-mail já está cadastrado no sistema.");
        }

        boolean isAdm = emailClean.contains("admin") || emailClean.endsWith("@reveste.com.br");
        Usuario u = new Usuario();
        u.setNome(dto.getNome());
        u.setEmail(emailClean);
        u.setSenha(dto.getSenha());
        u.setDocumento(dto.getDocumento());
        u.setEndereco(dto.getEndereco());
        u.setTipo(dto.getTipo() != null ? dto.getTipo() : "pf");
        u.setPontoColeta(dto.getPontoColeta() != null && dto.getPontoColeta());
        u.setIsAdmin(isAdm);
        u.setPontos("pj".equalsIgnoreCase(dto.getTipo()) ? 100 : 50);
        u.setPecasDoadas(0);

        Usuario salvo = repository.save(u);
        return new UsuarioResponseDTO(salvo);
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO autenticar(UsuarioLoginDTO dto) {
        String emailClean = dto.getEmail().toLowerCase().trim();
        Usuario u = repository.findByEmailIgnoreCase(emailClean)
                .orElseThrow(() -> new ResourceNotFoundException("E-mail não encontrado no banco de dados: " + emailClean));

        if (!u.getSenha().equals(dto.getSenha())) {
            throw new IllegalArgumentException("Senha incorreta. Por favor, tente novamente.");
        }

        return new UsuarioResponseDTO(u);
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorId(Long id) {
        Usuario u = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário", id));
        return new UsuarioResponseDTO(u);
    }

    @Transactional(readOnly = true)
    public UsuarioResponseDTO buscarPorEmail(String email) {
        Usuario u = repository.findByEmailIgnoreCase(email.toLowerCase().trim())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com e-mail: " + email));
        return new UsuarioResponseDTO(u);
    }

    @Transactional
    public UsuarioResponseDTO adicionarPontos(Long id, int pontos, int pecas) {
        Usuario u = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário", id));
        u.adicionarPontos(pontos, pecas);
        Usuario atualizado = repository.save(u);
        return new UsuarioResponseDTO(atualizado);
    }

    @Transactional(readOnly = true)
    public List<UsuarioResponseDTO> listarTodos() {
        return repository.findAll()
                .stream()
                .map(UsuarioResponseDTO::new)
                .collect(Collectors.toList());
    }
}
