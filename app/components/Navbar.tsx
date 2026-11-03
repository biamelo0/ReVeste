"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X, House, Handshake, TShirt, Trophy, MapPin, Target, SignIn, UserCircle } from "@phosphor-icons/react";
import logoReveste from "@/public/logo-reveste.png";
import { useReveste } from "../context/RevesteContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useReveste();

  // Fecha o menu mobile ao navegar
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloqueia scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { href: "/como-funciona", label: "Como funciona", icon: <House size={20} /> },
    { href: "/doacoes", label: "Doações", icon: <Handshake size={20} /> },
    { href: "/pecas", label: "Peças", icon: <TShirt size={20} /> },
    { href: "/ranking", label: "Ranking", icon: <Trophy size={20} /> },
    { href: "/pontos", label: "Pontos de coleta", icon: <MapPin size={20} /> },
    { href: "/impacto", label: "Impacto", icon: <Target size={20} /> },
  ];

  const isLinkActive = (href: string) => {
    return pathname === href || (href !== "/" && pathname?.startsWith(href));
  };

  return (
    <header className="nav">
      <div className="wrap nav-wrap">
        <Link href="/" className="logo" style={{ color: "var(--forest)", fontFamily: "var(--font-cursive)" }}>
          <Image
            src={logoReveste}
            alt="ReVeste"
            width={70}
            height={70}
            className="logo-img"
            priority
          />
          <span className="logo-text">ReVeste</span>
        </Link>

        {/* Desktop Links */}
        <nav className="links desktop-links" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={isLinkActive(link.href) ? "active-nav-link" : ""}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action button & Mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/dashboard" className="btn sm header-cta">
            <UserCircle size={18} weight="bold" />
            <span className="header-cta-text">Meu Painel</span>
          </Link>

          {/* Hamburger toggle button (visible on mobile/tablet) */}
          <button
            type="button"
            className="mobile-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} weight="bold" /> : <List size={26} weight="bold" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {isOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className={`mobile-drawer ${isOpen ? "open" : ""}`} aria-label="Menu Mobile">
        <div className="mobile-drawer-header">
          <Link href="/" className="logo" onClick={() => setIsOpen(false)} style={{ color: "var(--forest)", fontFamily: "var(--font-cursive)" }}>
            <Image src={logoReveste} alt="ReVeste" width={56} height={56} style={{ objectFit: "contain" }} />
            <span>ReVeste</span>
          </Link>
          <button
            type="button"
            className="mobile-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} weight="bold" />
          </button>
        </div>

        <nav className="mobile-nav-links">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-nav-item ${active ? "active" : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mobile-nav-icon">{link.icon}</span>
                <span className="mobile-nav-label">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-drawer-footer">
          <Link
            href="/dashboard"
            className="btn"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => setIsOpen(false)}
          >
            <UserCircle size={20} weight="bold" /> Acessar Painel / Entrar
          </Link>
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 12 }}>
            Olá, <b>{user.nome}</b> ({user.pontos} pts)
          </p>
        </div>
      </div>
    </header>
  );
}
