"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Bot, Terminal, ShieldCheck, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";

const skills = [
  { title: "Front-end & UI/UX", description: "Criação de interfaces modernas, interativas e responsivas utilizando React.js, TypeScript e Next.js. Foco total na jornada do usuário, conversão e métricas Core Web Vitals.", icon: <Code2 className="w-10 h-10 text-primary" /> },
  { title: "Back-end & Arquitetura", description: "Desenvolvimento robusto com Python (Django) e Node.js. Arquitetura de APIs RESTful, gestão de banco de dados (PostgreSQL/Supabase) e autenticação segura (OAuth).", icon: <Database className="w-10 h-10 text-primary" /> },
  { title: "Automação (ETL) & Bots", description: "Otimização de processos através de scripts avançados. Integração de dados, automação de atendimento com WhatsApp e criação de Dashboards interativos de Business Intelligence.", icon: <Bot className="w-10 h-10 text-primary" /> }
];

const projects = [
  {
    title: "Celedonio Advocacia", 
    subtitle: "Landing Page Premium de Alta Conversão", 
    description: "Plataforma digital institucional desenvolvida exclusivamente para o mercado jurídico. O projeto une um design sóbrio e autoritário (utilizando Glassmorphism) com gatilhos de acolhimento e segurança.",
    tags: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"], 
    features: ["Design em Glassmorphism Escuro (Dark Glass)", "Funis de conversão isolados (/criminal e /familia)", "Timeline visual animada", "Sistema de internacionalização (PT/EN) integrado"],
    liveLink: "", // Removido para esconder o botão "Ver ao Vivo"
    githubLink: "https://github.com/davidenisDEV/CeledonioAdvg", 
    images: ["/celedonio.png", "/celedonio2.png", "/celedonio3.png", "/celedonio4.png", "/celedonio5.png", "/celedonio6.png"]
  },
  {
    title: "GoGreen Headshop", 
    subtitle: "SaaS E-commerce & PDV Integrado", 
    description: "Uma plataforma híbrida de alta performance desenvolvida do zero. Muito além de uma loja virtual, o sistema conta com um Painel Admin completo (PDV de balcão), gestão de inventário em tempo real e um Clube VIP de fidelização.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"], 
    features: ["Autenticação segura via Google OAuth", "Clube VIP: Sistema de pontuação e resgate de brindes", "Checkout inteligente direto para o WhatsApp do vendedor", "Painel Admin / CRM para gestão de clientes", "PDV (Ponto de Venda) para operações físicas"],
    liveLink: "https://gogreen-4fmn.vercel.app/", 
    githubLink: "https://github.com/davidenisDEV/gogreen", 
    images: ["/gogreenhero.png", "/gogreenheroabraba.png", "/gogreenherokits.png", "/gogreenheroitens.png", "/gogreenclub.png", "/gogreenmusic.png"]
  },
  {
    title: "FABRIKA ROOM", 
    subtitle: "Plataforma de Experiência e E-commerce", 
    description: "Uma plataforma digital moderna e imersiva construída para destacar a identidade visual da marca. O projeto foca em uma interface limpa, transições suaves e uma jornada de navegação otimizada para retenção e conversão de usuários.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "UI/UX"], 
    features: ["Design imersivo com animações fluidas e responsivas", "Vitrine de coleções otimizada (Mobile-First)", "Navegação de altíssima performance estruturada em React", "Arquitetura de front-end pronta para escalabilidade"],
    liveLink: "", // Sem link ao vivo no momento
    githubLink: "https://github.com/davidenisDEV/FBRK", 
    images: ["/fabrika.png", "/fabrika2.png", "/fabrika3.png", "/fabrika4.png", "/fabrika5.png", "/fabrika6.png"]
  },
  {
    title: "PC Cleaner & Optimizer", 
    subtitle: "Automação e Performance em Python", 
    description: "Uma ferramenta desktop desenvolvida com interface gráfica (GUI) em Python para limpeza profunda e otimização do sistema operativo. Remove arquivos temporários, esvazia cache e melhora a performance do computador de forma segura.",
    tags: ["Python", "Automação", "OS Module", "Desktop GUI"], 
    features: ["Limpeza automática de arquivos temporários do sistema", "Otimização de memória e esvaziamento de cache", "Interface gráfica amigável para usuários não-técnicos", "Execução rápida e segura integrada ao Sistema Operativo"],
    liveLink: "", 
    githubLink: "https://github.com/davidenisDEV/limpezaPC", 
    images: []
  }
];

function ProjectCard({ project }: { project: any }) {
  const [currentImg, setCurrentImg] = useState(0);
  const nextImg = () => setCurrentImg((prev) => (prev + 1) % project.images.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      // Aplicação de Glassmorphism no Cartão Principal do Projeto
      className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl border border-white/80 dark:border-slate-700/50 rounded-3xl overflow-hidden shadow-2xl mb-12 relative z-10 group"
    >
      <div className="grid lg:grid-cols-2">
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{project.subtitle}</p>
          <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-4">{project.title}</h3>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">{project.description}</p>
          <div className="space-y-3 mb-8">
            {project.features.map((feat: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> {feat}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="bg-white/80 dark:bg-slate-800/60 border border-white/90 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                Ver ao Vivo <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 border border-white/90 dark:border-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 shadow-sm">
              <Github className="w-4 h-4" /> Repositório
            </a>
          </div>
        </div>
        
        {/* Lado Direito do Cartão (Imagens/Terminal) */}
        <div className="bg-slate-100/50 dark:bg-slate-950/50 p-8 flex items-center justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-primary/5 pointer-events-none"></div>
          {project.images && project.images.length > 0 ? (
            <div className="relative z-10 w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group/img border border-white/80 dark:border-slate-700/50">
              <AnimatePresence mode="wait">
                <motion.img key={currentImg} src={project.images[currentImg]} alt={`${project.title} preview`} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full h-full object-cover" />
              </AnimatePresence>
              <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
                <button onClick={prevImg} className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"><ChevronLeft className="w-6 h-6" /></button>
                <button onClick={nextImg} className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors"><ChevronRight className="w-6 h-6" /></button>
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-full max-w-md bg-[#1e1e1e] border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
              <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-yellow-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div><div className="ml-4 text-slate-400 text-xs flex items-center gap-2"><Terminal className="w-3 h-3"/> main.py</div></div>
              <div className="p-6 text-green-400 leading-relaxed">
                <p className="text-slate-300">import <span className="text-blue-400">os</span></p>
                <p className="text-purple-400">def <span className="text-yellow-200">clean_system</span>():</p>
                <p className="ml-4">print(<span className="text-orange-300">"Sucesso!"</span>)</p>
                <p className="text-slate-300 animate-pulse">&gt;</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Services() {
  return (
    <>
      {/* SEÇÃO 1: Habilidades */}
      <section id="services" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 z-0">
        
        {/* GRID E BOLHAS */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 dark:bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              Soluções sob medida para o <br /> seu desafio de negócio.
            </h2>
            <p className="text-slate-500 dark:text-slate-400">Transformo gargalos operacionais em sistemas fluidos e escaláveis.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((item, index) => (
              <motion.div 
                key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/80 dark:border-slate-800/50 hover:border-primary/50 transition-colors flex flex-col items-center shadow-xl dark:shadow-none group"
              >
                <div className="w-20 h-20 bg-white/80 dark:bg-slate-800 shadow-lg rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/90 dark:border-slate-700">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-3 text-center w-full font-heading">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4 text-center">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Projetos em Destaque */}
      <section id="portfolio" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
        
        {/* GRID E BOLHAS */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/20 dark:bg-blue-500/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2 shadow-sm">
              <Terminal className="w-4 h-4" /> Portfólio
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              Projetos desenvolvidos <br /> com foco em performance.
            </h2>
          </div>

          <div className="max-w-5xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}