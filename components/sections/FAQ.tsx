"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { question: "Quanto tempo leva para entregar um projeto?", answer: "Depende da complexidade. Landing Pages de alta conversão costumam levar de 5 a 7 dias úteis. Sistemas Web complexos ou automações em Python (ETL) são divididos em sprints semanais, com a primeira entrega de valor (MVP) geralmente em 15 a 20 dias." },
  { question: "Você assina contrato de confidencialidade (NDA)?", answer: "Sim, com certeza. Entendo que dados e regras de negócio são o coração da sua empresa. Trabalho com total sigilo e podemos firmar um NDA antes mesmo da nossa primeira reunião de alinhamento técnico." },
  { question: "Preciso pagar alguma mensalidade de manutenção?", answer: "A escolha é sua! Você pode optar pelo modelo de 'Entrega Única', onde passo o código e a infraestrutura para o seu nome, ou pelo modelo de 'Parceria Contínua', onde cuido da hospedagem, segurança e atualizações do sistema por um valor fixo mensal." },
  { question: "Como é feita a entrega do código-fonte?", answer: "Transparência total. Todo o código desenvolvido é versionado no GitHub. Ao final do projeto (ou no modelo de entrega única), o repositório é transferido para a sua titularidade, com documentação clara para que qualquer outro desenvolvedor consiga entender no futuro." },
  { question: "Eu não entendo de tecnologia, vou conseguir usar?", answer: "Absolutamente. Minha filosofia de desenvolvimento é focar no usuário (UI/UX). Os painéis administrativos e sistemas que entrego são intuitivos e em português. Além disso, forneço um treinamento rápido (gravado ou ao vivo) ao entregar o projeto." }
];

export function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      
      {/* 🚀 GRID FINO 🚀 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">
            Dúvidas Frequentes
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Respostas diretas para as perguntas mais comuns de nossos parceiros e clientes.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              // Glassmorphism Aplicado nas Perguntas
              className="bg-white/60 dark:bg-slate-900/40 backdrop-blur-xl rounded-2xl shadow-sm border border-white/80 dark:border-slate-700/50 overflow-hidden transition-all hover:shadow-md cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <div className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-medium text-slate-800 dark:text-white text-lg pr-8 font-heading">
                  {faq.question}
                </span>
                {activeIndex === index ? (
                  <Minus className="text-primary shrink-0 w-5 h-5" />
                ) : (
                  <Plus className="text-slate-400 shrink-0 w-5 h-5" />
                )}
              </div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed border-t border-white/60 dark:border-slate-700/50 pt-4 text-sm md:text-base">
                      {faq.answer}
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