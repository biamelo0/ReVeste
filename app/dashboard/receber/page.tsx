import { QrCode, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export default function ReceberDoacao() {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em", color: "var(--clay)", fontWeight: 600 }}>Ponto de Coleta</span>
        <h1 style={{ fontSize: 28, marginBottom: 8, marginTop: 4 }}>Receber Doação</h1>
        <p style={{ color: "var(--muted)" }}>Registre a chegada física de sacolas deixadas pelos doadores no seu ponto.</p>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "64px 24px", marginBottom: 32 }}>
        <div style={{ background: "rgba(102, 121, 79, 0.1)", padding: 24, borderRadius: "50%", color: "var(--forest)", marginBottom: 24 }}>
          <QrCode size={48} />
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Escanear QR Code do Doador</h2>
        <p style={{ color: "var(--muted)", maxWidth: 400, marginBottom: 32 }}>Peça para o doador abrir o app e mostrar o QR Code da doação dele para registrar o recebimento instantâneo.</p>
        <button className="btn">Abrir Câmera</button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" }} />
        <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>OU DIGITE MANUALMENTE</span>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" }} />
      </div>

      <div className="card" style={{ display: "flex", gap: 16, padding: 24 }}>
        <input type="text" className="input" placeholder="Código da doação (Ex: REV-9823)" style={{ flex: 1 }} />
        <button className="btn ghost"><MagnifyingGlass /> Buscar Código</button>
      </div>
    </div>
  );
}
