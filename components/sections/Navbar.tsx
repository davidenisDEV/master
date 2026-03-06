"use client";

import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";
import { useLanguage } from "@/components/contexts/LanguageContext"; 

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setTheme, theme } = useTheme();
  
  // Extração das variáveis e funções reais do Contexto Global
  const { language, toggleLanguage, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Função inteligente que só troca de idioma se o utilizador clicar num diferente do atual
  const handleLanguageChange = (lang: "PT" | "EN") => {
    if (lang !== language) {
      toggleLanguage();
    }
    setIsLangOpen(false);
  };

  // Tradução dinâmica dos links de navegação
  const navLinks = [
    { label: t.navbar.services, href: "#services" },
    { label: t.navbar.portfolio, href: "#portfolio" },
    { label: t.navbar.pricing, href: "#pricing" },
    { label: t.navbar.contact, href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        scrolled ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm border-b border-slate-100 dark:border-slate-800" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-heading text-slate-800 dark:text-white">
          <span className="text-primary">{'<'}</span>{siteConfig.business.name.split(" ")[0]}<span className="text-primary">{'/>'}</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
          
          <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6 ml-2">
            {/* Toggle Idioma */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                onBlur={() => setTimeout(() => setIsLangOpen(false), 200)}
                className="flex items-center gap-1.5 p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium"
              >
                <Globe className="w-5 h-5" />
                <span className="hidden lg:block">{language}</span>
              </button>

              {/* Menu Suspenso de Idiomas */}
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden z-50 animate-in slide-in-from-top-2">
                  <button 
                    onClick={() => handleLanguageChange("PT")} 
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors border-b border-slate-100 dark:border-slate-700 flex items-center gap-2 ${language === "PT" ? "text-primary bg-slate-50 dark:bg-slate-800/50" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                  >
                    🇧🇷 PT-BR
                  </button>
                  <button 
                    onClick={() => handleLanguageChange("EN")} 
                    className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2 ${language === "EN" ? "text-primary bg-slate-50 dark:bg-slate-800/50" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"}`}
                  >
                    🇺🇸 EN-US
                  </button>
                </div>
              )}
            </div>

            {/* Toggle Tema (Dark/Light) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative w-9 h-9 flex items-center justify-center"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 absolute" />
              <Moon className="h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 absolute" />
            </button>
          </div>
          
          {/* CTA Nav */}
          <Link href="#contact" className="px-6 py-2.5 bg-primary text-white rounded-[4px] font-medium hover:bg-green-700 transition shadow-sm ml-2">
            {language === "PT" ? "Falar Agora" : "Talk Now"}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-800 dark:text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shadow-xl p-4 flex flex-col gap-2 animate-in slide-in-from-top-2">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium p-3 text-slate-700 dark:text-slate-200 hover:bg-green-50 dark:hover:bg-slate-800 hover:text-primary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
          
          {/* Controles Mobile */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  toggleLanguage();
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
              >
                <Globe className="w-5 h-5" /> {t.navbar.changeLang} ({language})
              </button>
            </div>
            
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-slate-500 bg-slate-100 dark:bg-slate-800"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}