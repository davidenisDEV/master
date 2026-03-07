"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/contexts/LanguageContext"; 

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { t } = useLanguage(); 

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      {/* Background de Linhas */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

      {/* 👇 NOVO: ARTE SVG FAQ LEFT FLUTUANDO À ESQUERDA 👇 */}
      <motion.img 
        src="/svg/faqleft.svg" 
        alt="FAQ Illustration"
        animate={{ y: [15, -15, 15], rotate: [2, -2, 2] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 -left-10 lg:left-10 xl:left-32 w-56 md:w-80 opacity-20 dark:opacity-30 z-0 pointer-events-none hidden lg:block"
      />

      {/* ARTE SVG MOBILE FLUTUANDO À DIREITA */}
      <motion.img 
        src="/svg/mobile.svg" 
        alt="Mobile Device Illustration"
        animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 -translate-y-1/2 -right-10 lg:right-10 xl:right-32 w-56 md:w-80 opacity-20 dark:opacity-30 z-0 pointer-events-none hidden lg:block"
      />

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">
            {t?.faq?.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {t?.faq?.subtitle}
          </p>
        </div>

        <div className="space-y-4 relative z-20">
          {t?.faq?.questions?.map((faq: any, index: number) => (
            <div 
              key={index} 
              className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-white/80 dark:border-slate-700/50 overflow-hidden transition-all hover:shadow-md cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-medium text-slate-800 dark:text-white text-lg pr-8 font-heading">
                  {faq.q}
                </span>
                {activeIndex === index ? <Minus className="text-primary shrink-0 w-5 h-5" /> : <Plus className="text-slate-400 shrink-0 w-5 h-5" />}
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-white/60 dark:border-slate-700/50 pt-4 text-sm md:text-base">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}