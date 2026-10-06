import { Star, Trophy, Gift } from "@phosphor-icons/react/dist/ssr";

export default function Ranking() {
  const ranking = [
    { n: "Mariana S.", p: "1.240 pts" },
    { n: "Instituto Mãos Dadas", p: "1.105 pts" },
    { n: "Lucas P.", p: "980 pts" },
    { n: "Ana C.", p: "865 pts" },
  ];

  return (
    <main className="pad wrap">
      <div className="game" style={{ borderRadius: 32, padding: "80px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <h2>Quanto mais você ajuda, <em>mais você ganha</em></h2>
            <p>Doar vira um jogo coletivo. Acumule créditos, suba no ranking e troque seus pontos por vantagens exclusivas.</p>
            <ul className="perks" style={{ listStyle: "none", display: "grid", gap: 12 }}>
              <li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}><Star size={20} weight="fill" /></span> Créditos a cada doação ou troca validadas</li>
              <li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}><Trophy size={20} weight="fill" /></span> Ranking mensal destacando os maiores doadores</li>
              <li style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "grid", placeItems: "center" }}><Gift size={20} weight="fill" /></span> Troque pontos por descontos com parceiros e empresas</li>
            </ul>
          </div>
          <div className="rank">
            <h3>Ranking do Mês</h3>
            <small>Pessoas e instituições que mais doaram</small>
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

      <div style={{ maxWidth: 800, marginTop: 64 }}>
        <h2>Sistema de Gamificação</h2>
        <br/>
        <p style={{ marginBottom: 16 }}>O ReVeste utiliza estratégias de gamificação para incentivar o engajamento contínuo. Através da central de doações, cada peça doada tem uma foto validada pelo administrador ou ponto de coleta.</p>
        <p>A partir do momento que a doação é confirmada e o comprovante gerado, o sistema converte automaticamente a ação em créditos e descontos, subindo a posição do usuário no Ranking da Solidariedade.</p>
      </div>
    </main>
  );
}
