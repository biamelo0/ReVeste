"use client";
import { useState } from "react";
import { ShieldCheck, ArrowRight, CheckCircle, XCircle } from "@phosphor-icons/react";
import { useReveste, DoacaoItem } from "../../context/RevesteContext";

export default function ValidarPecas() {
  const { doacoes, validarDoacao } = useReveste();
  const [avaliando, setAvaliando] = useState<DoacaoItem | null>(null);
  const [pontosInput, setPontosInput] = useState<number>(150);
  const [motivoInput, setMotivoInput] = useState("");
  const [msgSucesso, setMsgSucesso] = useState("");

  // Mostra lotes "Recebido no ponto" e "Aguardando entrega" para facilitar a avaliação completa
  const filaTriagem = doacoes.filter(
    (d) => d.status === "Recebido no ponto" || d.status === "Aguardando entrega"
  );

  const abrirAvaliacao = (item: DoacaoItem) => {
    setAvaliando(item);
    setPontosInput(item.pontosGerados);
    setMotivoInput("");
    setMsgSucesso("");
  };

  const confirmarValidacao = (aprovar: boolean) => {
    if (!avaliando) return;
    validarDoacao(avaliando.id, aprovar, Number(pontosInput) || avaliando.pontosGerados, motivoInput);
    setMsgSucesso(
      aprovar
        ? `Lote ${avaliando.codigo} aprovado! +${pontosInput} pontos foram creditados na conta de ${avaliando.doador}.`
        : `Lote ${avaliando.codigo} reprovado na triagem.`
    );
    setAvaliando(null);
  };

  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <span style={{ textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em", color: "var(--clay)", fontWeight: 600 }}>Ponto de Coleta / Triagem</span>
        <h1 style={{ fontSize: 28, marginBottom: 8, marginTop: 4 }}>Validar Peças e Dar Pontos</h1>
        <p style={{ color: "var(--muted)" }}>Avalie as peças recebidas e libere os pontos de recompensa para os doadores.</p>
      </div>

      {msgSucesso && (
        <div style={{ padding: "16px 20px", background: "rgba(102, 121, 79, 0.15)", color: "var(--forest)", borderRadius: 16, marginBottom: 24, fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}>
          <CheckCircle size={22} weight="fill" />
          <span>{msgSucesso}</span>
        </div>
      )}

      {avaliando && (
        <div className="card" style={{ marginBottom: 32, border: "2px solid var(--forest)" }}>
          <h2 style={{ fontSize: 20, marginBottom: 6 }}>Triagem do Lote {avaliando.codigo}: {avaliando.titulo}</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20 }}>
            Doador: <b>{avaliando.doador}</b> • {avaliando.quantidade} peças ({avaliando.tamanho}) • {avaliando.descricao}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="label">Pontos a Creditar (30 pts por peça aprovada)</label>
              <input
                type="number"
                min={10}
                step={10}
                className="input"
                value={pontosInput}
                onChange={(e) => setPontosInput(Number(e.target.value))}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="label">Observação / Motivo (caso reprovado)</label>
              <input
                type="text"
                className="input"
                placeholder="Ex: Peças em excelente estado de conservação"
                value={motivoInput}
                onChange={(e) => setMotivoInput(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button type="button" className="btn" onClick={() => confirmarValidacao(true)}>
              <CheckCircle size={18} weight="bold" /> Aprovar e Liberar +{pontosInput} pts
            </button>
            <button
              type="button"
              className="btn clay"
              onClick={() => confirmarValidacao(false)}
            >
              <XCircle size={18} weight="bold" /> Reprovar Lote
            </button>
            <button type="button" className="btn ghost" onClick={() => setAvaliando(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "2fr 1fr 1fr", fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          <span>Lote Aguardando Triagem</span>
          <span>Doador</span>
          <span>Ação</span>
        </div>

        {filaTriagem.length === 0 ? (
          <div style={{ padding: 32, textAlign: "center", color: "var(--muted)" }}>
            Todos os lotes já foram validados! Cadastre uma nova doação em &ldquo;Minhas Doações&rdquo; para testar.
          </div>
        ) : (
          filaTriagem.map((item) => (
            <div
              key={item.id}
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0,0,0,0.05)",
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr",
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b>Lote #{item.codigo} — {item.titulo}</b>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 99, background: "rgba(102, 121, 79, 0.12)", color: "var(--forest)", fontWeight: 600 }}>
                    {item.status}
                  </span>
                </div>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  {item.dataCriacao} • {item.quantidade} peças ({item.descricao})
                </span>
              </div>
              <div style={{ fontSize: 14 }}>{item.doador}</div>
              <button
                type="button"
                className="btn sm ghost"
                style={{ width: "fit-content" }}
                onClick={() => abrirAvaliacao(item)}
              >
                Iniciar Avaliação <ArrowRight />
              </button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginTop: 32, padding: 24, background: "rgba(102, 121, 79, 0.05)", borderRadius: 16, border: "1px dashed var(--sage)" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
          <ShieldCheck size={28} color="var(--forest)" />
          <div>
            <b style={{ display: "block", marginBottom: 4, color: "var(--forest)" }}>Critérios de Validação ReVeste</b>
            <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
              Lembre-se: peças rasgadas, manchadas ou sem condições de uso higiênico não geram pontos. O doador será notificado sobre o motivo se o lote for invalidado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
