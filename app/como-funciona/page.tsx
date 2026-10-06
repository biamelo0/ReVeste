import { Handshake, ArrowsClockwise, Tag, Heart } from "@phosphor-icons/react/dist/ssr";

export default function ComoFunciona() {
  return (
    <main className="pad wrap">
      <div className="title center" style={{ textAlign: "center", marginBottom: 64 }}>
        <h1>Como o <em>ReVeste</em> Funciona?</h1>
        <p>Entenda como conectamos pessoas e empresas em prol da solidariedade e da sustentabilidade.</p>
      </div>

      <div className="modes" style={{ marginBottom: 48 }}>
        <article className="mode">
          <div className="ic"><Handshake size={32} weight="light" /></div>
          <h3>Doar</h3>
          <p>Dê uma nova vida às peças que não usa mais. Toda doação é convertida em créditos e ajuda a aquecer quem precisa.</p>
        </article>
        <article className="mode">
          <div className="ic"><ArrowsClockwise size={32} weight="light" /></div>
          <h3>Trocar</h3>
          <p>Troque peça por peça com outras pessoas da comunidade, sem gastar nada.</p>
        </article>
        <article className="mode">
          <div className="ic"><Tag size={32} weight="light" /></div>
          <h3>Vender</h3>
          <p>Venda roupas em bom estado por valores simbólicos e faça o ciclo da moda continuar girando.</p>
        </article>
        <article className="mode">
          <div className="ic"><Heart size={32} weight="light" /></div>
          <h3>Campanhas</h3>
          <p>Participe da campanha do agasalho e de ações de ONGs e instituições parceiras.</p>
        </article>
      </div>

      <div style={{ maxWidth: 800, margin: "0 auto", marginTop: 64 }}>
        <h2>Objetivos e Justificativas do Sistema</h2>
        <br/>
        <p style={{ marginBottom: 16 }}>O projeto ReVeste nasceu da inquietação diante de duas realidades difíceis de ignorar: o aumento das temperaturas extremas e a quantidade absurda de roupas descartadas todos os anos. Ao unir moda sustentável com uma campanha do agasalho moderna e interativa, o projeto convida as pessoas a participarem de uma rede de apoio onde cada peça pode fazer a diferença.</p>
        <p style={{ marginBottom: 16 }}>Por meio de pontos de coleta, as doações são incentivadas com um sistema de pontuação que gera benefícios para quem colabora. Esses pontos podem ser trocados por descontos, brindes e destaque no “ranking da solidariedade”. Tudo isso depende de um sistema online que organiza as doações, válida os itens recebidos e distribui os pontos.</p>
        <p>Mais do que uma campanha, o ReVeste é um convite a repensar nosso jeito de consumir e cuidar uns dos outros. Quando damos um novo destino a uma roupa, aquecemos alguém e preservamos o planeta ao mesmo tempo.</p>
      </div>
    </main>
  );
}
