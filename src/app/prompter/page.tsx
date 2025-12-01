'use client'

import { useState, useEffect, useRef } from 'react'
import { rewriteScript } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, X, FlipHorizontal2, Sparkles } from 'lucide-react'

export default function PrompterPage() {
  const [script, setScript] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(5)
  const [fontSize, setFontSize] = useState(48)
  const [isMirrored, setIsMirrored] = useState(false)
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [showControls, setShowControls] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isPlaying || !containerRef.current) return

    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop += speed * 0.5
      }
    }, 50)

    return () => clearInterval(interval)
  }, [isPlaying, speed])

  const handleMouseMove = () => {
    if (!isPlaying) return
    setShowControls(true)

    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }

    hideControlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  const handleRewrite = async (tone: 'casual' | 'profissional' | 'controvérsia') => {
    if (!script.trim()) {
      alert('Por favor, adicione um texto antes de usar a IA')
      return
    }

    setIsLoading(tone)
    try {
      const result = await rewriteScript(script, tone)
      if (result.success && result.text) {
        setScript(result.text)
      } else {
        alert(result.message || 'Erro ao reescrever o texto')
      }
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao conectar com a IA')
    } finally {
      setIsLoading(null)
    }
  }

  const startPrompter = () => {
    if (!script.trim()) {
      alert('Por favor, adicione um texto antes de iniciar o prompter')
      return
    }
    setIsPlaying(true)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  const stopPrompter = () => {
    setIsPlaying(false)
    setShowControls(true)
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current)
    }
  }

  if (isPlaying) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black overflow-hidden"
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseMove}
      >
        <div
          ref={containerRef}
          className={`h-full overflow-y-auto px-8 py-20 ${isMirrored ? 'scale-x-[-1]' : ''}`}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <p
            className="text-white text-center leading-relaxed whitespace-pre-wrap"
            style={{ fontSize: `${fontSize}px` }}
          >
            {script}
          </p>
          <div className="h-screen" />
        </div>

        <div
          className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-6 transition-all duration-300 ${
            showControls ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center justify-between">
                  <span>Velocidade</span>
                  <span className="text-xs text-gray-400">{speed}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white text-sm font-medium flex items-center justify-between">
                  <span>Tamanho</span>
                  <span className="text-xs text-gray-400">{fontSize}px</span>
                </label>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                onClick={() => setIsMirrored(!isMirrored)}
                variant={isMirrored ? "default" : "outline"}
                size="lg"
                className="gap-2"
              >
                <FlipHorizontal2 className="w-5 h-5" />
                Espelhar
              </Button>

              <Button
                onClick={stopPrompter}
                variant="destructive"
                size="lg"
                className="gap-2"
              >
                <X className="w-5 h-5" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Pocket Teleprompter
          </h1>
          <p className="text-gray-400">
            Cole seu roteiro, ajuste o tom com IA e grave seus vídeos profissionalmente
          </p>
        </div>

        <Card className="bg-gray-800/50 border-gray-700 p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Seu Roteiro
              </label>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <Sparkles className="w-4 h-4" />
                <span>IA disponível abaixo</span>
              </div>
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Cole ou escreva seu roteiro aqui...&#10;&#10;Exemplo:&#10;E aí pessoal! Hoje eu vou mostrar como criar vídeos incríveis usando um teleprompter profissional..."
              className="w-full h-64 bg-gray-900/50 border border-gray-600 rounded-lg p-4 text-white placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h3 className="text-sm font-semibold text-gray-200">AI Magic - Reescrever com IA</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleRewrite('casual')}
                disabled={isLoading !== null}
                variant="outline"
                className="bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 transition-all"
              >
                {isLoading === 'casual' ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚡</span>
                    Gerando...
                  </span>
                ) : (
                  '😎 Divertido'
                )}
              </Button>

              <Button
                onClick={() => handleRewrite('profissional')}
                disabled={isLoading !== null}
                variant="outline"
                className="bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all"
              >
                {isLoading === 'profissional' ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚡</span>
                    Gerando...
                  </span>
                ) : (
                  '💼 Sério'
                )}
              </Button>

              <Button
                onClick={() => handleRewrite('controvérsia')}
                disabled={isLoading !== null}
                variant="outline"
                className="bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20 text-orange-300 hover:text-orange-200 transition-all"
              >
                {isLoading === 'controvérsia' ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">⚡</span>
                    Gerando...
                  </span>
                ) : (
                  '🔥 Polêmico'
                )}
              </Button>
            </div>
          </div>

          <Button
            onClick={startPrompter}
            disabled={!script.trim()}
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg py-6 gap-3 transition-all transform hover:scale-[1.02]"
          >
            <Play className="w-6 h-6" />
            INICIAR PROMPTER
          </Button>
        </Card>

        <div className="text-center space-y-2 text-sm text-gray-500">
          <p>💡 Dicas: Use o modo espelho se você tem um teleprompter físico</p>
          <p>🎬 Ajuste a velocidade durante a gravação para falar naturalmente</p>
        </div>
      </div>
    </div>
  )
}
