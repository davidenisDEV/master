// src/components/sections/Footer.tsx
import { siteConfig } from "@/config/site-config";
import { Facebook, Instagram, Linkedin, MapPin, Mail, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Marca e Descrição */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tighter">{siteConfig.business.name}</h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.business.description} Desenvolvemos ecossistemas digitais focados em performance e vendas.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Linkedin size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Facebook size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Navegação</h3>
            <ul className="space-y-3 text-sm">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-blue-400 hover:pl-2 transition-all block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white font-bold mb-6">Contato</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="shrink-0 text-blue-500 mt-1" size={18} />
                <span>{siteConfig.business.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="shrink-0 text-blue-500" size={18} />
                <span>{siteConfig.business.whatsapp}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="shrink-0 text-blue-500" size={18} />
                <span>{siteConfig.business.email}</span>
              </li>
            </ul>
          </div>

          {/* Selo de Segurança */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-green-500" /> Site Seguro
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Este site utiliza tecnologia de ponta e criptografia SSL para garantir a segurança dos seus dados.
            </p>
            <div className="text-xs font-mono text-slate-600">
              v2.5.0 Stable
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© {currentYear} {siteConfig.business.name}. Todos os direitos reservados.</p>
          <p>Desenvolvido por David Denis</p>
        </div>
      </div>
    </footer>
  );
}