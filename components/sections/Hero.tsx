"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site-config";
import Link from "next/link";
import { Download, ChevronDown } from "lucide-react";

export function Hero() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white dark:bg-slate-950">
      
      {/* 🚀 EFEITO GRID ANIMADO AQUI 🚀 */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#4CAF4F15_1px,transparent_1px),linear-gradient(to_bottom,#4CAF4F15_1px,transparent_1px)] bg-[size:40px_40px] animate-grid [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-[60px] font-semibold text-slate-800 dark:text-white leading-[1.15] mb-6">
              Soluções escaláveis com <br />
              <span className="text-primary">Python & React.</span>
            </h1>
            
            <p className="text-slate-500 dark:text-slate-400 text-base md:text-lg mb-8 max-w-lg">
              Sou desenvolvedor Full-Stack especialista em scripts de automação (ETL), análise de dados e criação de interfaces modernas focadas em alta conversão.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 relative">
              <Link 
                href="#contact" 
                className="inline-flex justify-center items-center px-8 py-3 bg-primary text-white rounded-[4px] text-base font-medium hover:bg-green-700 transition-colors shadow-sm"
              >
                Iniciar um Projeto
              </Link>
              
              {/* Botão Dropdown de Currículos */}
              <div className="relative">
                <button 
                  onClick={() => setIsCvOpen(!isCvOpen)}
                  onBlur={() => setTimeout(() => setIsCvOpen(false), 200)} // Fecha se clicar fora
                  className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-3 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-[4px] text-base font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <Download className="w-4 h-4" /> Baixar CV <ChevronDown className={`w-4 h-4 transition-transform ${isCvOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Menu Animado */}
                <AnimatePresence>
                  {isCvOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-full sm:min-w-[220px] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden z-50"
                    >
                      <a 
                        href="/Curriculo.pdf" 
                        download="David_Denis_Curriculo_PT.pdf"
                        target="_blank"
                        className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-2 border-b border-slate-100 dark:border-slate-700"
                      >
                        🇧🇷 Versão em Português
                      </a>
                      <a 
                        href="/CurriculoEN.pdf" 
                        download="David_Denis_Resume_EN.pdf"
                        target="_blank"
                        className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary transition-colors flex items-center gap-2"
                      >
                        🇺🇸 English Version
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center relative"
          >
            <img 
              src="https://illustrations.popsy.co/green/web-design.svg" 
              alt="Desenvolvedor trabalhando" 
              className="w-full max-w-sm md:max-w-md h-auto object-contain drop-shadow-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}