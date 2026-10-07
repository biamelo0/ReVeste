import { Camera, ClipboardText, MapPinLine, Gift, Checks, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function Doacoes() {
  return (
    <main className="pad wrap">
      <div className="title center" style={{ textAlign: "center", marginBottom: 64 }}>
        <span className="pill">Central de Doações</span>
        <h1>Como fazer sua <em>Doação</em></h1>
        <p>Aprenda o passo a passo seguro para registrar sua doação e garantir seus pontos na plataforma ReVeste.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 64, alignItems: "center", marginBottom: 80 }}>
        <div style={{ background: "var(--forest)", padding: 48, borderRadius: 32, color: "var(--cream)" }}>
          <h2 style={{ marginBottom: 24, color: "var(--white)" }}>O ciclo da doação</h2>
          <ul style={{ listStyle: "none", display: "grid", gap: 32 }}>
            <li style={{ display: "flex", gap: 16 }}>
              <Camera size={32} color="var(--sage)" weight="duotone" />
              <div>
                <b style={{ display: "block", fontSize: 18, marginBottom: 4 }}>1. Tire uma foto</b>
                <p style={{ color: "#C9D6B4", fontSize: 15 }}>A foto é obrigatória (JPG ou PNG, até 5MB). Sem foto, não é possível validar a doação no sistema.</p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <ClipboardText size={32} color="var(--sage)" weight="duotone" />
              <div>
                <b style={{ display: "block", fontSize: 18, marginBottom: 4 }}>2. Descreva os itens</b>
                <p style={{ color: "#C9D6B4", fontSize: 15 }}>Informe o estado da peça, tamanho e a quantidade para facilitar a triagem pelas instituições.</p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <MapPinLine size={32} color="var(--sage)" weight="duotone" />
              <div>
                <b style={{ display: "block", fontSize: 18, marginBottom: 4 }}>3. Leve ao ponto de coleta</b>
                <p style={{ color: "#C9D6B4", fontSize: 15 }}>Consulte os pontos disponíveis no mapa e entregue as peças cadastradas presencialmente.</p>
              </div>
            </li>
            <li style={{ display: "flex", gap: 16 }}>
              <Checks size={32} color="var(--sage)" weight="duotone" />
              <div>
                <b style={{ display: "block", fontSize: 18, marginBottom: 4 }}>4. Validação e Pontos</b>
                <p style={{ color: "#C9D6B4", fontSize: 15 }}>A ONG confirma o recebimento físico, gera o seu comprovante e o sistema credita os pontos na mesma hora!</p>
              </div>
            </li>
          </ul>
        </div>

        <div>
          <h2>Atenção e Boas Práticas</h2>
          <p style={{ marginBottom: 24, color: "var(--muted)", fontSize: 17 }}>Sua doação deve estar em boas condições de uso para o próximo dono. O que é "lixo" para o armário, não deve ser passado adiante para quem precisa.</p>

          <div style={{ background: "var(--white)", padding: 24, borderRadius: 24, border: "1px solid rgba(42,58,39,.08)", marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <WarningCircle size={24} color="var(--clay)" weight="fill" />
              <b style={{ fontSize: 18 }}>Higienização</b>
            </div>
            <p style={{ fontSize: 15, color: "var(--muted)" }}>Certifique-se de que todas as roupas, cobertores e calçados estejam lavados e limpos antes de levá-los aos pontos de coleta. As ONGs muitas vezes não possuem lavanderia.</p>
          </div>

          <div style={{ background: "var(--white)", padding: 24, borderRadius: 24, border: "1px solid rgba(42,58,39,.08)" }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
              <Gift size={24} color="var(--forest)" weight="fill" />
              <b style={{ fontSize: 18 }}>O que estamos precisando mais?</b>
            </div>
            <p style={{ fontSize: 15, color: "var(--muted)" }}>Durante o inverno, a Campanha do Agasalho prioriza cobertores grossos, casacos, meias e luvas. Roupas infantis e de bebê também têm altíssima demanda o ano inteiro.</p>
          </div>
          
          <div style={{ marginTop: 32 }}>
            <Link href="/" className="btn">Começar minha primeira doação</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
