"use client";

import { useState } from "react";
import { MessageSquare, X, Bot, Send, User } from "lucide-react";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";

export function WhatsAppBtn() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [urgency, setUrgency] = useState("");

  const handleServiceSelect = (selectedService: string) => {
    setService(selectedService);
    setStep(1);
  };

  const handleUrgencySelect = (selectedUrgency: string) => {
    setUrgency(selectedUrgency);
    setStep(2);
  };

  const handleSendToWhatsApp = () => {
    const message = `Olá David! Passei pelo seu assistente virtual. Tenho interesse em *${service}* e minha urgência é: *${urgency}*. Podemos conversar?`;
    const whatsappUrl = `https://wa.me/${siteConfig.business.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
    setTimeout(() => { setStep(0); setService(""); setUrgency(""); }, 1000); // Reseta após fechar
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Janela do Chatbot */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header do Chat */}
          <div className="bg-primary p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold font-heading text-lg leading-none">Assistente Virtual</p>
                <p className="text-xs text-white/80">Respondendo na hora</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Área de Mensagens */}
          <div className="p-4 h-80 overflow-y-auto bg-slate-50 dark:bg-slate-950/50 flex flex-col gap-4">
            
            {/* Mensagem 1 do Bot */}
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                Olá! Sou o assistente de automação do David. Como podemos escalar o seu projeto hoje?
              </div>
            </div>

            {/* Opções Passo 0 */}
            {step === 0 && (
              <div className="flex flex-col gap-2 pl-10">
                {["Landing Page / Site", "Automação / Bots (Python)", "Sistema Web Customizado"].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => handleServiceSelect(opt)}
                    className="text-left text-sm p-3 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Resposta do Usuário 1 */}
            {step >= 1 && (
              <div className="flex gap-2 justify-end animate-in fade-in">
                <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white shadow-sm">
                  {service}
                </div>
              </div>
            )}

            {/* Mensagem 2 do Bot */}
            {step >= 1 && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                  Excelente escolha. Sistemas bem estruturados mudam o jogo. E qual é o seu prazo / urgência?
                </div>
              </div>
            )}

            {/* Opções Passo 1 */}
            {step === 1 && (
              <div className="flex flex-col gap-2 pl-10">
                {["Para ontem! (Urgente)", "Nas próximas semanas", "Apenas pesquisando valores"].map((opt) => (
                  <button 
                    key={opt}
                    onClick={() => handleUrgencySelect(opt)}
                    className="text-left text-sm p-3 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Resposta do Usuário 2 */}
            {step >= 2 && (
              <div className="flex gap-2 justify-end animate-in fade-in">
                <div className="bg-primary p-3 rounded-2xl rounded-tr-none text-sm text-white shadow-sm">
                  {urgency}
                </div>
              </div>
            )}

            {/* Mensagem 3 do Bot (Final) */}
            {step >= 2 && (
              <div className="flex gap-2 animate-in fade-in slide-in-from-bottom-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                  Perfeito. Já anotei tudo. Vou transferir esse resumo direto para o WhatsApp do David para ele assumir o atendimento. Vamos lá?
                </div>
              </div>
            )}
          </div>

          {/* Footer (Botão de Enviar Final) */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            {step === 2 ? (
              <button 
                onClick={handleSendToWhatsApp}
                className="w-full flex justify-center items-center gap-2 bg-primary hover:bg-green-700 text-white p-3 rounded-xl font-medium transition-colors"
              >
                Falar com David <Send className="w-4 h-4" />
              </button>
            ) : (
              <div className="text-center text-xs text-slate-400">
                Selecione uma das opções acima para continuar.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botão Flutuante Principal (Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-110",
          isOpen ? "bg-slate-800 text-white" : "bg-primary text-white hover:bg-green-700"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        
        {/* Ping de Notificação (apenas quando fechado) */}
        {!isOpen && (
          <span className="absolute top-0 right-0 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-white border-2 border-primary"></span>
          </span>
        )}
      </button>
    </div>
  );
}