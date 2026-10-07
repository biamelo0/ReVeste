import { Plus, Package, Clock, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default function Doacoes() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Minhas Doações</h1>
          <p style={{ color: "var(--muted)" }}>Histórico de itens que você enviou para a rede.</p>
        </div>
        <button className="btn"><Plus weight="bold" /> Nova Doação</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          <span>Item / Lote</span>
          <span>Status</span>
          <span>Pontos Recebidos</span>
        </div>
        
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: 12, background: "rgba(102, 121, 79, 0.1)", borderRadius: 12, color: "var(--forest)" }}><Package size={24} /></div>
            <div>
              <b style={{ display: "block" }}>Lote de Inverno</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>3 Casacos, 2 Calças</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--sage)", fontWeight: 500, fontSize: 14 }}>
            <CheckCircle size={20} weight="fill" /> Validado pela ONG
          </div>
          <b style={{ color: "var(--forest)" }}>+ 150 pts</b>
        </div>

        <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: 12, background: "rgba(184, 97, 63, 0.1)", borderRadius: 12, color: "var(--clay)" }}><Package size={24} /></div>
            <div>
              <b style={{ display: "block" }}>Camisetas Básicas</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>5 Peças de algodão</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--clay)", fontWeight: 500, fontSize: 14 }}>
            <Clock size={20} weight="fill" /> Aguardando entrega no ponto
          </div>
          <span style={{ color: "var(--muted)", fontSize: 14 }}>Em breve</span>
        </div>
      </div>
    </div>
  );
}
