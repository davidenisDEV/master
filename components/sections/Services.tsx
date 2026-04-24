"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Code2, Database, Bot, Terminal, ShieldCheck, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { siteConfig } from "@/config/site-config";

const skillsIcons = [
  <Code2 key="front" className="w-10 h-10 text-primary" />,
  <Database key="back" className="w-10 h-10 text-primary" />,
  <Bot key="bot" className="w-10 h-10 text-primary" />
];

const projectAssets = [
  { 
    id: "celedonio",
    liveLink: "https://celedonioadvocacia.com.br/",
    githubLink: "https://github.com/davidenisDEV/CeledonioAdvg", 
    images: ["/celedonio/celedonio.png", "/celedonio/celedonio2.png", "/celedonio/celedonio3.png", "/celedonio/celedonio4.png", "/celedonio/celedonio5.png", "/celedonio/celedonio6.png"] 
  },
  { 
    id: "Wave Produtora",
    liveLink: "produtorawave.com", 
    githubLink: "https://github.com/davidenisDEV/wave-produtora", 
    images: ["/waveprod/waveprod.png", "/waveprod/waveprod2.png", "/waveprod/waveprod3.png", "/waveprod/waveprod4.png"] 
  },
  { 
    id: "fabrika",
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/FBRK", 
    images: ["/fabrika/fabrika.png", "/fabrika/fabrika2.png", "/fabrika/fabrika3.png", "/fabrika/fabrika4.png", "/fabrika/fabrika5.png", "/fabrika/fabrika6.png"] 
  },
  { 
    id: "gogreen",
    liveLink: "https://gogreen-4fmn.vercel.app/", 
    githubLink: "https://github.com/davidenisDEV/gogreen", 
    images: ["/gogreen/gogreenhero.png", "/gogreen/gogreenheroabraba.png", "/gogreen/gogreenherokits.png", "/gogreen/gogreenheroitens.png", "/gogreen/gogreenclub.png", "/gogreen/gogreenmusic.png"] 
  },
  { 
    id: "credit-risk",
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/credit-risk-system", 
    images: [] 
  },
  { 
    id: "petshop",
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/petshop", 
    images: ["/medicao/petshop.png", "/medicao/petshop2.png", "/medicao/petshop3.png", "/medicao/petshop4.png", "/medicao/petshop5.png", "/medicao/petshop6.png"] 
  },
];

const getDevicon = (tag: string) => {
  if (!tag) return null;
  const t = tag.toLowerCase();
  if (t.includes("next")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg";
  if (t.includes("type")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg";
  if (t.includes("tailwind")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg";
  if (t.includes("react")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg";
  if (t.includes("python") || t.includes("streamlit")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg";
  if (t.includes("go") || t.includes("golang")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg";
  if (t.includes("rabbitmq") || t.includes("mensageria")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg";
  if (t.includes("pandas")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg";
  if (t.includes("sql server")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg";
  if (t.includes("mysql")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg";
  if (t.includes("postgresql") || t.includes("db") || t.includes("sql")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg";
  if (t.includes("supabase")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg";
  if (t.includes("docker")) return "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg";
  return null;
};

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
const ProjectTerminal = ({ projectId }: { projectId: string }) => {
  if (projectId === "credit-risk") {
    return (
      <div className="relative z-10 w-full max-w-md bg-[#1e1e1e] border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs md:text-sm">
        <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700">
          <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
          <div className="ml-4 text-slate-400 flex items-center gap-2"><Terminal className="w-3 h-3"/> risk_engine.py</div>
        </div>
        <div className="p-6 leading-relaxed space-y-1.5 h-[280px]">
          <p className="text-blue-400"># Ingesting transaction via Go Fiber...</p>
          <p className="text-slate-300">HTTP/1.1 202 Accepted <span className="text-slate-500">(1.2ms)</span></p>
          <p className="text-yellow-400 mt-2">[x] Pushing to RabbitMQ: <span className="text-yellow-200">"credit_check_queue"</span></p>
          <p className="text-purple-400 mt-4"># Python Worker analyzing risk...</p>
          <p className="text-slate-300">Row count: 50,000 | Model: IsolationForest</p>
          <p className="text-green-400 font-bold mt-2">&gt; Result: LOW_RISK | Saved to PG (Idempotent)</p>
          <p className="text-slate-500 mt-4 animate-pulse">_</p>
        </div>
      </div>
    );
  }

  // Fallback para PC Cleaner
  return (
    <div className="relative z-10 w-full max-w-md bg-[#1e1e1e] border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs md:text-sm">
      <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700">
        <div className="flex gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
        <div className="ml-4 text-slate-400 flex items-center gap-2"><Terminal className="w-3 h-3"/> pc_cleaner.py</div>
      </div>
      <div className="p-6 leading-relaxed space-y-1.5 h-[280px]">
        <p className="text-blue-400"># Initializing Automated PC Cleaner...</p>
        <p className="text-slate-300">Scanning temp directories...</p>
        <p className="text-yellow-400 mt-2">[*] Found 3.2GB of junk files</p>
        <p className="text-purple-400 mt-4"># Executing cleanup routine</p>
        <p className="text-slate-300">Clearing cache... <span className="text-green-400">[OK]</span></p>
        <p className="text-slate-300">Optimizing registry... <span className="text-green-400">[OK]</span></p>
        <p className="text-green-400 font-bold mt-2">&gt; System optimization complete. RAM freed.</p>
        <p className="text-slate-500 mt-4 animate-pulse">_</p>
      </div>
    </div>
  );
};

function ProjectCard({ project, assets, isReversed, texts }: any) {
  const [currentImg, setCurrentImg] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback seguro caso 'project' venha undefined do json de tradução
  const title = project?.title || project?.name || "Projeto";
  const subtitle = project?.subtitle || project?.role || "";
  const desc = project?.desc || "";
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
            <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{subtitle}</p>
            <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-4">{title}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{desc}</p>
            
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
        
        {/* Lado da Imagem ou Terminal */}
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
                  <Image src={assets.images[currentImg]} alt={`${title} screenshot`} fill className="object-cover" priority={currentImg === 0} sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                <button onClick={prevImg} aria-label="Imagem Anterior" className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={nextImg} aria-label="Próxima Imagem" className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"><ChevronRight className="w-6 h-6" /></button>
              </div>
            </div>
          ) : (
            <ProjectTerminal projectId={assets?.id || ""} />
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
            {siteConfig.portfolio.map((projectAsset: any, index: number) => {
              // Pega a tradução baseada no Index (ou no ID na próxima etapa do en.ts/pt.ts)
              const projectTranslation = t?.services?.projects?.[index];

              return (
                <ProjectCard 
                  key={projectAsset.id} 
                  project={projectTranslation} 
                  assets={projectAsset} 
                  isReversed={index % 2 !== 0} 
                  texts={{ btnLive: t?.services?.btnLive, btnRepo: t?.services?.btnRepo }}
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  );
}