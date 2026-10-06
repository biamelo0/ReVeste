import { Star, Trophy, Gift, ArrowRight, Medal, ChartLineUp, TShirt } from "@phosphor-icons/react/dist/ssr";

export default function Ranking() {
  const ranking = [
    { n: "Mariana S.", p: "1.240 pts" },
    { n: "Instituto Mãos Dadas", p: "1.105 pts" },
    { n: "Lucas P.", p: "980 pts" },
    { n: "Ana C.", p: "865 pts" },
  ];

  return (
    <main className="pad wrap">
      <div className="title center" style={{ textAlign: "center", marginBottom: 64 }}>
        <span className="pill">Gamificação</span>
        <h1>Ranking da <em>Solidariedade</em></h1>
        <p>Um sistema transparente e gamificado que converte solidariedade em recompensas.</p>
      </div>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", marginBottom: 80, flexWrap: "wrap" }}>
        <div className="mode" style={{ textAlign: "center", minWidth: 200 }}>
          <TShirt size={32} color="var(--sage)" weight="duotone" style={{ margin: "0 auto 12px" }} />
          <b style={{ display: "block" }}>1. Você Doa</b>
          <small>Cadastra e envia a roupa</small>
        </div>
        <ArrowRight size={24} color="var(--muted)" />
        <div className="mode" style={{ textAlign: "center", minWidth: 200 }}>
          <Medal size={32} color="var(--clay)" weight="duotone" style={{ margin: "0 auto 12px" }} />
          <b style={{ display: "block" }}>2. Validação</b>
          <small>Ponto de coleta confirma</small>
        </div>
        <ArrowRight size={24} color="var(--muted)" />
        <div className="mode" style={{ textAlign: "center", minWidth: 200 }}>
          <ChartLineUp size={32} color="var(--forest)" weight="duotone" style={{ margin: "0 auto 12px" }} />
          <b style={{ display: "block" }}>3. Você Ganha</b>
          <small>Créditos e posições no ranking</small>
        </div>
      </div>

      <div className="game" style={{ borderRadius: 32, padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2>Recompensas <em>Exclusivas</em></h2>
            <p>O ReVeste utiliza estratégias de gamificação para incentivar o engajamento contínuo, armazenando o histórico de pontos por usuário com total segurança e criptografia.</p>
            <ul className="perks" style={{ listStyle: "none", display: "grid", gap: 12 }}>
              <li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}><Star size={20} weight="fill" /></span> Acúmulo de créditos validado por ONGs</li>
              <li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}><Trophy size={20} weight="fill" /></span> Competição saudável e destaque mensal</li>
              <li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}><Gift size={20} weight="fill" /></span> Troque créditos por brindes com parceiros</li>
            </ul>
          </div>
          <div className="rank">
            <h3>Ranking do Mês</h3>
            <small>Atualizado em tempo real pelo banco de dados</small>
            {ranking.map((r, i) => (
              <div className="row" key={r.n}>
                <span className="pos">{i + 1}</span><b>{r.n}</b><span className="pt">{r.p}</span>
              </div>
            ))}
            <div className="bar" aria-hidden="true"><i /></div>
            <p className="next">Faltam 320 pontos para o seu próximo nível</p>
          </div>
        </div>
      </div>
    </main>
  );
}
