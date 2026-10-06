import { Target, Leaf, FilePdf, ChartBar } from "@phosphor-icons/react/dist/ssr";

export default function Impacto() {
  const impact = [
    { b: "2.700 L", s: "de água economizados por camiseta reaproveitada" },
    { b: "6,5 kg", s: "de CO₂ evitados por peça reutilizada" },
    { b: "10%", s: "das emissões globais de carbono vêm da moda" },
    { b: "< 1%", s: "das roupas viram novas roupas pela reciclagem" },
  ];

  return (
    <main className="pad wrap">
      <div className="impact" style={{ borderRadius: 32, padding: "80px 40px", marginBottom: 64 }}>
        <div className="title">
          <span className="pill" style={{ background: "rgba(255,255,255,0.2)", color: "white", borderColor: "rgba(255,255,255,0.4)" }}>Transparência</span>
          <h2 style={{ marginTop: 16 }}>Cada peça reaproveitada é uma história <em style={{ color: "#F1E3C4" }}>a menos no aterro</em></h2>
          <p>O sistema fortalece a solidariedade digital, amplia a visibilidade de marcas sustentáveis e contribui para reduzir o impacto ambiental.</p>
        </div>
        <div className="cards">
          {impact.map((c) => (
            <div className="card" key={c.b}><b>{c.b}</b><span>{c.s}</span></div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        <div>
          <h2>Relatórios e Integração</h2>
          <p style={{ marginBottom: 24 }}>Para além do portal público, o sistema de back-office do ReVeste foi desenhado para escalabilidade corporativa e comprovação social.</p>
          <ul style={{ listStyle: "none", display: "grid", gap: 16 }}>
            <li style={{ display: "flex", gap: 16 }}>
              <FilePdf size={28} color="var(--clay)" weight="duotone" />
              <div>
                <strong>Exportação em PDF e CSV</strong>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>O sistema gera relatórios dinâmicos de impacto baseados no banco de dados em tempo real.</p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <ChartBar size={28} color="var(--clay)" weight="duotone" />
              <div>
                <strong>Integração via API (JSON)</strong>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>Dados abertos e seguros podem ser importados para ferramentas de BI e ERP de empresas parceiras.</p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <Leaf size={28} color="var(--clay)" weight="duotone" />
              <div>
                <strong>Selo de Sustentabilidade</strong>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>Empresas que atingem metas de doação recebem selos de validação ambiental para usar em seu marketing.</p>
              </div>
            </li>
          </ul>
        </div>
        <div style={{ background: "var(--white)", padding: 40, borderRadius: 24, border: "1px solid rgba(42,58,39,.08)" }}>
          <Target size={40} color="var(--forest)" weight="fill" style={{ marginBottom: 16 }} />
          <h3>Agenda 2030 (ONU)</h3>
          <p style={{ marginBottom: 24 }}>O ReVeste está estruturado de acordo com os pilares dos Objetivos de Desenvolvimento Sustentável (ODS) das Nações Unidas.</p>
          <div className="ods" style={{ margin: 0, gap: 12 }}>
            <b style={{ border: "1px solid var(--forest)", background: "transparent" }}>ODS 12 · Consumo responsável</b>
            <b style={{ border: "1px solid var(--forest)", background: "transparent" }}>ODS 1 · Erradicação da pobreza</b>
            <b style={{ border: "1px solid var(--forest)", background: "transparent" }}>ODS 13 · Ação climática</b>
          </div>
        </div>
      </div>
    </main>
  );
}
