import type { Metadata } from "next";
import { Fraunces, DM_Sans, Handlee } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import logoReveste from "@/public/logo-reveste.png";
import { RevesteProvider } from "./context/RevesteContext";
import Navbar from "./components/Navbar";
import "./globals.css";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", style: ["normal", "italic"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });
const cursive = Handlee({ subsets: ["latin"], variable: "--font-cursive", weight: "400" });

export const metadata: Metadata = {
  title: "ReVeste | Moda social e sustentável",
  description: "Doe, troque ou venda roupas, apoie campanhas solidárias e ganhe créditos por cada peça que volta a circular.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable} ${cursive.variable}`}>
        <RevesteProvider>
          <Navbar />

          {children}

          <footer className="site-footer">
            <div className="wrap footer-wrap">
              <Link href="/" className="logo footer-logo" style={{ color: "var(--cream)", fontFamily: "var(--font-cursive)" }}>
                <Image src={logoReveste} alt="ReVeste" width={56} height={56} style={{ objectFit: "contain" }} />
                <span>ReVeste</span>
              </Link>
              <nav className="footer-links" aria-label="Rodapé">
                <Link href="/como-funciona">Como funciona</Link>
                <Link href="/doacoes">Doações</Link>
                <Link href="/pecas">Peças</Link>
                <Link href="/ranking">Ranking</Link>
                <Link href="/pontos">Pontos de coleta</Link>
                <Link href="/impacto">Impacto</Link>
                <Link href="/dashboard">Painel</Link>
              </nav>
              <span className="footer-credits">
                Projeto de Inovação Social · FATEC Itapetininga · 2026
              </span>
            </div>
          </footer>
        </RevesteProvider>
      </body>
    </html>
  );
}
