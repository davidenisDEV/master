"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutTemplate, Code2, Bot, Database, Zap, ArrowRight, Check, Tag, Server, CheckSquare, Square, Network, LineChart, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/components/contexts/LanguageContext";
import { siteConfig } from "@/config/site-config"; 

// Preços base flexíveis: Low-ticket para entrada (LP), High-ticket para engenharia pesada.
const basePrices = { landingPage: 667, automacao: 850, apis: 1500, dados: 2000 };

export function PricingCalculator() {
  const { t, language } = useLanguage(); 
  
  const [service, setService] = useState<"landingPage" | "automacao" | "apis" | "dados">("landingPage");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]); 
  
  // Opções de infraestrutura
  const [hasDatabase, setHasDatabase] = useState(false);
  const [hasCloudSetup, setHasCloudSetup] = useState(false);
  const [hasArchitectureConsulting, setHasArchitectureConsulting] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  
  const [originalTotal, setOriginalTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(0);

  const serviceFeatures = {
    landingPage: [
      { id: "lp_seo", label: language === "PT" ? "Otimização SEO Pro" : "Pro SEO Optimization", price: 150, desc: language === "PT" ? "Rankeamento avançado no Google." : "Advanced Google ranking." },
      { id: "lp_cyber", label: language === "PT" ? "Análise de Cibersegurança" : "Cybersecurity Analysis", price: 200, desc: language === "PT" ? "Proteção contra ataques DDoS e bots." : "DDoS and bot protection." },
      { id: "lp_deploy", label: language === "PT" ? "Deploy (Hospedagem)" : "Deployment", price: 150, desc: language === "PT" ? "Configuração completa no servidor." : "Full server configuration." },
      { id: "lp_sla", label: language === "PT" ? "SLA de Suporte" : "Support SLA", price: 250, desc: language === "PT" ? "Manutenção prioritária mensal." : "Monthly priority maintenance." },
    ],
    automacao: [
      { id: "auto_rabbit", label: language === "PT" ? "Filas com RabbitMQ" : "RabbitMQ Queues", price: 400, desc: language === "PT" ? "Processamento assíncrono e resiliência." : "Async processing and resilience." },
      { id: "auto_deploy", label: language === "PT" ? "Deploy em Nuvem" : "Cloud Deployment", price: 200, desc: language === "PT" ? "Robô rodando 24/7 sem sua máquina." : "Bot running 24/7 in the cloud." },
      { id: "auto_sla", label: language === "PT" ? "SLA de Suporte Mensal" : "Monthly SLA", price: 350, desc: language === "PT" ? "Ajuste rápido caso o site alvo mude." : "Quick fix if target website changes." },
      { id: "auto_cyber", label: language === "PT" ? "Proxy & Anti-Block" : "Proxy & Anti-Block", price: 250, desc: language === "PT" ? "Evita bloqueios durante o scraping." : "Avoids blocks during scraping." },
    ],
    apis: [
      { id: "api_rabbit", label: language === "PT" ? "Microsserviço (RabbitMQ)" : "Microservices (RabbitMQ)", price: 800, desc: language === "PT" ? "Arquitetura orientada a eventos." : "Event-driven architecture." },
      { id: "api_cyber", label: language === "PT" ? "Análise de Vulnerabilidades" : "Vulnerability Scan", price: 600, desc: language === "PT" ? "Pentest básico e sanitização de dados." : "Basic pentest and data sanitization." },
      { id: "api_deploy", label: language === "PT" ? "Deploy em Containers" : "Container Deployment", price: 400, desc: language === "PT" ? "Dockerização para fácil escalabilidade." : "Dockerization for easy scaling." },
      { id: "api_sla", label: language === "PT" ? "SLA de Suporte Crítico" : "Critical Support SLA", price: 800, desc: language === "PT" ? "Disponibilidade e monitoramento 24/7." : "24/7 availability and monitoring." },
    ],
    dados: [
      { id: "data_bi", label: language === "PT" ? "Painel de BI (Streamlit)" : "BI Dashboard (Streamlit)", price: 700, desc: language === "PT" ? "Visualização de dados interativa." : "Interactive data visualization." },
      { id: "data_rabbit", label: language === "PT" ? "Ingestão via RabbitMQ" : "RabbitMQ Ingestion", price: 500, desc: language === "PT" ? "Fila para alto volume de dados." : "Queue for high data volume." },
      { id: "data_deploy", label: language === "PT" ? "Deploy do Pipeline" : "Pipeline Deployment", price: 300, desc: language === "PT" ? "Automação na nuvem (AWS/GCP)." : "Cloud automation (AWS/GCP)." },
      { id: "data_sla", label: language === "PT" ? "Monitoramento & SLA" : "Monitoring & SLA", price: 450, desc: language === "PT" ? "Garantia de integridade dos dados." : "Data integrity guarantee." },
    ]
  };

  const handleServiceChange = (newService: "landingPage" | "automacao" | "apis" | "dados") => {
    setService(newService); setSelectedFeatures([]); 
    setHasDatabase(false); setHasCloudSetup(false); setHasArchitectureConsulting(false);
  };

  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    else setSelectedFeatures([...selectedFeatures, id]);
  };

  useEffect(() => {
    let currentTotal = basePrices[service];
    
    // Soma os add-ons selecionados
    serviceFeatures[service].forEach(feature => { 
      if (selectedFeatures.includes(feature.id)) currentTotal += feature.price; 
    });
    
    // Soma infraestrutura
    if (hasDatabase && service !== "landingPage") currentTotal += 350; 
    if (hasCloudSetup) currentTotal += 400; 
    if (hasArchitectureConsulting) currentTotal += 600;
    if (isUrgent) currentTotal = currentTotal * 1.3;
    
    setOriginalTotal(Math.round(currentTotal)); setDiscountedTotal(Math.round(currentTotal * 0.7)); 
  }, [service, selectedFeatures, hasDatabase, hasCloudSetup, hasArchitectureConsulting, isUrgent]);

  const handleWhatsAppRedirect = () => {
    const whatsappNumber = siteConfig.business.whatsapp.replace(/\D/g, '');
    
    const serviceNames = {
      landingPage: "Landing Page",
      automacao: "Automação",
      apis: "APIs & Microsserviços",
      dados: "Engenharia de Dados (ETL)"
    };

    const featureList = selectedFeatures.map(id => {
      const feat = serviceFeatures[service].find(f => f.id === id);
      return feat ? `- ${feat.label}` : "";
    }).filter(Boolean).join('%0A');

    const infraList = [];
    if (hasDatabase && service !== "landingPage") infraList.push("- Banco de Dados (SQL/NoSQL)");
    if (hasCloudSetup) infraList.push("- Setup Cloud (AWS/GCP)");
    if (hasArchitectureConsulting) infraList.push("- Consultoria de Arquitetura");
    if (isUrgent) infraList.push("- Entrega Expressa (+30%)");
    const infraText = infraList.length > 0 ? `%0A*Extras de Engenharia:*%0A${infraList.join('%0A')}` : "";

    const intro = language === "PT" 
      ? `Olá David! Realizei uma simulação de engenharia no seu site e gostaria de agendar uma reunião de alinhamento.`
      : `Hi David! I simulated an engineering project on your site and would like to schedule an alignment meeting.`;

    const text = `${intro}%0A%0A` +
      `*Serviço Escolhido:* ${serviceNames[service]}%0A` +
      (featureList ? `*Módulos:*%0A${featureList}%0A` : "") +
      infraText +
      `%0A%0A*Estimativa Base*: R$ ${discountedTotal.toLocaleString('pt-BR')}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
      
      <motion.div animate={{ y: [-20, 20, -20], rotate: [0, 15, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-tr from-primary/30 to-blue-500/30 rounded-full backdrop-blur-3xl border border-white/20 shadow-[0_0_50px_rgba(76,175,80,0.15)] hidden lg:block -z-10" />
      <motion.div animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-bl from-purple-500/20 to-primary/20 rounded-3xl backdrop-blur-3xl border border-white/20 shadow-[0_0_50px_rgba(76,175,80,0.15)] hidden lg:block rotate-12 -z-10" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">{t?.pricing?.title}</h2>
          <p className="text-slate-500 dark:text-slate-400">{t?.pricing?.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          
          <div className="lg:col-span-3 space-y-10 relative z-20">
            <div>
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-4 block">{t?.pricing?.step1}</label>
              
              {/* Ajustado para 4 colunas em telas maiores */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { id: "landingPage", label: t?.pricing?.servicesOptions?.[0] || "Landing Page", icon: <LayoutTemplate className="w-5 h-5 mb-2" /> },
                  { id: "automacao", label: t?.pricing?.servicesOptions?.[1] || "Automação", icon: <Bot className="w-5 h-5 mb-2" /> },
                  { id: "apis", label: t?.pricing?.servicesOptions?.[2] || "APIs & Micro.", icon: <Network className="w-5 h-5 mb-2" /> },
                  { id: "dados", label: t?.pricing?.servicesOptions?.[3] || "Dados (ETL)", icon: <LineChart className="w-5 h-5 mb-2" /> },
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
                    <div className={`p-2 rounded-lg ${hasCloudSetup ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}><Server className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{t?.pricing?.infra?.[1]?.title || "Setup Cloud"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t?.pricing?.infra?.[1]?.desc}</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${hasCloudSetup ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${hasCloudSetup ? 'left-6' : 'left-1'}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={hasCloudSetup} onChange={() => setHasCloudSetup(!hasCloudSetup)} />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${hasArchitectureConsulting ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}><Code2 className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{t?.pricing?.infra?.[2]?.title || "Consultoria de Arquitetura"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t?.pricing?.infra?.[2]?.desc}</p>
                    </div>
                  </div>
                  <div className={`w-11 h-6 rounded-full transition-colors relative ${hasArchitectureConsulting ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-700'}`}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${hasArchitectureConsulting ? 'left-6' : 'left-1'}`}></div>
                  </div>
                  <input type="checkbox" className="hidden" checked={hasArchitectureConsulting} onChange={() => setHasArchitectureConsulting(!hasArchitectureConsulting)} />
                </label>

                <label className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-colors backdrop-blur-xl shadow-sm border border-white/80 dark:border-slate-700/50 bg-white/60 dark:bg-slate-900/40 hover:bg-white/80 dark:hover:bg-slate-800/50">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isUrgent ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}><Zap className="w-5 h-5" /></div>
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white">{t?.pricing?.infra?.[3]?.title || "Urgência"}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t?.pricing?.infra?.[3]?.desc}</p>
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

          <div className="lg:col-span-2 relative z-20">
            <div className="sticky top-32 bg-slate-900/95 dark:bg-[#0b102d]/80 backdrop-blur-2xl text-white p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/20 dark:border-white/10">
              
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

              <button 
                onClick={handleWhatsAppRedirect} 
                className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-green-500 text-white px-6 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(76,175,80,0.4)] relative z-10 hover:scale-105"
              >
                {t?.pricing?.result?.btn || "Agendar Reunião"} <ArrowRight className="w-5 h-5" />
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