import { ShoppingCart, Star } from "@phosphor-icons/react/dist/ssr";

export default function LojaSolidaria() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Loja Solidária</h1>
          <p style={{ color: "var(--muted)" }}>Troque seus pontos por peças sustentáveis com desconto simbólico.</p>
        </div>
        <div style={{ padding: "8px 16px", background: "rgba(102, 121, 79, 0.1)", color: "var(--forest)", borderRadius: 99, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <Star weight="fill" /> Saldo: 450 pts
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="card" style={{ padding: 20, display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%", aspectRatio: "1/1", background: "#f0f0f0", borderRadius: 16, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)" }}>
              [Imagem da Peça]
            </div>
            <b style={{ fontSize: 16, marginBottom: 4 }}>Camisa Social Upcycling</b>
            <span style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>ONG Costura Viva</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <b style={{ color: "var(--clay)", fontSize: 18 }}>120 pts</b>
              <button className="btn sm ghost" style={{ padding: "6px 12px" }}><ShoppingCart /> Pegar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
