// src/app/obrigado/page.tsx
import Link from "next/link";
import { CheckCircle, MessageCircle, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/config/site-config";

export default function ThankYou() {
  const whatsappUrl = `https://wa.me/${siteConfig.business.whatsapp}?text=Olá! Acabei de preencher o formulário no site e gostaria de agilizar meu atendimento.`;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-6 text-center">
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-2xl shadow-xl max-w-lg border border-slate-200 dark:border-slate-700 animate-in zoom-in-95 duration-500">
        
        <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Solicitação Recebida!</h1>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          Obrigado pelo interesse. Nossos consultores já receberam seus dados e entrarão em contato em breve.
        </p>

        <div className="space-y-4">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition-transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Falar agora no WhatsApp
          </a>
          
          <Link 
            href="/"
            className="block text-sm text-slate-500 hover:text-blue-600 underline"
          >
            <span className="flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Voltar para o início
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}