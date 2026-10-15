"use client";
import { useState, useEffect } from "react";
import { CheckCircle } from "@phosphor-icons/react";
import { useReveste } from "../../context/RevesteContext";

export default function Configuracoes() {
  const { user, updateProfile } = useReveste();
  const [nome, setNome] = useState(user.nome);
  const [email, setEmail] = useState(user.email);
  const [documento, setDocumento] = useState(user.documento);
  const [endereco, setEndereco] = useState(user.endereco);
  const [pontoColeta, setPontoColeta] = useState(user.pontoColeta);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    setNome(user.nome);
    setEmail(user.email);
    setDocumento(user.documento);
    setEndereco(user.endereco);
    setPontoColeta(user.pontoColeta);
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ nome, email, documento, endereco, pontoColeta });
    setSalvo(true);
    setTimeout(() => setSalvo(false), 4000);
  };

  return (
    <div>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Configurações</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>Gerencie seus dados pessoais, endereço e preferências.</p>

      <div className="card">
        <h2 style={{ fontSize: 18, marginBottom: 24 }}>Meus Dados</h2>

        {salvo && (
          <div style={{ padding: "12px 16px", background: "rgba(102, 121, 79, 0.15)", color: "var(--forest)", borderRadius: 12, marginBottom: 20, fontWeight: 500, display: "flex", alignItems: "center", gap: 8 }}>
            <CheckCircle size={20} weight="fill" />
            <span>Dados atualizados e salvos com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div className="form-group">
              <label className="label">Nome Completo / Razão Social</label>
              <input
                type="text"
                className="input"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">E-mail</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">CPF / CNPJ</label>
              <input
                type="text"
                className="input"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="label">Endereço de Correspondência</label>
              <input
                type="text"
                className="input"
                placeholder="Rua, Número, Bairro, Cidade"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </div>
          </div>

          <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 8, marginBottom: 20, cursor: "pointer", fontSize: 14 }}>
            <input
              type="checkbox"
              checked={pontoColeta}
              onChange={(e) => setPontoColeta(e.target.checked)}
            />
            <span>Atuar também como Ponto de Coleta parceiro</span>
          </label>

          <button type="submit" className="btn">Salvar Alterações</button>
        </form>
      </div>
    </div>
  );
}
