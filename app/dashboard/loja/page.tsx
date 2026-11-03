"use client";
import { useState } from "react";
import { ShoppingCart, Star, CheckCircle, QrCode, MapPin, X, Ticket } from "@phosphor-icons/react";
import { useReveste, LojaItem } from "../../context/RevesteContext";

function GarmentIllustration({ categoria, cor }: { categoria: LojaItem["categoria"]; cor: string }) {
  switch (categoria) {
    case "camisa":
      return (
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <path d="M38 22L50 18H70L82 22L104 40L92 56L78 46V98H42V46L28 56L16 40L38 22Z" fill={cor} stroke="#25301F" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M50 18L60 32L70 18" stroke="#FFFDF7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="44" r="2.2" fill="#FFFDF7" />
          <circle cx="60" cy="58" r="2.2" fill="#FFFDF7" />
          <circle cx="60" cy="72" r="2.2" fill="#FFFDF7" />
        </svg>
      );
    case "jaqueta":
      return (
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <path d="M36 20L48 16H72L84 20L104 44L90 60L80 48V98H40V48L30 60L16 44L36 20Z" fill={cor} stroke="#25301F" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="60" y1="24" x2="60" y2="98" stroke="#FFFDF7" strokeWidth="2" />
          <rect x="45" y="42" width="10" height="10" rx="2" stroke="#FFFDF7" strokeWidth="1.8" />
          <rect x="65" y="42" width="10" height="10" rx="2" stroke="#FFFDF7" strokeWidth="1.8" />
          <path d="M48 16L60 26L72 16" fill="#2A3A27" />
        </svg>
      );
    case "ecobag":
      return (
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <path d="M45 42V26C45 18 52 14 60 14C68 14 75 18 75 26V42" stroke="#25301F" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="30" y="40" width="60" height="64" rx="8" fill={cor} stroke="#25301F" strokeWidth="2.5" />
          <path d="M50 78C50 64 60 54 72 54C72 68 62 78 50 78Z" fill="#DCE5CF" stroke="#FFFDF7" strokeWidth="1.8" />
        </svg>
      );
    case "sueter":
      return (
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <path d="M38 24C45 20 75 20 82 24L102 48L88 60L78 48V96H42V48L32 60L18 48L38 24Z" fill={cor} stroke="#25301F" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M42 62H78M42 72H78" stroke="#FFFDF7" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M48 22C52 28 68 28 72 22" stroke="#FFFDF7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case "calca":
      return (
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <path d="M38 18H82L88 102H66L60 52L54 102H32L38 18Z" fill={cor} stroke="#25301F" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="38" y1="28" x2="82" y2="28" stroke="#FFFDF7" strokeWidth="2" />
          <path d="M40 34C46 38 48 44 42 48" stroke="#FFFDF7" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M80 34C74 38 72 44 78 48" stroke="#FFFDF7" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "cachecol":
    default:
      return (
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <rect x="26" y="32" width="68" height="24" rx="12" fill={cor} stroke="#25301F" strokeWidth="2.5" />
          <path d="M62 50V94H82V48" fill={cor} stroke="#25301F" strokeWidth="2.5" strokeLinejoin="round" />
          <line x1="65" y1="94" x2="65" y2="102" stroke="#25301F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="72" y1="94" x2="72" y2="102" stroke="#25301F" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="79" y1="94" x2="79" y2="102" stroke="#25301F" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
}

export default function LojaSolidaria() {
  const { user, itensLoja, resgatarItemLoja } = useReveste();
  const [selecionado, setSelecionado] = useState<LojaItem | null>(null);
  const [erroMsg, setErroMsg] = useState("");
  const [voucherAtivo, setVoucherAtivo] = useState<LojaItem | null>(null);

  const handleConfirmarResgate = (item: LojaItem) => {
    setErroMsg("");
    const res = resgatarItemLoja(item.id);
    if (!res.ok) {
      setErroMsg(res.msg);
      return;
    }
    setSelecionado(null);
    if (res.item) {
      setVoucherAtivo(res.item);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 26, marginBottom: 4 }}>Loja Solidária</h1>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            Troque seus pontos por peças sustentáveis higienizadas ou de upcycling confeccionadas por ONGs parceiras.
          </p>
        </div>
        <div style={{ padding: "8px 18px", background: "var(--forest)", color: "var(--cream)", borderRadius: 99, fontWeight: 600, display: "flex", alignItems: "center", gap: 8, fontSize: 15 }}>
          <Star weight="fill" color="#F1E3C4" /> Saldo: {user.pontos} pts
        </div>
      </div>

      {/* Modal de Confirmação de Resgate */}
      {selecionado && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(37, 48, 31, 0.55)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
        >
          <div className="card" style={{ maxWidth: 480, width: "100%", maxHeight: "90vh", overflowY: "auto", padding: 28, position: "relative" }}>
            <button
              type="button"
              onClick={() => {
                setSelecionado(null);
                setErroMsg("");
              }}
              style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", cursor: "pointer", color: "var(--muted)" }}
            >
              <X size={22} weight="bold" />
            </button>

            <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 20 }}>
              <div style={{ width: 92, height: 92, borderRadius: 18, background: selecionado.corFundo, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <GarmentIllustration categoria={selecionado.categoria} cor={selecionado.corPeca} />
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 10px", borderRadius: 99, background: "var(--sand)", color: "var(--forest)" }}>
                  {selecionado.tamanho}
                </span>
                <h2 style={{ fontSize: 20, marginTop: 6, marginBottom: 4 }}>{selecionado.nome}</h2>
                <b style={{ color: "var(--clay)", fontSize: 18 }}>{selecionado.pontos} pontos</b>
              </div>
            </div>

            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 16 }}>
              {selecionado.descricao}
            </p>

            <div style={{ padding: 14, borderRadius: 12, background: "#F7F4EB", marginBottom: 20, fontSize: 13 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 600, color: "var(--forest)", marginBottom: 2 }}>
                <MapPin size={16} weight="fill" /> Local de Retirada Presencial:
              </div>
              <div style={{ color: "var(--ink)" }}>{selecionado.ong}</div>
              <div style={{ color: "var(--muted)" }}>{selecionado.enderecoRetirada}</div>
            </div>

            {erroMsg && (
              <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(184, 97, 63, 0.14)", color: "var(--clay)", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
                {erroMsg}
              </div>
            )}

            <div style={{ display: "flex", gap: 10 }}>
              <button
                type="button"
                className="btn"
                style={{ flex: 1, justifyContent: "center" }}
                onClick={() => handleConfirmarResgate(selecionado)}
              >
                Confirmar Resgate (-{selecionado.pontos} pts)
              </button>
              <button
                type="button"
                className="btn ghost"
                onClick={() => {
                  setSelecionado(null);
                  setErroMsg("");
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal do Voucher Gerado */}
      {voucherAtivo && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(37, 48, 31, 0.55)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
        >
          <div className="card" style={{ maxWidth: 440, width: "100%", maxHeight: "90vh", overflowY: "auto", padding: 28, textAlign: "center", border: "2px solid var(--forest)" }}>
            <QrCode size={76} color="var(--forest)" style={{ margin: "0 auto 10px" }} />
            <span className="pill" style={{ marginBottom: 10 }}>Peça Reservada com Sucesso!</span>
            <h2 style={{ fontSize: 22, marginBottom: 4 }}>Cupom: {voucherAtivo.voucherCodigo}</h2>
            <p style={{ fontSize: 15, fontWeight: 600, color: "var(--forest)", marginBottom: 12 }}>
              {voucherAtivo.nome} ({voucherAtivo.tamanho})
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20 }}>
              Apresente este cupom com seu documento na instituição <b>{voucherAtivo.ong}</b> ({voucherAtivo.enderecoRetirada}) para retirar sua peça gratuitamente.
            </p>
            <button type="button" className="btn" style={{ width: "100%", justifyContent: "center" }} onClick={() => setVoucherAtivo(null)}>
              Fechar Comprovante
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(235px, 1fr))", gap: 20 }}>
        {itensLoja.map((item) => (
          <div key={item.id} className="card" style={{ padding: 18, borderRadius: 20, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                width: "100%",
                height: 155,
                background: item.corFundo,
                borderRadius: 14,
                marginBottom: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  fontSize: 11,
                  fontWeight: 600,
                  background: "var(--white)",
                  color: "var(--forest)",
                  padding: "3px 10px",
                  borderRadius: 99,
                }}
              >
                {item.tamanho}
              </span>
              <GarmentIllustration categoria={item.categoria} cor={item.corPeca} />
            </div>

            <b style={{ fontSize: 16, marginBottom: 2 }}>{item.nome}</b>
            <span style={{ fontSize: 12, color: "var(--sage)", fontWeight: 600, marginBottom: 6 }}>{item.ong}</span>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 14, lineHeight: 1.4 }}>{item.descricao}</p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 10, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
              <b style={{ color: "var(--clay)", fontSize: 17 }}>{item.pontos} pts</b>
              {item.resgatado ? (
                <button
                  type="button"
                  className="btn sm ghost"
                  style={{ padding: "6px 12px", fontSize: 12 }}
                  onClick={() => setVoucherAtivo(item)}
                >
                  <Ticket size={16} weight="fill" /> Ver Cupom
                </button>
              ) : (
                <button
                  type="button"
                  className="btn sm"
                  style={{ padding: "7px 14px", fontSize: 13 }}
                  onClick={() => {
                    setErroMsg("");
                    setSelecionado(item);
                  }}
                >
                  <ShoppingCart size={16} weight="bold" /> Pegar Peça
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
