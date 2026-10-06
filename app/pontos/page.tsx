import { MapPin, Buildings, House } from "@phosphor-icons/react/dist/ssr";

export default function Pontos() {
  const points = [
    { i: <MapPin size={26} weight="regular" />, n: "Faculdade de Tecnologia", s: "Itapetininga · Seg a sex, 8h às 21h · Faltam Casacos" },
    { i: <Buildings size={26} weight="regular" />, n: "Fundo Social de Solidariedade", s: "Centro · Campanha do agasalho · Faltam Cobertores" },
    { i: <House size={26} weight="regular" />, n: "ONG Mãos Dadas", s: "Vila Rio Branco · Seg a sáb · Faltam Roupas Infantis" },
  ];

  return (
    <main className="pad wrap">
      <div className="title" style={{ marginBottom: 28 }}>
        <h1>Pontos de <em>Coleta</em></h1>
        <p>Leve suas roupas ao ponto mais próximo e veja quais itens estão em maior necessidade no momento.</p>
      </div>
      
      <div className="map" style={{ marginBottom: 64 }}>
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

      <div style={{ maxWidth: 800 }}>
        <h2>Cadastro de Pontos de Coleta e Comprovações</h2>
        <br/>
        <p style={{ marginBottom: 16 }}>O ator "Ponto de Coleta" pode realizar login, cadastrar e publicar seu próprio ponto de recebimento de doações na plataforma. Informações obrigatórias incluem nome, endereço e horário de funcionamento.</p>
        <p style={{ marginBottom: 16 }}>Os responsáveis também têm um painel para acompanhar as doações direcionadas à sua unidade, podendo filtrar os relatórios por período e status.</p>
        <p>Quando a doação é recebida fisicamente, o Ponto de Coleta acessa o sistema para validar e confirmar a doação. O sistema, por sua vez, gera o comprovante de doação, notifica o usuário e processa a atribuição dos pontos no Ranking.</p>
      </div>
    </main>
  );
}
