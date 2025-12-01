import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creator Suite - Ferramentas para Criadores de Conteúdo",
  description: "Suite completa de ferramentas para criadores: calculadora de patrocínio, gerador de contratos e teleprompter profissional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
