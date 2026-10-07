import { ChartPieSlice, Leaf, DownloadSimple, Tree } from "@phosphor-icons/react/dist/ssr";

export default function Relatorios() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Relatórios ESG</h1>
          <p style={{ color: "var(--muted)" }}>Acompanhe o impacto da sua empresa na moda circular.</p>
        </div>
        <button className="btn ghost"><DownloadSimple weight="bold" /> Exportar PDF</button>
      </div>

      <div className="dash-grid" style={{ marginBottom: 32 }}>
        <div className="stat-card">
          <h3>Impacto Hídrico</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>145.000 L</b>
            <Leaf size={32} color="var(--forest)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>Água economizada este ano</span>
        </div>
        <div className="stat-card">
          <h3>Emissão de CO2</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>- 450 kg</b>
            <Tree size={32} color="var(--sage)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>CO2 evitado com reuso</span>
        </div>
        <div className="stat-card">
          <h3>Peças Circuladas</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>1.420</b>
            <ChartPieSlice size={32} color="var(--clay)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>Itens coletados e redirecionados</span>
        </div>
      </div>
    </div>
  );
}
