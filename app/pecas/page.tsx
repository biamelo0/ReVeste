import { TShirt, CoatHanger, Sparkle, Tote } from "@phosphor-icons/react/dist/ssr";

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
        <h1>Catálogo de <em>Peças</em></h1>
        <p>Publique roupas para troca, venda ou doação. Encontre peças que combinam com você e ajude o meio ambiente.</p>
      </div>
      
      <div className="pieces" style={{ marginBottom: 64 }}>
        {pieces.map((p) => (
          <article className="piece" key={p.n}>
            <div className="thumb" style={{ background: p.bg }}>
              <span className="tag">{p.tag}</span>{p.e}
            </div>
            <div className="info">
              <h3>{p.n}</h3>
              <small>{p.m}</small>
              <a href="#" className="btn sm" style={{ width: "100%", justifyContent: "center" }}>Contato via WhatsApp</a>
            </div>
          </article>
        ))}
      </div>

      <div style={{ maxWidth: 800 }}>
        <h2>Publicação e Gestão de Roupas</h2>
        <br/>
        <p style={{ marginBottom: 16 }}>O sistema permite que tanto pessoas físicas quanto empresas publiquem roupas. Na publicação, é possível enviar foto, informar descrição, valor e condição da peça. Cada publicação pode ter uma pequena taxa cobrada por exposição.</p>
        <p style={{ marginBottom: 16 }}>O sistema possui bloqueios inteligentes: ele impede o cadastro de itens com valor acima do limite social estabelecido pela plataforma, garantindo assim que a moda continue acessível.</p>
        <p><strong>Para Empresas:</strong> As empresas interessadas também podem adicionar itens ao carrinho de compras para gerenciar doações ou compras em lote. As trocas e compras diretas são redirecionadas para o WhatsApp do vendedor ou ponto de coleta para maior agilidade.</p>
      </div>
    </main>
  );
}
