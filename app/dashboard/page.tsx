import { HandHeart, Coins, Leaf, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export default function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Visão Geral</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>Acompanhe o seu impacto sustentável e suas recompensas.</p>

      <div className="dash-grid">
        <div className="stat-card">
          <h3>Pontos Acumulados</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>450</b>
            <Coins size={32} color="var(--clay)" weight="duotone" />
          </div>
        </div>
        <div className="stat-card">
          <h3>Peças Doadas</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>12</b>
            <HandHeart size={32} color="var(--sage)" weight="duotone" />
          </div>
        </div>
        <div className="stat-card">
          <h3>Água Economizada</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>32.400 L</b>
            <Leaf size={32} color="var(--forest)" weight="duotone" />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 24 }}>Últimas Movimentações</h2>
        <ul style={{ listStyle: "none", display: "grid", gap: 16 }}>
          <li style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 12 }}>
            <CheckCircle size={24} color="var(--sage)" weight="fill" />
            <div style={{ flex: 1 }}>
              <b style={{ display: "block", fontSize: 15 }}>Doação Validada</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Ponto de coleta: ONG Abrace Solidário</span>
            </div>
            <b style={{ color: "var(--forest)" }}>+ 50 pts</b>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 12 }}>
            <CheckCircle size={24} color="var(--sage)" weight="fill" />
            <div style={{ flex: 1 }}>
              <b style={{ display: "block", fontSize: 15 }}>Compra na Loja Solidária</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Casaco de Inverno (Tamanho M)</span>
            </div>
            <b style={{ color: "var(--clay)" }}>- 120 pts</b>
          </li>
          <li style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 12 }}>
            <CheckCircle size={24} color="var(--sage)" weight="fill" />
            <div style={{ flex: 1 }}>
              <b style={{ display: "block", fontSize: 15 }}>Doação Validada</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Ponto de coleta: Caixa ReVeste Centro</span>
            </div>
            <b style={{ color: "var(--forest)" }}>+ 30 pts</b>
          </li>
        </ul>
      </div>
    </div>
  );
}
