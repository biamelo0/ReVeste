"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Crown,
  Database,
  ArrowClockwise,
  DownloadSimple,
  CheckCircle,
  XCircle,
  Clock,
  Trash,
  Megaphone,
  MapPin,
  ShieldCheck,
  ChartPieSlice,
  Users,
  Coins,
  Package,
} from "@phosphor-icons/react";
import { useReveste } from "../../context/RevesteContext";

export default function AdminDashboard() {
  const {
    user,
    doacoes,
    campanhas,
    itensLoja,
    resetAllData,
    alterarStatusDoacaoAdmin,
    excluirCampanhaAdmin,
  } = useReveste();

  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [seedLoading, setSeedLoading] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [msgAviso, setMsgAviso] = useState<string | null>(null);

  // Proteção de acesso: apenas administradores
  if (!user.isAdmin) {
    return (
      <div className="card" style={{ maxWidth: 540, margin: "40px auto", textAlign: "center", padding: 36 }}>
        <Crown size={48} color="var(--clay)" style={{ margin: "0 auto 16px" }} />
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>Acesso Restrito ao Administrador</h2>
        <p style={{ color: "var(--muted)", marginBottom: 24, fontSize: 15 }}>
          Esta página é destinada exclusivamente à gestão administrativa do sistema ReVeste.
        </p>
        <Link href="/dashboard" className="btn sm" style={{ margin: "0 auto" }}>
          Voltar ao Meu Painel
        </Link>
      </div>
    );
  }

  // Estatísticas gerais
  const totalPecas = doacoes.reduce((acc, d) => acc + (d.quantidade || 1), 0);
  const pendentes = doacoes.filter((d) => d.status === "Aguardando entrega" || d.status === "Recebido no ponto").length;
  const validadas = doacoes.filter((d) => d.status === "Validado pela ONG").length;
  const totalPontosGerados = doacoes.reduce((acc, d) => acc + (d.pontosGerados || 0), 0);

  // Filtro de doações
  const doacoesFiltradas = doacoes.filter((d) => {
    if (filtroStatus === "todos") return true;
    return d.status === filtroStatus;
  });

  // Exportar todos os dados em JSON
  const handleExportData = () => {
    const payload = {
      user,
      doacoes,
      campanhas,
      itensLoja,
      exportadoEm: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reveste-backup-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Executar seed no banco de dados da Vercel
  const handleRunSeed = async () => {
    setSeedLoading(true);
    setSeedStatus(null);
    try {
      const res = await fetch("/api/seed");
      const data = await res.json();
      if (res.ok) {
        setSeedStatus(`Sucesso: ${data.message || "Banco de dados inicializado com sucesso!"}`);
      } else {
        setSeedStatus(`Aviso: ${data.error || "Não foi possível rodar o seed remoto (verifique conexão DB)."}`);
      }
    } catch (err: unknown) {
      setSeedStatus(`Executado em modo local: ${(err as Error).message}`);
    } finally {
      setSeedLoading(false);
    }
  };

  const handleResetDemo = () => {
    if (confirm("Tem certeza que deseja restaurar os dados originais da demonstração?")) {
      resetAllData();
      setMsgAviso("Dados da demonstração restaurados com sucesso!");
      setTimeout(() => setMsgAviso(null), 4000);
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28, flexWrap: "wrap", gap: 16 }}>
        <div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, textTransform: "uppercase", fontSize: 11, letterSpacing: "0.05em", color: "var(--clay)", fontWeight: 700 }}>
            <Crown size={15} weight="fill" /> Super Administrador
          </span>
          <h1 style={{ fontSize: 28, marginBottom: 6, marginTop: 4 }}>Painel Geral do Sistema</h1>
          <p style={{ color: "var(--muted)", margin: 0 }}>
            Visão completa e governança de usuários, doações, campanhas e banco de dados.
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button type="button" onClick={handleResetDemo} className="btn sm ghost" style={{ gap: 6 }}>
            <ArrowClockwise size={16} /> Restaurar Demo
          </button>
          <button type="button" onClick={handleExportData} className="btn sm ghost" style={{ gap: 6 }}>
            <DownloadSimple size={16} /> Backup JSON
          </button>
          <button type="button" onClick={handleRunSeed} disabled={seedLoading} className="btn sm" style={{ gap: 6 }}>
            <Database size={16} /> {seedLoading ? "Conectando..." : "Seed Banco (Vercel)"}
          </button>
        </div>
      </div>

      {msgAviso && (
        <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(102, 121, 79, 0.15)", color: "var(--forest)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
          <CheckCircle size={20} weight="fill" />
          <span>{msgAviso}</span>
        </div>
      )}

      {seedStatus && (
        <div style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(184, 97, 63, 0.1)", color: "var(--clay)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <Database size={20} weight="bold" />
          <span>{seedStatus}</span>
        </div>
      )}

      {/* Grid de Métricas Globais */}
      <div className="dash-grid" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <h3>Total de Doações</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{doacoes.length} lotes</b>
            <Package size={32} color="var(--forest)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>
            {totalPecas} peças de roupas registradas
          </span>
        </div>

        <div className="stat-card">
          <h3>Aguardando Triagem</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{pendentes} lotes</b>
            <Clock size={32} color="var(--clay)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>
            {validadas} lotes já aprovados
          </span>
        </div>

        <div className="stat-card">
          <h3>Campanhas Ativas</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{campanhas.length}</b>
            <Megaphone size={32} color="var(--sage)" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>
            Em andamento na rede
          </span>
        </div>

        <div className="stat-card">
          <h3>Pontos Distribuídos</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <b>{totalPontosGerados.toLocaleString("pt-BR")}</b>
            <Coins size={32} color="#D4A373" weight="duotone" />
          </div>
          <span style={{ fontSize: 13, color: "var(--muted)", display: "block", marginTop: 8 }}>
            Créditos ecológicos emitidos
          </span>
        </div>
      </div>

      {/* Acessos Rápidos a Módulos do Sistema */}
      <div className="card" style={{ marginBottom: 28, padding: 24 }}>
        <h2 style={{ fontSize: 17, marginBottom: 16 }}>Acessos Rápidos de Gestão</h2>
        <div className="grid-responsive-4" style={{ gap: 12 }}>
          <Link
            href="/dashboard/receber"
            style={{
              padding: 16,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <MapPin size={28} color="var(--clay)" />
            <div>
              <b style={{ display: "block", fontSize: 14 }}>Receber Doação</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Bipar e registrar</span>
            </div>
          </Link>

          <Link
            href="/dashboard/validar"
            style={{
              padding: 16,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <ShieldCheck size={28} color="var(--forest)" />
            <div>
              <b style={{ display: "block", fontSize: 14 }}>Validar Peças</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Triagem e pontos</span>
            </div>
          </Link>

          <Link
            href="/dashboard/campanhas"
            style={{
              padding: 16,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <Megaphone size={28} color="var(--sage)" />
            <div>
              <b style={{ display: "block", fontSize: 14 }}>Campanhas</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Criar e gerenciar</span>
            </div>
          </Link>

          <Link
            href="/dashboard/relatorios"
            style={{
              padding: 16,
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.08)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "var(--ink)",
              textDecoration: "none",
            }}
          >
            <ChartPieSlice size={28} color="var(--forest)" />
            <div>
              <b style={{ display: "block", fontSize: 14 }}>Relatórios ESG</b>
              <span style={{ fontSize: 12, color: "var(--muted)" }}>Métricas ambientais</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Gestão Geral de Doações */}
      <div className="card" style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 4 }}>Controle de Doações da Rede</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>
              Gerencie ou force a alteração de status de qualquer lote cadastrado.
            </p>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["todos", "Aguardando entrega", "Recebido no ponto", "Validado pela ONG", "Reprovado"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setFiltroStatus(st)}
                style={{
                  padding: "6px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  border: "1px solid rgba(0,0,0,0.1)",
                  background: filtroStatus === st ? "var(--forest)" : "transparent",
                  color: filtroStatus === st ? "#fff" : "var(--muted)",
                  cursor: "pointer",
                  fontWeight: filtroStatus === st ? 600 : 400,
                }}
              >
                {st === "todos" ? "Todas as doações" : st}
              </button>
            ))}
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 680 }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(0,0,0,0.08)", color: "var(--muted)" }}>
                <th style={{ padding: "12px 10px" }}>Código</th>
                <th style={{ padding: "12px 10px" }}>Título & Peças</th>
                <th style={{ padding: "12px 10px" }}>Doador</th>
                <th style={{ padding: "12px 10px" }}>Ponto Destino</th>
                <th style={{ padding: "12px 10px" }}>Status</th>
                <th style={{ padding: "12px 10px", textAlign: "right" }}>Ações do Admin</th>
              </tr>
            </thead>
            <tbody>
              {doacoesFiltradas.map((d) => (
                <tr key={d.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
                  <td style={{ padding: "12px 10px", fontWeight: 700, color: "var(--forest)" }}>{d.codigo}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <b>{d.titulo}</b>
                    <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>
                      {d.quantidade} peças · {d.modalidade}
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px" }}>{d.doador}</td>
                  <td style={{ padding: "12px 10px", fontSize: 13, color: "var(--muted)" }}>{d.pontoDestino}</td>
                  <td style={{ padding: "12px 10px" }}>
                    <span
                      style={{
                        padding: "4px 8px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 600,
                        background:
                          d.status === "Validado pela ONG"
                            ? "rgba(102, 121, 79, 0.15)"
                            : d.status === "Recebido no ponto"
                            ? "rgba(212, 163, 115, 0.2)"
                            : d.status === "Reprovado"
                            ? "rgba(230, 57, 70, 0.15)"
                            : "rgba(0,0,0,0.05)",
                        color:
                          d.status === "Validado pela ONG"
                            ? "var(--forest)"
                            : d.status === "Recebido no ponto"
                            ? "var(--clay)"
                            : d.status === "Reprovado"
                            ? "#c1121f"
                            : "var(--muted)",
                      }}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 10px", textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: 6 }}>
                      {d.status !== "Validado pela ONG" && (
                        <button
                          type="button"
                          onClick={() => {
                            alterarStatusDoacaoAdmin(d.id, "Validado pela ONG");
                            setMsgAviso(`Doação ${d.codigo} marcada como validada pelo Admin.`);
                          }}
                          className="btn sm"
                          style={{ padding: "4px 8px", fontSize: 11 }}
                          title="Aprovar e Liberar Pontos"
                        >
                          Aprovar
                        </button>
                      )}
                      {d.status !== "Recebido no ponto" && (
                        <button
                          type="button"
                          onClick={() => {
                            alterarStatusDoacaoAdmin(d.id, "Recebido no ponto");
                            setMsgAviso(`Doação ${d.codigo} marcada como recebida.`);
                          }}
                          className="btn sm ghost"
                          style={{ padding: "4px 8px", fontSize: 11 }}
                          title="Marcar como Recebido"
                        >
                          Recebido
                        </button>
                      )}
                      {d.status !== "Reprovado" && (
                        <button
                          type="button"
                          onClick={() => {
                            alterarStatusDoacaoAdmin(d.id, "Reprovado");
                            setMsgAviso(`Doação ${d.codigo} marcada como reprovada.`);
                          }}
                          style={{
                            padding: "4px 8px",
                            fontSize: 11,
                            borderRadius: 8,
                            background: "transparent",
                            border: "1px solid rgba(230,57,70,0.3)",
                            color: "#c1121f",
                            cursor: "pointer",
                          }}
                          title="Reprovar"
                        >
                          Reprovar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gestão de Campanhas */}
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
          <div>
            <h2 style={{ fontSize: 18, marginBottom: 4 }}>Campanhas Cadastradas</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: 0 }}>
              Visualização e moderação das campanhas ativas de ONGs parceiras.
            </p>
          </div>
          <Link href="/dashboard/campanhas" className="btn sm">
            + Nova Campanha
          </Link>
        </div>

        <div style={{ display: "grid", gap: 14 }}>
          {campanhas.map((c) => (
            <div
              key={c.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px",
                borderRadius: 12,
                background: "rgba(0,0,0,0.02)",
                border: "1px solid rgba(0,0,0,0.06)",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <b style={{ fontSize: 15, display: "block" }}>{c.nome}</b>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  {c.organizador} · {c.local} · Meta: {c.meta} peças ({c.arrecadado} arrecadadas)
                </span>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12, color: "var(--forest)", fontWeight: 600 }}>{c.periodo}</span>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remover campanha "${c.nome}"?`)) {
                      excluirCampanhaAdmin(c.id);
                      setMsgAviso(`Campanha "${c.nome}" removida.`);
                    }
                  }}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 8,
                    background: "transparent",
                    border: "1px solid rgba(230, 57, 70, 0.3)",
                    color: "#c1121f",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    fontSize: 12,
                  }}
                >
                  <Trash size={14} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}