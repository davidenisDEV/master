
"use client";

import { siteConfig } from "@/config/site-config";
import Link from "next/link"; 


type ClientLogo = {
  name: string;
  logo: string;
  url?: string;
};

export function Clients() {
  
  const baseClients: ClientLogo[] = siteConfig?.clients || [];
  
  
  const marqueeLogos = [...baseClients, ...baseClients, ...baseClients, ...baseClients];

  if (baseClients.length === 0) return null;

  return (
    <section className="py-6 md:py-10 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-200/50 dark:border-slate-800/50 overflow-hidden relative z-10">
      <div className="relative flex overflow-hidden group">
        
  
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
       
        <div className="flex gap-12 md:gap-32 items-center w-max animate-marquee group-hover:[animation-play-state:paused] px-4 md:px-8">
          {marqueeLogos.map((client, index) => (
            <Link 
              key={`client-${index}`}
              href={client.url || "#portfolio"} 
              className="flex items-center justify-center opacity-50 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 md:hover:scale-110 cursor-pointer shrink-0"
              title={`Ver projeto de ${client.name}`}
            >
              <img 
                src={client.logo} 
                alt={`Logo ${client.name}`} 
                className="h-8 md:h-12 w-auto object-contain drop-shadow-sm" 
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}