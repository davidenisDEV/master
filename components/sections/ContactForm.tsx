"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowRight, ArrowLeft, Code2, Bot, LayoutTemplate, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

// Schema de Validação Atualizado (Agora com LGPD)
const formSchema = z.object({
  service: z.string().min(1, { message: "Selecione um serviço para continuar." }),
  name: z.string().min(2, { message: "Seu nome é importante para nós." }),
  phone: z.string().min(10, { message: "Digite um WhatsApp válido." }),
  email: z.string().email({ message: "Precisamos de um e-mail válido." }),
  lgpd: z.boolean().refine(val => val === true, {
    message: "Você precisa autorizar o uso dos dados para contato.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { register, handleSubmit, trigger, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { service: "", lgpd: false }
  });

  const selectedService = watch("service");
  const userName = watch("name");

  const nextStep = async () => {
    let isStepValid = false;
    if (step === 1) isStepValid = await trigger("service");
    if (step === 2) isStepValid = await trigger(["name", "phone"]);
    
    if (isStepValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  // FUNÇÃO CORRIGIDA (Sem duplicidades)
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // 🚀 Salvando no Supabase de forma elegante 🚀
      const { error } = await supabase
        .from('leads') // Nome exato da sua tabela no Supabase
        .insert([
          { 
            nome: data.name, 
            whatsapp: data.phone, 
            email: data.email, 
            servico: data.service,
            origem: 'Portfólio'
          }
        ]);

      if (error) {
        console.error("Erro no Supabase:", error);
        throw error;
      }

      console.log("Lead salvo com sucesso!");
      
      // Delay artificial apenas para a animação do botão ficar suave
      await new Promise(resolve => setTimeout(resolve, 800)); 
      
      setStep(4); // Avança para o Calendly
      
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      // Aqui você poderia colocar um toast/alerta de erro para o usuário
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">
            Vamos iniciar seu projeto?
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Responda rápido para eu entender como posso te ajudar.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden relative min-h-[400px]">
          
          {step < 4 && (
            <div className="absolute top-0 left-0 h-1 bg-slate-100 dark:bg-slate-700 w-full z-10">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: "33%" }}
                animate={{ width: `${(step / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 flex flex-col h-full justify-between mt-2">
            <AnimatePresence mode="wait">
              
              {/* PASSO 1: Serviço */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-6">1. Qual é o foco principal do projeto?</h3>
                  <div className="grid gap-4">
                    {[
                      { id: "landing-page", title: "Landing Page / Site", icon: <LayoutTemplate className="w-6 h-6" /> },
                      { id: "sistema", title: "Sistema Web (React/Node)", icon: <Code2 className="w-6 h-6" /> },
                      { id: "automacao", title: "Automação / Dados (Python)", icon: <Bot className="w-6 h-6" /> },
                    ].map((svc) => (
                      <div 
                        key={svc.id}
                        onClick={() => setValue("service", svc.id, { shouldValidate: true })}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex items-center gap-4 transition-all ${
                          selectedService === svc.id ? "border-primary bg-green-50 dark:bg-green-900/20 text-primary" : "border-slate-200 dark:border-slate-700 hover:border-primary/50 text-slate-600 dark:text-slate-300"
                        }`}
                      >
                        <div className={`${selectedService === svc.id ? "text-primary" : "text-slate-400"}`}>{svc.icon}</div>
                        <span className="font-medium">{svc.title}</span>
                      </div>
                    ))}
                  </div>
                  {errors.service && <p className="text-red-500 text-sm mt-2">{errors.service.message}</p>}
                </motion.div>
              )}

              {/* PASSO 2: Dados Pessoais */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-6">2. Como posso te chamar?</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Seu Nome</label>
                      <input {...register("name")} className="w-full mt-1 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="Ex: João Silva" autoFocus />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600 dark:text-slate-300">WhatsApp / Telefone</label>
                      <input {...register("phone")} className="w-full mt-1 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="(00) 90000-0000" />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PASSO 3: Finalização + LGPD */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-6">3. Quase lá! Qual seu melhor e-mail?</h3>
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">E-mail Corporativo ou Pessoal</label>
                    <input {...register("email")} className="w-full mt-1 p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="seu@email.com" autoFocus />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  
                  {/* CHECKBOX LGPD */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-100 dark:border-slate-800 mt-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input 
                          type="checkbox" 
                          {...register("lgpd")}
                          className="w-4 h-4 border border-slate-300 rounded bg-slate-50 focus:ring-3 focus:ring-primary dark:bg-slate-700 dark:border-slate-600 dark:focus:ring-primary dark:ring-offset-slate-800 accent-primary" 
                        />
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 leading-tight">
                        Concordo em compartilhar meus dados para que o contato seja feito sobre este projeto.
                      </div>
                    </label>
                    {errors.lgpd && <p className="text-red-500 text-xs mt-2 ml-7">{errors.lgpd.message}</p>}
                  </div>
                </motion.div>
              )}

              {/* PASSO 4: CALENDLY (Mantido igual) */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center w-full">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mt-2">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-heading mb-2">Tudo certo, {userName ? userName.split(' ')[0] : 'lá'}!</h3>
                  <p className="text-slate-500 dark:text-slate-400 mb-8">Recebi seus dados. Escolha abaixo o melhor dia e horário na minha agenda para nossa videochamada (15 a 30 min).</p>
                  <div className="w-full h-[450px] md:h-[550px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white">
                    <iframe src="https://calendly.com/davidoliveiradev/30min?hide_event_type_details=1&hide_gdpr_banner=1" width="100%" height="100%" frameBorder="0"></iframe>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                {step > 1 ? <button type="button" onClick={prevStep} className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1 font-medium"><ArrowLeft className="w-4 h-4" /> Voltar</button> : <div></div>}
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="bg-primary hover:bg-green-700 text-white px-6 py-3 rounded-[4px] font-medium transition-colors flex items-center gap-2">Próximo <ArrowRight className="w-4 h-4" /></button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-green-700 text-white px-8 py-3 rounded-[4px] font-medium transition-colors flex items-center gap-2 disabled:opacity-70">
                    {isSubmitting ? <><Loader2 className="animate-spin w-4 h-4" /> Salvando...</> : "Finalizar e Agendar"}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}