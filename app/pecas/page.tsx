"use client";
import { useState } from "react";
import Link from "next/link";
import { TShirt, CoatHanger, Sparkle, Tote, ImageSquare, CurrencyDollar, ShoppingCart, WhatsappLogo, Plus, X } from "@phosphor-icons/react";
import { useReveste } from "../context/RevesteContext";

interface CatalogoItem {
  id: string;
  n: string;
  m: string;
  descricao: string;
  doador: string;
  ponto: string;
  whatsapp: string;
  tag: string;
  bg: string;
  fotoUrl?: string;
}

export default function Pecas() {
  const { doacoes } = useReveste();
  const [detalhe, setDetalhe] = useState<CatalogoItem | null>(null);
  const [filtro, setFiltro] = useState<"Todos" | "Doação" | "Troca" | "Venda">("Todos");

  const fixedPieces: CatalogoItem[] = [
    { id: "p1", n: "Suéter de tricô bege", m: "Tam. M · Inverno", descricao: "Suéter em tricô macio, sem avarias, lavado e pronto para uso.", doador: "Mariana S.", ponto: "Faculdade de Tecnologia (FATEC)", whatsapp: "15999990000", tag: "Doação", bg: "#EFE3CC" },
    { id: "p2", n: "Camisa verde-sálvia", m: "Tam. P · Casual", descricao: "Camisa de botões em algodão leve, usada apenas duas vezes.", doador: "Lucas P.", ponto: "ONG Mãos Dadas", whatsapp: "15999990000", tag: "Troca", bg: "#DCE5CF" },
    { id: "p3", n: "Cachecol terracota", m: "Tam. único · Acessório", descricao: "Cachecol de lã artesanal super quentinho.", doador: "Ana C.", ponto: "Fundo Social de Solidariedade", whatsapp: "15999990000", tag: "Doação", bg: "#F1D6C6" },
    { id: "p4", n: "Calça jeans reta", m: "Tam. 40 · Casual (R$ 30,00)", descricao: "Calça jeans tradicional em ótimo estado.", doador: "Beatriz M.", ponto: "Faculdade de Tecnologia (FATEC)", whatsapp: "15999990000", tag: "Venda", bg: "#D9E1E6" },
  ];

  const dynamicPieces: CatalogoItem[] = doacoes.map((d, idx) => ({
    id: `dyn-${d.id}`,
    n: d.titulo,
    m: `Tam. ${d.tamanho} · ${d.quantidade} ${d.quantidade === 1 ? "peça" : "peças"}${d.preco ? ` (R$ ${d.preco.toFixed(2)})` : ""}`,
    descricao: d.descricao,
    doador: d.doador,
    ponto: d.pontoDestino,
    whatsapp: d.whatsapp || "15999990000",
    tag: d.modalidade,
    bg: ["#DCE5CF", "#EFE3CC", "#F1D6C6", "#D9E1E6"][idx % 4],
    fotoUrl: d.fotoUrl,
  }));

  const todasPecas = [...dynamicPieces, ...fixedPieces];
  const pecasFiltradas = filtro === "Todos" ? todasPecas : todasPecas.filter((p) => p.tag === filtro);

  const getIcon = (idx: number) => {
    const icons = [
      <TShirt key="1" size={44} weight="light" />,
      <CoatHanger key="2" size={44} weight="light" />,
      <Sparkle key="3" size={44} weight="light" />,
      <Tote key="4" size={44} weight="light" />,
    ];
    return icons[idx % icons.length];
  };

  return (
    <main className="pad wrap">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24, marginBottom: 40 }}>
        <div className="title" style={{ marginBottom: 0 }}>
          <span className="pill">Catálogo ReVeste</span>
          <h1>Explorar <em>Peças</em></h1>
          <p>Acesse o catálogo público de doações, trocas e vendas de roupas com responsabilidade e transparência.</p>
        </div>
        <Link href="/dashboard/doacoes" className="btn">
          <Plus weight="bold" /> Publicar Minha Peça
        </Link>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
        {(["Todos", "Doação", "Troca", "Venda"] as const).map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFiltro(cat)}
            className={filtro === cat ? "btn sm" : "btn sm ghost"}
          >
            {cat}
          </button>
        ))}
      </div>

      {detalhe && (
        <div className="card" style={{ marginBottom: 40, border: "2px solid var(--forest)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
              <span className="pill" style={{ marginBottom: 8 }}>{detalhe.tag}</span>
              <h2 style={{ fontSize: 24, marginBottom: 6 }}>{detalhe.n}</h2>
              <p style={{ color: "var(--muted)", marginBottom: 12 }}>{detalhe.m}</p>
            </div>
            <button type="button" className="btn sm ghost" onClick={() => setDetalhe(null)}>
              <X weight="bold" /> Fechar
            </button>
          </div>
          <p style={{ marginBottom: 16, fontSize: 15 }}>{detalhe.descricao}</p>
          <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 24 }}>
            Publicado por: <b>{detalhe.doador}</b> • Ponto de referência: <b>{detalhe.ponto}</b>
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href={`https://wa.me/55${detalhe.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá! Vi a peça "${detalhe.n}" (${detalhe.tag}) na plataforma ReVeste e tenho interesse!`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <WhatsappLogo size={20} weight="fill" /> Conversar no WhatsApp
            </a>
            <Link href="/dashboard/doacoes" className="btn ghost">
              Quero Doar ou Trocar uma Peça
            </Link>
          </div>
        </div>
      )}

      <div className="pieces" style={{ marginBottom: 80 }}>
        {pecasFiltradas.map((p, idx) => (
          <article className="piece" key={p.id}>
            <div className="thumb" style={{ background: p.bg, overflow: "hidden" }}>
              <span className="tag">{p.tag}</span>
              {p.fotoUrl ? (
                <img src={p.fotoUrl} alt={p.n} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                getIcon(idx)
              )}
            </div>
            <div className="info">
              <h3>{p.n}</h3>
              <small>{p.m}</small>
              <button
                type="button"
                className="btn sm"
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => setDetalhe(p)}
              >
                Ver Detalhes
              </button>
            </div>
          </article>
        ))}
      </div>

      <div style={{ background: "var(--white)", borderRadius: 32, padding: 64, border: "1px solid rgba(42,58,39,.08)" }}>
        <h2 style={{ marginBottom: 32, textAlign: "center" }}>Regras de Publicação</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}>
          <div>
            <ImageSquare size={32} color="var(--sage)" weight="fill" style={{ marginBottom: 12 }} />
            <h4>Upload de Imagens</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>Toda peça exige foto real (até 5MB, JPG/PNG). As imagens passam por otimização automática no sistema.</p>
          </div>
          <div>
            <CurrencyDollar size={32} color="var(--clay)" weight="fill" style={{ marginBottom: 12 }} />
            <h4>Limite Social de Preço</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>Para evitar revendas abusivas, bloqueamos o cadastro de itens cujo valor ultrapasse o limite definido pela plataforma.</p>
          </div>
          <div>
            <WhatsappLogo size={32} color="#25D366" weight="fill" style={{ marginBottom: 12 }} />
            <h4>Contato Direto</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>Os interessados são redirecionados de forma segura ao WhatsApp de quem publicou, com mensagem pré-definida.</p>
          </div>
          <div>
            <ShoppingCart size={32} color="var(--forest)" weight="fill" style={{ marginBottom: 12 }} />
            <h4>Empresas e Lotes</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>Empresas possuem um sistema de Carrinho de Compras ativo por sessão para gerenciar grandes volumes e promover a marca.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
