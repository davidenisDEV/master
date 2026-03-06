"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Code2, Bot, Database, Zap, ArrowRight, Check, Tag, Server, CheckSquare, Square } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { siteConfig } from "@/config/site-config"; // <-- IMPORT NOVO PARA O WHATSAPP

const basePrices = { landingPage: 667, sistemaWeb: 1800, automacao: 825 };

export function PricingCalculator() {
  const { t, language } = useLanguage(); 
  
  const [service, setService] = useState<"landingPage" | "sistemaWeb" | "automacao">("landingPage");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]); 
  const [hasDatabase, setHasDatabase] = useState(false);
  const [hasHosting, setHasHosting] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  
  const [originalTotal, setOriginalTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  const serviceFeatures = {
    landingPage: [
      { id: "lp_pages", label: language === "PT" ? "Múltiplas Páginas (+3)" : "Multiple Pages (+3)", price: 300, desc: language === "PT" ? "Sobre, Serviços, Contato, etc." : "About, Services, Contact, etc." },
      { id: "lp_blog", label: language === "PT" ? "Sistema de Blog" : "Blog System", price: 262, desc: language === "PT" ? "Área para postagem de artigos." : "Area for posting articles." },
      { id: "lp_whatsapp", label: language === "PT" ? "Integração WhatsApp" : "WhatsApp Integration", price: 112, desc: language === "PT" ? "Botão flutuante ou captura de lead." : "Floating button or lead capture." },
      { id: "lp_seo", label: language === "PT" ? "Otimização SEO Pro" : "Pro SEO Optimization", price: 150, desc: language === "PT" ? "Rankeamento avançado no Google." : "Advanced Google ranking." },
    ],
    sistemaWeb: [
      { id: "sw_auth", label: language === "PT" ? "Login de Usuários" : "User Login", price: 375, desc: language === "PT" ? "Área restrita e perfis de acesso." : "Restricted area and access profiles." },
      { id: "sw_dash", label: language === "PT" ? "Painel Administrativo" : "Admin Panel", price: 600, desc: language === "PT" ? "Dashboard para gestão dos dados." : "Dashboard for data management." },
      { id: "sw_pay", label: language === "PT" ? "Pagamentos Integrados" : "Integrated Payments", price: 525, desc: language === "PT" ? "Checkout integrado (Stripe)." : "Integrated checkout (Stripe)." },
      { id: "sw_pdf", label: language === "PT" ? "Exportar Relatórios" : "Export Reports", price: 300, desc: language === "PT" ? "Geração automática de PDF." : "Automatic PDF generation." },
    ],
    automacao: [
      { id: "auto_scrape", label: language === "PT" ? "Extração de Dados" : "Data Extraction", price: 375, desc: language === "PT" ? "Web Scraping de outros sites." : "Web Scraping from other sites." },
      { id: "auto_api", label: language === "PT" ? "Integração de APIs" : "API Integration", price: 300, desc: language === "PT" ? "Conectar com CRMs ou sistemas." : "Connect with CRMs or systems." },
      { id: "auto_cron", label: language === "PT" ? "Execução em Nuvem" : "Cloud Execution", price: 225, desc: language === "PT" ? "Rodar sozinho todos os dias." : "Run daily automatically." },
      { id: "auto_ui", label: language === "PT" ? "Interface Visual" : "Visual Interface", price: 450, desc: language === "PT" ? "Painel para você controlar o robô." : "Dashboard to control the bot." },
    ]
  };

  const handleServiceChange = (newService: "landingPage" | "sistemaWeb" | "automacao") => {
    setService(newService); setSelectedFeatures([]); setHasDatabase(false);
  };

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    else setSelectedFeatures([...selectedFeatures, id]);
  };

  useEffect(() => {
    let currentTotal = basePrices[service];
    serviceFeatures[service].forEach(feature => { if (selectedFeatures.includes(feature.id)) currentTotal += feature.price; });
    if (hasDatabase && service !== "landingPage") currentTotal += 300; 
    if (hasHosting) currentTotal += 187; 
    if (isUrgent) currentTotal = currentTotal * 1.3;
    setOriginalTotal(Math.round(currentTotal)); setDiscountedTotal(Math.round(currentTotal * 0.7)); 
  }, [service, selectedFeatures, hasDatabase, hasHosting, isUrgent]);

  // 👇 NOVA LÓGICA DE WHATSAPP DINÂMICO 👇
  const handleWhatsAppRedirect = () => {
    const whatsappNumber = siteConfig.business.whatsapp.replace(/\D/g, '');
    
    const serviceNames = {
      landingPage: "Landing Page",
      sistemaWeb: "Sistema Web",
      automacao: "Automação / ETL"
    };

    // Busca os nomes reais das features selecionadas
    const featureList = selectedFeatures.map(id => {
      const feat = serviceFeatures[service].find(f => f.id === id);
      return feat ? `- ${feat.label}` : "";
    }).filter(Boolean).join('%0A');

    // Busca as opções de infraestrutura
    const infraList = [];
    if (hasDatabase && service !== "landingPage") infraList.push("- Banco de Dados (SQL)");
    if (hasHosting) infraList.push("- Setup de Hospedagem / Domínio");
    if (isUrgent) infraList.push("- Entrega Expressa (+30%)");
    const infraText = infraList.length > 0 ? `%0A*Infraestrutura:*%0A${infraList.join('%0A')}` : "";

    // Constrói a mensagem final
    const intro = language === "PT" 
      ? `Olá David! Acabei de simular um projeto no seu site e gostaria de avançar.`
      : `Hi David! I just simulated a project on your website and would like to proceed.`;

    const text = `${intro}%0A%0A` +
      `*Serviço:* ${serviceNames[service]}%0A` +
      (featureList ? `*Funcionalidades:*%0A${featureList}%0A` : "") +
      infraText +
      `%0A%0A*Estimativa Simula*: R$ ${discountedTotal.toLocaleString('pt-BR')}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      
      {/* 🚀 BACKGROUND GRIDS & GLOWS 🚀 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
      
      {/* 🚀 FORMAS GLASSMORPHISM 3D FLUTUANTES 🚀 */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-full backdrop-blur-3xl border border-white/20 shadow-[0_0_50px_rgba(76,175,80,0.15)] hidden lg:block -z-10"
      />
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-bl from-purple-500/20 to-primary/20 rounded-3xl backdrop-blur-3xl border border-white/20 shadow-[0_0_50px_rgba(76,175,80,0.15)] hidden lg:block rotate-12 -z-10"
      />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">{t?.pricing?.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t?.pricing?.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          {/* LADO ESQUERDO: CONTROLES */}
          <div className="lg:col-span-3 space-y-10 relative z-20">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">{t?.pricing?.step1}</label>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: "landingPage", label: t?.pricing?.servicesOptions?.[0] || "Landing Page", icon: <LayoutTemplate className="w-5 h-5 mb-2" /> },
                  { id: "sistemaWeb", label: t?.pricing?.servicesOptions?.[1] || "Sistema Web", icon: <Code2 className="w-5 h-5 mb-2" /> },
                  { id: "automacao", label: t?.pricing?.servicesOptions?.[2] || "Automação", icon: <Bot className="w-5 h-5 mb-2" /> },
                ].map((item) => (
                  <button key={item.id} onClick={() => handleServiceChange(item.id as any)} className={`p-4 rounded-2xl flex flex-col items-center justify-center text-center transition-all backdrop-blur-xl shadow-lg border-2 ${service === item.id ? "border-primary bg-white/90 dark:bg-primary/10 text-primary shadow-primary/10" : "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 text-slate-500 hover:border-primary/40 hover:bg-white/80 dark:hover:bg-slate-800/50"}`}>
                    {item.icon} <span className="text-sm font-medium">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 flex items-center justify-between">
                <span>{t?.pricing?.step2}</span>
                <span className="text-xs font-normal text-slate-500 dark:text-slate-400 normal-case bg-white/60 dark:bg-slate-800/60 backdrop-blur-md px-2 py-1 rounded border border-white/60 dark:border-slate-700/50">{t?.pricing?.step2Badge}</span>
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {serviceFeatures[service].map((feature) => {
                  const isSelected = selectedFeatures.includes(feature.id);
                  return (
                    <div key={feature.id} onClick={() => toggleFeature(feature.id)} className={`p-4 rounded-2xl cursor-pointer transition-all flex flex-col gap-1 backdrop-blur-xl shadow-sm border ${isSelected ? "border-primary bg-white/90 dark:bg-primary/10 shadow-primary/5" : "border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50"}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {isSelected ? <CheckSquare className="w-4 h-4 text-primary shrink-0" /> : <Square className="w-4 h-4 text-slate-400 shrink-0" />}
                          <span className={`font-medium text-sm ${isSelected ? "text-primary" : "text-slate-700 dark:text-slate-300"}`}>{feature.label}</span>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 ml-6">{feature.desc}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">{t?.pricing?.step3}</label>
              <div className="space-y-3">
                {service !== "landingPage" && (
                  <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${hasDatabase ? 'bg-primary/20 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}><Database className="w-5 h-5" /></div>
                      <div>
                        <p className="font-medium text-slate-800 dark:text-white">{t?.pricing?.infra?.[0]?.title || "Banco de Dados"}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{t?.pricing?.infra?.[0]?.desc}</p>
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
                    <div className={`p-2 rounded-lg ${hasHosting ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}><Server className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{t?.pricing?.infra?.[1]?.title || "Hospedagem"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t?.pricing?.infra?.[1]?.desc}</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${hasHosting ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${hasHosting ? 'left-6' : 'left-1'}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={hasHosting} onChange={() => setHasHosting(!hasHosting)} />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isUrgent ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}><Zap className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{t?.pricing?.infra?.[2]?.title || "Urgência"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t?.pricing?.infra?.[2]?.desc}</p>
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

          {/* LADO DIREITO: CARD DE RESULTADO (STICKY) */}
          <div className="lg:col-span-2 relative z-20">
            <div className="sticky top-32 bg-slate-900/95 dark:bg-[#0b102d]/80 backdrop-blur-2xl text-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 dark:border-white/10">
              
              {/* Brilho interno do card */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/30 blur-[80px] rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>

              <div className="inline-flex items-center gap-1.5 bg-primary/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 border border-primary/30 relative z-10">
                <Tag className="w-3.5 h-3.5" /> {t?.pricing?.result?.badge}
              </div>
              
              <div className="flex flex-col mb-8 relative z-10">
                <div className="text-slate-300 text-sm font-medium mb-1">
                  {t?.pricing?.result?.from} <span className="line-through decoration-red-500/80 decoration-2">R$ {originalTotal.toLocaleString('pt-BR')}</span> {t?.pricing?.result?.to}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-2xl text-primary font-bold pb-1">R$</span>
                  <motion.span key={discountedTotal} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-6xl font-bold font-heading text-white tracking-tight drop-shadow-md">
                    {discountedTotal.toLocaleString('pt-BR')}
                  </motion.span>
                </div>
              </div>

              <ul className="space-y-4 mb-8 relative z-10">
                {t?.pricing?.result?.benefits?.map((benefit: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                    <Check className="w-5 h-5 text-primary shrink-0 drop-shadow-[0_0_5px_rgba(76,175,80,0.5)]" /> {benefit}
                  </li>
                ))}
              </ul>

              {/* 👇 BOTÃO COM A FUNÇÃO DE WHATSAPP 👇 */}
              <button 
                onClick={handleWhatsAppRedirect} 
                className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-green-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(76,175,80,0.4)] relative z-10 hover:scale-105"
              >
                {t?.pricing?.result?.btn || "Garantir esse valor"} <ArrowRight className="w-5 h-5" />
              </button>
              
              <p className="text-xs text-slate-400 mt-4 text-center leading-relaxed relative z-10">
                {t?.pricing?.result?.disclaimer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}