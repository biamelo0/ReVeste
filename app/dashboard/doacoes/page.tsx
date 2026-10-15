"use client";
import { useState } from "react";
import { Plus, Package, Clock, CheckCircle, XCircle, QrCode, Camera, X } from "@phosphor-icons/react";
import { useReveste, DoacaoItem } from "../../context/RevesteContext";

export default function Doacoes() {
  const { doacoes, criarDoacao } = useReveste();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [qrModal, setQrModal] = useState<DoacaoItem | null>(null);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [tamanho, setTamanho] = useState("M");
  const [modalidade, setModalidade] = useState<"Doação" | "Troca" | "Venda">("Doação");
  const [preco, setPreco] = useState("");
  const [pontoDestino, setPontoDestino] = useState("Faculdade de Tecnologia (FATEC)");
  const [whatsapp, setWhatsapp] = useState("15999990000");
  const [fotoUrl, setFotoUrl] = useState<string | undefined>(undefined);
  const [erroPreco, setErroPreco] = useState("");

  const handleFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErroPreco("");

    const valorPreco = preco ? Number(preco) : undefined;
    if (modalidade === "Venda" && valorPreco && valorPreco > 50) {
      setErroPreco("Limite social atingido: o valor máximo permitido para venda solidária na ReVeste é R$ 50,00.");
      return;
    }

    const criada = criarDoacao({
      titulo,
      descricao,
      quantidade: Number(quantidade) || 1,
      tamanho,
      modalidade,
      preco: valorPreco,
      pontoDestino,
      whatsapp,
      fotoUrl,
    });

    setTitulo("");
    setDescricao("");
    setQuantidade(1);
    setPreco("");
    setFotoUrl(undefined);
    setMostrarForm(false);
    setQrModal(criada);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 28, marginBottom: 8 }}>Minhas Doações e Peças</h1>
          <p style={{ color: "var(--muted)" }}>Cadastre novas roupas para doação, troca ou venda social e acompanhe a validação.</p>
        </div>
        <button className="btn" onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? <><X weight="bold" /> Fechar Formulário</> : <><Plus weight="bold" /> Nova Doação / Peça</>}
        </button>
      </div>

      {mostrarForm && (
        <div className="card" style={{ marginBottom: 32, border: "2px solid var(--sage)" }}>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Cadastrar Nova Doação ou Peça</h2>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Cada peça validada no ponto de coleta gera automaticamente <b>+30 pontos</b> para você usar na Loja Solidária.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div className="form-group">
                <label className="label">Título da Peça ou Lote *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: Casaco de Lã Bege / Lote Inverno"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Modalidade *</label>
                <select
                  className="input"
                  value={modalidade}
                  onChange={(e) => setModalidade(e.target.value as "Doação" | "Troca" | "Venda")}
                >
                  <option value="Doação">Doação Solidária (+30 pts/peça)</option>
                  <option value="Troca">Troca Comunitária</option>
                  <option value="Venda">Venda Social (máx. R$ 50,00)</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="label">Descrição e Estado de Conservação *</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: 3 blusas de frio higienizadas e em ótimo estado, sem manchas."
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Quantidade de Peças *</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  className="input"
                  value={quantidade}
                  onChange={(e) => setQuantidade(Number(e.target.value))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="label">Tamanho Principal *</label>
                <select className="input" value={tamanho} onChange={(e) => setTamanho(e.target.value)}>
                  <option value="P">Tamanho P</option>
                  <option value="M">Tamanho M</option>
                  <option value="G">Tamanho G</option>
                  <option value="GG">Tamanho GG</option>
                  <option value="Infantil">Infantil</option>
                  <option value="Único">Tamanho Único / Calçado</option>
                </select>
              </div>

              {modalidade === "Venda" && (
                <div className="form-group">
                  <label className="label">Preço Social (R$ - máx. R$ 50) *</label>
                  <input
                    type="number"
                    min={1}
                    step="0.50"
                    className="input"
                    placeholder="Ex: 25.00"
                    value={preco}
                    onChange={(e) => setPreco(e.target.value)}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label className="label">Ponto de Coleta de Destino *</label>
                <select className="input" value={pontoDestino} onChange={(e) => setPontoDestino(e.target.value)}>
                  <option value="Faculdade de Tecnologia (FATEC)">Faculdade de Tecnologia (FATEC Itapetininga)</option>
                  <option value="Fundo Social de Solidariedade">Fundo Social de Solidariedade - Centro</option>
                  <option value="ONG Mãos Dadas">ONG Mãos Dadas - Vila Rio Branco</option>
                </select>
              </div>

              <div className="form-group">
                <label className="label">WhatsApp de Contato</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Ex: 15999990000"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ gridColumn: "1 / -1" }}>
                <label className="label">Foto da Peça / Sacola (JPG ou PNG)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                  <label className="btn sm ghost" style={{ cursor: "pointer" }}>
                    <Camera size={18} /> Escolher Foto
                    <input type="file" accept="image/*" onChange={handleFoto} style={{ display: "none" }} />
                  </label>
                  {fotoUrl && (
                    <img
                      src={fotoUrl}
                      alt="Preview da peça"
                      style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)" }}
                    />
                  )}
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>
                    {fotoUrl ? "Foto anexada com sucesso!" : "Opcional para teste — obrigatória na entrega presencial."}
                  </span>
                </div>
              </div>
            </div>

            {erroPreco && (
              <div style={{ padding: "12px 16px", background: "rgba(184, 97, 63, 0.12)", color: "var(--clay)", borderRadius: 12, fontSize: 14, marginBottom: 16, fontWeight: 500 }}>
                {erroPreco}
              </div>
            )}

            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              <button type="submit" className="btn">
                Confirmar e Gerar Código ({quantidade * 30} pts)
              </button>
              <button type="button" className="btn ghost" onClick={() => setMostrarForm(false)}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {qrModal && (
        <div className="card" style={{ marginBottom: 32, background: "#F4F7EF", border: "2px solid var(--forest)", textAlign: "center" }}>
          <QrCode size={72} color="var(--forest)" style={{ margin: "0 auto 12px" }} />
          <span className="pill" style={{ marginBottom: 12 }}>Doação Registrada com Sucesso!</span>
          <h2 style={{ fontSize: 24, marginBottom: 8 }}>Código da Etiqueta: {qrModal.codigo}</h2>
          <p style={{ color: "var(--muted)", maxWidth: 520, margin: "0 auto 20px", fontSize: 15 }}>
            Apresente este código ou QR Code no ponto <b>{qrModal.pontoDestino}</b>. Você também pode testar o recebimento agora mesmo na aba <b>Receber Doação</b> e aprovar os pontos em <b>Validar Peças</b>!
          </p>
          <button className="btn sm" onClick={() => setQrModal(null)}>Entendi</button>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "grid", gridTemplateColumns: "1.6fr 1.2fr 1fr", fontWeight: 600, fontSize: 14, color: "var(--muted)" }}>
          <span>Item / Lote</span>
          <span>Status e Ponto</span>
          <span>Pontos / Ação</span>
        </div>

        {doacoes.map((d) => (
          <div
            key={d.id}
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(0,0,0,0.05)",
              display: "grid",
              gridTemplateColumns: "1.6fr 1.2fr 1fr",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {d.fotoUrl ? (
                <img src={d.fotoUrl} alt={d.titulo} style={{ width: 48, height: 48, borderRadius: 12, objectFit: "cover" }} />
              ) : (
                <div style={{ padding: 12, background: "rgba(102, 121, 79, 0.1)", borderRadius: 12, color: "var(--forest)" }}>
                  <Package size={24} />
                </div>
              )}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <b>{d.titulo}</b>
                  <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 99, background: "var(--sand)", color: "var(--forest)", fontWeight: 600 }}>
                    {d.codigo}
                  </span>
                </div>
                <span style={{ fontSize: 13, color: "var(--muted)", display: "block" }}>
                  {d.quantidade} {d.quantidade === 1 ? "peça" : "peças"} ({d.tamanho}) • {d.modalidade}
                  {d.preco ? ` (R$ ${d.preco.toFixed(2)})` : ""}
                </span>
              </div>
            </div>

            <div>
              {d.status === "Validado pela ONG" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--sage)", fontWeight: 600, fontSize: 14 }}>
                  <CheckCircle size={20} weight="fill" /> Validado pela ONG
                </div>
              )}
              {d.status === "Aguardando entrega" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--clay)", fontWeight: 500, fontSize: 14 }}>
                  <Clock size={20} weight="fill" /> Aguardando entrega no ponto
                </div>
              )}
              {d.status === "Recebido no ponto" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--forest)", fontWeight: 500, fontSize: 14 }}>
                  <Clock size={20} weight="fill" /> Recebido (Em triagem)
                </div>
              )}
              {d.status === "Reprovado" && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#b91c1c", fontWeight: 500, fontSize: 14 }}>
                  <XCircle size={20} weight="fill" /> Reprovado na triagem
                </div>
              )}
              <small style={{ color: "var(--muted)", fontSize: 12 }}>{d.pontoDestino}</small>
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              {d.status === "Validado pela ONG" ? (
                <b style={{ color: "var(--forest)" }}>+ {d.pontosGerados} pts</b>
              ) : (
                <span style={{ color: "var(--muted)", fontSize: 13 }}>+{d.pontosGerados} pts previstos</span>
              )}
              <button
                type="button"
                className="btn sm ghost"
                style={{ padding: "6px 12px", fontSize: 12 }}
                onClick={() => setQrModal(d)}
              >
                <QrCode size={16} /> QR Code
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
