"use client";
import { useState } from "react";
import { ShoppingCart, Star, CheckCircle, TShirt } from "@phosphor-icons/react";
import { useReveste } from "../../context/RevesteContext";

export default function LojaSolidaria() {
  const { user, itensLoja, resgatarItemLoja } = useReveste();
  const [aviso, setAviso] = useState<{ ok: boolean; msg: string } | null>(null);

  const handleResgatar = (id: string) => {
    const res = resgatarItemLoja(id);
    setAviso(res);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Loja Solidária</h1>
          <p style={{ color: "var(--muted)" }}>Troque seus pontos por peças sustentáveis de ONGs e parceiros.</p>
        </div>
        <div style={{ padding: "10px 20px", background: "rgba(102, 121, 79, 0.12)", color: "var(--forest)", borderRadius: 99, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, fontSize: 16 }}>
          <Star weight="fill" /> Saldo disponível: {user.pontos} pts
        </div>
      </div>

      {aviso && (
        <div
          style={{
            padding: "14px 20px",
            borderRadius: 16,
            marginBottom: 24,
            background: aviso.ok ? "rgba(102, 121, 79, 0.15)" : "rgba(184, 97, 63, 0.15)",
            color: aviso.ok ? "var(--forest)" : "var(--clay)",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <CheckCircle size={22} weight="fill" />
          <span>{aviso.msg}</span>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
        {itensLoja.map((item) => (
          <div key={item.id} className="card" style={{ padding: 20, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1.2/1",
                background: item.corFundo,
                borderRadius: 16,
                marginBottom: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--forest)",
                gap: 6,
              }}
            >
              <TShirt size={48} weight="duotone" />
              <span style={{ fontSize: 12, fontWeight: 600, background: "rgba(255,255,255,0.8)", padding: "2px 10px", borderRadius: 99 }}>
                {item.tamanho}
              </span>
            </div>
            <b style={{ fontSize: 16, marginBottom: 4 }}>{item.nome}</b>
            <span style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>{item.ong}</span>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <b style={{ color: "var(--clay)", fontSize: 18 }}>{item.pontos} pts</b>
              {item.resgatado ? (
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--sage)", display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCircle size={18} weight="fill" /> Resgatado
                </span>
              ) : (
                <button
                  type="button"
                  className="btn sm ghost"
                  style={{ padding: "8px 14px" }}
                  onClick={() => handleResgatar(item.id)}
                >
                  <ShoppingCart size={16} /> Pegar
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
