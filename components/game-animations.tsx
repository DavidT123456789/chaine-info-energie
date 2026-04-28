import React from "react"
import { Heart, Crown, RotateCcw, Skull, HeartCrack, CheckCircle2 } from "lucide-react"

export const ParticleSystem = React.memo(({ particles }: any) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[80]">
      {particles.map((particle: any) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            '--tx': `${particle.vx * 20}px`,
            '--ty': `${particle.vy * 20}px`,
            animation: `particleExplode 1s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
          } as any}
        />
      ))}
    </div>
  )
})

export const ConfettiSystem = React.memo(({ confetti }: any) => {
  if (!confetti || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
      {confetti.map((piece: any) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.color,
            borderRadius: piece.shape === "circle" ? "50%" : "2px",
            '--tx': `${piece.tx}px`,
            '--ty': `${piece.ty}px`,
            animation: `confetti-explode ${piece.duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
})

export const HeartLossAnimation = React.memo(({ heartLossAnimation }: any) => {
  if (!heartLossAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[70] overflow-hidden">
      {/* Subtle flash right at the cursor location instead of full screen */}
      <div 
        className="absolute w-32 h-32 -ml-16 -mt-16 bg-red-500/10 blur-xl rounded-full"
        style={{
          left: heartLossAnimation.x,
          top: heartLossAnimation.y,
          animation: 'scale-up 1s ease-out forwards, pulse-fast 1s ease-out forwards',
        }}
      />

      {/* Modern floating broken heart */}
      <div
        className="absolute flex items-center justify-center w-16 h-16 -ml-8 -mt-8"
        style={{
          left: heartLossAnimation.x,
          top: heartLossAnimation.y,
          animation: "modernHeartLoss 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        }}
      >
        <HeartCrack className="w-10 h-10 text-red-500 drop-shadow-md" strokeWidth={2.5} />
      </div>

       {/* Floating minus one indicator */}
      <div 
        className="absolute font-black text-red-500 text-2xl drop-shadow-md -ml-3 -mt-10"
         style={{
          left: heartLossAnimation.x,
          top: heartLossAnimation.y,
          animation: "floatUpFade 1.5s ease-out forwards",
        }}
      >
        -1
      </div>
    </div>
  )
})

export const SuccessAnimation = React.memo(({ successAnimation }: any) => {
  if (!successAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
      <div 
        className="relative" 
        style={{ animation: 'scale-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] border border-slate-200 dark:border-slate-700 flex items-center gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="font-medium text-[15px] text-slate-800 dark:text-slate-100">
            {successAnimation.message}
          </span>
        </div>
      </div>
    </div>
  )
})

export const PerfectAnimation = React.memo(({ perfectAnimation }: any) => {
  if (!perfectAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] flex items-center justify-center">
      <div className="relative" style={{ animation: 'scale-up 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
        <div className="absolute inset-0 bg-yellow-400 opacity-20 blur-3xl rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 border border-yellow-300 dark:border-yellow-600/50 px-8 py-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(251,191,36,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-tr from-yellow-100/30 to-amber-200/30 dark:from-yellow-900/20 dark:to-amber-900/20"></div>
          <div className="relative z-10 flex items-center space-x-3">
            <CheckCircle2 className="w-8 h-8 text-yellow-500" style={{ animation: 'floating 2s ease-in-out infinite' }} />
            <span className="font-bold text-2xl tracking-wide uppercase bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">{perfectAnimation.message}</span>
            <CheckCircle2 className="w-8 h-8 text-yellow-500" style={{ animation: 'floating 2s ease-in-out infinite 1s' }} />
          </div>
        </div>
      </div>
    </div>
  )
})

export const GameOverAnimation = React.memo(({ gameOverAnimation }: any) => {
  if (!gameOverAnimation) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center animate-shake" style={{ pointerEvents: 'none' }}>
      {/* Fond avec vignette progressive */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        style={{
          animation: 'modalBackdropIn 0.5s ease-out forwards',
        }}
      />

      {/* Contenu central */}
      <div className="relative text-center p-12 bg-slate-900/80 rounded-3xl border border-red-900/50 shadow-[0_0_100px_rgba(220,38,38,0.2)] backdrop-blur-md" style={{ animation: 'scale-up 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
        {/* Icône crâne animée */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500 opacity-20 blur-2xl rounded-full"></div>
            <Skull className="relative z-10 w-24 h-24 text-red-500" style={{ animation: 'floating 2s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Texte GAME OVER avec effet gradient */}
        <div 
          className="text-6xl font-black mb-4 tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-red-400 to-red-700"
        >
          GAME OVER
        </div>

        {/* Sous-titre avec cœurs brisés */}
        <div className="text-xl text-gray-300 mb-8 flex items-center justify-center space-x-3">
          <Heart className="w-6 h-6 text-slate-700" />
          <span className="font-semibold uppercase tracking-wide">Plus de vies !</span>
          <Heart className="w-6 h-6 text-slate-700" />
        </div>

        {/* Message de redémarrage */}
        <div className="flex items-center justify-center space-x-3 text-red-400 mt-6 bg-red-950/30 py-3 px-6 rounded-full border border-red-900/30">
          <RotateCcw className="w-5 h-5 animate-spin" style={{ animationDuration: '2s' }} />
          <span className="font-medium tracking-wide">{gameOverAnimation.restartMessage || "Redémarrage automatique..."}</span>
        </div>

        {/* Barre de progression du redémarrage */}
        <div className="mt-8 w-64 mx-auto h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full"
            style={{
              animation: 'gameOverProgress 3s linear forwards',
            }}
          />
        </div>
      </div>
    </div>
  )
})
