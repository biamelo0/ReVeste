"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useReveste } from "../context/RevesteContext";

export default function Login() {
  const router = useRouter();
  const { login } = useReveste();
  const [email, setEmail] = useState("");
  const [senhaEnviada, setSenhaEnviada] = useState(false);

  return (
    <main className="pad wrap" style={{ maxWidth: 500, minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="card" style={{ width: "100%" }}>
        <h1 style={{ marginBottom: 8 }}>Bem-vindo(a) de volta!</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32 }}>Entre para continuar doando, trocando ou vendendo peças na ReVeste.</p>
        
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login(email);
            router.push("/dashboard");
          }}
        >
          <div className="form-group">
            <label className="label">E-mail</label>
            <input
              type="email"
              className="input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Senha</label>
            <input type="password" className="input" placeholder="••••••••" required />
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <label style={{ fontSize: 14, color: "var(--muted)", display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" defaultChecked /> Lembrar de mim
            </label>
            <button
              type="button"
              onClick={() => setSenhaEnviada(true)}
              style={{ fontSize: 14, color: "var(--sage)", fontWeight: 500, background: "none", border: "none", cursor: "pointer" }}
            >
              Esqueci a senha
            </button>
          </div>

          {senhaEnviada && (
            <div style={{ padding: "12px 16px", background: "rgba(102, 121, 79, 0.12)", color: "var(--forest)", borderRadius: 12, fontSize: 13, marginBottom: 20 }}>
              Enviamos um link de recuperação para o seu e-mail!
            </div>
          )}

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
