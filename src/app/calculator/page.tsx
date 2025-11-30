"use client";

import { useState, useEffect } from "react";
import { saveLead } from "../actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, DollarSign, TrendingUp, Users } from "lucide-react";

// Dados de Mercado (CPM Estimado 2025)
const NICHES = {
  tech: { label: "Tecnologia & Dev", cpm: 25 },
  finance: { label: "Finanças & Crypto", cpm: 35 },
  vlog: { label: "Vlog & Lifestyle", cpm: 8 },
  games: { label: "Games & Streaming", cpm: 5 },
  beauty: { label: "Beleza & Moda", cpm: 15 },
  education: { label: "Educação & Tutoriais", cpm: 18 },
};

export default function SponsoCalcPage() {
  const [views, setViews] = useState([10000]);
  const [niche, setNiche] = useState("tech");
  const [engagement, setEngagement] = useState([3]);
  const [result, setResult] = useState({ usd: 0, brl: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Calcula em tempo real
  useEffect(() => {
    const baseCPM = NICHES[niche as keyof typeof NICHES].cpm;
    const engagementMultiplier = 1 + (engagement[0] / 100); // 3% engajamento = 1.03x
    
    // Fórmula: (Views / 1000) * CPM * Multiplicador
    const totalUSD = (views[0] / 1000) * baseCPM * engagementMultiplier;
    
    setResult({
      usd: Math.round(totalUSD),
      brl: Math.round(totalUSD * 6.0), // Dólar a R$ 6,00 (Margem de segurança)
    });
  }, [views, niche, engagement]);

  const handleCaptureLead = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await saveLead(
        email,
        niche,
        `R$ ${result.brl}`
    );

    if (response.success) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
        setEmail("");
        alert("Sucesso! Você está na lista de espera.");
      }, 1500);
    } else {
      alert("Erro ao salvar: " + response.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center p-4">
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-neutral-950 to-neutral-950 -z-10" />

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Lado Esquerdo: Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              Quanto cobrar?
            </h1>
            <p className="text-neutral-400">
              Descubra o valor justo do seu vídeo patrocinado baseado em dados de mercado de 2025.
            </p>
          </div>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
            <CardContent className="pt-6 space-y-6">
              
              {/* Nicho */}
              <div className="space-y-3">
                <Label>Qual seu Nicho?</Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger className="bg-neutral-800 border-neutral-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                    {Object.entries(NICHES).map(([key, value]) => (
                      <SelectItem key={key} value={key}>{value.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Views */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Média de Views (últimos 10 vídeos)</Label>
                  <span className="text-indigo-400 font-mono">{views[0].toLocaleString("pt-BR")}</span>
                </div>
                <Slider
                  value={views} 
                  onValueChange={setViews} 
                  max={500000} 
                  step={1000} 
                  className="py-4"
                />
              </div>

              {/* Engajamento */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>Taxa de Engajamento</Label>
                  <span className="text-indigo-400 font-mono">{engagement[0]}%</span>
                </div>
                <Slider 
                  value={engagement} 
                  onValueChange={setEngagement} 
                  max={15} 
                  step={0.5} 
                  className="py-4"
                />
                <p className="text-xs text-neutral-500">
                  *Likes + Comentários divididos por views.
                </p>
              </div>

            </CardContent>
          </Card>
        </div>

        {/* Lado Direito: Resultado */}
        <div className="flex flex-col justify-center space-y-6">
          <Card className="bg-gradient-to-br from-neutral-900 to-indigo-950/30 border-neutral-800 shadow-2xl overflow-hidden relative">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
            
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neutral-200">
                <DollarSign className="w-5 h-5 text-green-400" />
                Potencial de Ganho
              </CardTitle>
              <CardDescription>Valor sugerido por 1 Vídeo Dedicado</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-6xl font-bold text-white tracking-tighter">
                  R$ {result.brl.toLocaleString("pt-BR")}
                </h2>
                <p className="text-xl text-neutral-400 font-mono">
                  ou US$ {result.usd.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <Badge variant="outline" className="border-indigo-500/30 text-indigo-300 px-3 py-1">
                  CPM Estimado: ${NICHES[niche as keyof typeof NICHES].cpm}
                </Badge>
                <Badge variant="outline" className="border-green-500/30 text-green-300 px-3 py-1">
                  Alta Demanda
                </Badge>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-white text-black hover:bg-neutral-200 font-semibold text-lg h-12"
                onClick={() => setIsModalOpen(true)}
              >
                Gerar Proposta Profissional
              </Button>
              
              <p className="text-xs text-center text-neutral-500">
                Este valor é uma estimativa de mercado. Não é garantia.
              </p>
            </CardContent>
          </Card>
          
          {/* Social Proof fictícia para gerar autoridade */}
          <div className="flex items-center justify-center gap-4 text-neutral-500 text-sm">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-950 flex items-center justify-center text-xs">A</div>
              <div className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-950 flex items-center justify-center text-xs">B</div>
              <div className="w-8 h-8 rounded-full bg-neutral-700 border-2 border-neutral-950 flex items-center justify-center text-xs">C</div>
            </div>
            <p>Usado por +1.200 criadores hoje</p>
          </div>
        </div>
      </div>

      {/* Modal de Captura de Lead */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-neutral-900 border-neutral-800 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Desbloquear Gerador de Contrato</DialogTitle>
            <DialogDescription className="text-neutral-400">
              Estamos finalizando a ferramenta que gera o contrato jurídico para esse valor de R$ {result.brl.toLocaleString("pt-BR")}. Quer ser avisado?
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleCaptureLead} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu melhor e-mail</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="voce@exemplo.com" 
                className="bg-neutral-800 border-neutral-700"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={isSubmitted}>
                {isSubmitted ? <CheckCircle2 className="w-4 h-4 mr-2 animate-pulse"/> : "Entrar na Lista de Espera"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}