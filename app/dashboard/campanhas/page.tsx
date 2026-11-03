"use client";
import { useState } from "react";
import { Megaphone, Plus, CalendarBlank, X, MapPin, Users, HandHeart, CheckCircle, ArrowRight } from "@phosphor-icons/react";
import { useReveste, CampanhaItem } from "../../context/RevesteContext";

export default function Campanhas() {
  const { campanhas, criarCampanha, doarParaCampanha } = useReveste();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [campanhaAberta, setCampanhaAberta] = useState<CampanhaItem | null>(null);

  // Estados de nova campanha
  const [nome, setNome] = useState("");
  const [organizador, setOrganizador] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [itensTexto, setItensTexto] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [meta, setMeta] = useState(500);

  // Estados de doação direta na campanha
  const [qtdDoar, setQtdDoar] = useState(3);
  const [descDoar, setDescDoar] = useState("");
  const [tamDoar, setTamDoar] = useState("M");
  const [codigoGerado, setCodigoGerado] = useState<string | null>(null);

  const handleCriarCampanha = (e: React.FormEvent) => {
    e.preventDefault();
    criarCampanha({
      nome,
      organizador: organizador || "ONG Parceira ReVeste",
      local: local || "Centro · Itapetininga/SP",
      descricao,
      itensPrioritarios: itensTexto
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      periodo,
      meta: Number(meta) || 500,
    });
    setNome("");
    setOrganizador("");
    setLocal("");
    setDescricao("");
    setItensTexto("");
    setPeriodo("");
    setMeta(500);
    setMostrarForm(false);
  };

  const handleDoarCampanha = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campanhaAberta) return;
    const nova = doarParaCampanha(campanhaAberta.id, qtdDoar, descDoar, tamDoar);
    if (nova) {
      setCodigoGerado(nova.codigo);
      setDescDoar("");
      // Atualiza referência da campanha aberta
      setCampanhaAberta((prev) =>
        prev ? { ...prev, arrecadado: prev.arrecadado + Number(qtdDoar) } : null
      );
    }
  };

  // Sincroniza campanha aberta com a lista atualizada
  const campanhaAtual = campanhaAberta
    ? campanhas.find((c) => c.id === campanhaAberta.id) || campanhaAberta
    : null;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Campanhas de Arrecadação</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Clique em uma campanha para ver os itens necessários e registrar sua contribuição solidária.
          </p>
        </div>
        <button className="btn sm" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? <><X weight="bold" /> Fechar</> : <><Plus weight="bold" /> Nova Campanha</>}
        </button>
      </div>

      {mostrarForm && (
        <div className="card" style={{ padding: 24, marginBottom: 28, border: "2px solid var(--sage)" }}>
          <h2 style={{ fontSize: 19, marginBottom: 16 }}>Publicar Nova Campanha Solidária</h2>
          <form onSubmit={handleCriarCampanha}>
            <div className="grid-responsive-2" style={{ gap: 14 }}>
              <div className="form-group" style={{ marginBottom: 8 }}>
                <label className="label">Nome da Campanha *</label>
                <input type="text" className="input" placeholder="Ex: Inverno Quentinho FATEC" value={nome} onChange={(e) => setNome(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: 8 }}>
                <label className="label">Instituição / ONG Organizadora *</label>
                <input type="text" className="input" placeholder="Ex: Fundo Social de Itapetininga" value={organizador} onChange={(e) => setOrganizador(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: 8 }}>
                <label className="label">Local de Entrega *</label>
                <input type="text" className="input" placeholder="Ex: Rua Virgílio de Rezende, 300 - Centro" value={local} onChange={(e) => setLocal(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: 8 }}>
                <label className="label">Período de Vigência *</label>
                <input type="text" className="input" placeholder="Ex: 15 Out – 20 Dez 2026" value={periodo} onChange={(e) => setPeriodo(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: 8 }}>
                <label className="label">Itens Prioritários (separados por vírgula) *</label>
                <input type="text" className="input" placeholder="Ex: Cobertores, Casacos, Calçados infantis" value={itensTexto} onChange={(e) => setItensTexto(e.target.value)} required />
              </div>
              <div className="form-group" style={{ marginBottom: 8 }}>
                <label className="label">Meta de Peças *</label>
                <input type="number" min={10} className="input" value={meta} onChange={(e) => setMeta(Number(e.target.value))} required />
              </div>
              <div className="form-group" style={{ gridColumn: "1 / -1", marginBottom: 14 }}>
                <label className="label">Descrição da Ação Social *</label>
                <input type="text" className="input" placeholder="Explique quem será beneficiado pela campanha" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
              </div>
            </div>
            <button type="submit" className="btn sm">Publicar Campanha</button>
          </form>
        </div>
      )}

      {/* Modal / Painel Detalhado quando o usuário entra em uma campanha */}
      {campanhaAtual && (
        <div className="card" style={{ padding: 28, marginBottom: 28, border: "2px solid var(--forest)", background: "#FCFBF7" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 99, background: "rgba(102, 121, 79, 0.15)", color: "var(--forest)" }}>
                Campanha {campanhaAtual.status} • {campanhaAtual.organizador}
              </span>
              <h2 style={{ fontSize: 24, marginTop: 8, marginBottom: 4 }}>{campanhaAtual.nome}</h2>
              <div style={{ display: "flex", gap: 16, fontSize: 13, color: "var(--muted)", flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><MapPin size={15} weight="fill" color="var(--clay)" /> {campanhaAtual.local}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><CalendarBlank size={15} weight="fill" /> {campanhaAtual.periodo}</span>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Users size={15} weight="fill" /> {campanhaAtual.familiasAtendidas} famílias beneficiadas</span>
              </div>
            </div>
            <button
              type="button"
              className="btn sm ghost"
              onClick={() => {
                setCampanhaAberta(null);
                setCodigoGerado(null);
              }}
            >
              <X weight="bold" /> Fechar
            </button>
          </div>

          <p style={{ fontSize: 14, color: "var(--ink)", marginBottom: 16 }}>
            {campanhaAtual.descricao}
          </p>

          <div style={{ marginBottom: 20 }}>
            <b style={{ fontSize: 13, display: "block", marginBottom: 8, color: "var(--muted)" }}>ITENS MAIS NECESSÁRIOS NESTA CAMPANHA:</b>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {campanhaAtual.itensPrioritarios.map((it) => (
                <span key={it} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 99, background: "var(--sand)", color: "var(--forest)", fontWeight: 600 }}>
                  ✓ {it}
                </span>
              ))}
            </div>
          </div>

          {codigoGerado ? (
            <div style={{ padding: 20, borderRadius: 16, background: "rgba(102, 121, 79, 0.14)", color: "var(--forest)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <CheckCircle size={26} weight="fill" />
                <div>
                  <b style={{ display: "block", fontSize: 15 }}>Doação vinculada à campanha com sucesso! Código: {codigoGerado}</b>
                  <span style={{ fontSize: 13 }}>Entregue suas peças em {campanhaAtual.local} e ganhe seus pontos após a triagem.</span>
                </div>
              </div>
              <button type="button" className="btn sm" onClick={() => setCodigoGerado(null)}>
                Fazer outra doação
              </button>
            </div>
          ) : (
            <form onSubmit={handleDoarCampanha} style={{ padding: 20, borderRadius: 16, background: "var(--white)", border: "1px solid rgba(42,58,39,0.1)" }}>
              <b style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, marginBottom: 14, color: "var(--forest)" }}>
                <HandHeart size={20} weight="fill" color="var(--clay)" /> Participar agora: Registrar Peças para esta Campanha
              </b>
              <div className="campanha-doar-grid">
                <div>
                  <label className="label" style={{ fontSize: 12 }}>Quais peças você vai doar? *</label>
                  <input
                    type="text"
                    className="input"
                    style={{ padding: "10px 12px", fontSize: 14 }}
                    placeholder="Ex: 2 cobertores e 1 casaco de lã"
                    value={descDoar}
                    onChange={(e) => setDescDoar(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="label" style={{ fontSize: 12 }}>Quantidade *</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="input"
                    style={{ padding: "10px 12px", fontSize: 14 }}
                    value={qtdDoar}
                    onChange={(e) => setQtdDoar(Number(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <label className="label" style={{ fontSize: 12 }}>Tamanho</label>
                  <select className="input" style={{ padding: "10px 12px", fontSize: 14 }} value={tamDoar} onChange={(e) => setTamDoar(e.target.value)}>
                    <option value="P">P</option>
                    <option value="M">M</option>
                    <option value="G">G</option>
                    <option value="Infantil">Infantil</option>
                    <option value="Único">Único</option>
                  </select>
                </div>
                <button type="submit" className="btn sm" style={{ height: 42 }}>
                  Confirmar (+{qtdDoar * 30} pts)
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Cards de Campanhas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
        {campanhas.map((c) => {
          const pct = Math.min(100, Math.round((c.arrecadado / c.meta) * 100));
          return (
            <div key={c.id} className="card" style={{ padding: 22, borderRadius: 20, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ padding: 8, background: "rgba(102, 121, 79, 0.12)", borderRadius: 10, color: "var(--forest)" }}>
                      <Megaphone size={20} weight="duotone" />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--sage)" }}>{c.organizador}</span>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "#E6F0DC", color: "var(--forest)" }}>
                    {c.status}
                  </span>
                </div>

                <h3 style={{ fontSize: 19, marginBottom: 6 }}>{c.nome}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.45 }}>
                  {c.descricao}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                  {c.itensPrioritarios.slice(0, 3).map((tag) => (
                    <span key={tag} style={{ fontSize: 11, padding: "3px 9px", borderRadius: 99, background: "var(--cream)", color: "var(--ink)", border: "1px solid rgba(42,58,39,0.1)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                    <span style={{ color: "var(--muted)" }}>Progresso: <b style={{ color: "var(--ink)" }}>{c.arrecadado}</b> de {c.meta} peças</span>
                    <b style={{ color: "var(--forest)" }}>{pct}%</b>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: "var(--sand)", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, height: "100%", background: "var(--sage)", borderRadius: 99 }} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
                  <span style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 4 }}>
                    <CalendarBlank size={14} /> {c.periodo}
                  </span>
                  <button
                    type="button"
                    className="btn sm"
                    style={{ padding: "7px 14px", fontSize: 13 }}
                    onClick={() => {
                      setCampanhaAberta(c);
                      setCodigoGerado(null);
                    }}
                  >
                    Entrar na Campanha <ArrowRight size={14} weight="bold" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
