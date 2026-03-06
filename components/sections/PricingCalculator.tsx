"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Code2, Bot, Database, Zap, ArrowRight, Check, Tag, Server, CheckSquare, Square } from "lucide-react";
import Link from "next/link";

const basePrices = {
  landingPage: 667, 
  sistemaWeb: 1800, 
  automacao: 825,   
};

const serviceFeatures = {
  landingPage: [
    { id: "lp_pages", label: "Múltiplas Páginas (+3)", price: 300, desc: "Sobre, Serviços, Contato, etc." },
    { id: "lp_blog", label: "Sistema de Blog", price: 262, desc: "Área para postagem de artigos." },
    { id: "lp_whatsapp", label: "Integração WhatsApp", price: 112, desc: "Botão flutuante ou captura de lead." },
    { id: "lp_seo", label: "Otimização SEO Pro", price: 150, desc: "Rankeamento avançado no Google." },
  ],
  sistemaWeb: [
    { id: "sw_auth", label: "Login de Usuários", price: 375, desc: "Área restrita e perfis de acesso." },
    { id: "sw_dash", label: "Painel Administrativo", price: 600, desc: "Dashboard para gestão dos dados." },
    { id: "sw_pay", label: "Pagamentos (Pix/Cartão)", price: 525, desc: "Checkout integrado (Stripe/Mercado Pago)." },
    { id: "sw_pdf", label: "Exportar Relatórios", price: 300, desc: "Geração automática de PDF ou Excel." },
  ],
  automacao: [
    { id: "auto_scrape", label: "Extração de Dados", price: 375, desc: "Web Scraping de outros sites." },
    { id: "auto_api", label: "Integração de APIs", price: 300, desc: "Conectar com CRMs ou sistemas de terceiros." },
    { id: "auto_cron", label: "Execução em Nuvem", price: 225, desc: "Rodar sozinho todos os dias (CRON)." },
    { id: "auto_ui", label: "Interface Visual", price: 450, desc: "Painel para você controlar o robô." },
  ]
};

export function PricingCalculator() {
  const [service, setService] = useState<"landingPage" | "sistemaWeb" | "automacao">("landingPage");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]); 
  const [hasDatabase, setHasDatabase] = useState(false);
  const [hasHosting, setHasHosting] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  
  const [originalTotal, setOriginalTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  const handleServiceChange = (newService: "landingPage" | "sistemaWeb" | "automacao") => {
    setService(newService);
    setSelectedFeatures([]);
    setHasDatabase(false);
  };

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  useEffect(() => {
    let currentTotal = basePrices[service];
    serviceFeatures[service].forEach(feature => {
      if (selectedFeatures.includes(feature.id)) {
        currentTotal += feature.price;
      }
    });
    if (hasDatabase && service !== "landingPage") currentTotal += 300; 
    if (hasHosting) currentTotal += 187; 
    if (isUrgent) currentTotal = currentTotal * 1.3;

    setOriginalTotal(Math.round(currentTotal));
    setDiscountedTotal(Math.round(currentTotal * 0.7)); 
  }, [service, selectedFeatures, hasDatabase, hasHosting, isUrgent]);

  return (
    <section className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      
      {/* 🚀 BOLHAS GIGANTES 🚀 */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-primary/20 dark:bg-primary/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-blue-500/20 dark:bg-blue-500/10 blur-[100px] md:blur-[150px] rounded-full pointer-events-none -z-10"></div>

      {/* 🚀 GRID FINO ADAPTÁVEL 🚀 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">
            Simule seu Investimento
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Monte seu projeto sob medida. Marque as funções necessárias e veja a estimativa em tempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          <div className="lg:col-span-3 space-y-10">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">1. O que vamos construir?</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: "landingPage", label: "Landing Page", icon: <LayoutTemplate className="w-5 h-5 mb-2" /> },
                  { id: "sistemaWeb", label: "Sistema Web", icon: <Code2 className="w-5 h-5 mb-2" /> },
                  { id: "automacao", label: "Automação (ETL)", icon: <Bot className="w-5 h-5 mb-2" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleServiceChange(item.id as any)}
                    className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all backdrop-blur-xl shadow-lg border-2 ${
                      service === item.id 
                      ? "border-primary bg-white/90 dark:bg-primary/10 text-primary shadow-primary/10" 
                      : "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 text-slate-500 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-slate-800/50"
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>2. Funcionalidades do Projeto</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400 normal-case bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-2 py-1 rounded border border-white/60 dark:border-slate-700/50">Selecione o que precisar</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {serviceFeatures[service].map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <div 
                      key={feature.id}
                      onClick={() => toggleFeature(feature.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 backdrop-blur-xl shadow-sm border ${
                        isSelected 
                        ? "border-primary bg-white/90 dark:bg-primary/10 shadow-primary/5" 
                        : "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-primary shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                          <span className={`font-medium text-sm ${isSelected ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>
                            {feature.label}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-6">{feature.desc}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">3. Infraestrutura & Prazo</label>
              <div className="space-y-3">
                {service !== "landingPage" && (
                  <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${hasDatabase ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                        <Database className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">Banco de Dados (SQL)</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Armazenamento estruturado de informações.</p>
                      </div>
                    </div>
                    <div className={`w-11 h-6 rounded-full transition-colors relative ${hasDatabase ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-700'}`}>
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${hasDatabase ? 'left-6' : 'left-1'}`}></div>
                    </div>
                    <input type="checkbox" className="hidden" checked={hasDatabase} onChange={() => setHasDatabase(!hasDatabase)} />
                  </label>
                )}

                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${hasHosting ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                      <Server className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">Setup de Hospedagem / Domínio</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Eu configuro o servidor e o endereço para você.</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${hasHosting ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${hasHosting ? 'left-6' : 'left-1'}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={hasHosting} onChange={() => setHasHosting(!hasHosting)} />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isUrgent ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">Entrega Expressa</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Prioridade máxima de desenvolvimento (+30%).</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${isUrgent ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isUrgent ? 'left-6' : 'left-1'}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={isUrgent} onChange={() => setIsUrgent(!isUrgent)} />
                </label>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 relative">
            <div className="sticky top-32 bg-slate-900/95 dark:bg-[#0b102d]/80 backdrop-blur-2xl text-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 dark:border-white/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/30 blur-[80px] rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>

              <div className="inline-flex items-center gap-1.5 bg-primary/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-primary/30 relative z-10">
                <Tag className="w-3.5 h-3.5" /> Condição Primeira Parceria (-30%)
              </div>
              
              <div className="flex flex-col mb-8 relative z-10">
                <div className="text-slate-300 text-sm font-medium mb-1">
                  De <span className="line-through decoration-red-500/80 decoration-2">R$ {originalTotal.toLocaleString('pt-BR')}</span> por:
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl text-primary font-bold pb-1">R$</span>
                  <motion.span key={discountedTotal} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold font-heading text-white tracking-tight drop-shadow-md">
                    {discountedTotal.toLocaleString('pt-BR')}
                  </motion.span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 relative z-10">
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(76,175,80,0.5)]" /> Código fonte 100% seu.
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(76,175,80,0.5)]" /> Design responsivo e otimizado.
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-200">
                  <Check className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(76,175,80,0.5)]" /> Suporte gratuito por 30 dias.
                </li>
              </ul>

              <Link href="#contact" className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-green-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(76,175,80,0.4)] relative z-10 hover:scale-105">
                Garantir esse valor <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed relative z-10">
                * Válido apenas para os primeiros clientes do mês. O orçamento exato será confirmado em nossa call.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}