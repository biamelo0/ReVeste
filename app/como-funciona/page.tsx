import { Handshake, ArrowsClockwise, Tag, Heart, Plant, Users, GlobeHemisphereWest, CheckCircle, Buildings } from "@phosphor-icons/react/dist/ssr";

export default function ComoFunciona() {
  return (
    <main className="pad wrap">
      <div className="title center" style={{ textAlign: "center", marginBottom: 64 }}>
        <span className="pill">Nossa Missão</span>
        <h1>Como o <em>ReVeste</em> Funciona?</h1>
        <p>Mais do que uma campanha, um convite a repensar nosso jeito de consumir e cuidar uns dos outros.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
        <div>
          <h2>O Problema que <em>Resolvemos</em></h2>
          <p style={{ marginBottom: 16 }}>A indústria da moda é uma das mais poluentes do mundo. Todos os anos, toneladas de roupas em bom estado vão parar em aterros sanitários. Ao mesmo tempo, enfrentamos um aumento nas temperaturas extremas e desigualdade social, onde muitos precisam de agasalhos.</p>
          <ul style={{ listStyle: "none", display: "grid", gap: 16 }}>
            <li style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckCircle size={24} color="var(--clay)" weight="fill" /> Falta de rastreamento de doações</li>
            <li style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckCircle size={24} color="var(--clay)" weight="fill" /> Dificuldade em comunicar campanhas de forma ampla</li>
            <li style={{ display: "flex", gap: 12, alignItems: "center" }}><CheckCircle size={24} color="var(--clay)" weight="fill" /> Pouco engajamento e recompensas</li>
          </ul>
        </div>
        <div style={{ background: "var(--sand)", padding: 40, borderRadius: 32 }}>
          <Plant size={48} color="var(--forest)" weight="duotone" style={{ marginBottom: 16 }} />
          <h3>Nossa Solução</h3>
          <p>O ReVeste centraliza doações e trocas, promovendo o consumo consciente e transparente com um sistema gamificado que recompensa quem ajuda.</p>
        </div>
      </div>

      <div className="title center" style={{ textAlign: "center" }}>
        <h2>Modalidades de <em>Apoio</em></h2>
      </div>
      <div className="modes" style={{ marginBottom: 80 }}>
        <article className="mode">
          <div className="ic"><Handshake size={32} weight="light" /></div>
          <h3>Doar</h3>
          <p>Dê uma nova vida às peças que não usa mais. Envie uma foto e ganhe créditos.</p>
        </article>
        <article className="mode">
          <div className="ic"><ArrowsClockwise size={32} weight="light" /></div>
          <h3>Trocar</h3>
          <p>Encontrou algo legal? Troque peça por peça de forma justa e sem gastar nada.</p>
        </article>
        <article className="mode">
          <div className="ic"><Tag size={32} weight="light" /></div>
          <h3>Vender</h3>
          <p>Venda roupas por valores simbólicos. Limitamos o valor para garantir o acesso social.</p>
        </article>
        <article className="mode">
          <div className="ic"><Heart size={32} weight="light" /></div>
          <h3>Campanhas</h3>
          <p>Participe de ações de ONGs locais, principalmente na Campanha do Agasalho.</p>
        </article>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, textAlign: "center", background: "var(--forest)", color: "var(--cream)", padding: 64, borderRadius: 32 }}>
        <div>
          <Users size={48} weight="light" style={{ margin: "0 auto 16px" }} />
          <h3>Para as Pessoas</h3>
          <p style={{ color: "#C9D6B4", fontSize: 14 }}>Moda sustentável acessível e gamificação para incentivar o bem.</p>
        </div>
        <div>
          <GlobeHemisphereWest size={48} weight="light" style={{ margin: "0 auto 16px" }} />
          <h3>Para o Planeta</h3>
          <p style={{ color: "#C9D6B4", fontSize: 14 }}>Redução drástica do descarte têxtil e da emissão de CO₂.</p>
        </div>
        <div>
          <Buildings size={48} weight="light" style={{ margin: "0 auto 16px" }} />
          <h3>Para Empresas</h3>
          <p style={{ color: "#C9D6B4", fontSize: 14 }}>Transparência, relatórios de impacto e selos de sustentabilidade.</p>
        </div>
      </div>
    </main>
  );
}
