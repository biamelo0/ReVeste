import { ShieldCheck, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export default function ValidarPecas() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em", color: "var(--clay)", fontWeight: 600 }}>Ponto de Coleta / Triagem</span>
        <h1 style={{ fontSize: 28, marginBottom: 8, marginTop: 4 }}>Validar Peças e Dar Pontos</h1>
        <p style={{ color: "var(--muted)" }}>Avalie as peças recebidas e libere os pontos de recompensa para os doadores.</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          <span>Lote Aguardando Triagem</span>
          <span>Doador</span>
          <span>Ação</span>
        </div>
        
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", alignItems: "center" }}>
          <div>
            <b style={{ display: "block" }}>Lote #REV-9021</b>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Entregue ontem • 5 blusas de frio</span>
          </div>
          <div style={{ fontSize: 14 }}>João Silva</div>
          <button className="btn sm ghost" style={{ width: "fit-content" }}>Iniciar Avaliação <ArrowRight /></button>
        </div>

        <div style={{ padding: "20px 24px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", alignItems: "center" }}>
          <div>
            <b style={{ display: "block" }}>Lote #REV-9022</b>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Entregue há 2 horas • Calçados diversos</span>
          </div>
          <div style={{ fontSize: 14 }}>Maria Oliveira</div>
          <button className="btn sm ghost" style={{ width: "fit-content" }}>Iniciar Avaliação <ArrowRight /></button>
        </div>
      </div>
      
      <div style={{ marginTop: 32, padding: 24, background: "rgba(102, 121, 79, 0.05)", borderRadius: 16, border: "1px dashed var(--sage)" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <ShieldCheck size={28} color="var(--forest)" />
          <div>
            <b style={{ display: "block", marginBottom: 4, color: "var(--forest)" }}>Critérios de Validação ReVeste</b>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>Lembre-se: peças rasgadas, manchadas ou sem condições de uso higiênico não geram pontos. O doador será notificado sobre o motivo se o lote for invalidado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
