"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

// Depoimentos estratégicos focados nas suas principais competências
const testimonials = [
  {
    name: "Carlos Eduardo",
    role: "Diretor de E-commerce",
    text: "O David pegou nossa necessidade de UI/UX e transformou em uma interface incrivelmente rápida usando React. A taxa de conversão da nossa loja subiu 22% logo na primeira semana após o deploy. Código limpo e entrega no prazo.",
    rating: 5,
    initials: "CE",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
  },
  {
    name: "Mariana Silva",
    role: "Gestora de Operações",
    text: "A automação em Python (ETL) que ele desenvolveu salvou a nossa equipe. O que antes levava 15 horas de trabalho manual com planilhas, agora roda de forma 100% autônoma em poucos minutos. Um baita profissional!",
    rating: 5,
    initials: "MS",
    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  },
  {
    name: "Roberto Almeida",
    role: "Fundador de Agência",
    text: "Contratei para desenvolver as landing pages de alta conversão dos meus clientes. A performance técnica de carregamento e as pontuações de SEO (Lighthouse 100) são absurdas. Muito focado em resolver o problema de negócio.",
    rating: 5,
    initials: "RA",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-secondary/30 dark:bg-slate-900/20 border-t border-slate-100 dark:border-slate-800">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading leading-tight">
            Não acredite apenas <br className="hidden md:block" />
            <span className="text-primary">nas minhas palavras.</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Veja o que parceiros e clientes dizem sobre o impacto das soluções desenvolvidas para os seus negócios.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col hover:shadow-md transition-shadow group"
            >
              {/* Ícone de Aspas decorativo no fundo */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-100 dark:text-slate-700/50 -z-0 rotate-12 transition-transform group-hover:rotate-0 group-hover:scale-110 duration-300" />
              
              <div className="flex items-center gap-1 mb-6 relative z-10">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-8 flex-grow relative z-10">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center gap-4 relative z-10 pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${testimonial.color}`}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white font-heading">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}