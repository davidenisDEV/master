"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Clients } from "@/components/sections/Clients"; 
import { AboutBento } from "@/components/sections/AboutBento";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats"; 
import { Testimonials } from "@/components/sections/Testimonials";  
import { PricingCalculator } from "@/components/sections/PricingCalculator"; 
import { FAQ } from "@/components/sections/FAQ"; 
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/sections/Footer";
import { WhatsAppBtn } from "@/components/floating/WhatsAppBtn";
import { CursorGlow } from "@/components/floating/CursorGlow"; 

export default function Home() {
  
  // RELOAD AUTOMÁTICO NO AMBIENTE DE DESENVOLVIMENTO
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const hasReloaded = sessionStorage.getItem('dev_reloaded');
      if (!hasReloaded) {
        sessionStorage.setItem('dev_reloaded', 'true');
        window.location.reload();
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans relative">
      <CursorGlow />
      
      <Navbar />
      <Hero />
      <Clients />
      
     
      <AboutBento /> 

      
      
      <Services /> 
      
      <Stats /> 
      <Testimonials />
      <PricingCalculator /> 
      
      <FAQ />
      
      <ContactForm />
      
      <Footer />
      <WhatsAppBtn />
    </main>
  );
}