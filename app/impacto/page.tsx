import { Target, Leaf, FilePdf, ChartBar } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Impacto() {
  const impact = [
    { b: "2.700 L", s: "de água economizados por camiseta reaproveitada" },
    { b: "6,5 kg", s: "de CO₂ evitados por peça reutilizada" },
    { b: "10%", s: "das emissões globais de carbono vêm da moda" },
    { b: "< 1%", s: "das roupas viram novas roupas pela reciclagem" },
  ];

  return (
    <main className="pad wrap">
      <div className="impact responsive-box-pad" style={{ borderRadius: 32, marginBottom: 48 }}>
        <div className="title">
          <span className="pill" style={{ background: "rgba(42,58,39,0.5)", color: "#FFFDF7", borderColor: "rgba(255,255,255,0.35)" }}>
            Transparência Ambiental
          </span>
          <h2 style={{ marginTop: 12, color: "var(--white)" }}>
            Cada peça reaproveitada é uma história <em style={{ color: "#F1E3C4" }}>a menos no aterro</em>
          </h2>
          <p style={{ color: "#F2F6EC" }}>
            O sistema fortalece a solidariedade digital, amplia a visibilidade de marcas sustentáveis e contribui para reduzir o impacto ambiental.
          </p>
        </div>
        <div className="cards">
          {impact.map((c) => (
            <div className="card" key={c.b}>
              <b>{c.b}</b>
              <span>{c.s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-responsive-2" style={{ alignItems: "start", gap: 36 }}>
        <div>
          <h2>Relatórios e Integração</h2>
          <p style={{ marginBottom: 24, color: "var(--muted)" }}>
            Para além do portal público, o sistema de back-office do ReVeste foi desenhado para escalabilidade corporativa e comprovação social.
          </p>
          <ul style={{ listStyle: "none", display: "grid", gap: 16 }}>
            <li style={{ display: "flex", gap: 16 }}>
              <FilePdf size={28} color="var(--clay)" weight="duotone" />
              <div>
                <strong>Exportação de Relatório Oficial ESG</strong>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>
                  O sistema gera documentos auditáveis e planilhas CSV com métricas hídricas, carbono evitado e destinação têxtil.
                </p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <ChartBar size={28} color="var(--clay)" weight="duotone" />
              <div>
                <strong>Rastreabilidade por Lote</strong>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>
                  Cada doação recebe um código único auditado pelos pontos de coleta e ONGs parceiras de Itapetininga.
                </p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <Leaf size={28} color="var(--clay)" weight="duotone" />
              <div>
                <strong>Selo de Sustentabilidade</strong>
                <p style={{ fontSize: 14, color: "var(--muted)" }}>
                  Empresas que atingem metas de doação recebem selos de validação ambiental alinhados aos ODS da ONU.
                </p>
              </div>
            </li>
          </ul>
          <div style={{ marginTop: 28 }}>
            <Link href="/dashboard/relatorios" className="btn sm">
              Acessar Painel de Relatórios ESG
            </Link>
          </div>
        </div>
        <div style={{ background: "var(--white)", padding: 40, borderRadius: 24, border: "1px solid rgba(42,58,39,.08)" }}>
          <Target size={40} color="var(--forest)" weight="fill" style={{ marginBottom: 16 }} />
          <h3>Agenda 2030 (ONU)</h3>
          <p style={{ marginBottom: 24, color: "var(--muted)" }}>
            O ReVeste está estruturado de acordo com os pilares dos Objetivos de Desenvolvimento Sustentável (ODS) das Nações Unidas.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <span style={{ padding: "8px 16px", borderRadius: 999, background: "var(--sand)", color: "var(--forest)", fontWeight: 600, fontSize: 14 }}>
              ODS 12 · Consumo responsável
            </span>
            <span style={{ padding: "8px 16px", borderRadius: 999, background: "var(--sand)", color: "var(--forest)", fontWeight: 600, fontSize: 14 }}>
              ODS 1 · Erradicação da pobreza
            </span>
            <span style={{ padding: "8px 16px", borderRadius: 999, background: "var(--sand)", color: "var(--forest)", fontWeight: 600, fontSize: 14 }}>
              ODS 13 · Ação climática
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
