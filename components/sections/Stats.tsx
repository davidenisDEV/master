// src/components/sections/Stats.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Timer, Target, Activity } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { siteConfig } from "@/config/site-config";

// Mapeador de ícones string -> Componente
const iconMap: Record<string, React.ReactNode> = {
  TrendingUp: <TrendingUp className="w-5 h-5 text-primary" />,
  Timer: <Timer className="w-5 h-5 text-primary" />,
  Target: <Target className="w-5 h-5 text-primary" />,
  Activity: <Activity className="w-5 h-5 text-primary" />
};

function AnimatedNumber({ from, to, duration = 2.5 }: { from: number, to: number, duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export function Stats() {
  const { t } = useLanguage();
  const statsList = siteConfig?.stats || [];

  return (
    <section className="py-12 relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="w-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {statsList.map((stat: any, index: number) => {
              // Os textos vêm do arquivo de tradução (t.stats.items[index])
              const translationItem = t?.stats?.items?.[index] || { title: "", desc: "" };
              
              return (
                <div 
                  key={`stat-${index}`} // CORREÇÃO 1: Usando index em vez de id inexistente
                  className={`flex flex-col items-center text-center px-4 ${index !== 0 ? 'lg:pl-8' : ''} ${index !== statsList.length - 1 ? 'lg:pr-8' : ''}`}
                >
                  <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center mb-4 text-primary">
                    {/* CORREÇÃO 2: Lendo stat.icon de acordo com seu site-config */}
                    {iconMap[stat.icon]}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white font-heading tracking-tight mb-1">
                    {/* CORREÇÃO 3: Fallback vazio "" caso não haja prefixo/sufixo */}
                    <span className="text-primary/80">{stat.prefix || ""}</span>
                    <AnimatedNumber from={0} to={stat.value} />
                    <span className="text-primary/80">{stat.suffix || ""}</span>
                  </h3>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mt-1 mb-2">
                    {translationItem.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {translationItem.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}