"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Database, Bot, Terminal, ShieldCheck, ExternalLink, Github, ChevronLeft, ChevronRight, Settings } from "lucide-react";

// --- DADOS DAS HABILIDADES ---
const skills = [
  {
    title: "Front-end & UI/UX",
    description: "Criação de interfaces modernas, interativas e responsivas utilizando React.js, TypeScript e Next.js. Foco total na jornada do usuário, conversão e métricas Core Web Vitals.",
    icon: <Code2 className="w-10 h-10 text-primary" />
  },
  {
    title: "Back-end & Arquitetura",
    description: "Desenvolvimento robusto com Python (Django) e Node.js. Arquitetura de APIs RESTful, gestão de banco de dados (PostgreSQL/Supabase) e autenticação segura (OAuth).",
    icon: <Database className="w-10 h-10 text-primary" />
  },
  {
    title: "Automação (ETL) & Bots",
    description: "Otimização de processos através de scripts avançados. Integração de dados, automação de atendimento com WhatsApp e criação de Dashboards interativos de Business Intelligence.",
    icon: <Bot className="w-10 h-10 text-primary" />
  }
];

// --- OS CASES DE SUCESSO ---
const projects = [
  {
    title: "GoGreen Headshop",
    subtitle: "SaaS E-commerce & PDV Integrado",
    description: "Uma plataforma híbrida de alta performance desenvolvida do zero. Muito além de uma loja virtual, o sistema conta com um Painel Admin completo (PDV de balcão), gestão de inventário em tempo real e um Clube VIP de fidelização.",
    tags: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Autenticação segura via Google OAuth",
      "Clube VIP: Sistema de pontuação e resgate de brindes",
      "Checkout inteligente direto para o WhatsApp do vendedor",
      "Painel Admin / CRM para gestão de clientes",
      "PDV (Ponto de Venda) para operações físicas na loja"
    ],
    liveLink: "https://gogreen-4fmn.vercel.app/",
    githubLink: "https://github.com/davidenisDEV/gogreen",
    images: [
      "/gogreenhero.png",
      "/gogreenheroabraba.png",
      "/gogreenherokits.png",
      "/gogreenheroitens.png",
      "/gogreenclub.png",
      "/gogreenmusic.png"
    ]
  },
  {
    title: "PC Cleaner & Optimizer",
    subtitle: "Automação e Performance em Python",
    description: "Uma ferramenta desktop desenvolvida com interface gráfica (GUI) em Python para limpeza profunda e otimização do sistema operativo. Remove arquivos temporários, esvazia cache e melhora a performance do computador de forma segura.",
    tags: ["Python", "Automação", "OS Module", "Desktop GUI"],
    features: [
      "Limpeza automática de arquivos temporários do sistema",
      "Otimização de memória e esvaziamento de cache",
      "Interface gráfica amigável para usuários não-técnicos",
      "Execução rápida e segura integrada ao Sistema Operativo"
    ],
    liveLink: "", // Sem live link por ser script de terminal/desktop
    githubLink: "https://github.com/davidenisDEV/limpezaPC",
    images: [] // Usa o mockup de terminal gerado no componente
  }
];

// Componente isolado para gerir a galeria de fotos de cada projeto
function ProjectCard({ project }: { project: any }) {
  const [currentImg, setCurrentImg] = useState(0);

  const nextImg = () => setCurrentImg((prev) => (prev + 1) % project.images.length);
  const prevImg = () => setCurrentImg((prev) => (prev - 1 + project.images.length) % project.images.length);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl overflow-hidden shadow-xl mb-12"
    >
      <div className="grid lg:grid-cols-2">
        
        {/* Info Esquerda */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <p className="text-primary font-bold tracking-widest uppercase text-xs mb-2">{project.subtitle}</p>
          <h3 className="text-3xl font-heading font-bold text-slate-800 dark:text-white mb-4">{project.title}</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="space-y-3 mb-8">
            {project.features.map((feat: string, i: number) => (
              <div key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" /> {feat}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag: string, i: number) => (
              <span key={i} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
                Ver ao Vivo <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" /> Repositório
            </a>
          </div>
        </div>

        {/* Imagem / Mockup Direita */}
        <div className="bg-slate-100 dark:bg-slate-950 p-8 flex items-center justify-center relative overflow-hidden min-h-[400px]">
          <div className="absolute inset-0 bg-primary/5"></div>
          
          {project.images && project.images.length > 0 ? (
            // Galeria de Imagens para a GoGreen
            <div className="relative z-10 w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group border-4 border-slate-800">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={project.images[currentImg]}
                  alt={`${project.title} preview`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              
              {/* Controles da Galeria */}
              <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prevImg} className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors">
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={nextImg} className="p-2 bg-black/50 hover:bg-primary text-white rounded-full backdrop-blur-sm transition-colors">
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Indicadores */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-2">
                {project.images.map((_: any, idx: number) => (
                  <div key={idx} className={`w-2 h-2 rounded-full transition-colors ${idx === currentImg ? 'bg-primary' : 'bg-white/50'}`} />
                ))}
              </div>
            </div>
          ) : (
            // Mockup de Terminal para o Script Python (LimpezaPC)
            <div className="relative z-10 w-full max-w-md bg-[#1e1e1e] border-2 border-slate-700 rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-sm">
              <div className="bg-slate-800 p-3 flex items-center gap-2 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-slate-400 text-xs flex items-center gap-2"><Terminal className="w-3 h-3"/> main.py</div>
              </div>
              <div className="p-6 text-green-400 leading-relaxed">
                <p className="text-slate-300">import <span className="text-blue-400">os</span></p>
                <p className="text-slate-300">import <span className="text-blue-400">shutil</span></p>
                <br/>
                <p className="text-purple-400">def <span className="text-yellow-200">clean_system</span>():</p>
                <p className="ml-4 text-slate-500"># Iniciando varredura de cache...</p>
                <p className="ml-4">print(<span className="text-orange-300">"Buscando arquivos temporários..."</span>)</p>
                <p className="ml-4 text-slate-300">bytes_removed = os.system(<span className="text-orange-300">'cleanmgr /sagerun:1'</span>)</p>
                <p className="ml-4">print(<span className="text-orange-300">f"Sucesso! Sistema otimizado."</span>)</p>
                <br/>
                <p className="text-slate-300 animate-pulse">></p>
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
      {/* SEÇÃO 1: Habilidades e Serviços */}
      <section id="services" className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              Soluções sob medida para o <br /> seu desafio de negócio.
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Transformo gargalos operacionais em sistemas fluidos e escaláveis.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/50 transition-colors flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-white mb-3 text-center w-full font-heading">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 font-sans text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Projetos em Destaque */}
      <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2">
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