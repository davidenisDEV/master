"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ArrowRight, ArrowLeft, Code2, Bot, LayoutTemplate, CheckCircle2, MessageCircle, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { siteConfig } from "@/config/site-config"; 
import { useLanguage } from "@/components/contexts/LanguageContext"; 

export function ContactForm() {
  const { t, language } = useLanguage(); 

 
  const formSchema = z.object({
    service: z.string().min(1, { message: language === "PT" ? "Selecione um serviço." : "Select a service." }),
    name: z.string().min(2, { message: language === "PT" ? "Seu nome é importante." : "Your name is important." }),
    phone: z.string().min(10, { message: language === "PT" ? "Digite um WhatsApp válido." : "Enter a valid phone number." }),
    email: z.string().email({ message: language === "PT" ? "E-mail inválido." : "Invalid e-mail." }),
    lgpd: z.boolean().refine(val => val === true, { message: language === "PT" ? "Aceite os termos." : "Accept the terms." }),
  });

  type FormData = z.infer<typeof formSchema>;

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  
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

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setIsDuplicate(false); 
    
    try {
      const { error } = await supabase.from('leads').insert([
        { nome: data.name, whatsapp: data.phone, email: data.email, servico: data.service, origem: 'Portfólio' }
      ]);
      
      if (error) {
        if (error.code === '23505') {
          setIsDuplicate(true); 
        } else {
          throw error; 
        }
      }

      await new Promise(resolve => setTimeout(resolve, 800)); 
      setStep(4); 
    } catch (error) {
      console.error("Erro ao salvar lead:", error);
      alert(language === "PT" ? "Erro de conexão. Me chame no WhatsApp." : "Connection error. Contact me on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppConfirm = () => {
    const whatsappNumber = siteConfig.business.whatsapp.replace(/\D/g, '');
    
    // Tradução dinâmica do serviço escolhido
    const serviceName = selectedService === "landing-page" 
      ? t.contact.step1.opt1 
      : selectedService === "sistema" 
        ? t.contact.step1.opt2 
        : t.contact.step1.opt3;
    
    // Tradução da mensagem que chegará no seu WhatsApp
    const msgPT = isDuplicate
      ? `Olá David! Passei pelo seu portfólio novamente. Gostaria de acelerar e conversar sobre o projeto de ${serviceName}!`
      : `Olá David! Acabei de enviar meus dados no seu portfólio. Meu nome é ${userName} e tenho interesse no serviço de ${serviceName}.`;
      
    const msgEN = isDuplicate
      ? `Hi David! I visited your portfolio again. I'd like to speed things up and talk about the ${serviceName} project!`
      : `Hi David! I just submitted my details on your portfolio. My name is ${userName} and I'm interested in the ${serviceName} service.`;

    const finalMsg = language === "PT" ? msgPT : msgEN;
      
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(finalMsg)}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50/80 dark:bg-slate-950/80 border-t border-slate-200/50 dark:border-slate-800/50 z-0">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none -z-10"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 dark:bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="container mx-auto px-6 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-800 dark:text-white font-heading">
            {t.contact.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/50 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 dark:border-slate-700/50 overflow-hidden relative min-h-[400px]">
          
          {step < 4 && (
            <div className="absolute top-0 left-0 h-1 bg-white/40 dark:bg-slate-800 w-full z-10">
              <motion.div className="h-full bg-primary shadow-[0_0_10px_rgba(76,175,80,0.5)]" initial={{ width: "33%" }} animate={{ width: `${(step / 3) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 md:p-12 flex flex-col h-full justify-between mt-2">
            <AnimatePresence mode="wait">
              
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-6">{t.contact.step1.title}</h3>
                  <div className="grid gap-4">
                    {[
                      { id: "landing-page", title: t.contact.step1.opt1, icon: <LayoutTemplate className="w-6 h-6" /> },
                      { id: "sistema", title: t.contact.step1.opt2, icon: <Code2 className="w-6 h-6" /> },
                      { id: "automacao", title: t.contact.step1.opt3, icon: <Bot className="w-6 h-6" /> },
                    ].map((svc) => (
                      <div 
                        key={svc.id} onClick={() => setValue("service", svc.id, { shouldValidate: true })}
                        className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-4 transition-all backdrop-blur-md ${
                          selectedService === svc.id ? "border-primary bg-white/90 dark:bg-primary/20 text-primary shadow-md" : "border-white/80 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 hover:border-primary/50 text-slate-600 dark:text-slate-300"
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

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-6">{t.contact.step2.title}</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.contact.step2.nameLabel}</label>
                      <input {...register("name")} className="w-full mt-1 p-4 rounded-xl border border-white/80 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition shadow-sm" placeholder={t.contact.step2.namePlaceholder} autoFocus />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.contact.step2.phoneLabel}</label>
                      <input {...register("phone")} className="w-full mt-1 p-4 rounded-xl border border-white/80 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition shadow-sm" placeholder="(00) 90000-0000" />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <h3 className="text-xl font-medium text-slate-800 dark:text-white mb-6">{t.contact.step3.title}</h3>
                  <div>
                    <label className="text-sm font-medium text-slate-600 dark:text-slate-300">{t.contact.step3.emailLabel}</label>
                    <input {...register("email")} className="w-full mt-1 p-4 rounded-xl border border-white/80 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md outline-none focus:border-primary focus:ring-1 focus:ring-primary transition shadow-sm" placeholder="seu@email.com" autoFocus />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-xl border border-white/80 dark:border-slate-700/50 mt-6 shadow-sm">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div className="flex items-center h-5">
                        <input type="checkbox" {...register("lgpd")} className="w-4 h-4 border border-slate-300 rounded accent-primary" />
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 leading-tight">{t.contact.step3.lgpd}</div>
                    </label>
                    {errors.lgpd && <p className="text-red-500 text-xs mt-2 ml-7">{errors.lgpd.message}</p>}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center w-full">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mt-2 shadow-[0_0_15px_rgba(76,175,80,0.3)]">
                    {isDuplicate ? <UserCheck className="w-8 h-8 text-primary" /> : <CheckCircle2 className="w-8 h-8 text-primary" />}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-heading mb-2">
                    {isDuplicate ? `${t.contact.step4.titleReturning}, ${userName ? userName.split(' ')[0] : ''}!` : `${t.contact.step4.titleNew}, ${userName ? userName.split(' ')[0] : ''}!`}
                  </h3>
                  
                  <p className="text-slate-500 dark:text-slate-300 mb-6 px-4">
                    {isDuplicate ? t.contact.step4.descReturning : t.contact.step4.descNew}
                  </p>
                  
                  {!isDuplicate && (
                    <div className="w-full h-[400px] md:h-[450px] rounded-xl overflow-hidden border border-white/80 dark:border-slate-700/50 bg-white mb-6 shadow-inner">
                      <iframe src="https://calendly.com/davidoliveiradev/30min?hide_event_type_details=1&hide_gdpr_banner=1" width="100%" height="100%" frameBorder="0"></iframe>
                    </div>
                  )}

                  <button 
                    type="button"
                    onClick={handleWhatsAppConfirm}
                    className={`w-full flex justify-center items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:scale-105 ${isDuplicate ? 'text-lg px-10 max-w-sm mx-auto' : 'sm:w-auto px-8'}`}
                  >
                    <MessageCircle className="w-5 h-5 fill-white" /> 
                    {isDuplicate ? t.contact.step4.btnReturning : t.contact.step4.btnNew}
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

            {step < 4 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/40 dark:border-slate-700/50">
                {step > 1 ? <button type="button" onClick={prevStep} className="text-slate-500 hover:text-primary transition-colors flex items-center gap-1 font-medium"><ArrowLeft className="w-4 h-4" /> {t.contact.buttons.back}</button> : <div></div>}
                {step < 3 ? (
                  <button type="button" onClick={nextStep} className="bg-primary hover:bg-green-600 text-white px-6 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-md">{t.contact.buttons.next} <ArrowRight className="w-4 h-4" /></button>
                ) : (
                  <button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-green-600 text-white px-8 py-3 rounded-xl font-bold transition-colors flex items-center gap-2 shadow-md">
                    {isSubmitting ? <><Loader2 className="animate-spin w-4 h-4" /> {t.contact.buttons.saving}</> : t.contact.buttons.submit}
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