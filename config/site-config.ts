// src/config/site-config.ts

export const siteConfig = {
  /* =============================================================================
  1. INFORMAÇÕES BÁSICAS (BUSINESS)
  =============================================================================
  */
  business: {
    name: "David Oliveira",
    role: "Staff Software Engineer",
    whatsapp: "+55 (85) 99775-1777",
    email: "daviddenis0112@gmail.com",
    address: "Fortaleza, CE",
    bookingLink: "https://wa.me/5585997751777", 
  },

  /* =============================================================================
  2. NAVEGAÇÃO E LINKS SOCIAIS
  =============================================================================
  Controla os links do Navbar, Footer e botões de redes sociais.
  */
  navItems: [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#services" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "FAQ", href: "#faq" },
    { label: "Contato", href: "#contact" },
  ],
  social: {
    github: "https://github.com/davidenisDEV",
    linkedin: "https://www.linkedin.com/in/daviddenisdev/",
    instagram: "https://www.instagram.com/oliveirinhajrr/",
  },

  /* =============================================================================
  3. PORTFÓLIO & ASSETS (SERVIÇOS)
  =============================================================================
  */
  portfolio: [
    {
      id: "celedonio", 
      liveLink: "https://celedonioadvocacia.com.br/",
      githubLink: "https://github.com/davidenisDEV/CeledonioAdvg",
      images: [
        "/celedonio/celedonio.png",
        "/celedonio/celedonio2.png",
        "/celedonio/celedonio3.png",
        "/celedonio/celedonio5.png",
        "/celedonio/celedonio6.png"
      ],
    },
    {
      id: "wave",
      liveLink: "https://produtorawave.com",
      githubLink: "https://github.com/davidenisDEV/wave-produtora",
      images: [
        "/waveprod/waveprod.png",
        "/waveprod/waveprod2.png",
        "/waveprod/waveprod3.png",
        "/waveprod/waveprod4.png"
      ],
    },
    {
      id: "fabrika",
      liveLink: "", 
      githubLink: "https://github.com/davidenisDEV/FBRK",
      images: [
        "/fabrika/fabrika.png",
        "/fabrika/fabrika2.png",
        "/fabrika/fabrika3.png",
        "/fabrika/fabrika4.png",
        "/fabrika/fabrika5.png",
        "/fabrika/fabrika6.png"
      ],
    },
    {
      id: "gogreen",
      liveLink: "https://gogreen-4fmn.vercel.app/", 
      githubLink: "https://github.com/davidenisDEV/gogreen",
      images: [
        "/clients/gogreen-logo.webp",
        "/gogreen/gogreenclub.png",
        "/gogreen/gogreenhero.png",
        "/gogreen/gogreenheroabraba.png",
        "/gogreen/gogreenheroitens.png",
        "/gogreen/gogreenmusic.png"
      ],
    },
  ],

  /* =============================================================================
  4. CLIENTES (MARQUEE)
  =============================================================================
  */
  clients: [
    { name: "Celedonio Advocacia", logo: "/clients/celedonio-logo.webp", url: "#portfolio" },
    { name: "Wave Produtora", logo: "/clients/wave-prod.webp", url: "#portfolio" },
    { name: "FABRIKA", logo: "/clients/fabrika-logo.webp", url: "#portfolio" },
    { name: "GoGreen", logo: "/clients/gogreen-logo.webp", url: "#portfolio" },
  ],

  /* =============================================================================
  5. MÉTRICAS (STATS)
  =============================================================================
  */
  stats: [
    { value: 98, suffix: "%", icon: "Activity" }, 
    { value: 15, suffix: "h", icon: "Timer" },    
    { value: 100, suffix: "%", icon: "Target" },  
    { value: 20, prefix: "+", suffix: "k", icon: "TrendingUp" },
  ],


  /* =============================================================================
  6. SOBRE MIM (ABOUT & STACK TÉCNICA)
  =============================================================================
  */
  about: { 
    avatar: "/denis3d.png",  
    age: new Date().getFullYear() - 2001, 
    
    techStack: [
      {
        category: "Front-end & UI",
        tools: [
          { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
          { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
          { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
        ]
      },
      {
        category: "Back-end & Arquitetura",
        tools: [
          { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
          { name: "Go", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg" },
          { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "RabbitMQ", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg" },
        ]
      },
      {
        category: "Banco de Dados & Cloud",
        tools: [
          { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
          { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
          { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
        ]
      }
    ]
  },
  /* =============================================================================
  7. CONFIGURAÇÕES TÉCNICAS E EASTER EGGS
  =============================================================================
  */
  settings: {
    theme: {
      primary: "#4CAF4F", 
      darkBackground: "#020617",
    },
    easterEgg: {
      enabled: true,
      code: "CONSOLE LOG", 
      discount: "10%",
    },
    googleAnalyticsId: "G-XXXXXXXXXX", 
  }
};