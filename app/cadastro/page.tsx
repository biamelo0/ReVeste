"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, User, Buildings } from "@phosphor-icons/react";

export default function Cadastro() {
  const [tipo, setTipo] = useState<"pf"|"pj">("pf");

  return (
    <main className="pad wrap" style={{ maxWidth: 600, minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="card" style={{ width: "100%" }}>
        <h1 style={{ marginBottom: 8 }}>Faça parte da rede</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>Crie sua conta para ajudar a movimentar a moda circular e sustentável.</p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
          <button 
            type="button"
            onClick={() => setTipo("pf")}
            style={{ 
              padding: 20, borderRadius: 16, border: `2px solid ${tipo === "pf" ? "var(--forest)" : "rgba(42,58,39,.1)"}`, 
              background: tipo === "pf" ? "rgba(102, 121, 79, 0.05)" : "transparent",
              cursor: "pointer", textAlign: "left"
            }}
          >
            <User size={32} color={tipo === "pf" ? "var(--forest)" : "var(--muted)"} weight={tipo === "pf" ? "duotone" : "regular"} />
            <b style={{ display: "block", marginTop: 12, color: tipo === "pf" ? "var(--forest)" : "var(--ink)" }}>Sou Indivíduo</b>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Quero doar, vender ou comprar roupas.</span>
          </button>
          <button 
            type="button"
            onClick={() => setTipo("pj")}
            style={{ 
              padding: 20, borderRadius: 16, border: `2px solid ${tipo === "pj" ? "var(--forest)" : "rgba(42,58,39,.1)"}`, 
              background: tipo === "pj" ? "rgba(102, 121, 79, 0.05)" : "transparent",
              cursor: "pointer", textAlign: "left"
            }}
          >
            <Buildings size={32} color={tipo === "pj" ? "var(--forest)" : "var(--muted)"} weight={tipo === "pj" ? "duotone" : "regular"} />
            <b style={{ display: "block", marginTop: 12, color: tipo === "pj" ? "var(--forest)" : "var(--ink)" }}>Sou Empresa / ONG</b>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Instituições, lojas parceiras ou pontos de coleta.</span>
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
          <div className="form-group">
            <label className="label">{tipo === "pf" ? "Nome Completo" : "Razão Social"}</label>
            <input type="text" className="input" placeholder={tipo === "pf" ? "Seu nome" : "Nome da instituição"} required />
          </div>
          <div className="form-group">
            <label className="label">{tipo === "pf" ? "CPF" : "CNPJ"}</label>
            <input type="text" className="input" placeholder={tipo === "pf" ? "000.000.000-00" : "00.000.000/0000-00"} required />
          </div>
          <div className="form-group">
            <label className="label">E-mail</label>
            <input type="email" className="input" placeholder="contato@email.com" required />
          </div>
          <div className="form-group">
            <label className="label">Senha</label>
            <input type="password" className="input" placeholder="••••••••" required />
          </div>

          <label style={{ display: "flex", gap: 12, padding: "16px", background: "#f9f9f9", borderRadius: 12, marginBottom: 32, cursor: "pointer", border: "1px solid #eee" }}>
            <input type="checkbox" style={{ marginTop: 4 }} />
            <div>
              <b style={{ display: "block", fontSize: 15 }}>Quero ser um ponto de coleta! 📍</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>Aceito receber roupas de doadores na minha localidade para repassar a ONGs cadastradas.</span>
            </div>
          </label>

          <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>
            Concluir Cadastro <ArrowRight weight="bold" />
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 32, fontSize: 15, color: "var(--muted)" }}>
          Já tem conta? <Link href="/login" style={{ color: "var(--forest)", fontWeight: 600 }}>Entrar</Link>
        </p>
      </div>
    </main>
  );
}
