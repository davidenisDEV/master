import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google"; // 1. Importamos Manrope
import "./globals.css";
import { ThemeProvider } from "./providers";
import { siteConfig } from "@/config/site-config";
import { cn } from "@/lib/utils";

// Fonte para Textos (Corpo)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

// Fonte para Títulos (Headings - Substitui a Bebas)
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading", // Vamos chamar de 'heading' para manter o padrão
});

export const metadata: Metadata = {
  title: siteConfig.business.name,
  description: siteConfig.business.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body 
        className={cn(
          "min-h-screen bg-background font-sans antialiased", 
          inter.variable, 
          manrope.variable 
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>


        {/* EASTER EGG: Mensagem no Console do Navegador */}
        <script dangerouslySetInnerHTML={{
            __html: `console.log("%c Eaaaai dev! 🚀\\
                    n%cSe você está inspecionando este código, já temos algo em comum. Fique à vontade para explorar a arquitetura.\\
                    nSou o David!!!,
                    "color: #4CAF4F; font-size: 18px; font-weight: bold;", "font-size: 14px; color: #888;");`
          }}
        />
      </body>
    </html>
  );
}