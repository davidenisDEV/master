import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google"; 
import "./globals.css";
import { ThemeProvider } from "./providers";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/components/contexts/LanguageContext"; 

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: siteConfig.business.name,
  description: siteConfig.business.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable, manrope.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {/* ENVOLVENDO A APLICAÇÃO COM O IDIOMA */}
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>

        <script dangerouslySetInnerHTML={{
            __html: `console.log("%c Eaaaai dev! 🚀\\n%cSe você está inspecionando este código, já temos algo em comum. Fique à vontade para explorar a arquitetura.\\nSou o David!!!", "color: #4CAF4F; font-size: 18px; font-weight: bold;", "font-size: 14px; color: #888;");`
          }}
        />
      </body>
    </html>
  );
}