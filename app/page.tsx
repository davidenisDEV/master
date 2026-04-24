"use client";

import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients"; 
import { AboutBento } from "@/components/sections/AboutBento";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats"; 
import { ContactForm } from "@/components/sections/ContactForm";
import { FAQ } from "@/components/sections/FAQ"; 
import { Footer } from "@/components/sections/Footer";
import { WhatsAppBtn } from "@/components/floating/WhatsAppBtn";


export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans relative">
      <Navbar />
      <Hero />
      <Clients />
      <AboutBento /> 
      <Services /> 
      <Stats /> 
      <ContactForm />
      <FAQ />
      <Footer />
      <WhatsAppBtn />
    </main>
  );
}