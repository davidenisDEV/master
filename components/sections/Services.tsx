"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Code2, Database, Bot, Terminal, ShieldCheck, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";

// 1. DADOS ESTRUTURAIS (Imagens e Links não mudam com o idioma)
const skillsIcons = [
  <Code2 key="front" className="w-10 h-10 text-primary" />,
  <Database key="back" className="w-10 h-10 text-primary" />,
  <Bot key="bot" className="w-10 h-10 text-primary" />
];

const projectAssets = [
  // 👇 NOVO PROJETO: Medicao PetShop adicionado no topo 👇
  { 
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/petshop", 
    images: ["/petshop.png", "/petshop2.png", "/petshop3.png", "/petshop4.png", "/petshop5.png", "/petshop6.png"] 
  },
  { 
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/CeledonioAdvg", 
    images: ["/celedonio.png", "/celedonio2.png", "/celedonio3.png", "/celedonio4.png", "/celedonio5.png", "/celedonio6.png"] 
  },
  { 
    liveLink: "https://gogreen-4fmn.vercel.app/", 
    githubLink: "https://github.com/davidenisDEV/gogreen", 
    images: ["/gogreenhero.png", "/gogreenheroabraba.png", "/gogreenherokits.png", "/gogreenheroitens.png", "/gogreenclub.png", "/gogreenmusic.png"] 
  },
  { 
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/FBRK", 
    images: ["/fabrika.png", "/fabrika2.png", "/fabrika3.png", "/fabrika4.png", "/fabrika5.png", "/fabrika6.png"] 
  },
  { 
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/limpezaPC", 
    images: [] 
  }
];

// 7. FUNÇÃO HELPER PARA ÍCONES NAS TAGS
const getDevicon = (tag: string) => {
  if (!tag) return null;
  const t = tag.toLowerCase();
  if (t.includes("next")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
  if (t.includes("type")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (t.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  if (t.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (t.includes("python")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (t.includes("supabase") || t.includes("db")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg";
  return null;
};

// 6. COMPONENTE COM EFEITO SPOTLIGHT NO MOUSE (SKILLS)
function SkillCard({ skill, icon, index }: any) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  if (!skill) return null;

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/80 dark:border-slate-800/50 flex flex-col items-center shadow-xl dark:shadow-none group overflow-hidden"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(76, 175, 80, 0.12), transparent 40%)`,
        }}
      />
      <div className="w-20 h-20 bg-white/80 dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/90 dark:border-slate-700 relative z-10">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 text-center w-full font-heading relative z-10">{skill.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 text-center relative z-10">{skill.desc}</p>
    </motion.div>
  );
}

// COMPONENTE DO PROJETO
function ProjectCard({ project, assets, isReversed, texts }: any) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const features = project?.features || [];
  const tags = project?.tags || [];

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % (assets?.images?.length || 1));
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + (assets?.images?.length || 1)) % (assets?.images?.length || 1));

  useEffect(() => {
    if (!assets?.images || assets.images.length <= 1 || isHovered) return;
    const interval = setInterval(nextImg, 4000);
    return () => clearInterval(interval);
  }, [assets?.images, isHovered]);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl mb-12 relative z-10"
    >
      <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch`}>
        
        {/* Lado do Texto */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 relative">
          <div className="lg:sticky lg:top-32 h-fit">
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{project.subtitle}</p>
            <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-4">{project.title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{project.desc}</p>
            
            <div className="space-y-3 mb-8">
              {features.map((feat: string, i: number) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                  <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" /> <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map((tag: string, i: number) => {
                const iconSrc = getDevicon(tag);
                return (
                  <span key={i} className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-800/60 border border-white/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1.5 rounded-full text-xs font-bold">
                    {iconSrc && <Image src={iconSrc} alt={tag} width={14} height={14} className="object-contain" />}
                    {tag}
                  </span>
                )
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {assets?.liveLink && (
                <a href={assets.liveLink} target="_blank" rel="noreferrer" className="group/btn bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                  {texts?.btnLive || "Ver ao Vivo"} <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                </a>
              )}
              {assets?.githubLink && (
                <a href={assets.githubLink} target="_blank" rel="noreferrer" className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-white/90 dark:border-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
                  <Github className="w-4 h-4" /> {texts?.btnRepo || "Repositório"}
                </a>
              )}
            </div>
          </div>
        </div>
        
        {/* Lado da Imagem */}
        <div 
          className="w-full lg:w-1/2 bg-slate-100/50 dark:bg-slate-950/50 p-8 flex items-center justify-center relative overflow-hidden min-h-[350px] md:min-h-[450px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          
          {assets?.images && assets.images.length > 0 ? (
            <div className="relative z-10 w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group/img border border-white/80 dark:border-slate-700/50">
              <AnimatePresence mode="wait">
                <motion.div key={currentImg} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0">
                  <Image src={assets.images[currentImg]} alt={`${project.title} screenshot`} fill className="object-cover" priority={currentImg === 0} sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                <button onClick={prevImg} aria-label="Imagem Anterior" className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={nextImg} aria-label="Próxima Imagem" className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"><ChevronRight className="w-6 h-6" /></button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-md bg-[#1e1e1e] border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
              <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700">
                <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                <div className="ml-4 text-slate-400 text-xs flex items-center gap-2"><Terminal className="w-3 h-3"/> script.py</div>
              </div>
              <div className="p-6 text-green-400 leading-relaxed space-y-1 h-[250px]">
                <p className="text-slate-300">import <span className="text-blue-400">os, sys</span></p>
                <p className="text-purple-400">def <span className="text-yellow-200">optimize_system</span>():</p>
                <p className="ml-4 text-slate-400"># Clearing cache and temp files...</p>
                <p className="ml-4 text-slate-300">system.flush()</p>
                <p className="ml-4">print(<span className="text-orange-300">"Performance increased by 80%"</span>)</p>
                <p className="text-slate-300 mt-4 animate-pulse">&gt; Executing script... Done.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}

export function Services() {
  const { t } = useLanguage();

  return (
    <>
      <section id="services" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        {/* 👇 NOVO: ARTE SVG DE SERVICES FLUTUANDO AO FUNDO 👇 */}
        <motion.img 
          src="/svg/services.svg" 
          alt="Services Illustration"
          animate={{ y: [-15, 10, -15] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 -left-10 lg:left-10 w-48 md:w-72 opacity-30 dark:opacity-40 z-0 pointer-events-none"
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 relative">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              {t?.services?.title} <br /> <span className="text-primary">{t?.services?.titleHighlight}</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">{t?.services?.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-20">
            {t?.services?.skills?.map((skill: any, index: number) => (
              <SkillCard key={index} skill={skill} icon={skillsIcons[index]} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 dark:bg-blue-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2 shadow-sm">
              <Terminal className="w-4 h-4" /> {t?.services?.portfolioBadge}
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              {t?.services?.portfolioTitle} <br /> <span className="text-primary">{t?.services?.portfolioTitleHighlight}</span>
            </h2>
          </div>

          <div className="max-w-6xl mx-auto">
            {t?.services?.projects?.map((project: any, index: number) => (
              <ProjectCard 
                key={index} 
                project={project} 
                assets={projectAssets[index]} 
                isReversed={index % 2 !== 0} 
                texts={{ btnLive: t?.services?.btnLive, btnRepo: t?.services?.btnRepo }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}