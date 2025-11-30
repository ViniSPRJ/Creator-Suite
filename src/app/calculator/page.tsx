"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { DollarSign, TrendingUp, Youtube } from "lucide-react";

const CPM_BY_NICHE: Record<string, number> = {
  tech: 15,
  financas: 15,
  games: 5,
  vlog: 5,
  beleza: 10,
};

const NICHE_LABELS: Record<string, string> = {
  games: "Games",
  tech: "Tech",
  vlog: "Vlog",
  financas: "Finanças",
  beleza: "Beleza",
};

const USD_TO_BRL = 5.5;

export default function CalculatorPage() {
  const [views, setViews] = useState(25000);
  const [niche, setNiche] = useState("tech");
  const [engagement, setEngagement] = useState(5);

  const { valueUSD, valueBRL } = useMemo(() => {
    const cpmBase = CPM_BY_NICHE[niche] || 5;
    const calculated = (views / 1000) * cpmBase * (1 + engagement / 100);
    return {
      valueUSD: calculated,
      valueBRL: calculated * USD_TO_BRL,
    };
  }, [views, niche, engagement]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-zinc-900 border-zinc-800">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <Youtube className="w-12 h-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-zinc-100">
            Quanto cobrar no YouTube?
          </CardTitle>
          <p className="text-zinc-400 text-sm mt-1">
            Calculadora de Patrocínio - SponsoCalc
          </p>
        </CardHeader>

        <CardContent className="space-y-6 pt-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-zinc-300">Média de Views</Label>
              <span className="text-zinc-400 font-mono text-sm">
                {views.toLocaleString("pt-BR")}
              </span>
            </div>
            <Slider
              value={[views]}
              onValueChange={(v) => setViews(v[0])}
              max={100000}
              min={0}
              step={1000}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>0</span>
              <span>100.000</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-zinc-300">Nicho do Canal</Label>
            <Select value={niche} onValueChange={setNiche}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {Object.entries(NICHE_LABELS).map(([value, label]) => (
                  <SelectItem
                    key={value}
                    value={value}
                    className="text-zinc-100 focus:bg-zinc-700 focus:text-zinc-100"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="text-zinc-300">Taxa de Engajamento</Label>
              <span className="text-zinc-400 font-mono text-sm">
                {engagement}%
              </span>
            </div>
            <Slider
              value={[engagement]}
              onValueChange={(v) => setEngagement(v[0])}
              max={10}
              min={1}
              step={0.5}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-zinc-500">
              <span>1%</span>
              <span>10%</span>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700 mt-6">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-zinc-400">
                  <TrendingUp className="w-5 h-5" />
                  <span className="text-sm font-medium">Valor Estimado</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2">
                    <DollarSign className="w-6 h-6 text-green-500" />
                    <span className="text-3xl font-bold text-green-400">
                      ${valueUSD.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="text-zinc-400 text-lg">
                    R$ {valueBRL.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                <p className="text-xs text-zinc-500 pt-2">
                  CPM Base: ${CPM_BY_NICHE[niche]} ({NICHE_LABELS[niche]})
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
