// src/config/site-config.ts

export const siteConfig = {
  business: {
    name: "David Oliveira",
    role: "Full-Stack Developer",
    description: "Desenvolvedor Full-Stack focado na construção de soluções escaláveis, automação (ETL) e otimização de processos. Transformo gargalos operacionais em sistemas fluidos e interfaces de alta conversão.",
    whatsapp: "+55 (85) 99775-1777",
    email: "daviddenis0112@gmail.com",
    address: "Fortaleza, CE", 
    mapsLink: "#",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100075420027062&locale=pt_BR",
    instagram: "https://www.instagram.com/oliveirinhajrr/",
    linkedin: "https://www.linkedin.com/in/daviddenisdev/",
    github: "https://github.com/davidenisDEV"
  },
  hours: {
    open: 8, 
    close: 18, 
    timezone: "America/Fortaleza",
  },
  theme: {
    primaryColor: "#4CAF4F", 
    secondaryColor: "#ffffff",
  },
  navItems: [
    { label: "Início", href: "#hero" },
    { label: "Sobre", href: "#sobre" },
    { label: "Especialidades", href: "#services" },
    { label: "Projetos", href: "#portfolio" },
    { label: "Contato", href: "#contact" },
  ],
  about: {
    avatar: "/denis3d.png", 
    age: new Date().getFullYear() - 2001, 
    techStack: [
      { category: "Back-end & Arquitetura", tools: [
        { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
        { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
        { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      ]},
      { category: "Banco de Dados & ETL", tools: [
        { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
        { name: "SQL Server", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
        { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      ]},
      { category: "Front-end & UI", tools: [
        { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      ]},
      { category: "Ferramentas", tools: [
        { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        { name: "Pydantic", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }, // Pydantic usa ícone Python
      ]}
    ],
    experience: [
      { 
        name: "Credit Risk Engine", 
        role: "Sistemas Distribuídos & EDA", 
        year: "2026", 
        desc: "Motor de análise de risco assíncrono processando microtransações com Go, Python e RabbitMQ." 
      },
      { 
        name: "Medicao PetShop", 
        role: "Next.js & UI/UX Premium", 
        year: "2026", 
        desc: "Landing Page interativa com Glassmorphism 3D e foco em conversão via WhatsApp." 
      },
      { name: "Celedonio Advocacia", role: "Next.js & UI/UX", year: "2026", desc: "Landing Page Premium de alta conversão jurídica." },
      { name: "GoGreen Headshop", role: "SaaS Full-Stack", year: "2026", desc: "SaaS E-commerce e PDV híbrido com Clube VIP." },
      { name: "FABRIKA ROOM", role: "React UI", year: "2026", desc: "E-commerce imersivo focado em experiência visual." },
      { name: "PC Cleaner", role: "Python Scripting", year: "2025", desc: "Automação via interface Desktop para otimização de SO." }
    ]
  }
}