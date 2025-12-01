'use server'

import { supabase } from "@/lib/supabase";
import { geminiModel } from "@/lib/gemini";

// Esta função roda no servidor, não no navegador do usuário
export async function saveLead(email: string, niche: string, revenue: string) {

  // Validação simples
  if (!email || !email.includes('@')) {
    return { success: false, message: 'E-mail inválido' };
  }

  try {
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          email: email,
          niche: niche,
          potential_revenue: revenue
        }
      ]);

    if (error) {
      console.error('Erro Supabase:', error);
      return { success: false, message: 'Erro ao salvar no banco' };
    }

    return { success: true, message: 'Lead salvo com sucesso!' };

  } catch (err) {
    console.error('Erro Geral:', err);
    return { success: false, message: 'Erro interno do servidor' };
  }
}

export async function generateContract(data: {
  clientName: string;
  creatorName: string;
  value: string;
  deliverables: string;
  deadline: string;
}) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { success: false, message: 'GEMINI_API_KEY não configurada' };
    }

    const prompt = `Você é um Advogado Especialista em Direito Digital e Contratos para Criadores de Conteúdo.

Gere um CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE PUBLICIDADE formal e profissional em formato Markdown com as seguintes informações:

**DADOS DO CONTRATO:**
- Nome do Contratante (Cliente/Marca): ${data.clientName}
- Nome do Contratado (Criador de Conteúdo): ${data.creatorName}
- Valor Total: ${data.value}
- Prazo de Entrega: ${data.deadline}
- Entregas/Serviços: ${data.deliverables}

**O CONTRATO DEVE CONTER:**
1. Cabeçalho formal com identificação das partes
2. Objeto do contrato (descrição detalhada dos serviços)
3. Cláusula de Valor e Forma de Pagamento (50% adiantado, 50% na entrega)
4. Cláusula de Prazo e Cronograma
5. Cláusula de Direitos de Imagem e Uso do Conteúdo
6. Cláusula de Exclusividade (se aplicável)
7. Cláusula de Cancelamento e Multas
8. Cláusula de Confidencialidade
9. Cláusula de Foro (São Paulo/SP)
10. Espaço para assinaturas

Use linguagem jurídica formal brasileira. O contrato deve ser válido e profissional.`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return { success: true, contract: text };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Erro ao gerar contrato:', errorMessage);
    return { success: false, message: errorMessage };
  }
}

export async function rewriteScript(text: string, tone: string) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return { success: false, message: 'GEMINI_API_KEY não configurada' };
    }

    if (!text || text.trim() === '') {
      return { success: false, message: 'Texto não pode estar vazio' };
    }

    const toneMap: Record<string, string> = {
      'casual': 'Divertido e descontraído, como se estivesse conversando com um amigo',
      'profissional': 'Sério e profissional, com credibilidade e autoridade',
      'controvérsia': 'Polêmico e provocativo, com frases que geram discussão e engajamento'
    };

    const selectedTone = toneMap[tone] || toneMap['casual'];

    const prompt = `Aja como um roteirista de YouTube experiente. Reescreva o texto abaixo para ser falado em vídeo.

Tom: ${selectedTone}

Instruções:
- Mantenha o texto curto e direto
- Use frases de impacto que prendem a atenção
- Remova palavras difíceis e jargões desnecessários
- Escreva como se estivesse falando, não escrevendo
- Adicione quebras naturais para respiração
- Retorne APENAS o texto reescrito, sem explicações ou comentários adicionais

Texto Original:
${text}`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const rewrittenText = response.text();

    return { success: true, text: rewrittenText };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
    console.error('Erro ao reescrever script:', errorMessage);
    return { success: false, message: errorMessage };
  }
}