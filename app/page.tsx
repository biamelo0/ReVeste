import { Handshake, ArrowsClockwise, Tag, Heart, TShirt, Sparkle, CoatHanger, Tote, MapPin, Buildings, House, Star, Trophy, Gift } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const Wave = ({ color, pos }: { color: string; pos: "top" | "bot" }) => (
  <svg className={`wave ${pos}`} viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
    <path
      fill={color}
      d={pos === "top"
        ? "M0 0H1440V30C1200 80 960 0 720 28S240 70 0 24Z"
        : "M0 70H1440V40C1200 -10 960 70 720 42S240 0 0 46Z"}
    />
  </svg>
);

const Leaf = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M10 54C10 28 28 10 54 10c0 26-18 44-44 44Z" />
    <path d="M10 54 38 26" />
  </svg>
);

const modes = [
  { i: <Handshake size={32} weight="light" />, t: "Doar", d: "Dê uma nova vida às peças que não usa mais e ajude quem mais precisa." },
  { i: <ArrowsClockwise size={32} weight="light" />, t: "Trocar", d: "Troque peça por peça com outras pessoas, sem gastar nada." },
  { i: <Tag size={32} weight="light" />, t: "Vender", d: "Venda roupas em bom estado e faça o ciclo da moda continuar girando." },
  { i: <Heart size={32} weight="light" />, t: "Campanhas", d: "Participe da campanha do agasalho e de ações de ONGs e instituições." },
];

const pieces = [
  { e: <TShirt size={44} weight="light" />, n: "Suéter de tricô bege", m: "Tam. M · Inverno", tag: "Doação", bg: "#EFE3CC" },
  { e: <CoatHanger size={44} weight="light" />, n: "Camisa verde-sálvia", m: "Tam. P · Casual", tag: "Troca", bg: "#DCE5CF" },
  { e: <Sparkle size={44} weight="light" />, n: "Cachecol terracota", m: "Tam. único · Acessório", tag: "Doação", bg: "#F1D6C6" },
  { e: <Tote size={44} weight="light" />, n: "Calça jeans reta", m: "Tam. 40 · Casual", tag: "Venda", bg: "#D9E1E6" },
];

const ranking = [
  { n: "Mariana S.", p: "1.240 pts" },
  { n: "Instituto Mãos Dadas", p: "1.105 pts" },
  { n: "Lucas P.", p: "980 pts" },
  { n: "Ana C.", p: "865 pts" },
];

const points = [
  { i: <MapPin size={26} weight="regular" />, n: "Faculdade de Tecnologia", s: "Itapetininga · Seg a sex, 8h às 21h" },
  { i: <Buildings size={26} weight="regular" />, n: "Fundo Social de Solidariedade", s: "Centro · Campanha do agasalho" },
  { i: <House size={26} weight="regular" />, n: "ONG Mãos Dadas", s: "Vila Rio Branco · Seg a sáb" },
];

const impact = [
  { b: "2.700 L", s: "de água economizados por camiseta reaproveitada" },
  { b: "6,5 kg", s: "de CO₂ evitados por peça reutilizada" },
  { b: "10%", s: "das emissões globais de carbono vêm da moda" },
  { b: "< 1%", s: "das roupas viram novas roupas pela reciclagem" },
];

export default function Home() {
  return (
    <main id="inicio">
      {/* HERO */}
      <section className="hero">
        <div className="wrap">
          <div>
            <span className="pill">🌱 Tecnologia social para a moda</span>
            <h1>Vestir um, <em>transforma</em> muitos.</h1>
            <p className="lead">
              A ReVeste conecta quem tem roupas para doar, trocar ou vender com quem mais precisa.
              Estendemos a vida das peças e fechamos o ciclo da moda.
            </p>
            <div className="cta">
              <a href="#entrar" className="btn">Doar uma peça</a>
              <a href="#pontos" className="btn ghost">Ver pontos de coleta</a>
            </div>
            <div className="stats">
              <div><b>12,4 mil</b><span>peças doadas</span></div>
              <div><b>580</b><span>campanhas ativas</span></div>
              <div><b>89 mil L</b><span>de água economizados</span></div>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div className="blob" role="img" aria-label="Pilha de roupas dobradas">
              <div className="fold f1" /><div className="fold f2" /><div className="fold f3" />
            </div>
            <Leaf className="leaf" />
            <div className="toast">
              <i><TShirt size={22} weight="light" /></i>
              <div><b>+248 doações</b><small>nesta semana</small></div>
            </div>
          </div>
        </div>
      </section>

      {/* MODALIDADES */}
      <section className="pad">
        <div className="wrap">
          <div className="title center" style={{ textAlign: "center" }}>
            <h2>Um só lugar para <em>dar, trocar e vender</em></h2>
            <p>Moda sustentável e ação social juntas: cada peça tem um novo destino e uma nova história.</p>
          </div>
          <div className="modes">
            {modes.map((m) => (
              <article className="mode" key={m.t}>
                <div className="ic">{m.i}</div>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="sand" id="como-funciona">
        <Wave color="var(--cream)" pos="top" />
        <div className="wrap">
          <div className="title center" style={{ textAlign: "center" }}>
            <h2>Três passos para <em>gerar impacto</em></h2>
            <p>Simples, rápido e feito para qualquer pessoa usar.</p>
            <div style={{ marginTop: 16 }}>
              <Link href="/como-funciona" className="btn ghost sm">Ver documentação do sistema</Link>
            </div>
          </div>
          <div className="steps">
            <div className="step"><div className="n">1</div><h3>Cadastre a peça</h3><p>Tire uma foto, descreva o estado e escolha entre doar, trocar ou vender.</p></div>
            <div className="step"><div className="n">2</div><h3>Conecte-se</h3><p>Encontre pontos de coleta próximos ou converse direto pelo WhatsApp.</p></div>
            <div className="step"><div className="n">3</div><h3>Ganhe créditos</h3><p>Cada ação vale créditos, descontos com parceiros e posições no ranking.</p></div>
          </div>
        </div>
        <Wave color="var(--cream)" pos="bot" />
      </section>

      {/* PEÇAS */}
      <section className="pad" id="pecas">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16 }} className="title">
            <div>
              <h2>Peças disponíveis <em>agora</em></h2>
              <p>Veja o que a comunidade está compartilhando e peça a sua.</p>
              <div style={{ marginTop: 16 }}>
                <Link href="/pecas" className="btn ghost sm">Ver detalhes do catálogo</Link>
              </div>
            </div>
            <a href="#entrar" className="btn ghost sm">Ver tudo</a>
          </div>
          <div className="pieces" style={{ marginTop: -16 }}>
            {pieces.map((p) => (
              <article className="piece" key={p.n}>
                <div className="thumb" style={{ background: p.bg }}>
                  <span className="tag">{p.tag}</span>{p.e}
                </div>
                <div className="info">
                  <h3>{p.n}</h3>
                  <small>{p.m}</small>
                  <a href="#entrar" className="btn sm">Quero esta peça</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GAMIFICAÇÃO */}
      <section className="game" id="ranking">
        <Wave color="var(--cream)" pos="top" />
        <div className="wrap">
          <div>
            <h2>Quanto mais você ajuda, <em>mais você ganha</em></h2>
            <p>Doar vira um jogo coletivo. Acumule créditos, suba no ranking e troque seus pontos por vantagens.</p>
            <ul className="perks">
              <li><span><Star size={20} weight="fill" /></span> Créditos a cada doação, troca ou venda</li>
              <li><span><Trophy size={20} weight="fill" /></span> Ranking mensal de quem mais contribui</li>
              <li><span><Gift size={20} weight="fill" /></span> Descontos e benefícios com parceiros</li>
            </ul>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#entrar" className="btn clay">Começar a pontuar</a>
              <Link href="/ranking" className="btn ghost" style={{ color: "var(--cream)", borderColor: "var(--cream)" }}>Regras da Gamificação</Link>
            </div>
          </div>
          <div className="rank">
            <h3>Ranking do mês</h3>
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
        <Wave color="var(--cream)" pos="bot" />
      </section>

      {/* PONTOS DE COLETA */}
      <section className="pad" id="pontos">
        <div className="wrap map">
          <div>
            <div className="title" style={{ marginBottom: 28 }}>
              <h2>Pontos de coleta <em>perto de você</em></h2>
              <p>Leve suas roupas ao ponto mais próximo e veja quais itens estão em maior necessidade.</p>
              <div style={{ marginTop: 16 }}>
                <Link href="/pontos" className="btn ghost sm">Como cadastrar um ponto?</Link>
              </div>
            </div>
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
      </section>

      {/* IMPACTO */}
      <section className="impact" id="impacto">
        <Wave color="var(--cream)" pos="top" />
        <div className="wrap">
          <div className="title">
            <h2>Cada peça reaproveitada é uma história <em style={{ color: "#F1E3C4" }}>a menos no aterro</em></h2>
            <p>A indústria da moda é uma das mais poluentes do mundo. Reutilizar é a forma mais simples de mudar isso.</p>
            <div style={{ marginTop: 16 }}>
              <Link href="/impacto" className="btn ghost sm" style={{ color: "var(--cream)", borderColor: "var(--cream)" }}>Ver relatórios e ODS</Link>
            </div>
          </div>
          <div className="cards">
            {impact.map((c) => (
              <div className="card" key={c.b}><b>{c.b}</b><span>{c.s}</span></div>
            ))}
          </div>
          <div className="ods">
            Alinhado à Agenda 2030 da ONU: <b>ODS 12 · Consumo responsável</b> <b>ODS 1 · Erradicação da pobreza</b>
          </div>
        </div>
        <Wave color="var(--clay)" pos="bot" />
      </section>

      {/* CTA FINAL */}
      <section className="final" id="entrar">
        <div className="wrap">
          <h2>Vamos vestir o mundo com <em>mais consciência</em>?</h2>
          <p>Crie sua conta gratuita, cadastre a primeira peça e faça parte da comunidade ReVeste.</p>
          <div className="cta">
            <a href="/login" className="btn">Criar conta grátis</a>
            <a href="#pontos" className="btn ghost">Sou ONG ou instituição</a>
          </div>
        </div>
      </section>
    </main>
  );
}