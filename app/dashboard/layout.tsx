"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Handshake, TShirt, MapPin, ChartLineUp, ShieldCheck, Gear, SignOut } from "@phosphor-icons/react";
import { useReveste } from "../context/RevesteContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useReveste();

  const linkStyle = (href: string) => {
    const isActive = pathname === href;
    return {
      padding: "10px 16px",
      borderRadius: 8,
      background: isActive ? "rgba(102, 121, 79, 0.12)" : "transparent",
      color: isActive ? "var(--forest)" : "var(--muted)",
      fontWeight: isActive ? 600 : 500,
      display: "flex",
      gap: 12,
      alignItems: "center",
    };
  };

  return (
    <div className="dash-layout wrap" style={{ marginTop: 40, marginBottom: 80, display: "grid", gridTemplateColumns: "260px 1fr", gap: 32 }}>
      <aside className="sidebar card" style={{ padding: 24, height: "fit-content" }}>
        <div style={{ marginBottom: 24 }}>
          <b style={{ display: "block", fontSize: 18, color: "var(--ink)" }}>{user.nome}</b>
          <span style={{ fontSize: 13, color: "var(--sage)" }}>
            {user.tipo === "pf" ? "Pessoa Física" : "Empresa / ONG"} • {user.pontos} pts
          </span>
        </div>
        
        <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Link href="/dashboard" style={linkStyle("/dashboard")}>
            <ChartLineUp size={20} /> Visão Geral
          </Link>
          <Link href="/dashboard/doacoes" style={linkStyle("/dashboard/doacoes")}>
            <Handshake size={20} /> Minhas Doações
          </Link>
          <Link href="/dashboard/loja" style={linkStyle("/dashboard/loja")}>
            <TShirt size={20} /> Loja Solidária
          </Link>
          <div style={{ margin: "12px 0", height: 1, background: "rgba(0,0,0,0.05)" }}></div>
          <b style={{ padding: "0 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", marginBottom: 4 }}>Gestão Empresas e ONGs</b>
          <Link href="/dashboard/campanhas" style={linkStyle("/dashboard/campanhas")}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20 }}>📣</span> Campanhas
          </Link>
          <Link href="/dashboard/relatorios" style={linkStyle("/dashboard/relatorios")}>
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 20 }}>📊</span> Relatórios ESG
          </Link>
          <div style={{ margin: "12px 0", height: 1, background: "rgba(0,0,0,0.05)" }}></div>
          <b style={{ padding: "0 16px", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", marginBottom: 4 }}>Gestão Ponto de Coleta</b>
          <Link href="/dashboard/receber" style={linkStyle("/dashboard/receber")}>
            <MapPin size={20} /> Receber Doação
          </Link>
          <Link href="/dashboard/validar" style={linkStyle("/dashboard/validar")}>
            <ShieldCheck size={20} /> Validar Peças
          </Link>
          <div style={{ margin: "12px 0", height: 1, background: "rgba(0,0,0,0.05)" }}></div>
          <Link href="/dashboard/configuracoes" style={linkStyle("/dashboard/configuracoes")}>
            <Gear size={20} /> Configurações
          </Link>
          <Link href="/login" style={{ padding: "10px 16px", borderRadius: 8, color: "var(--clay)", fontWeight: 500, display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
            <SignOut size={20} /> Sair da Conta
          </Link>
        </nav>
      </aside>

      <div className="dash-content" style={{ padding: 0 }}>
        {children}
      </div>
    </div>
  );
}
