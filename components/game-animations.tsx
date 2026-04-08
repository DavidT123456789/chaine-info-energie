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
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="bg-green-600 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl animate-bounce">
        ✨ {successAnimation.message} ✨
      </div>
    </div>
  )
})

export const PerfectAnimation = React.memo(({ perfectAnimation }: any) => {
  if (!perfectAnimation) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-12 py-6 rounded-3xl font-bold text-3xl shadow-2xl border-4 border-yellow-300">
        <div className="flex items-center space-x-4">
          <Crown className="w-8 h-8 animate-spin" />
          <span className="animate-pulse">{perfectAnimation.message}</span>
          <Crown className="w-8 h-8 animate-spin" />
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
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.85) 60%, rgba(30,0,0,0.95) 100%)',
          animation: 'modalBackdropIn 0.5s ease-out forwards',
        }}
      />

      {/* Contenu central */}
      <div className="relative text-center" style={{ animation: 'scale-up 0.8s ease-out forwards' }}>
        {/* Icône crâne animée */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Skull className="w-24 h-24 text-red-500" style={{ animation: 'floating 2s ease-in-out infinite' }} />
          </div>
        </div>

        {/* Texte GAME OVER avec effet gradient */}
        <div 
          className="text-7xl font-black mb-4 tracking-wider"
          style={{
            background: 'linear-gradient(to bottom, #ef4444, #991b1b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
            filter: 'drop-shadow(0 0 30px rgba(239, 68, 68, 0.5))',
          }}
        >
          GAME OVER
        </div>

        {/* Sous-titre avec cœurs brisés */}
        <div className="text-2xl text-gray-200 mb-3 flex items-center justify-center space-x-3">
          <Heart className="w-6 h-6 text-gray-500" />
          <span>Plus de vies !</span>
          <Heart className="w-6 h-6 text-gray-500" />
        </div>

        {/* Message de redémarrage */}
        <div className="flex items-center justify-center space-x-2 text-gray-400 mt-6">
          <RotateCcw className="w-5 h-5 animate-spin" style={{ animationDuration: '2s' }} />
          <span className="text-lg">Redémarrage automatique...</span>
        </div>

        {/* Barre de progression du redémarrage */}
        <div className="mt-4 w-64 mx-auto h-1.5 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-red-500 rounded-full"
            style={{
              animation: 'gameOverProgress 3s linear forwards',
            }}
          />
        </div>
      </div>
    </div>
  )
})
