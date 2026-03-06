# 🚀 Master B2B Landing Page Architecture (v2.0)

Bem-vindo ao repositório da **Master B2B**, uma arquitetura de front-end projetada não apenas para ser um site bonito, mas uma **máquina de fechamento de negócios**. 

Este projeto foi construído pelo **David Denis** para servir de fundação na criação de plataformas de alta conversão, unindo um Design System de luxo (estilo Apple Vision) com gatilhos comerciais avançados.

## 🎯 O que torna esta arquitetura premium?

A versão 2.0 introduz um visual imersivo baseado em **Glassmorphism Dinâmico**, adaptando-se perfeitamente aos modos Light e Dark. A estrutura conduz o visitante por um funil lógico: **Atenção -> Autoridade -> Prova -> Ancoragem de Valor -> Agendamento Automático**.

---

### 1. UI Imersiva: Hero Section & Efeitos 3D
O primeiro contato visual dita a percepção de valor. O fundo conta com um **Grid de Engenharia** ultrafino animado, sobreposto por **Bolhas Gigantes de Luz** nas cores da marca. Tudo isso coberto por painéis de vidro fosco (`backdrop-blur-xl`).
> ![Hero Section]([🔗<img width="1904" height="896" alt="HeroSection" src="https://github.com/user-attachments/assets/67a7c272-7392-4653-bcd3-d7b2d3f1cd0a" />
 ])

### 2. Prova de Autoridade (Stack & Métricas)
Marquee infinito exibindo a stack de tecnologia (Python, React, Node, etc.) com desfoque lateral. Contadores dinâmicos (Framer Motion) flutuam em cartões de vidro, disparando gatilhos mentais de segurança e resultado.
> ![Stack e Stats]([🔗 <img width="1888" height="895" alt="Stacks" src="https://github.com/user-attachments/assets/fa27e2a0-e34e-4523-9815-6c40bef8e7f3" />
])

### 3. Portfólio Dinâmico (Glass Cards)
Apresentação de cases de sucesso em cartões com efeito de vidro translúcido. Inclui projetos complexos reais, como:
* **Celedonio Advocacia:** Landing Page jurídica de altíssima conversão.
* **FABRIKA ROOM:** Plataforma de experiência e e-commerce de moda.
* **GoGreen Headshop:** SaaS E-commerce com PDV integrado.
* **PC Cleaner:** Ferramenta desktop construída em Python puro.
> [Portfólio 3D]🔗 <img width="1908" height="907" alt="Pottifolio" src="https://github.com/user-attachments/assets/df42cf86-fbbd-4d5a-9925-f13c3dff45fc" />

### 4. Ancoragem: Simulador de Investimento
Uma calculadora em tempo real que filtra curiosos e educa o cliente. O painel final de preço utiliza um "Dark Glass" (vidro escuro) que se mantém fixo na tela (`sticky`), usando a tática de "preço ancorado" para gerar urgência e desejo imediato de contato.
> ![Calculadora de Preços]([🔗<img width="1908" height="904" alt="Calculadora" src="https://github.com/user-attachments/assets/28d20475-2883-4e88-a394-6022b8756774" />
 ])

### 5. O Fechamento: Formulário Inteligente + Supabase
Fim do formulário chato. Um *wizard* interativo de 4 passos capta o lead salvando em tempo real num banco **PostgreSQL (Supabase)**. 
* **Tratamento de UX:** Se o cliente já tiver cadastro (mesmo e-mail/telefone), o sistema detecta o erro de chave primária silenciosamente e adapta a tela final, recebendo-o de volta de forma personalizada.
* **Duplo CTA:** Ao final, embute o **Calendly** para agendamento direto, além de um botão nativo para chamar no **WhatsApp** com a mensagem pré-configurada baseada nas escolhas do funil.
> ![Funil Final]([🔗 <img width="1905" height="898" alt="FunilFinal" src="https://github.com/user-attachments/assets/14c83d01-54e4-46f5-9158-ea1d91d12703" />
])

---

## 🛠️ Stack Tecnológica (Modernizada)

* **Framework:** Next.js 14 (App Router)
* **Linguagem:** TypeScript
* **Estilização & UI:** Tailwind CSS + Glassmorphism Adaptativo (Light/Dark Mode)
* **Animações:** Framer Motion
* **i18n (Internacionalização):** Context API customizada para troca instantânea PT/EN (Zero load).
* **Validação de Formulários:** React Hook Form + Zod
* **Banco de Dados / CRM:** Supabase (PostgreSQL) com verificação de *Unique Keys*.

## 🤝 Vamos escalar o seu projeto?

A arquitetura já está pronta, testada, bilíngue e otimizada para o Google (SEO/Lighthouse 100). O próximo passo é customizarmos a regra de negócio para a sua realidade.

📩 **Buscando um consultor ou desenvolvedor Full-Stack focado em resultados reais?** [Acesse o Portfólio Ao Vivo e agende nosso primeiro alinhamento técnico](https://master-wbcr.vercel.app/).