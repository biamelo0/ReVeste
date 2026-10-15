"use client";
import { ChartPieSlice, Leaf, DownloadSimple, Tree } from "@phosphor-icons/react";
import { useReveste } from "../../context/RevesteContext";

export default function Relatorios() {
  const { user } = useReveste();
  const pecasTotais = 1408 + user.pecasDoadas;
  const aguaLitros = (pecasTotais * 102).toLocaleString("pt-BR");
  const co2Evitado = Math.round(pecasTotais * 0.32);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Relatórios ESG</h1>
          <p style={{ color: "var(--muted)" }}>Acompanhe o impacto ambiental e social da sua instituição na moda circular.</p>
        </div>
        <button type="button" className="btn ghost" onClick={() => window.print()}>
          <DownloadSimple weight="bold" /> Exportar / Imprimir PDF
        </button>
      </div>

      <div className="dash-grid" style={{ marginBottom: 32 }}>
        <div className="stat-card">
          <h3>Impacto Hídrico</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{aguaLitros} L</b>
            <Leaf size={32} color="var(--forest)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>Água economizada este ano</span>
        </div>
        <div className="stat-card">
          <h3>Emissão de CO₂</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>- {co2Evitado} kg</b>
            <Tree size={32} color="var(--sage)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>CO₂ evitado com reuso têxtil</span>
        </div>
        <div className="stat-card">
          <h3>Peças Circuladas</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{pecasTotais.toLocaleString("pt-BR")}</b>
            <ChartPieSlice size={32} color="var(--clay)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>Itens coletados e redirecionados</span>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 20, marginBottom: 12 }}>Certificação ODS · Agenda 2030 ONU</h2>
        <p style={{ color: "var(--muted)", fontSize: 15 }}>
          Os indicadores acima são calculados automaticamente com base nos lotes validados pelos pontos de coleta parceiros da rede ReVeste em Itapetininga, atendendo às metas do <b>ODS 12 (Consumo e Produção Responsáveis)</b> e <b>ODS 1 (Erradicação da Pobreza)</b>.
        </p>
      </div>
    </div>
  );
}
