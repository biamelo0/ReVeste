import { TShirt, CoatHanger, Sparkle, Tote, ImageSquare, CurrencyDollar, ShoppingCart, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export default function Pecas() {
  const pieces = [
    { e: <TShirt size={44} weight="light" />, n: "Suéter de tricô bege", m: "Tam. M · Inverno", tag: "Doação", bg: "#EFE3CC" },
    { e: <CoatHanger size={44} weight="light" />, n: "Camisa verde-sálvia", m: "Tam. P · Casual", tag: "Troca", bg: "#DCE5CF" },
    { e: <Sparkle size={44} weight="light" />, n: "Cachecol terracota", m: "Tam. único · Acessório", tag: "Doação", bg: "#F1D6C6" },
    { e: <Tote size={44} weight="light" />, n: "Calça jeans reta", m: "Tam. 40 · Casual", tag: "Venda", bg: "#D9E1E6" },
  ];

  return (
    <main className="pad wrap">
      <div className="title">
        <span className="pill">Catálogo ReVeste</span>
        <h1>Explorar <em>Peças</em></h1>
        <p>Acesse o catálogo público de doações, trocas e vendas de roupas com responsabilidade e transparência.</p>
      </div>
      
      <div className="pieces" style={{ marginBottom: 80 }}>
        {pieces.map((p) => (
          <article className="piece" key={p.n}>
            <div className="thumb" style={{ background: p.bg }}>
              <span className="tag">{p.tag}</span>{p.e}
            </div>
            <div className="info">
              <h3>{p.n}</h3>
              <small>{p.m}</small>
              <a href="#" className="btn sm" style={{ width: "100%", justifyContent: "center" }}>Ver Detalhes</a>
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
