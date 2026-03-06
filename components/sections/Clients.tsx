"use client";

export function Clients() {
  
  const clientLogos = [
    { name: "Celedonio Advocacia", src: "/clients/celedonio-logo.webp" },
    { name: "GoGreen Headshop", src: "/clients/gogreen-logo.webp" },
    { name: "Fabrika Room", src: "/clients/fabrika-logo.webp" },
    { name: "Empresa 4", src: "/clients/empresa4-logo.webp" },
    { name: "Empresa 5", src: "/clients/empresa5-logo.webp" },
  ];

  // Triplicamos a lista para criar a ilusão de loop infinito (Marquee)
  const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos, ...clientLogos];

  return (
    // Padding sutil, sem textos, focando apenas na prova social visual
    <section className="py-10 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-200/50 dark:border-slate-800/50 overflow-hidden relative z-10">
      
      {/* Container do Marquee */}
      <div className="relative flex overflow-x-hidden group">
        
        {/* Gradientes laterais para fusão com o fundo */}
        <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none"></div>
        
        {/* Pista do Marquee (Pausa ao passar o mouse) */}
        <div className="flex gap-20 md:gap-32 items-center w-max animate-marquee group-hover:[animation-play-state:paused] px-8">
          {marqueeLogos.map((client, index) => (
            <div 
              key={index}
              // Grayscale remove as cores, e a opacidade reduzida deixa corporativo.
              // Ao passar o mouse, a logo ganha cor total.
              className="flex items-center justify-center opacity-40 dark:opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer shrink-0"
              title={client.name}
            >
              {/* O ideal é que as imagens sejam PNGs ou WebP com fundo transparente e tenham proporções semelhantes (ex: h-12) */}
              <img 
                src={client.src} 
                alt={`Cliente ${client.name}`} 
                className="max-h-10 md:max-h-12 w-auto object-contain drop-shadow-sm" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}