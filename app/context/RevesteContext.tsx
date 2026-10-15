"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface UserProfile {
  nome: string;
  email: string;
  documento: string;
  endereco: string;
  tipo: "pf" | "pj";
  pontoColeta: boolean;
  pontos: number;
  pecasDoadas: number;
}

export interface DoacaoItem {
  id: string;
  codigo: string;
  titulo: string;
  descricao: string;
  quantidade: number;
  tamanho: string;
  modalidade: "Doação" | "Troca" | "Venda";
  preco?: number;
  pontoDestino: string;
  doador: string;
  whatsapp?: string;
  dataCriacao: string;
  status: "Aguardando entrega" | "Recebido no ponto" | "Validado pela ONG" | "Reprovado";
  pontosGerados: number;
  fotoUrl?: string;
  motivoReprovacao?: string;
}

export interface CampanhaItem {
  id: string;
  nome: string;
  organizador: string;
  local: string;
  descricao: string;
  itensPrioritarios: string[];
  periodo: string;
  arrecadado: number;
  meta: number;
  status: "Ativa" | "Encerrada";
}

export interface LojaItem {
  id: string;
  nome: string;
  ong: string;
  enderecoRetirada: string;
  descricao: string;
  categoria: "camisa" | "jaqueta" | "ecobag" | "sueter" | "calca" | "cachecol";
  tamanho: string;
  pontos: number;
  corFundo: string;
  corPeca: string;
  resgatado?: boolean;
  voucherCodigo?: string;
}

export interface MovimentacaoItem {
  id: string;
  titulo: string;
  subtitulo: string;
  pontosTexto: string;
  tipo: "credito" | "debito";
}

interface RevesteContextType {
  user: UserProfile;
  doacoes: DoacaoItem[];
  campanhas: CampanhaItem[];
  itensLoja: LojaItem[];
  movimentacoes: MovimentacaoItem[];
  login: (email: string, nome?: string) => void;
  register: (dados: Partial<UserProfile>) => void;
  updateProfile: (dados: Partial<UserProfile>) => void;
  criarDoacao: (dados: {
    titulo: string;
    descricao: string;
    quantidade: number;
    tamanho: string;
    modalidade: "Doação" | "Troca" | "Venda";
    preco?: number;
    pontoDestino: string;
    whatsapp?: string;
    fotoUrl?: string;
  }) => DoacaoItem;
  receberDoacao: (codigo: string) => { ok: boolean; msg: string; item?: DoacaoItem };
  validarDoacao: (id: string, aprovar: boolean, pontos?: number, motivo?: string) => void;
  criarCampanha: (dados: {
    nome: string;
    organizador: string;
    local: string;
    descricao: string;
    itensPrioritarios: string[];
    periodo: string;
    meta: number;
  }) => void;
  doarParaCampanha: (campanhaId: string, quantidade: number, descricaoItens: string) => DoacaoItem | null;
  resgatarItemLoja: (id: string) => { ok: boolean; msg: string; item?: LojaItem };
}

const DEFAULT_USER: UserProfile = {
  nome: "Beatriz Melo",
  email: "beatriz@fatec.sp.gov.br",
  documento: "123.456.789-00",
  endereco: "Rua das Flores, 120 - Centro, Itapetininga/SP",
  tipo: "pf",
  pontoColeta: false,
  pontos: 450,
  pecasDoadas: 12,
};

const DEFAULT_DOACOES: DoacaoItem[] = [
  {
    id: "1",
    codigo: "REV-8841",
    titulo: "Lote de Inverno",
    descricao: "3 Casacos, 2 Calças em ótimo estado",
    quantidade: 5,
    tamanho: "M / G",
    modalidade: "Doação",
    pontoDestino: "ONG Mãos Dadas",
    doador: "Beatriz Melo",
    whatsapp: "15999990000",
    dataCriacao: "Há 3 dias",
    status: "Validado pela ONG",
    pontosGerados: 150,
  },
  {
    id: "2",
    codigo: "REV-9823",
    titulo: "Camisetas Básicas",
    descricao: "5 Peças de algodão lavadas",
    quantidade: 5,
    tamanho: "M",
    modalidade: "Doação",
    pontoDestino: "Faculdade de Tecnologia (FATEC)",
    doador: "Beatriz Melo",
    whatsapp: "15999990000",
    dataCriacao: "Hoje",
    status: "Aguardando entrega",
    pontosGerados: 150,
  },
  {
    id: "3",
    codigo: "REV-9021",
    titulo: "Blusas de Frio Tricô",
    descricao: "5 blusas de frio higienizadas",
    quantidade: 5,
    tamanho: "G",
    modalidade: "Doação",
    pontoDestino: "Fundo Social de Solidariedade",
    doador: "João Silva",
    whatsapp: "15988881111",
    dataCriacao: "Ontem",
    status: "Recebido no ponto",
    pontosGerados: 150,
  },
  {
    id: "4",
    codigo: "REV-9022",
    titulo: "Calçados Diversos",
    descricao: "3 pares de tênis casuais em bom estado",
    quantidade: 3,
    tamanho: "38 / 40",
    modalidade: "Troca",
    pontoDestino: "ONG Mãos Dadas",
    doador: "Maria Oliveira",
    whatsapp: "15977772222",
    dataCriacao: "Há 2 horas",
    status: "Recebido no ponto",
    pontosGerados: 90,
  },
];

const DEFAULT_CAMPANHAS: CampanhaItem[] = [
  {
    id: "c1",
    nome: "Agasalho Solidário 2026",
    descricao: "Foco em roupas de inverno, cobertores e meias.",
    periodo: "01 Jun - 30 Jul",
    arrecadado: 1200,
    meta: 2000,
    status: "Ativa",
  },
  {
    id: "c2",
    nome: "Volta às Aulas Circular",
    descricao: "Arrecadação de uniformes, mochilas e calçados infantis.",
    periodo: "15 Jan - 01 Mar",
    arrecadado: 480,
    meta: 500,
    status: "Ativa",
  },
];

const DEFAULT_LOJA: LojaItem[] = [
  { id: "l1", nome: "Camisa Social Upcycling", ong: "ONG Costura Viva", tamanho: "Tam. M", pontos: 120, corFundo: "#DCE5CF" },
  { id: "l2", nome: "Jaqueta Jeans Customizada", ong: "Instituto Mãos Dadas", tamanho: "Tam. G", pontos: 180, corFundo: "#D9E1E6" },
  { id: "l3", nome: "Ecobag Algodão Reciclado", ong: "Projeto ReVeste FATEC", tamanho: "Tam. Único", pontos: 80, corFundo: "#EFE3CC" },
  { id: "l4", nome: "Suéter Tricô Sustentável", ong: "Fundo Social", tamanho: "Tam. P", pontos: 150, corFundo: "#F1D6C6" },
  { id: "l5", nome: "Calça Sarja Verde-Oliva", ong: "ONG Costura Viva", tamanho: "Tam. 40", pontos: 140, corFundo: "#DCE5CF" },
  { id: "l6", nome: "Cachecol Artesanal Lã", ong: "Instituto Mãos Dadas", tamanho: "Tam. Único", pontos: 90, corFundo: "#EFE3CC" },
];

const DEFAULT_MOVIMENTACOES: MovimentacaoItem[] = [
  {
    id: "m1",
    titulo: "Doação Validada",
    subtitulo: "Ponto de coleta: ONG Abrace Solidário",
    pontosTexto: "+ 50 pts",
    tipo: "credito",
  },
  {
    id: "m2",
    titulo: "Compra na Loja Solidária",
    subtitulo: "Casaco de Inverno (Tamanho M)",
    pontosTexto: "- 120 pts",
    tipo: "debito",
  },
  {
    id: "m3",
    titulo: "Doação Validada",
    subtitulo: "Ponto de coleta: Caixa ReVeste Centro",
    pontosTexto: "+ 30 pts",
    tipo: "credito",
  },
];

const RevesteContext = createContext<RevesteContextType | null>(null);

const STORAGE_KEY = "reveste_app_state_v1";

export function RevesteProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [doacoes, setDoacoes] = useState<DoacaoItem[]>(DEFAULT_DOACOES);
  const [campanhas, setCampanhas] = useState<CampanhaItem[]>(DEFAULT_CAMPANHAS);
  const [itensLoja, setItensLoja] = useState<LojaItem[]>(DEFAULT_LOJA);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoItem[]>(DEFAULT_MOVIMENTACOES);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.user) setUser(parsed.user);
        if (parsed.doacoes) setDoacoes(parsed.doacoes);
        if (parsed.campanhas) setCampanhas(parsed.campanhas);
        if (parsed.itensLoja) setItensLoja(parsed.itensLoja);
        if (parsed.movimentacoes) setMovimentacoes(parsed.movimentacoes);
      }
    } catch {
      // ignore storage errors
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ user, doacoes, campanhas, itensLoja, movimentacoes })
      );
    } catch {
      // ignore quota errors
    }
  }, [user, doacoes, campanhas, itensLoja, movimentacoes, hydrated]);

  const login = (email: string, nome?: string) => {
    setUser((prev) => ({
      ...prev,
      email,
      nome: nome || prev.nome || email.split("@")[0],
    }));
  };

  const register = (dados: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...dados,
    }));
  };

  const updateProfile = (dados: Partial<UserProfile>) => {
    setUser((prev) => ({
      ...prev,
      ...dados,
    }));
  };

  const criarDoacao: RevesteContextType["criarDoacao"] = (dados) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const codigo = `REV-${randomNum}`;
    const pontosGerados = Math.max(1, dados.quantidade) * 30;
    const nova: DoacaoItem = {
      id: String(Date.now()),
      codigo,
      titulo: dados.titulo,
      descricao: dados.descricao,
      quantidade: dados.quantidade,
      tamanho: dados.tamanho,
      modalidade: dados.modalidade,
      preco: dados.preco,
      pontoDestino: dados.pontoDestino,
      doador: user.nome,
      whatsapp: dados.whatsapp || "15999990000",
      dataCriacao: "Agora mesmo",
      status: "Aguardando entrega",
      pontosGerados,
      fotoUrl: dados.fotoUrl,
    };
    setDoacoes((prev) => [nova, ...prev]);
    return nova;
  };

  const receberDoacao: RevesteContextType["receberDoacao"] = (codigoInput) => {
    const clean = codigoInput.trim().toUpperCase();
    if (!clean) {
      return { ok: false, msg: "Digite um código válido (ex: REV-9823)." };
    }
    const found = doacoes.find((d) => d.codigo.toUpperCase() === clean);
    if (!found) {
      // Se não existir na lista, cria um lote avulso recebido no ponto para facilitar testes!
      const novoRecebido: DoacaoItem = {
        id: String(Date.now()),
        codigo: clean.startsWith("REV-") ? clean : `REV-${clean}`,
        titulo: `Sacola avulsa (${clean})`,
        descricao: "4 peças diversas entregues no ponto de coleta",
        quantidade: 4,
        tamanho: "M / G",
        modalidade: "Doação",
        pontoDestino: "Faculdade de Tecnologia (FATEC)",
        doador: "Doador Presencial",
        dataCriacao: "Agora mesmo",
        status: "Recebido no ponto",
        pontosGerados: 120,
      };
      setDoacoes((prev) => [novoRecebido, ...prev]);
      return {
        ok: true,
        msg: `Recebimento do pacote ${novoRecebido.codigo} registrado! Enviado para a fila de Validação.`,
        item: novoRecebido,
      };
    }

    if (found.status === "Validado pela ONG") {
      return { ok: false, msg: `O lote ${found.codigo} já foi validado anteriormente.` };
    }

    const atualizado: DoacaoItem = { ...found, status: "Recebido no ponto" };
    setDoacoes((prev) => prev.map((d) => (d.id === found.id ? atualizado : d)));
    return {
      ok: true,
      msg: `Lote ${found.codigo} (${found.titulo}) recebido com sucesso! Agora ele está disponível em "Validar Peças".`,
      item: atualizado,
    };
  };

  const validarDoacao: RevesteContextType["validarDoacao"] = (id, aprovar, pontosCustom, motivo) => {
    const alvo = doacoes.find((d) => d.id === id);
    if (!alvo) return;

    const pts = pontosCustom ?? alvo.pontosGerados;

    setDoacoes((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status: aprovar ? "Validado pela ONG" : "Reprovado",
              pontosGerados: aprovar ? pts : 0,
              motivoReprovacao: aprovar ? undefined : motivo || "Peças fora dos critérios de higienização/uso.",
            }
          : d
      )
    );

    if (aprovar) {
      setUser((prev) => ({
        ...prev,
        pontos: prev.pontos + pts,
        pecasDoadas: prev.pecasDoadas + alvo.quantidade,
      }));
      setMovimentacoes((prev) => [
        {
          id: String(Date.now()),
          titulo: `Doação Validada (${alvo.codigo})`,
          subtitulo: `${alvo.titulo} • Ponto: ${alvo.pontoDestino}`,
          pontosTexto: `+ ${pts} pts`,
          tipo: "credito",
        },
        ...prev,
      ]);
    }
  };

  const criarCampanha: RevesteContextType["criarCampanha"] = (dados) => {
    const nova: CampanhaItem = {
      id: String(Date.now()),
      nome: dados.nome,
      descricao: dados.descricao,
      periodo: dados.periodo,
      meta: dados.meta,
      arrecadado: 0,
      status: "Ativa",
    };
    setCampanhas((prev) => [nova, ...prev]);
  };

  const resgatarItemLoja: RevesteContextType["resgatarItemLoja"] = (id) => {
    const item = itensLoja.find((i) => i.id === id);
    if (!item) return { ok: false, msg: "Item não encontrado." };
    if (item.resgatado) return { ok: false, msg: "Você já resgatou esta peça!" };
    if (user.pontos < item.pontos) {
      return {
        ok: false,
        msg: `Saldo insuficiente! Você tem ${user.pontos} pts e esta peça requer ${item.pontos} pts.`,
      };
    }

    setUser((prev) => ({
      ...prev,
      pontos: prev.pontos - item.pontos,
    }));

    setItensLoja((prev) =>
      prev.map((i) => (i.id === id ? { ...i, resgatado: true } : i))
    );

    setMovimentacoes((prev) => [
      {
        id: String(Date.now()),
        titulo: "Resgate na Loja Solidária",
        subtitulo: `${item.nome} (${item.tamanho}) • ${item.ong}`,
        pontosTexto: `- ${item.pontos} pts`,
        tipo: "debito",
      },
      ...prev,
    ]);

    return {
      ok: true,
      msg: `Parabéns! Você resgatou "${item.nome}" por ${item.pontos} pts. Retire na ${item.ong}.`,
    };
  };

  return (
    <RevesteContext.Provider
      value={{
        user,
        doacoes,
        campanhas,
        itensLoja,
        movimentacoes,
        login,
        register,
        updateProfile,
        criarDoacao,
        receberDoacao,
        validarDoacao,
        criarCampanha,
        resgatarItemLoja,
      }}
    >
      {children}
    </RevesteContext.Provider>
  );
}

export function useReveste() {
  const ctx = useContext(RevesteContext);
  if (!ctx) {
    throw new Error("useReveste deve ser usado dentro de RevesteProvider");
  }
  return ctx;
}
