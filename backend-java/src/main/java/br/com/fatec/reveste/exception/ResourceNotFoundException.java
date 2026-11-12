package br.com.fatec.reveste.exception;

/**
 * Exceção lançada quando um recurso solicitado não é encontrado no banco de dados.
 */
public class ResourceNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, Long id) {
        super(String.format("%s não encontrado com ID: %d", resourceName, id));
    }
}
