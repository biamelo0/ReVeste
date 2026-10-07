import Link from "next/link";
import { Handshake, TShirt, MapPin, ChartLineUp, ShieldCheck, Gear } from "@phosphor-icons/react/dist/ssr";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dash-layout wrap" style={{ marginTop: 40, marginBottom: 80, display: "grid", gridTemplateColumns: "260px 1fr", gap: 32 }}>
      <aside className="sidebar card" style={{ padding: 24 }}>
        <div style={{ marginBottom: 32 }}>
          <b style={{ display: "block", fontSize: 18, color: "var(--ink)" }}>Meu Painel</b>
          <span style={{ fontSize: 13, color: "var(--sage)" }}>Pessoa Física • Nível 2</span>
        </div>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link href="/dashboard" className="active" style={{ padding: "10px 16px", borderRadius: 8, background: "rgba(102, 121, 79, 0.1)", color: "var(--forest)", fontWeight: 600, display: "flex", gap: 12, alignItems: "center" }}>
            <ChartLineUp size={20} /> Visão Geral
          </Link>
          <Link href="/dashboard/doacoes" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <Handshake size={20} /> Minhas Doações
          </Link>
          <Link href="/dashboard/loja" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <TShirt size={20} /> Loja Solidária
          </Link>
          <div style={{ margin: "16px 0", height: 1, background: "rgba(0,0,0,0.05)" }}></div>
          <b style={{ padding: "0 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", marginBottom: 8 }}>Gestão Empresas e ONGs</b>
          <Link href="/dashboard/campanhas" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20 }}>📣</span> Campanhas
          </Link>
          <Link href="/dashboard/relatorios" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20 }}>📊</span> Relatórios ESG
          </Link>
          <div style={{ margin: "16px 0", height: 1, background: "rgba(0,0,0,0.05)" }}></div>
          <b style={{ padding: "0 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", marginBottom: 8 }}>Gestão Ponto de Coleta</b>
          <Link href="/dashboard/receber" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <MapPin size={20} /> Receber Doação
          </Link>
          <Link href="/dashboard/validar" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <ShieldCheck size={20} /> Validar Peças
          </Link>
          <div style={{ margin: "16px 0", height: 1, background: "rgba(0,0,0,0.05)" }}></div>
          <Link href="/dashboard/configuracoes" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--muted)", display: "flex", gap: 12, alignItems: "center" }}>
            <Gear size={20} /> Configurações
          </Link>
        </nav>
      </aside>

      <div className="dash-content">
        {children}
      </div>
    </div>
  );
}
