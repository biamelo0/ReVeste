"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Handshake,
  TShirt,
  MapPin,
  ChartLineUp,
  ShieldCheck,
  Gear,
  SignOut,
  Megaphone,
  ChartPieSlice,
  CaretDown,
  UserCircle,
} from "@phosphor-icons/react";
import { useReveste } from "../context/RevesteContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useReveste();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Remove barra final e garante comparação exata da rota ativa
  const cleanPath = (pathname || "").replace(/\/$/, "") || "/dashboard";

  const isRouteActive = (href: string) => {
    if (href === "/dashboard") {
      return cleanPath === "/dashboard" || cleanPath.endsWith("/ReVeste/dashboard");
    }
    return cleanPath === href || cleanPath.endsWith(href);
  };

  const navItems = [
    { href: "/dashboard", label: "Visão Geral", icon: ChartLineUp, group: "principal" },
    { href: "/dashboard/doacoes", label: "Minhas Doações", icon: Handshake, group: "principal" },
    { href: "/dashboard/loja", label: "Loja Solidária", icon: TShirt, group: "principal" },
    { href: "/dashboard/campanhas", label: "Campanhas", icon: Megaphone, group: "empresas" },
    { href: "/dashboard/relatorios", label: "Relatórios ESG", icon: ChartPieSlice, group: "empresas" },
    { href: "/dashboard/receber", label: "Receber Doação", icon: MapPin, group: "ponto" },
    { href: "/dashboard/validar", label: "Validar Peças", icon: ShieldCheck, group: "ponto" },
    { href: "/dashboard/configuracoes", label: "Configurações", icon: Gear, group: "conta" },
  ];

  const currentItem = navItems.find((item) => isRouteActive(item.href)) || navItems[0];

  const linkStyle = (href: string): React.CSSProperties => {
    const active = isRouteActive(href);
    return {
      padding: "10px 14px",
      borderRadius: 10,
      background: active ? "var(--forest)" : "transparent",
      color: active ? "var(--cream)" : "var(--muted)",
      fontWeight: active ? 600 : 500,
      fontSize: 14,
      display: "flex",
      gap: 10,
      alignItems: "center",
      transition: "all 0.15s ease",
    };
  };

  return (
    <div className="dash-layout wrap">
      {/* SIDEBAR DESKTOP */}
      <aside className="sidebar card desktop-dash-sidebar" style={{ position: "sticky", top: 110 }}>
        <div style={{ marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid rgba(42,58,39,0.08)" }}>
          <b style={{ display: "block", fontSize: 16, color: "var(--ink)" }}>{user.nome}</b>
          <span style={{ fontSize: 12, color: "var(--sage)", fontWeight: 600 }}>
            {user.tipo === "pf" ? "Pessoa Física" : "Empresa / ONG"} • {user.pontos} pts
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Link href="/dashboard" style={linkStyle("/dashboard")}>
            <ChartLineUp size={18} weight={isRouteActive("/dashboard") ? "bold" : "regular"} /> Visão Geral
          </Link>
          <Link href="/dashboard/doacoes" style={linkStyle("/dashboard/doacoes")}>
            <Handshake size={18} weight={isRouteActive("/dashboard/doacoes") ? "bold" : "regular"} /> Minhas Doações
          </Link>
          <Link href="/dashboard/loja" style={linkStyle("/dashboard/loja")}>
            <TShirt size={18} weight={isRouteActive("/dashboard/loja") ? "bold" : "regular"} /> Loja Solidária
          </Link>

          <div style={{ margin: "10px 0 6px", height: 1, background: "rgba(0,0,0,0.06)" }} />
          <b style={{ padding: "0 10px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clay)", marginBottom: 2 }}>
            Empresas e ONGs
          </b>
          <Link href="/dashboard/campanhas" style={linkStyle("/dashboard/campanhas")}>
            <Megaphone size={18} weight={isRouteActive("/dashboard/campanhas") ? "bold" : "regular"} /> Campanhas
          </Link>
          <Link href="/dashboard/relatorios" style={linkStyle("/dashboard/relatorios")}>
            <ChartPieSlice size={18} weight={isRouteActive("/dashboard/relatorios") ? "bold" : "regular"} /> Relatórios ESG
          </Link>

          <div style={{ margin: "10px 0 6px", height: 1, background: "rgba(0,0,0,0.06)" }} />
          <b style={{ padding: "0 10px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--clay)", marginBottom: 2 }}>
            Ponto de Coleta
          </b>
          <Link href="/dashboard/receber" style={linkStyle("/dashboard/receber")}>
            <MapPin size={18} weight={isRouteActive("/dashboard/receber") ? "bold" : "regular"} /> Receber Doação
          </Link>
          <Link href="/dashboard/validar" style={linkStyle("/dashboard/validar")}>
            <ShieldCheck size={18} weight={isRouteActive("/dashboard/validar") ? "bold" : "regular"} /> Validar Peças
          </Link>

          <div style={{ margin: "10px 0 6px", height: 1, background: "rgba(0,0,0,0.06)" }} />
          <Link href="/dashboard/configuracoes" style={linkStyle("/dashboard/configuracoes")}>
            <Gear size={18} weight={isRouteActive("/dashboard/configuracoes") ? "bold" : "regular"} /> Configurações
          </Link>
          <Link href="/login" style={{ padding: "10px 14px", borderRadius: 10, color: "var(--clay)", fontWeight: 500, fontSize: 14, display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
            <SignOut size={18} /> Sair da Conta
          </Link>
        </nav>
      </aside>

      {/* MOBILE DASHBOARD BAR (VISÍVEL NO CELULAR E TABLET) */}
      <div className="mobile-dash-pills">
        <div
          className="card"
          style={{
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
            <UserCircle size={32} color="var(--forest)" weight="duotone" />
            <div style={{ minWidth: 0 }}>
              <b style={{ display: "block", fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {user.nome}
              </b>
              <span style={{ fontSize: 12, color: "var(--sage)", fontWeight: 600 }}>
                {user.pontos} pontos
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn sm ghost"
            style={{ padding: "6px 12px", fontSize: 13, gap: 6 }}
          >
            <span>Menu ({currentItem.label})</span>
            <CaretDown
              size={14}
              weight="bold"
              style={{
                transform: mobileMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </div>

        {/* Abas com rolagem horizontal rápida para acesso em 1 toque */}
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 6,
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}
        >
          {navItems.map((item) => {
            const active = isRouteActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: active ? "var(--forest)" : "var(--white)",
                  color: active ? "var(--cream)" : "var(--ink)",
                  border: `1px solid ${active ? "var(--forest)" : "rgba(42,58,39,0.1)"}`,
                  fontWeight: active ? 600 : 500,
                  fontSize: 13,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <Icon size={16} weight={active ? "bold" : "regular"} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Menu expandido se o usuário clicar no botão Menu */}
        {mobileMenuOpen && (
          <div
            className="card"
            style={{
              padding: 16,
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              border: "1.5px solid var(--forest)",
            }}
          >
            {navItems.map((item) => {
              const active = isRouteActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={linkStyle(item.href)}
                >
                  <Icon size={18} weight={active ? "bold" : "regular"} />
                  {item.label}
                </Link>
              );
            })}
            <div style={{ margin: "6px 0", height: 1, background: "rgba(0,0,0,0.06)" }} />
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                color: "var(--clay)",
                fontWeight: 500,
                fontSize: 14,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <SignOut size={18} /> Sair da Conta
            </Link>
          </div>
        )}
      </div>

      <div className="dash-content">{children}</div>
    </div>
  );
}
