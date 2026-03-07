"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Code2, Terminal as TerminalIcon } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { useState, useEffect } from "react";

// Subcomponente do Terminal Animado
const TerminalCode = ({ language }: { language: string }) => {
  const codeLines = [
    { text: "import os, sys", color: "text-purple-400" },
    { text: "from architecture import ScalableSystem", color: "text-purple-400" },
    { text: "", color: "" },
    { text: "def optimize_business(client_data):", color: "text-blue-400" },
    { text: "    bottlenecks = analyze(client_data)", color: "text-slate-300", indent: true },
    { text: "    if bottlenecks.exist():", color: "text-yellow-300", indent: true },
    { text: "        return ScalableSystem.deploy()", color: "text-green-400", indent: true, indent2: true },
    { text: "", color: "" },
    { text: language === "PT" ? "# Iniciando otimização..." : "# Starting optimization...", color: "text-slate-500" },
    { text: "> System fully operational. Conversion +45%", color: "text-green-500 font-bold" },
  ];

  return (
    <div className="relative w-full max-w-lg bg-[#0c0c0c]/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden font-mono text-sm sm:text-base z-20">
      {/* Barra superior estilo MacOS */}
      <div className="bg-slate-800/80 px-4 py-3 flex items-center justify-between border-b border-slate-700/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="text-slate-500 text-xs flex items-center gap-2">
          <TerminalIcon className="w-3 h-3" /> engine.py
        </div>
        <div className="w-8"></div>
      </div>
      {/* Corpo do Código Animado */}
      <div className="p-6 space-y-1.5 h-[280px]">
        {codeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.4, duration: 0.3 }}
            className={`${line.color} ${line.indent ? "ml-4" : ""} ${line.indent2 ? "ml-8" : ""}`}
          >
            {line.text}
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-slate-400 inline-block mt-2"
        />
      </div>
    </div>
  );
};

export function Hero() {
  const { t, language } = useLanguage();

  return (
    // pb-40 e md:pb-48 são cruciais aqui para o overlapping da próxima section
    <section id="hero" className="relative pt-32 pb-40 md:pt-48 md:pb-48 overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 z-0">
      
      {/* 🚀 BOLHAS GIGANTES DE FUNDO 🚀 */}
      <div className="absolute top-[10%] -right-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 dark:bg-primary/15 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[10%] -left-[10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* 🚀 EFEITO GRID ANIMADO 🚀 */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] animate-grid [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* LADO ESQUERDO: CONTEÚDO E CTAs */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full mb-6 border border-primary/20 font-bold text-xs uppercase tracking-widest shadow-sm">
              <Code2 className="w-4 h-4" /> {language === "PT" ? "Engenharia de Software" : "Software Engineering"}
            </div>

            <h1 className="text-5xl md:text-[60px] font-semibold text-slate-800 dark:text-white leading-[1.15] mb-6">
              {t.hero.title} <br />
              <span className="text-primary drop-shadow-sm">{t.hero.titleHighlight}</span>
            </h1>
            
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg mb-8 max-w-lg leading-relaxed">
              {language === "PT" 
                ? "Transformo os gargalos operacionais da sua empresa em sistemas fluidos, automatizados e focados em alta conversão e escalabilidade."
                : "I transform your company's operational bottlenecks into fluid, automated systems focused on high conversion and scalability."}
            </p>

            {/* BOTÕES DUPLOS (Conversão Direta + Cases) */}
            <div className="flex flex-col sm:flex-row gap-4 relative">
              <Link 
                href="#contact" 
                className="inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl text-base font-bold hover:bg-green-600 hover:scale-105 transition-all shadow-[0_0_20px_rgba(76,175,80,0.4)]"
              >
                {t.hero.cta} <ArrowRight className="w-4 h-4" />
              </Link>
              
              <Link 
                href="#portfolio" 
                className="inline-flex justify-center items-center px-8 py-4 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl text-slate-700 dark:text-slate-200 border border-white/80 dark:border-slate-700/50 rounded-xl text-base font-bold hover:bg-white/80 dark:hover:bg-slate-800/50 transition-colors shadow-sm"
              >
                {language === "PT" ? "Ver Cases de Sucesso" : "View Success Cases"}
              </Link>
            </div>
          </motion.div>

          {/* LADO DIREITO: TERMINAL, SVG & FORMAS 3D */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex justify-center items-center relative w-full">
            
            {/* Formas Geométricas em Vidro (Flutuando no Fundo) */}
            <motion.div 
              animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-4 w-32 h-32 bg-gradient-to-tr from-primary/40 to-blue-500/40 rounded-full backdrop-blur-2xl border border-white/20 z-10 hidden md:block shadow-[0_0_40px_rgba(76,175,80,0.2)]"
            />
            <motion.div 
              animate={{ y: [10, -10, 10], rotate: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-8 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-primary/30 rounded-3xl backdrop-blur-xl border border-white/20 z-10 hidden md:block rotate-12"
            />

            {/* O Terminal Animado (Mantido intacto) */}
            <TerminalCode language={language} />

            {/* 👇 NOVO: ARTE SVG DA HERO SOBREPOSTA (MENOR E NA FRENTE) 👇 */}
            <motion.img 
              src="/svg/hero.svg" 
              alt="Hero Illustration"
              animate={{ y: [-8, 8, -8] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              // z-40 coloca na frente do terminal, w-40/w-56 deixa em tamanho de detalhe
              className="absolute -bottom-10 -right-4 md:-right-12 md:-bottom-12 w-40 md:w-56 z-40 pointer-events-none drop-shadow-2xl"
            />

          </motion.div>
        </div>
      </div>
    </section>
  );
}