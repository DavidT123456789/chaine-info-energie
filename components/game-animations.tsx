import React from "react"
import { Heart, Crown, RotateCcw, Skull } from "lucide-react"

export const ParticleSystem = React.memo(({ particles }: any) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle: any) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `translate(${particle.vx * 20}px, ${particle.vy * 20}px)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  )
})

export const ConfettiSystem = React.memo(({ confetti }: any) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((piece: any) => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: piece.x,
            top: piece.y,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confetti-fall 3s linear forwards`,
          }}
        />
      ))}
    </div>
  )
})

export const HeartLossAnimation = React.memo(({ heartLossAnimation }: any) => {
  if (!heartLossAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse"></div>

      <div
        className="absolute flex"
        style={{
          left: heartLossAnimation.x - 30,
          top: heartLossAnimation.y - 30,
          animation: "heartBreak 2s ease-out forwards",
        }}
      >
        <Heart
          className="w-8 h-16 text-red-500 transform -rotate-12"
          style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
        />
        <Heart
          className="w-8 h-16 text-red-500 transform rotate-12"
          style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
        />
      </div>


    </div>
  )
})

export const SuccessAnimation = React.memo(({ successAnimation }: any) => {
  if (!successAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
      <div className="relative group" style={{ animation: 'scale-up 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' }}>
        <div className="absolute inset-0 bg-green-400 opacity-20 blur-xl rounded-full"></div>
        <div className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-green-600 dark:text-green-400 px-10 py-5 rounded-2xl font-bold text-2xl shadow-2xl border border-green-200/50 dark:border-green-800/50 flex items-center gap-3">
          <span className="text-3xl animate-bounce" style={{ animationDuration: '2s' }}>✨</span>
          <span className="tracking-wide bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">{successAnimation.message}</span>
          <span className="text-3xl animate-bounce" style={{ animationDuration: '2s', animationDelay: '0.5s' }}>✨</span>
        </div>
      </div>
    </div>
  )
})

export const PerfectAnimation = React.memo(({ perfectAnimation }: any) => {
  if (!perfectAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
      <div className="relative" style={{ animation: 'scale-up 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
        <div className="absolute inset-0 bg-yellow-400 opacity-30 blur-3xl rounded-full animate-pulse" style={{ animationDuration: '2s' }}></div>
        <div className="relative bg-gradient-to-br from-white/95 to-amber-50/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border border-yellow-300/50 dark:border-yellow-700/50 text-amber-600 dark:text-amber-400 px-14 py-8 rounded-3xl font-black text-4xl shadow-[0_10px_50px_-10px_rgba(251,191,36,0.4)]">
          <div className="flex items-center space-x-6">
            <Crown className="w-10 h-10 text-yellow-500" style={{ animation: 'floating 3s ease-in-out infinite' }} />
            <span className="tracking-wider uppercase bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">{perfectAnimation.message}</span>
            <Crown className="w-10 h-10 text-yellow-500" style={{ animation: 'floating 3s ease-in-out infinite 1.5s' }} />
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
          <span className="font-medium tracking-wide">Redémarrage automatique...</span>
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
