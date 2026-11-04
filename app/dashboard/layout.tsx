"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  List,
  X,
  LockKey,
  Crown,
  SlidersHorizontal,
} from "@phosphor-icons/react";
import { useReveste } from "../context/RevesteContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoggedIn, hydrated, logout } = useReveste();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Redireciona para o login caso o usuário não esteja autenticado
  useEffect(() => {
    if (hydrated && !isLoggedIn) {
      router.replace("/login");
    }
  }, [hydrated, isLoggedIn, router]);

  // Fecha o menu mobile do dashboard ao mudar de página
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Enquanto verifica o estado salvo no navegador, exibe tela de carregamento suave
  if (!hydrated) {
    return (
      <div className="pad wrap" style={{ textAlign: "center", minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <p style={{ color: "var(--muted)", fontSize: 16 }}>Carregando dados do painel...</p>
      </div>
    );
  }

  // Se não estiver logado, bloqueia o acesso e redireciona
  if (!isLoggedIn) {
    return (
      <div className="pad wrap" style={{ textAlign: "center", minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div className="card" style={{ maxWidth: 440, padding: 36, textAlign: "center" }}>
          <LockKey size={48} color="var(--clay)" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Acesso Restrito</h2>
          <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 15 }}>
            Você precisa entrar na sua conta para acessar o painel de controle da ReVeste.
          </p>
          <Link href="/login" className="btn" style={{ width: "100%", justifyContent: "center" }}>
            Fazer Login Agora
          </Link>
        </div>
      </div>
    );
  }

  // Remove barra final e garante comparação exata da rota ativa
  const cleanPath = (pathname || "").replace(/\/$/, "") || "/dashboard";

  const isRouteActive = (href: string) => {
    if (href === "/dashboard") {
      return cleanPath === "/dashboard" || cleanPath.endsWith("/ReVeste/dashboard");
    }
    return cleanPath === href || cleanPath.endsWith(href);
  };

  const linkStyle = (href: string): React.CSSProperties => {
    const isActive = isRouteActive(href);
    return {
      padding: "10px 16px",
      borderRadius: 10,
      background: isActive ? "rgba(102, 121, 79, 0.15)" : "transparent",
      color: isActive ? "var(--forest)" : "var(--muted)",
      fontWeight: isActive ? 600 : 500,
      fontSize: 14,
      display: "flex",
      gap: 12,
      alignItems: "center",
      transition: "background 0.15s, color 0.15s",
    };
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="dash-layout wrap">
      {/* SIDEBAR DO DASHBOARD */}
      <aside className="sidebar card">
        {/* Cabeçalho do Usuário com botão mobile de toggle */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <b style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 17, color: "var(--ink)" }}>
              {user.nome} {user.isAdmin && <Crown size={17} weight="fill" color="var(--clay)" />}
            </b>
            <span style={{ fontSize: 13, color: user.isAdmin ? "var(--clay)" : "var(--sage)", fontWeight: 600 }}>
              {user.isAdmin
                ? "👑 Administrador Geral"
                : user.tipo === "pf"
                ? "Pessoa Física"
                : "Empresa / ONG"}
              {!user.isAdmin && user.pontoColeta ? " • Ponto de Coleta" : ""} • {user.pontos} pts
            </span>
          </div>
          {/* Botão para abrir/fechar menu em telas de celular */}
          <button
            type="button"
            className="dash-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar menu do painel"
          >
            {mobileMenuOpen ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>

        {/* Links de navegação do painel */}
        <nav className={`dash-nav ${mobileMenuOpen ? "open" : ""}`}>
          <Link href="/dashboard" style={linkStyle("/dashboard")}>
            <ChartLineUp size={20} weight={isRouteActive("/dashboard") ? "bold" : "regular"} /> Visão Geral
          </Link>
          <Link href="/dashboard/doacoes" style={linkStyle("/dashboard/doacoes")}>
            <Handshake size={20} weight={isRouteActive("/dashboard/doacoes") ? "bold" : "regular"} /> Minhas Doações
          </Link>
          <Link href="/dashboard/loja" style={linkStyle("/dashboard/loja")}>
            <TShirt size={20} weight={isRouteActive("/dashboard/loja") ? "bold" : "regular"} /> Loja Solidária
          </Link>

          {/* Seção Empresas e ONGs: visível para contas PJ ou Administrador */}
          {(user.tipo === "pj" || user.isAdmin) && (
            <>
              <div style={{ margin: "10px 0", height: 1, background: "rgba(0,0,0,0.06)" }} />
              <b style={{ padding: "0 16px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", marginBottom: 4 }}>
                Empresas e ONGs
              </b>
              <Link href="/dashboard/campanhas" style={linkStyle("/dashboard/campanhas")}>
                <Megaphone size={20} weight={isRouteActive("/dashboard/campanhas") ? "bold" : "regular"} /> Campanhas
              </Link>
              <Link href="/dashboard/relatorios" style={linkStyle("/dashboard/relatorios")}>
                <ChartPieSlice size={20} weight={isRouteActive("/dashboard/relatorios") ? "bold" : "regular"} /> Relatórios ESG
              </Link>
            </>
          )}

          {/* Seção Ponto de Coleta: visível para ponto de coleta ou Administrador */}
          {(user.pontoColeta || user.isAdmin) && (
            <>
              <div style={{ margin: "10px 0", height: 1, background: "rgba(0,0,0,0.06)" }} />
              <b style={{ padding: "0 16px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", marginBottom: 4 }}>
                Ponto de Coleta
              </b>
              <Link href="/dashboard/receber" style={linkStyle("/dashboard/receber")}>
                <MapPin size={20} weight={isRouteActive("/dashboard/receber") ? "bold" : "regular"} /> Receber Doação
              </Link>
              <Link href="/dashboard/validar" style={linkStyle("/dashboard/validar")}>
                <ShieldCheck size={20} weight={isRouteActive("/dashboard/validar") ? "bold" : "regular"} /> Validar Peças
              </Link>
            </>
          )}

          {/* Seção Exclusiva de Administração */}
          {user.isAdmin && (
            <>
              <div style={{ margin: "10px 0", height: 1, background: "rgba(0,0,0,0.06)" }} />
              <b style={{ padding: "0 16px", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--clay)", display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                <Crown size={14} weight="fill" /> Administração Geral
              </b>
              <Link href="/dashboard/admin" style={linkStyle("/dashboard/admin")}>
                <SlidersHorizontal size={20} weight={isRouteActive("/dashboard/admin") ? "bold" : "regular"} /> Painel do Sistema
              </Link>
            </>
          )}

          <div style={{ margin: "10px 0", height: 1, background: "rgba(0,0,0,0.06)" }} />
          <Link href="/dashboard/configuracoes" style={linkStyle("/dashboard/configuracoes")}>
            <Gear size={20} weight={isRouteActive("/dashboard/configuracoes") ? "bold" : "regular"} /> Configurações
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              borderRadius: 10,
              color: "var(--clay)",
              fontWeight: 500,
              fontSize: 14,
              display: "flex",
              gap: 12,
              alignItems: "center",
              marginTop: 6,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <SignOut size={20} /> Sair da Conta
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL DO DASHBOARD */}
      <main className="dash-content">
        {children}
      </main>
    </div>
  );
}
