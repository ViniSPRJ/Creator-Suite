import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, FileText, Tv, ArrowRight, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      {/* Background Gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-neutral-950 to-neutral-950 -z-10" />

      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            CreatorSuite
          </div>
          <nav className="text-sm text-neutral-400">
            v1.0 (Beta)
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <div className="space-y-4 mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
            Ferramentas para quem cria.
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            Uma suite completa para gerenciar sua carreira de criador. 
            Calcule preços, gere contratos e grave vídeos em um só lugar.
          </p>
        </div>

        {/* Grid de Ferramentas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Calculadora */}
          <Link href="/calculator" className="group">
            <Card className="h-full bg-neutral-900/50 border-neutral-800 hover:border-indigo-500/50 transition-all hover:bg-neutral-900 duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calculator className="w-6 h-6 text-indigo-400" />
                </div>
                <CardTitle className="text-white">Calculadora de Publi</CardTitle>
                <CardDescription className="text-neutral-400">
                  Descubra quanto cobrar por vídeos e stories baseado no seu nicho e engajamento.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-indigo-400 font-medium">
                  Acessar Ferramenta <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 2: Contratos */}
          <Link href="/contracts" className="group">
            <Card className="h-full bg-neutral-900/50 border-neutral-800 hover:border-emerald-500/50 transition-all hover:bg-neutral-900 duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <CardTitle className="text-white">Gerador de Contratos</CardTitle>
                <CardDescription className="text-neutral-400">
                  Use IA para criar contratos jurídicos blindados e invoices em segundos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-emerald-400 font-medium">
                  Criar Documento <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

          {/* Card 3: Teleprompter */}
          <Link href="/prompter" className="group">
            <Card className="h-full bg-neutral-900/50 border-neutral-800 hover:border-amber-500/50 transition-all hover:bg-neutral-900 duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Tv className="w-6 h-6 text-amber-400" />
                </div>
                <CardTitle className="text-white">Pocket Teleprompter</CardTitle>
                <CardDescription className="text-neutral-400">
                  Cole seu roteiro e grave sem esquecer as falas. Funciona offline.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-amber-400 font-medium">
                  Abrir Studio <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>

        </div>
      </main>
      
      <footer className="py-6 text-center text-neutral-600 text-sm border-t border-white/5">
        <p>© 2025 CreatorSuite Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
