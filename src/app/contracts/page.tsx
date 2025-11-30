"use client";

import { useState } from "react";
import { generateContract } from "../actions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Loader2, Printer } from "lucide-react";

export default function ContractsPage() {
  const [formData, setFormData] = useState({
    clientName: "",
    creatorName: "",
    value: "",
    deliverables: "",
    deadline: "",
  });
  const [contract, setContract] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await generateContract(formData);

    if (response.success && response.contract) {
      setContract(response.contract);
    } else {
      alert("Erro: " + (response.message || "Tente novamente."));
    }

    setIsLoading(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-4 md:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-neutral-950 to-neutral-950 -z-10" />

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            CreatorDocs
          </h1>
          <p className="text-neutral-400">
            Gere contratos profissionais para seus patrocínios com IA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-neutral-200">
                <FileText className="w-5 h-5 text-emerald-400" />
                Dados do Contrato
              </CardTitle>
              <CardDescription>Preencha as informações para gerar o contrato</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Nome do Cliente (Marca)</Label>
                  <Input
                    id="clientName"
                    placeholder="Ex: Empresa XYZ Ltda"
                    className="bg-neutral-800 border-neutral-700"
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="creatorName">Seu Nome (Criador)</Label>
                  <Input
                    id="creatorName"
                    placeholder="Ex: João da Silva"
                    className="bg-neutral-800 border-neutral-700"
                    value={formData.creatorName}
                    onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Valor (R$)</Label>
                    <Input
                      id="value"
                      placeholder="Ex: R$ 5.000,00"
                      className="bg-neutral-800 border-neutral-700"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deadline">Prazo de Entrega</Label>
                    <Input
                      id="deadline"
                      placeholder="Ex: 15 dias"
                      className="bg-neutral-800 border-neutral-700"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliverables">O que será entregue?</Label>
                  <Textarea
                    id="deliverables"
                    placeholder="Ex: 1 vídeo dedicado de 10min no YouTube + 3 Stories no Instagram"
                    className="bg-neutral-800 border-neutral-700 min-h-[100px]"
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 font-semibold h-12"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Gerando com IA...
                    </>
                  ) : (
                    "Gerar Contrato com IA"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-neutral-200">Preview do Contrato</CardTitle>
                <CardDescription>Visualize e imprima seu contrato</CardDescription>
              </div>
              {contract && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrint}
                  className="border-neutral-700 hover:bg-neutral-800"
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir / PDF
                </Button>
              )}
            </CardHeader>

            <CardContent>
              <div
                id="contract-preview"
                className="bg-white text-black p-6 rounded-lg min-h-[500px] prose prose-sm max-w-none print:shadow-none"
              >
                {contract ? (
                  <div dangerouslySetInnerHTML={{ __html: contract.replace(/\n/g, '<br/>').replace(/#{1,6}\s/g, '<strong>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                ) : (
                  <div className="flex items-center justify-center h-full text-neutral-400">
                    <p>O contrato gerado aparecerá aqui...</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #contract-preview,
          #contract-preview * {
            visibility: visible;
          }
          #contract-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
}
