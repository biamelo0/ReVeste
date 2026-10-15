"use client";
import { useState } from "react";
import { Megaphone, Plus, CalendarBlank, X } from "@phosphor-icons/react";
import { useReveste } from "../../context/RevesteContext";

export default function Campanhas() {
  const { campanhas, criarCampanha } = useReveste();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [meta, setMeta] = useState(500);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    criarCampanha({ nome, descricao, periodo, meta: Number(meta) || 500 });
    setNome("");
    setDescricao("");
    setPeriodo("");
    setMeta(500);
    setMostrarForm(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Campanhas de Arrecadação</h1>
          <p style={{ color: "var(--muted)" }}>Gestão de campanhas solidárias e metas de arrecadação (Empresas e ONGs).</p>
        </div>
        <button className="btn" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? <><X weight="bold" /> Fechar</> : <><Plus weight="bold" /> Nova Campanha</>}
        </button>
      </div>

      {mostrarForm && (
        <div className="card" style={{ marginBottom: 32, border: "2px solid var(--sage)" }}>
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>Criar Nova Campanha Solidária</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="form-group">
                <label className="label">Nome da Campanha *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Inverno Quentinho FATEC"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Período de Vigência *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: 10 Out - 20 Dez"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Foco / Itens Prioritários *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Cobertores, casacos e calçados infantis"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label className="label">Meta de Peças *</label>
                <input
                  type="number"
                  min={10}
                  className="input"
                  value={meta}
                  onChange={(e) => setMeta(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn">Publicar Campanha</button>
          </form>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          <span>Campanha</span>
          <span>Período</span>
          <span>Progresso / Status</span>
        </div>

        {campanhas.map((c) => (
          <div
            key={c.id}
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ padding: 12, background: "rgba(102, 121, 79, 0.1)", borderRadius: 12, color: "var(--forest)" }}>
                <Megaphone size={24} />
              </div>
              <div>
                <b style={{ display: "block" }}>{c.nome}</b>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>{c.descricao}</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--muted)", fontSize: 14 }}>
              <CalendarBlank size={16} /> {c.periodo}
            </div>
            <div>
              <b style={{ color: "var(--forest)", display: "block" }}>{c.status}</b>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                {c.arrecadado} / {c.meta} peças
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
