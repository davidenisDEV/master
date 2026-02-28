"use client";

import { motion } from "framer-motion";

// Adicionei algumas tecnologias a mais (Git, Tailwind) para dar volume à esteira
const technologies = [
  { name: "Python", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
  { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "TypeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
  { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "PostgreSQL", logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
  { name: "Docker", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  { name: "Tailwind CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
  { name: "Git", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Git-logo.svg" },
];

// Triplicamos a lista para criar a ilusão de loop infinito perfeito
const marqueeTechs = [...technologies, ...technologies, ...technologies];

export function Clients() {
  return (
    <section className="py-12 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-10">
        <h3 className="text-2xl font-semibold text-slate-700 dark:text-white mb-2 font-heading">Minha Stack de Tecnologia</h3>
        <p className="text-muted-foreground">Ferramentas modernas para resultados de alta performance</p>
      </div>
      
      {/* Container do Marquee */}
      <div className="relative flex overflow-x-hidden group">
        
        {/* Gradientes laterais (Esfumaçam a entrada e saída dos logos) */}
        <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        {/* Pista do Marquee (A classe group-hover pausa a animação ao passar o mouse) */}
        <div className="flex gap-16 md:gap-24 items-center w-max animate-marquee group-hover:[animation-play-state:paused] px-8">
          {marqueeTechs.map((tech, index) => (
            <div 
              key={index}
              className="w-16 md:w-20 h-16 flex items-center justify-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer shrink-0"
              title={tech.name}
            >
              <img src={tech.logo} alt={tech.name} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}