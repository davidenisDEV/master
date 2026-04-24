"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Download, Mail, Smartphone, User, ChevronDown, Globe, Github, Linkedin, Instagram, Facebook } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site-config";
import { useLanguage } from "@/components/contexts/LanguageContext"; 


type TechTool = { name: string; icon: string };
type TechCategory = { category: string; tools: TechTool[] };
type ProjectItem = { title?: string; name?: string; subtitle?: string; role?: string };

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

  const business = siteConfig?.business;
  const about = siteConfig?.about;
  const social = siteConfig?.social;

  const handleCopy = (text: string, type: string) => {
    if (!text) return;
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
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading">
            {t?.aboutBento?.title || "Sobre Mim"}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">{t?.aboutBento?.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto relative z-20">
          
          <BentoCard overflowHidden={false} className="md:col-span-2 row-span-2 flex flex-col justify-center gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-4 sm:pt-8">
              
              {/* =======================================================
                  SOLUÇÃO AVATAR 3D POP-OUT (CLIP-PATH TRICK)
              ======================================================= */}
              <div 
                className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-white/40 dark:border-slate-700 shadow-inner relative perspective-[1000px] cursor-crosshair mt-4 sm:mt-0"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                
                <div 
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{ clipPath: "inset(-50% 0px 0px 0px round 24px)" }}
                >
                  
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[115%] md:w-[125%] flex justify-center items-end">
                    <motion.img 
                      src={about?.avatar || "/denis3d.png"} 
                      alt={business?.name || "Profile"} 
                      className="w-full h-auto object-bottom drop-shadow-2xl origin-bottom" 
                      animate={{ rotateY: mousePos.x, rotateX: -mousePos.y }}
                      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.5 }}
                    />
                  </div>
                </div>
              </div>
              {/* ======================================================= */}

              <div className="flex flex-col justify-center h-full">
                <h3 className="text-2xl font-bold font-heading text-slate-800 dark:text-white mb-1">
                  {t?.aboutBento?.hello} <span className="text-primary">{business?.name?.split(" ")[0]}</span>
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-primary/80 mb-3">{business?.role}</p>
                
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-medium w-fit mb-4 mx-auto sm:mx-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  {language === "PT" ? "Disponível para Projetos" : "Available for Work"}
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                  {t?.aboutBento?.bioDesc || business?.description}
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
              {(t?.aboutBento?.projects || []).slice(0, 4).map((proj: ProjectItem, i: number) => (
                <div key={`proj-${i}`} className="flex gap-4 group/item cursor-pointer">
                  <div className="w-1.5 h-auto bg-slate-200 dark:bg-slate-700 rounded-full group-hover/item:bg-primary/60 transition-colors"></div>
                  <div className="w-full">
                    <h5 className="font-bold text-slate-800 dark:text-white text-sm md:text-base transition-colors group-hover/item:text-primary">{proj.title || proj.name}</h5>
                    <p className="text-xs text-primary font-medium">{proj.subtitle || proj.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </BentoCard>

          <BentoCard className="md:col-span-2 flex flex-col justify-center">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
              {t?.aboutBento?.stackTitle || "Stack Tecnológica"}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(about?.techStack || []).map((stack: TechCategory, i: number) => (
                <div key={`stack-${i}`} className="flex flex-col gap-2 bg-white/40 dark:bg-slate-800/40 p-3 rounded-xl border border-white/60 dark:border-slate-700/50">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{stack.category}</span>
                  <div className="flex flex-wrap gap-2">
                    {(stack.tools || []).map((tool: TechTool, j: number) => (
                      <div key={`tool-${j}`} className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm px-2 py-1 rounded-md hover:scale-105 transition-all cursor-help" title={tool.name}>
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
                <span className="text-xl">🇧🇷</span>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">PT-BR</span>
                  <span className="text-[10px] text-slate-500">{language === "PT" ? "Nativo" : "Native"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🇺🇸</span>
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
              <a href={social?.github || "#"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary transition-all shadow-sm"><Github size={20} /></a>
              <a href={social?.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary transition-all shadow-sm"><Linkedin size={20} /></a>
              <a href={social?.instagram || "#"} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 hover:text-primary transition-all shadow-sm"><Instagram size={20} /></a>
            </div>
          </BentoCard>

          <BentoCard overflowHidden={false} className="col-span-full flex flex-col md:flex-row gap-6 md:gap-4 items-center justify-between bg-white/80 dark:bg-slate-900/80 z-30">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <User className="w-4 h-4 text-primary" /> {about?.age} {t?.aboutBento?.ageSuffix}
              </div>
              
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                <Globe className="w-4 h-4 text-primary animate-pulse" /> {business?.address}
              </div>
              
              <button onClick={() => handleCopy(business?.email || "", 'email')} className="flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary border-slate-200 dark:border-slate-700 transition-all shadow-sm">
                {copiedData === 'email' ? <Check className="w-4 h-4 text-green-500" /> : <Mail className="w-4 h-4 text-primary" />}
                {copiedData === 'email' ? (language === "PT" ? "Copiado!" : "Copied!") : business?.email}
              </button>

              <button onClick={() => handleCopy(business?.whatsapp || "", 'phone')} className="flex items-center gap-2 text-xs md:text-sm px-3 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-primary border-slate-200 dark:border-slate-700 transition-all shadow-sm">
                {copiedData === 'phone' ? <Check className="w-4 h-4 text-green-500" /> : <Smartphone className="w-4 h-4 text-primary" />}
                {copiedData === 'phone' ? (language === "PT" ? "Copiado!" : "Copied!") : business?.whatsapp}
              </button>
            </div>

            <div className="relative w-full md:w-auto group/cv">
              <button 
                onClick={() => setIsCvOpen(!isCvOpen)} 
                className="w-full md:w-auto flex justify-center items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-bold transition-all shadow-md active:scale-95"
              >
                <Download className="w-4 h-4" /> {t?.aboutBento?.downloadCv} 
                <ChevronDown className={`w-4 h-4 transition-transform ${isCvOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isCvOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-full mb-3 right-0 w-full sm:min-w-[200px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl overflow-hidden z-[100]"
                  >
                    <a href="/Curriculo.pdf" download className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-2 border-b border-slate-100 dark:border-slate-700">
                      🇧🇷 {t?.aboutBento?.ptVersion || "Versão em Português"}
                    </a>
                    <a href="/CurriculoEN.pdf" download className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-2">
                      🇺🇸 {t?.aboutBento?.enVersion || "English Version"}
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