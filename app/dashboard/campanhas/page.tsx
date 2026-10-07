import { Megaphone, Plus, Users, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export default function Campanhas() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Campanhas de Arrecadação</h1>
          <p style={{ color: "var(--muted)" }}>Gestão de campanhas (Acesso: Empresas e ONGs).</p>
        </div>
        <button className="btn"><Plus weight="bold" /> Nova Campanha</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          <span>Campanha</span>
          <span>Período</span>
          <span>Status</span>
        </div>
        
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: 12, background: "rgba(102, 121, 79, 0.1)", borderRadius: 12, color: "var(--forest)" }}><Megaphone size={24} /></div>
            <div>
              <b style={{ display: "block" }}>Agasalho Solidário 2026</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Foco em roupas de inverno.</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 14 }}>
            <CalendarBlank size={16} /> 01 Jun - 30 Jul
          </div>
          <b style={{ color: "var(--forest)" }}>Ativa (1.200 peças)</b>
        </div>
      </div>
    </div>
  );
}
