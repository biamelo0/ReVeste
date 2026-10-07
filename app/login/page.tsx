"use client";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

export default function Login() {
  return (
    <main className="pad wrap" style={{ maxWidth: 500, minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="card" style={{ width: "100%" }}>
        <h1 style={{ marginBottom: 8 }}>Bem-vindo(a) de volta!</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>Entre para continuar doando, trocando ou vendendo peças na ReVeste.</p>
        
        <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
          <div className="form-group">
            <label className="label">E-mail</label>
            <input type="email" className="input" placeholder="seu@email.com" required />
          </div>
          <div className="form-group">
            <label className="label">Senha</label>
            <input type="password" className="input" placeholder="••••••••" required />
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <label style={{ fontSize: 14, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" /> Lembrar de mim
            </label>
            <Link href="#" style={{ fontSize: 14, color: "var(--sage)", fontWeight: 500 }}>Esqueci a senha</Link>
          </div>

          <button type="submit" className="btn" style={{ width: "100%", justifyContent: "center" }}>
            Entrar no Painel <ArrowRight weight="bold" />
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 32, fontSize: 15, color: "var(--muted)" }}>
          Ainda não tem conta? <Link href="/cadastro" style={{ color: "var(--forest)", fontWeight: 600 }}>Crie uma agora</Link>
        </p>
      </div>
    </main>
  );
}
