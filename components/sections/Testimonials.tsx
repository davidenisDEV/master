"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  { name: "Carlos Eduardo", role: "Diretor de E-commerce", text: "O David pegou nossa necessidade de UI/UX e transformou em uma interface incrivelmente rápida usando React. A taxa de conversão da nossa loja subiu 22% logo na primeira semana após o deploy. Código limpo e entrega no prazo.", rating: 5, initials: "CE", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
  { name: "Mariana Silva", role: "Gestora de Operações", text: "A automação em Python (ETL) que ele desenvolveu salvou a nossa equipe. O que antes levava 15 horas de trabalho manual com planilhas, agora roda de forma 100% autônoma em poucos minutos. Um baita profissional!", rating: 5, initials: "MS", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" },
  { name: "Roberto Almeida", role: "Fundador de Agência", text: "Contratei para desenvolver as landing pages de alta conversão dos meus clientes. A performance técnica de carregamento e as pontuações de SEO (Lighthouse 100) são absurdas. Muito focado em resolver o problema de negócio.", rating: 5, initials: "RA", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-400" }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading leading-tight">
            Não acredite apenas <br className="hidden md:block" />
            <span className="text-primary">nas minhas palavras.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">Veja o que parceiros e clientes dizem sobre o impacto das soluções desenvolvidas para os seus negócios.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15 }}
              className="relative bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl dark:shadow-none border border-white/80 dark:border-slate-700/50 flex flex-col group hover:-translate-y-2 transition-transform"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-200/50 dark:text-slate-700/50 -z-0 rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-300" />
              
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-sm" />)}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 flex-grow relative z-10">"{testimonial.text}"</p>
              
              <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shadow-sm ${testimonial.color}`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white font-heading">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}