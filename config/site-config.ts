// src/config/site-config.ts

export const siteConfig = {
  business: {
    name: "David Oliveira - Full-Stack - Dev",
    description: "Desenvolvedor Full-Stack focado na construção de soluções escaláveis, automação (ETL) e otimização de processos.",
    whatsapp: "+55 (85) 99775-1777", // Coloque seu número real aqui
    email: "daviddenis0112@gmail.com", // Coloque seu email real aqui
    address: "Fortaleza, CE", 
    mapsLink: "#",
  },

  hours: {
    open: 8, 
    close: 18, 
    timezone: "America/Fortaleza",
  },

  theme: {
    primaryColor: "#4CAF4F", // Verde Nexcent
    secondaryColor: "#ffffff",
  },

  navItems: [
    { label: "Início", href: "#hero" },
    { label: "Especialidades", href: "#features" },
    { label: "Projetos", href: "#portfolio" },
    { label: "Contato", href: "#contact" },
  ],
}