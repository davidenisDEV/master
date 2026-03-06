"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, CheckCircle2, Rocket, Star } from "lucide-react";

function AnimatedNumber({ from, to, duration = 2, suffix = "" }: { from: number, to: number, duration?: number, suffix?: string }) {
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

  return <span ref={ref}>{count}{suffix}</span>;
}

const statsData = [
  { icon: <Clock className="w-8 h-8 text-primary" />, value: 150, suffix: "+", label: "Horas de trabalho manual automatizadas." },
  { icon: <CheckCircle2 className="w-8 h-8 text-primary" />, value: 100, suffix: "%", label: "Entregas realizadas dentro do prazo." },
  { icon: <Rocket className="w-8 h-8 text-primary" />, value: 12, suffix: "+", label: "Projetos escaláveis em produção." },
  { icon: <Star className="w-8 h-8 text-primary" />, value: 5, suffix: ".0", label: "Avaliação média nos feedbacks." }
];

export function Stats() {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 dark:bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white font-heading leading-tight">
              Ajudando empresas locais a <br />
              <span className="text-primary drop-shadow-sm">se reinventarem digitalmente</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">Trabalho duro, análise de dados rigorosa e entrega de valor.</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 md:gap-8">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}
                className="flex flex-col gap-4 bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-6 rounded-3xl border border-white/80 dark:border-slate-700/50 shadow-xl dark:shadow-none"
              >
                <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl w-fit border border-slate-100 dark:border-slate-700 shadow-sm">{stat.icon}</div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white font-heading mb-1">
                    <AnimatedNumber from={0} to={stat.value} suffix={stat.suffix} duration={2.5} />
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-snug">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}