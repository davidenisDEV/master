"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Bot, Terminal, Code, Cpu, Repeat, Check } from "lucide-react";

// --- DADOS DAS HABILIDADES ---
const skills = [
  {
    title: "Front-end & UI/UX",
    description: "Criação de interfaces modernas, interativas e responsivas utilizando React.js, TypeScript e Bootstrap. Foco total na jornada do usuário e conversão.",
    icon: <Code2 className="w-10 h-10 text-primary" />
  },
  {
    title: "Back-end & Dados",
    description: "Desenvolvimento robusto com Python (Flask) e Node.js. Arquitetura de APIs RESTful e gestão de dados complexos com Pandas, PostgreSQL e MySQL.",
    icon: <Database className="w-10 h-10 text-primary" />
  },
  {
    title: "Automação (ETL) & Bots",
    description: "Otimização de processos através de scripts em Python. Integração de dados, Business Intelligence e automação de atendimento com WhatsApp.",
    icon: <Bot className="w-10 h-10 text-primary" />
  }
];

// --- DADOS DOS PROJETOS (Agora com Tags de Impacto para Leigos) ---
const projects = [
  {
    title: "Go Green Shop",
    subtitle: "E-commerce & Brand",
    description: "Desenvolvimento e gestão digital de marca própria. Foco em estratégias de UI/UX para máxima conversão de vendas e retenção de usuários.",
    impactTags: ["Aumento de Conversão", "Design Responsivo", "Gestão Simplificada"],
    icon: <Cpu className="w-8 h-8 text-primary" />,
    codeSnippet: `// Tech Stack: React + Node
import { Store } from '@/modules/ecommerce';

const GoGreenApp = () => {
  return (
    <Store 
      mode="high-conversion"
      paymentGateway="stripe"
      analytics={true}
    />
  );
};

export default GoGreenApp;`
  },
  {
    title: "Landing Pages",
    subtitle: "Alta Conversão",
    description: "Páginas responsivas para estabelecimentos comerciais com foco extremo em performance, SEO e velocidade.",
    impactTags: ["Carregamento em 1s", "Otimizado pro Google", "Foco em Vendas"],
    icon: <Code className="w-8 h-8 text-primary" />,
    codeSnippet: `// Tech Stack: Next.js + Tailwind
export const metadata = {
  title: 'SEO Optimized',
  description: 'Fastest load time',
};

export function LandingPage() {
  // Lighthouse Score: 100
  return <Layout theme="dark" />;
}`
  },
  {
    title: "PC Cleaner",
    subtitle: "Software de Otimização",
    description: "Ferramenta desktop desenvolvida em Python para manutenção preventiva e limpeza automatizada de sistemas.",
    impactTags: ["Economia de Tempo", "100% Automático", "Zero Travamentos"],
    icon: <Terminal className="w-8 h-8 text-primary" />,
    codeSnippet: `# Tech Stack: Python + OS Module
import os, shutil

def optimize_system():
    # Limpeza de arquivos temporários
    temp_path = os.environ.get('TEMP')
    shutil.rmtree(temp_path, ignore_errors=True)
    
    return "Sistema Otimizado com Sucesso!"

if __name__ == "__main__":
    optimize_system()`
  }
];

// --- COMPONENTE DO CARD 3D ---
function ProjectCard({ project }: { project: any }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-[420px] w-full group cursor-pointer" style={{ perspective: "1000px" }}>
      <motion.div
        className="w-full h-full relative rounded-xl shadow-sm border border-slate-200 dark:border-slate-800"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRENTE DO CARD (Visão de Negócios) */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col items-center text-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl">
            {project.icon}
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 font-heading">{project.title}</h3>
          <p className="text-primary text-xs font-bold uppercase tracking-wider mb-3">{project.subtitle}</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          
          {/* Tags de Impacto (Para clientes leigos) */}
          <div className="w-full flex flex-col gap-1.5 mb-auto text-left mt-2 border-t border-slate-100 dark:border-slate-800 pt-4">
            {project.impactTags.map((tag: string, i: number) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" /> {tag}
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsFlipped(true)}
            className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary transition-colors bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-lg w-full justify-center"
          >
            <Code className="w-4 h-4" /> Ver Código Fonte
          </button>
        </div>

        {/* VERSO DO CARD (Visão de Código/Terminal) */}
        <div 
          className="absolute inset-0 w-full h-full bg-slate-950 rounded-xl p-6 flex flex-col text-left overflow-hidden border border-slate-800"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Header do Terminal Falso */}
          <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-2 text-xs text-slate-500 font-mono">snippet.ts</span>
          </div>
          
          {/* Código Formatado */}
          <pre className="text-green-400 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap overflow-y-auto mb-auto scrollbar-hide">
            {project.codeSnippet}
          </pre>

          <button 
            onClick={() => setIsFlipped(false)}
            className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            <Repeat className="w-4 h-4" /> Voltar para Resumo
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function Services() {
  return (
    <>
      {/* SEÇÃO 1: Especialidades (Grid) */}
      <section id="features" className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              Como posso ajudar a <br /> escalar o seu negócio?
            </h2>
            <p className="text-slate-500">Competências técnicas aplicadas a resultados reais.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-[0_2px_4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] transition-all text-center flex flex-col items-center group"
              >
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-tl-[18px] rounded-br-[18px] rounded-tr-[5px] rounded-bl-[5px] group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-white mb-3 text-center w-full font-heading">
                  {item.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-4 font-sans px-2">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 2: Projetos em Destaque (Cards Flip 3D) */}
      <section id="portfolio" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white mb-4 font-heading leading-tight">
              Projetos desenvolvidos <br /> com foco na conversão.
            </h2>
            <p className="text-slate-500">
              Soluções pensadas no usuário. Clique em <strong className="text-primary font-medium">Ver Código Fonte</strong> para avaliar a arquitetura técnica.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}