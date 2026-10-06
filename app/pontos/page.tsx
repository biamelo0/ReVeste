import { MapPin, Buildings, House, MagnifyingGlass, FileText, CheckSquareOffset } from "@phosphor-icons/react/dist/ssr";

export default function Pontos() {
  const points = [
    { i: <MapPin size={26} weight="regular" />, n: "Faculdade de Tecnologia", s: "Itapetininga · Seg a sex, 8h às 21h · Faltam Casacos" },
    { i: <Buildings size={26} weight="regular" />, n: "Fundo Social de Solidariedade", s: "Centro · Campanha do agasalho · Faltam Cobertores" },
    { i: <House size={26} weight="regular" />, n: "ONG Mãos Dadas", s: "Vila Rio Branco · Seg a sáb · Faltam Roupas Infantis" },
  ];

  return (
    <main className="pad wrap">
      <div className="title" style={{ marginBottom: 48 }}>
        <span className="pill">Rede de Apoio</span>
        <h1>Pontos de <em>Coleta</em></h1>
        <p>Acesse as ONGs, escolas e instituições cadastradas em nossa plataforma e veja o que elas mais precisam.</p>
      </div>
      
      <div className="map" style={{ marginBottom: 80 }}>
        <div>
          <div className="points">
            {points.map((p) => (
              <div className="pt-card" key={p.n}>
                <div className="ic">{p.i}</div>
                <div><b>{p.n}</b><small>{p.s}</small></div>
              </div>
            ))}
          </div>
        </div>
        <div className="mapbox" role="img" aria-label="Mapa ilustrativo com pontos de coleta">
          <span className="pin" style={{ left: "24%", top: "28%", color: "var(--clay)" }}><MapPin size={36} weight="fill" /></span>
          <span className="pin" style={{ left: "58%", top: "44%", color: "var(--clay)" }}><MapPin size={36} weight="fill" /></span>
          <span className="pin" style={{ left: "38%", top: "66%", color: "var(--clay)" }}><MapPin size={36} weight="fill" /></span>
        </div>
      </div>

      <div style={{ background: "var(--sand)", borderRadius: 32, padding: 64 }}>
        <h2 style={{ textAlign: "center", marginBottom: 40 }}>Como atuar como <em>Ponto de Coleta?</em></h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <div style={{ background: "var(--white)", padding: 32, borderRadius: 24 }}>
            <MagnifyingGlass size={32} color="var(--forest)" weight="duotone" style={{ marginBottom: 16 }} />
            <h4>1. Cadastro Visível</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>O ponto cria um perfil preenchendo endereço e horários, e logo fica visível nos mapas para os usuários da região.</p>
          </div>
          <div style={{ background: "var(--white)", padding: 32, borderRadius: 24 }}>
            <FileText size={32} color="var(--forest)" weight="duotone" style={{ marginBottom: 16 }} />
            <h4>2. Acompanhamento</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>O responsável acessa um painel de controle onde gerencia as doações direcionadas à sua unidade, com filtros e relatórios.</p>
          </div>
          <div style={{ background: "var(--white)", padding: 32, borderRadius: 24 }}>
            <CheckSquareOffset size={32} color="var(--forest)" weight="duotone" style={{ marginBottom: 16 }} />
            <h4>3. Comprovação</h4>
            <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 8 }}>Ao receber a doação, o ponto de coleta valida o item, gerando o comprovante e disparando os pontos para o doador.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
