"use client";

import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site-config";
import { Facebook, Instagram, Linkedin, Github, MapPin, Mail, Phone, ShieldCheck, Terminal as TerminalIcon, X } from "lucide-react"; // <-- Importado o Github
import Link from "next/link";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  const [time, setTime] = useState<string>("");
  const [clicks, setClicks] = useState(0);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat(language === "PT" ? "pt-BR" : "en-US", {
        timeZone: "America/Fortaleza",
        hour: "2-digit",
        minute: "2-digit",
      });
      setTime(formatter.format(now));
    };
    
    updateTime(); 
    const interval = setInterval(updateTime, 1000); 
    return () => clearInterval(interval);
  }, [language]);

  const handleVersionClick = () => {
    setClicks((prev) => prev + 1);
    
    if (clicks + 1 >= 3) {
      setIsTerminalOpen(true);
      setClicks(0); 
    }
    
    setTimeout(() => setClicks(0), 2000);
  };

  const navLinks = [
    { label: t.navbar.services, href: "#services" },
    { label: t.navbar.portfolio, href: "#portfolio" },
    { label: t.navbar.pricing, href: "#pricing" },
    { label: t.navbar.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 relative">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Marca e Descrição */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tighter">{siteConfig.business.name}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.business.description}
            </p>
            
            {/* REDES SOCIAIS DINÂMICAS COM CONFIGURAÇÃO DE SEGURANÇA NO HREF */}
            <div className="flex gap-3">
              <motion.a whileHover={{ y: -5, rotate: -5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Linkedin size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -5, rotate: 5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} href={siteConfig.social.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Github size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -5, rotate: -5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook size={18} />
              </motion.a>
            </div>

            <div className="flex items-center gap-2 mt-4 bg-slate-900/50 w-fit px-3 py-1.5 rounded-full border border-slate-800/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                {language === "PT" ? "Todos os sistemas operacionais" : "All systems operational"}
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.footer.navTitle}</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-primary hover:pl-2 transition-all block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato & Hora Local */}
          <div>
            <h3 className="text-white font-bold mb-6">{t.footer.contactTitle}</h3>
            <ul className="space-y-4 text-sm mb-6">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-primary mt-1" size={18} />
                <span>{siteConfig.business.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-primary" size={18} />
                <span>{siteConfig.business.whatsapp}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-primary" size={18} />
                <span>{siteConfig.business.email}</span>
              </li>
            </ul>

            <div className="pt-6 border-t border-slate-800">
              <p className="text-xs text-slate-500 font-mono">
                {language === "PT" ? "Hora local em Fortaleza:" : "Local time in Fortaleza:"}
              </p>
              <div className="text-sm font-bold text-slate-300 mt-1 flex items-center gap-2">
                {time ? `${time} UTC-3` : "Carregando..."}
                <span className="text-[9px] bg-primary/10 border border-primary/20 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">
                  {language === "PT" ? "Online" : "Available"}
                </span>
              </div>
            </div>
          </div>

          {/* Selo de Segurança & Botão do Easter Egg */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> {t.footer.securityTitle}
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                {t.footer.securityDesc}
              </p>
            </div>
            
            <button 
              onClick={handleVersionClick}
              className="text-left text-xs font-mono text-slate-600 hover:text-primary transition-colors cursor-crosshair w-fit select-none"
              title={language === "PT" ? "Clique rápido..." : "Click fast..."}
            >
              v2.5.0 Stable
            </button>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
          <p>© {currentYear} {siteConfig.business.name.split("-")[0]}. {t.footer.rights}</p>
          
          <p className="flex items-center gap-1 group cursor-default">
            {t.footer.devBy} 
            <motion.span 
              whileInView={{ color: "#4CAF4F", textShadow: "0px 0px 10px rgba(76, 175, 80, 0.6)" }}
              transition={{ duration: 1.5, delay: 0.2 }}
              className="font-bold transition-colors duration-300 ml-1 text-slate-500 group-hover:text-primary group-hover:drop-shadow-[0_0_8px_rgba(76,175,80,0.8)]"
            >
              David Denis
            </motion.span>
          </p>
        </div>
      </div>

      {/* TERMINAL MODAL (Easter Egg) */}
      <AnimatePresence>
        {isTerminalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsTerminalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-[#0c0c0c] border border-slate-800 rounded-lg shadow-2xl overflow-hidden font-mono text-sm"
              onClick={(e) => e.stopPropagation()} 
            >
              <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="text-slate-500 text-xs flex items-center gap-2">
                  <TerminalIcon className="w-3 h-3" /> dev@david-denis:~
                </div>
                <button onClick={() => setIsTerminalOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="p-6 text-green-400 space-y-2 h-[280px] overflow-y-auto">
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>$ connection.init()</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-blue-400">&gt; Establishing secure connection...</motion.p>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="text-yellow-400">&gt; Warning: Curiosity level exceeded limits.</motion.p>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
                  <p className="text-white mt-4">
                    {language === "PT" 
                      ? "Você encontrou o Easter Egg! Obrigado por inspecionar minha arquitetura de código com tanto carinho. Se chegou até aqui, definitivamente precisamos conversar sobre o seu próximo projeto."
                      : "You found the Easter Egg! Thanks for inspecting my code architecture so closely. If you made it this far, we definitely need to talk about your next project."
                    }
                  </p>
                  <p className="mt-4 text-primary font-bold">
                    {language === "PT" 
                      ? "Diga no WhatsApp a senha: 'CONSOLE LOG' para ganharmos 10% de desconto adicional no orçamento!" 
                      : "Send the password 'CONSOLE LOG' on WhatsApp for an extra 10% off your quote!"}
                  </p>
                </motion.div>
                
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="animate-pulse mt-2">_</motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}