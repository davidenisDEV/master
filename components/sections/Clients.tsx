"use client";

// Recomendação futura: importar Image de "next/image"

export function Clients() {
  
  const clientLogos = [
    { name: "Celedonio Advocacia", src: "/clients/celedonio-logo.webp" },
    { name: "GoGreen Headshop", src: "/clients/gogreen-logo.webp" },
    { name: "Fabrika Room", src: "/clients/fabrika-logo.webp" },
    { name: "DDrones Works", src: "/clients/drone-logo.webp" },
    { name: "Wave Produtora", src: "/clients/wave-prod.webp" },
  ];

  // Duplicando para garantir fluxo infinito suave
  const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  return (
    // Reduzido py-10 para py-6 no mobile
    <section className="py-6 md:py-10 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-200/50 dark:border-slate-800/50 overflow-hidden relative z-10">
      
      {/* Container do Marquee */}
      <div className="relative flex overflow-hidden group">
        
        {/* Gradientes laterais (Reduzidos de w-32 para w-12 no mobile) */}
        <div className="absolute top-0 bottom-0 left-0 w-12 md:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-12 md:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        {/* Pista do Marquee (Gap reduzido de gap-20 para gap-12 no mobile) */}
        <div className="flex gap-12 md:gap-32 items-center w-max animate-marquee group-hover:[animation-play-state:paused] px-4 md:px-8">
          {marqueeLogos.map((client, index) => (
            <div 
              key={index}
              className="flex items-center justify-center opacity-50 dark:opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 md:hover:scale-110 cursor-pointer shrink-0"
              title={client.name}
            >
              {/* Altura fixa responsiva: h-8 (mobile) e h-12 (desktop) */}
              <img 
                src={client.src} 
                alt={`Cliente ${client.name}`} 
                className="h-8 md:h-12 w-auto object-contain drop-shadow-sm" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}