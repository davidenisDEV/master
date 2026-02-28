"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Clock, CheckCircle2, Rocket, Star } from "lucide-react";

// Componente inteligente que faz a contagem animada
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
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const statsData = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    value: 150,
    suffix: "+",
    label: "Horas de trabalho manual automatizadas."
  },
  {
    icon: <CheckCircle2 className="w-8 h-8 text-primary" />,
    value: 100,
    suffix: "%",
    label: "Entregas realizadas dentro do prazo."
  },
  {
    icon: <Rocket className="w-8 h-8 text-primary" />,
    value: 12,
    suffix: "+",
    label: "Projetos escaláveis em produção."
  },
  {
    icon: <Star className="w-8 h-8 text-primary" />,
    value: 5,
    suffix: ".0",
    label: "Avaliação média nos feedbacks."
  }
];

export function Stats() {
  return (
    <section className="py-20 bg-secondary/50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Texto de Impacto */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 dark:text-white font-heading leading-tight">
              Ajudando empresas locais a <br />
              <span className="text-primary">se reinventarem digitalmente</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Trabalho duro, análise de dados rigorosa e entrega de valor.
            </p>
          </motion.div>

          {/* Grid de Contadores 2x2 */}
          <div className="grid grid-cols-2 gap-8 md:gap-10">
            {statsData.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div>{stat.icon}</div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white font-heading">
                    <AnimatedNumber from={0} to={stat.value} suffix={stat.suffix} duration={2.5} />
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}