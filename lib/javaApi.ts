/**
 * Cliente de Integração com a API RESTful Java Spring Boot do ReVeste.
 * Conecta o Front-end (Next.js / React) ao Back-end Java (porta 8080).
 */

export const JAVA_API_BASE_URL =
  process.env.NEXT_PUBLIC_JAVA_API_URL || "http://localhost:8080";

export interface ItemDoacaoJava {
  id: number;
  codigo: string;
  titulo: string;
  descricao: string;
  categoria: string;
  tamanho: string;
  quantidade: number;
  modalidade: "Doação" | "Troca" | "Venda";
  preco?: number | null;
  pontoColeta: string;
  doador: string;
  whatsapp?: string;
  fotoUrl?: string;
  status: "Aguardando entrega" | "Recebido no ponto" | "Validado pela ONG" | "Reprovado" | "DISPONIVEL" | string;
  pontosSustentaveis: number;
  dataCadastro: string;
}

export interface ItemDoacaoInput {
  codigo?: string;
  titulo: string;
  descricao: string;
  categoria?: string;
  tamanho: string;
  quantidade: number;
  modalidade?: "Doação" | "Troca" | "Venda";
  preco?: number | null;
  pontoColeta: string;
  doador: string;
  whatsapp?: string;
  fotoUrl?: string;
  status?: string;
}

/**
 * Verifica se a API Java Spring Boot está em execução e acessível.
 */
export async function checkJavaApiHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);
    const res = await fetch(`${JAVA_API_BASE_URL}/api/itens`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * GET /api/itens - Retorna todos os itens cadastrados no back-end Java.
 */
export async function listarItensJava(categoria?: string): Promise<ItemDoacaoJava[]> {
  const url = categoria
    ? `${JAVA_API_BASE_URL}/api/itens?categoria=${encodeURIComponent(categoria)}`
    : `${JAVA_API_BASE_URL}/api/itens`;

  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Erro ao carregar itens (${res.status})`);
  }

  return res.json();
}

/**
 * GET /api/itens/{id} - Busca um item específico por ID.
 */
export async function buscarItemPorIdJava(id: number): Promise<ItemDoacaoJava> {
  const res = await fetch(`${JAVA_API_BASE_URL}/api/itens/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Item #${id} não encontrado (${res.status})`);
  }

  return res.json();
}

/**
 * POST /api/itens - Cadastra um novo item de doação.
 */
export async function criarItemJava(dados: ItemDoacaoInput): Promise<ItemDoacaoJava> {
  const res = await fetch(`${JAVA_API_BASE_URL}/api/itens`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const errorMsg =
      errorBody.details && Array.isArray(errorBody.details)
        ? errorBody.details.join(", ")
        : errorBody.message || `Erro ao criar item (${res.status})`;
    throw new Error(errorMsg);
  }

  return res.json();
}

/**
 * PUT /api/itens/{id} - Atualiza um item existente pelo ID.
 */
export async function atualizarItemJava(
  id: number,
  dados: ItemDoacaoInput
): Promise<ItemDoacaoJava> {
  const res = await fetch(`${JAVA_API_BASE_URL}/api/itens/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const errorMsg =
      errorBody.details && Array.isArray(errorBody.details)
        ? errorBody.details.join(", ")
        : errorBody.message || `Erro ao atualizar item (${res.status})`;
    throw new Error(errorMsg);
  }

  return res.json();
}

/**
 * DELETE /api/itens/{id} - Exclui um item específico pelo ID.
 */
export async function deletarItemJava(id: number): Promise<void> {
  const res = await fetch(`${JAVA_API_BASE_URL}/api/itens/${id}`, {
    method: "DELETE",
  });

  if (!res.ok && res.status !== 204) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.message || `Erro ao excluir item #${id} (${res.status})`);
  }
}
