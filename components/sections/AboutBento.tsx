"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, Mail, Smartphone, User, ChevronDown, Globe, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site-config";
import { useLanguage } from "@/components/contexts/LanguageContext"; 

const BentoCard = ({ children, className = "", overflowHidden = true }: { children: React.ReactNode, className?: string, overflowHidden?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-white/80 dark:border-slate-800/50 rounded-3xl ${overflowHidden ? 'overflow-hidden' : ''} p-6 md:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(76,175,80,0.15)] hover:border-primary/40 relative z-20 ${className}`}
  >
    {children}
  </motion.div>
);

export function AboutBento() {
  const [copiedData, setCopiedData] = useState<string | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false); 
  const { t, language } = useLanguage(); 

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedData(type);
    setTimeout(() => setCopiedData(null), 2500);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15; 
    const y = (e.clientY - rect.top - rect.height / 2) / 15;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section id="sobre" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 z-0 border-t border-slate-200/50 dark:border-slate-800/50">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
      
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-full backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(76,175,80,0.1)] hidden lg:block -z-10"
      />
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-[250px] h-[250px] bg-gradient-to-bl from-purple-500/10 to-primary/10 rounded-3xl backdrop-blur-3xl border border-white/10 shadow-[0_0_50px_rgba(76,175,80,0.1)] hidden lg:block rotate-12 -z-10"
      />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading">
            {t?.aboutBento?.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">{t?.aboutBento?.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto relative z-20">
          
          <BentoCard overflowHidden={false} className="md:col-span-2 row-span-2 flex flex-col justify-center gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-4 sm:pt-8">
              
              <div 
                className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-white/40 dark:border-slate-700 shadow-inner relative perspective-[1000px] cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  className="absolute inset-0 flex items-end justify-center pointer-events-none rounded-3xl"
                  style={{ 
                    clipPath: "inset(-150px 0px 0px 0px round 24px)",
                    WebkitClipPath: "inset(-150px 0px 0px 0px round 24px)"
                  }}
                >
                  <motion.img 
                    src={siteConfig.about.avatar} 
                    alt={siteConfig.business.name} 
                    className="w-[125%] max-w-none h-auto object-bottom drop-shadow-2xl translate-y-3" 
                    animate={{ rotateY: mousePos.x, rotateX: -mousePos.y }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
                  />
                </div>
              </div>

              <div className="flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold font-heading text-slate-800 dark:text-white mb-1">
                  {t?.aboutBento?.hello} <span className="text-primary">{siteConfig.business.name.split(" ")[0]}</span>
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-3">{siteConfig.business.role}</p>
                
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-medium w-fit mb-4 mx-auto sm:mx-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {language === "PT" ? "Disponível para Projetos" : "Available for Work"}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {t?.aboutBento?.bioDesc || siteConfig.business.description}
                </p>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 row-span-2 flex flex-col">
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2 flex items-center justify-between">
              {t?.aboutBento?.experienceTitle}
              <span className="text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{t?.aboutBento?.freelancerBadge}</span>
            </h4>
            <div className="flex flex-col gap-6 h-full justify-between">
              {t?.aboutBento?.projects?.slice(0, 3).map((proj: any, i: number) => (
                <div key={i} className="flex gap-4 group/item cursor-pointer">
                  <div className="w-1.5 h-auto bg-slate-200 dark:bg-slate-700 rounded-full group-hover/item:bg-primary/60 transition-colors"></div>
                  <div className="w-full">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <h5 className="font-bold text-slate-800 dark:text-white text-sm md:text-base transition-colors group-hover/item:text-primary">{proj.title || proj.name}</h5>
                    </div>
                    <p className="text-xs text-primary font-medium mb-1">{proj.subtitle || proj.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              {t?.aboutBento?.stackTitle || "Competências Técnicas"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {siteConfig.about.techStack.map((stack, i) => (
                <div key={i} className="flex flex-col gap-2 bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-white/60 dark:border-slate-700/50">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                    {stack.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {stack.tools.map((tool, j) => (
                      <div key={j} className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm px-2 py-1 rounded-md hover:scale-105 hover:border-primary/50 transition-all cursor-help" title={tool.name}>
                        <img src={tool.icon} alt={tool.name} className="w-3.5 h-3.5 object-contain" />
                        <span className="text-[10px] font-medium text-slate-700 dark:text-slate-300">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-1 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              {language === "PT" ? "Idiomas" : "Languages"}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-xl leading-none">🇧🇷</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">PT-BR</span>
                  <span className="text-[10px] text-slate-500">{language === "PT" ? "Nativo" : "Native"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl leading-none">🇺🇸</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">EN-US</span>
                  <span className="text-[10px] text-slate-500">{language === "PT" ? "Avançado" : "Advanced"}</span>
                </div>
              </div>
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-1 flex flex-col justify-center items-center">
             <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4 border-b w-full text-left border-slate-200 dark:border-slate-700 pb-2">
              {language === "PT" ? "Conecte-se" : "Connect"}
            </h4>
            <div className="grid grid-cols-2 gap-3 w-full">
              <a href={siteConfig.social.github} target="_blank" rel="noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/50 transition-all shadow-sm"><Github className="w-5 h-5" /></a>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/50 transition-all shadow-sm"><Linkedin className="w-5 h-5" /></a>
              <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/50 transition-all shadow-sm"><Instagram className="w-5 h-5" /></a>
              <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary hover:border-primary/50 transition-all shadow-sm"><Facebook className="w-5 h-5" /></a>
            </div>
          </BentoCard>

          <BentoCard overflowHidden={false} className="col-span-full flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between bg-white/80 dark:bg-slate-900/80 z-30">
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <User className="w-4 h-4 text-primary" /> {siteConfig.about.age} {t?.aboutBento?.ageSuffix}
              </div>
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm cursor-help" title={language === "PT" ? "Trabalho remoto globalmente" : "Available for remote work"}>
                <Globe className="w-4 h-4 text-primary animate-[spin_6s_linear_infinite]" /> {siteConfig.business.address}
              </div>
              
              <button 
                onClick={() => handleCopy(siteConfig.business.email, 'email')} 
                className={`flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-lg border transition-all duration-300 shadow-sm ${copiedData === 'email' ? 'bg-green-500/20 text-green-600 border-green-500/50 dark:text-green-400' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary border-slate-200 dark:border-slate-700 hover:border-primary/30'}`}
              >
                {copiedData === 'email' ? <Check className="w-4 h-4" /> : <Mail className="w-4 h-4 text-primary" />}
                {copiedData === 'email' ? (language === "PT" ? "Copiado!" : "Copied!") : siteConfig.business.email}
              </button>

              <button 
                onClick={() => handleCopy(siteConfig.business.whatsapp, 'phone')} 
                className={`flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-lg border transition-all duration-300 shadow-sm ${copiedData === 'phone' ? 'bg-green-500/20 text-green-600 border-green-500/50 dark:text-green-400' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary border-slate-200 dark:border-slate-700 hover:border-primary/30'}`}
              >
                {copiedData === 'phone' ? <Check className="w-4 h-4" /> : <Smartphone className="w-4 h-4 text-primary" />}
                {copiedData === 'phone' ? (language === "PT" ? "Copiado!" : "Copied!") : siteConfig.business.whatsapp}
              </button>
            </div>

            <div className="relative w-full md:w-auto p-[2px] rounded-xl overflow-visible group/cv shrink-0">
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#4CAF4F_100%)] rounded-xl animate-[spin_3s_linear_infinite] opacity-0 group-hover/cv:opacity-100 transition-opacity duration-500"></div>
              
              <button 
                onClick={() => setIsCvOpen(!isCvOpen)} 
                onBlur={() => setTimeout(() => setIsCvOpen(false), 200)} 
                className="relative w-full md:w-auto flex justify-center items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-8 py-3 rounded-[10px] font-bold transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" /> {t?.aboutBento?.downloadCv} 
                <ChevronDown className={`w-4 h-4 transition-transform ${isCvOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isCvOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} 
                    className="absolute bottom-full mb-3 right-0 w-full sm:min-w-[220px] bg-white/95 dark:bg-slate-800/95 backdrop-blur-2xl border border-white/80 dark:border-slate-700/50 rounded-xl shadow-2xl overflow-hidden z-[100]"
                  >
                    <a href="/Curriculo.pdf" download="David_Denis_Curriculo_PT.pdf" target="_blank" className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-2 border-b border-slate-100 dark:border-slate-700/50">
                      🇧🇷 {t?.aboutBento?.ptVersion}
                    </a>
                    <a href="/CurriculoEN.pdf" download="David_Denis_Resume_EN.pdf" target="_blank" className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-2">
                      🇺🇸 {t?.aboutBento?.enVersion}
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </BentoCard>

        </div>
      </div>
    </section>
  );
}