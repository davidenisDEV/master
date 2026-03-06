"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TrendingUp, Timer, Target, Activity } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";

// Componente para animar os números
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
  const { language } = useLanguage();

  // Métricas 100% Focadas no Valor para o Cliente
  const statsData = [
    { 
      icon: <TrendingUp className="w-5 h-5 text-primary" />, 
      prefix: "R$ ", value: 2, suffix: "M+", 
      title: language === "PT" ? "Impacto Gerado" : "Generated Impact",
      desc: language === "PT" ? "Receita ou economia para clientes." : "Revenue or savings for clients."
    },
    { 
      icon: <Timer className="w-5 h-5 text-primary" />, 
      prefix: "+", value: 15, suffix: "k", 
      title: language === "PT" ? "Horas Poupadas" : "Hours Saved",
      desc: language === "PT" ? "Trabalho manual automatizado." : "Manual work automated."
    },
    { 
      icon: <Target className="w-5 h-5 text-primary" />, 
      prefix: "", value: 100, suffix: "%", 
      title: language === "PT" ? "No Prazo" : "On Time",
      desc: language === "PT" ? "Compromisso com o cronograma." : "Commitment to the schedule."
    },
    { 
      icon: <Activity className="w-5 h-5 text-primary" />, 
      prefix: "", value: 99, suffix: ".9%", 
      title: language === "PT" ? "Disponibilidade" : "High Uptime",
      desc: language === "PT" ? "Sistemas estáveis (SLA alto)." : "Stable systems (SLA)."
    }
  ];

  return (
    // Sem margens negativas, apenas um padding confortável que respira no layout
    <section className="py-12 relative z-20">
      <div className="container mx-auto px-6 max-w-6xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          // O Single Banner: Unificado, leve e elegante
          className="w-full bg-white/60 dark:bg-slate-900/40 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] p-8 md:p-12 relative overflow-hidden"
        >
          {/* Luz de Fundo Interna para dar o toque Premium */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 blur-[80px] rounded-full pointer-events-none -z-10"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-slate-200 dark:divide-slate-800">
            {statsData.map((stat, index) => (
              <div 
                key={index} 
                className={`flex flex-col items-center text-center px-4 ${index !== 0 ? 'lg:pl-8' : ''} ${index !== statsData.length - 1 ? 'lg:pr-8' : ''}`}
              >
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center mb-4 text-primary">
                  {stat.icon}
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white font-heading tracking-tight mb-1">
                  <span className="text-primary/80">{stat.prefix}</span>
                  <AnimatedNumber from={0} to={stat.value} />
                  <span className="text-primary/80">{stat.suffix}</span>
                </h3>
                
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mt-1 mb-2">
                  {stat.title}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}