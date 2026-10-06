import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", style: ["normal", "italic"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "ReVeste | Moda social e sustentável",
  description: "Doe, troque ou venda roupas, apoie campanhas solidárias e ganhe créditos por cada peça que volta a circular.",
};

const Leaf = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M10 54C10 28 28 10 54 10c0 26-18 44-44 44Z" />
    <path d="M10 54 38 26" />
  </svg>
);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>
        <header className="nav">
          <div className="wrap">
            <Link href="/" className="logo" style={{ color: "var(--forest)" }}>
              <Leaf /> ReVeste
            </Link>
            <nav className="links" aria-label="Principal">
              <Link href="/como-funciona">Como funciona</Link>
              <Link href="/pecas">Peças</Link>
              <Link href="/ranking">Ranking</Link>
              <Link href="/pontos">Pontos de coleta</Link>
              <Link href="/impacto">Impacto</Link>
            </nav>
            <Link href="/" className="btn sm">Entrar</Link>
          </div>
        </header>

        {children}

        <footer>
          <div className="wrap">
            <span className="logo" style={{ fontSize: 22 }}><Leaf /> ReVeste</span>
            <nav className="links" aria-label="Rodapé" style={{ display: "flex" }}>
              <Link href="/como-funciona">Como funciona</Link>
              <Link href="/pecas">Peças</Link>
              <Link href="/pontos">Pontos de coleta</Link>
              <Link href="/impacto">Impacto</Link>
            </nav>
            <span>Projeto de Inovação Social · FATEC Itapetininga · 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}