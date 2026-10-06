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
          <h2>Cada peça reaproveitada é uma história <em style={{ color: "#F1E3C4" }}>a menos no aterro</em></h2>
          <p>O sistema fortalece a solidariedade digital, amplia a visibilidade de marcas sustentáveis e contribui para reduzir o impacto ambiental.</p>
        </div>
        <div className="cards">
          {impact.map((c) => (
            <div className="card" key={c.b}><b>{c.b}</b><span>{c.s}</span></div>
          ))}
        </div>
        <div className="ods" style={{ marginTop: 40 }}>
          Alinhado à Agenda 2030 da ONU: <b>ODS 12 · Consumo responsável</b> <b>ODS 1 · Erradicação da pobreza</b>
        </div>
      </div>

      <div style={{ maxWidth: 800 }}>
        <h2>Relatórios de Impacto e Integração de Dados</h2>
        <br/>
        <p style={{ marginBottom: 16 }}>A plataforma gera relatórios de impacto ambiental baseados nas doações e trocas, exibindo indicadores de sustentabilidade em tempo real e permitindo a exportação em PDF. Tais métricas trazem transparência à rede.</p>
        <p style={{ marginBottom: 16 }}>Para empresas parceiras, o sistema também oferece um <strong>selo de sustentabilidade</strong> e o acompanhamento do fluxo de roupas sustentáveis vendidas. O projeto ReVeste também foi projetado para integrar ou exportar (JSON/CSV) dados para plataformas corporativas, de marketing ou ferramentas de Business Intelligence (BI).</p>
      </div>
    </main>
  );
}
