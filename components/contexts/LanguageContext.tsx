"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { pt } from "@/components/locales/pt";
import { en } from "@/components/locales/en";

type Language = "PT" | "EN";
type Translations = typeof pt;

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // A Master sempre começa em Português
  const [language, setLanguage] = useState<Language>("PT");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "PT" ? "EN" : "PT"));
  };

  const t = language === "PT" ? pt : en;

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}