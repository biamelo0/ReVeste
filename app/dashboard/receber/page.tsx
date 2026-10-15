"use client";
import { useState } from "react";
import Link from "next/link";
import { QrCode, MagnifyingGlass, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useReveste } from "../../context/RevesteContext";

export default function ReceberDoacao() {
  const { doacoes, receberDoacao } = useReveste();
  const [codigo, setCodigo] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);

  const pendentes = doacoes.filter((d) => d.status === "Aguardando entrega");

  const handleReceber = (cod: string) => {
    const res = receberDoacao(cod);
    setFeedback(res);
    if (res.ok) {
      setCodigo("");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em", color: "var(--clay)", fontWeight: 600 }}>Ponto de Coleta</span>
        <h1 style={{ fontSize: 28, marginBottom: 8, marginTop: 4 }}>Receber Doação</h1>
        <p style={{ color: "var(--muted)" }}>Registre a chegada física de sacolas deixadas pelos doadores no seu ponto.</p>
      </div>

      {feedback && (
        <div
          style={{
            padding: "16px 20px",
            borderRadius: 16,
            marginBottom: 24,
            background: feedback.ok ? "rgba(102, 121, 79, 0.15)" : "rgba(184, 97, 63, 0.15)",
            color: feedback.ok ? "var(--forest)" : "var(--clay)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontWeight: 500 }}>
            <CheckCircle size={22} weight="fill" />
            <span>{feedback.msg}</span>
          </div>
          {feedback.ok && (
            <Link href="/dashboard/validar" className="btn sm">
              Ir para Validar Peças <ArrowRight weight="bold" />
            </Link>
          )}
        </div>
      )}

      <div className="card" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "48px 24px", marginBottom: 32 }}>
        <div style={{ background: "rgba(102, 121, 79, 0.1)", padding: 24, borderRadius: "50%", color: "var(--forest)", marginBottom: 20 }}>
          <QrCode size={48} />
        </div>
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Escanear QR Code do Doador</h2>
        <p style={{ color: "var(--muted)", maxWidth: 460, marginBottom: 24 }}>
          Peça para o doador mostrar o QR Code gerado em &ldquo;Minhas Doações&rdquo; ou clique abaixo para simular a leitura imediata de uma sacola pendente.
        </p>

        {pendentes.length > 0 ? (
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            {pendentes.map((p) => (
              <button
                key={p.id}
                type="button"
                className="btn"
                onClick={() => handleReceber(p.codigo)}
              >
                <QrCode size={18} /> Simular Leitura: {p.codigo} ({p.titulo})
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={() => handleReceber(`REV-${Math.floor(1000 + Math.random() * 9000)}`)}
          >
            <QrCode size={18} /> Simular Leitura de QR Code Avulso
          </button>
        )}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" }} />
        <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>OU DIGITE O CÓDIGO MANUALMENTE</span>
        <hr style={{ flex: 1, border: "none", borderTop: "1px solid rgba(0,0,0,0.1)" }} />
      </div>

      <form
        className="card"
        style={{ display: "flex", gap: 16, padding: 24, flexWrap: "wrap" }}
        onSubmit={(e) => {
          e.preventDefault();
          handleReceber(codigo);
        }}
      >
        <input
          type="text"
          className="input"
          placeholder="Código da doação (Ex: REV-9823)"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          style={{ flex: 1, minWidth: 220 }}
        />
        <button type="submit" className="btn ghost">
          <MagnifyingGlass /> Confirmar Recebimento
        </button>
      </form>
    </div>
  );
}
