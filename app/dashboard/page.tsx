"use client";
import Link from "next/link";
import { HandHeart, Coins, Leaf, CheckCircle, Plus, ShoppingBag } from "@phosphor-icons/react";
import { useReveste } from "../context/RevesteContext";

export default function Dashboard() {
  const { user, movimentacoes } = useReveste();
  const aguaEconomizada = (user.pecasDoadas * 2700).toLocaleString("pt-BR");

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Olá, {user.nome.split(" ")[0]}! 👋</h1>
          <p style={{ color: "var(--muted)" }}>Acompanhe o seu impacto sustentável e suas recompensas na ReVeste.</p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/dashboard/doacoes" className="btn sm">
            <Plus weight="bold" /> Cadastrar Doação
          </Link>
          <Link href="/dashboard/loja" className="btn sm ghost">
            <ShoppingBag weight="bold" /> Trocar Pontos
          </Link>
        </div>
      </div>

      <div className="dash-grid">
        <div className="stat-card">
          <h3>Pontos Acumulados</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{user.pontos}</b>
            <Coins size={32} color="var(--clay)" weight="duotone" />
          </div>
        </div>
        <div className="stat-card">
          <h3>Peças Doadas</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{user.pecasDoadas}</b>
            <HandHeart size={32} color="var(--sage)" weight="duotone" />
          </div>
        </div>
        <div className="stat-card">
          <h3>Água Economizada</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{aguaEconomizada} L</b>
            <Leaf size={32} color="var(--forest)" weight="duotone" />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 20, marginBottom: 24 }}>Últimas Movimentações</h2>
        <ul style={{ listStyle: "none", display: "grid", gap: 16 }}>
          {movimentacoes.map((m) => (
            <li key={m.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: 16, background: "rgba(0,0,0,0.02)", borderRadius: 12 }}>
              <CheckCircle size={24} color={m.tipo === "credito" ? "var(--sage)" : "var(--clay)"} weight="fill" />
              <div style={{ flex: 1 }}>
                <b style={{ display: "block", fontSize: 15 }}>{m.titulo}</b>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{m.subtitulo}</span>
              </div>
              <b style={{ color: m.tipo === "credito" ? "var(--forest)" : "var(--clay)" }}>{m.pontosTexto}</b>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
