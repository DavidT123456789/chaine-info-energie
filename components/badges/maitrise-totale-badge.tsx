import { Crown } from "lucide-react"
import { badges } from "../data/badges"

export const MaitriseTotaleBadge = ({ 
  showMaitriseTotaleBadge, 
  setShowMaitriseTotaleBadge, 
  setShowProgressModal,
  darkMode
}: any) => {
  if (!showMaitriseTotaleBadge) return null

  const badge = badges.find((b: any) => b.id === "maitrise_totale")

  const handleBackdropClick = (e: any) => {
    if (e.target === e.currentTarget) {
      setShowMaitriseTotaleBadge(false)
    }
  }

  const handleBadgeClick = () => {
    setShowMaitriseTotaleBadge(false)
    setShowProgressModal(true)
  }

  if (!badge) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]"
      onClick={handleBackdropClick}
    >
      <div
        className={`p-8 rounded-2xl shadow-2xl ${badge.couleur} border-4 border-yellow-400 max-w-md cursor-pointer transform hover:scale-105 transition-transform animate-scaleIn`}
        onClick={handleBadgeClick}
      >
        <div className="flex items-center justify-center mb-4">
          <Crown className="w-12 h-12 text-yellow-500 mr-3 animate-bounce" />
          <h3 className="text-3xl font-bold">Maîtrise Totale !</h3>
          <Crown className="w-12 h-12 text-yellow-500 ml-3 animate-bounce" />
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-yellow-600 animate-pulse" />
          </div>
          <p className="text-xl font-semibold mb-2">{badge.nom}</p>
          <p className="mb-4">{badge.description}</p>

          <div className={`rounded-lg p-4 mb-4 ${darkMode ? "bg-yellow-800" : "bg-yellow-200"}`}>
            <p className={`font-bold ${darkMode ? "text-yellow-200" : "text-yellow-800"}`}>
              🎉 Félicitations ! Vous avez atteint la maîtrise totale ! 🎉
            </p>
            <p className={`text-sm mt-1 ${darkMode ? "text-yellow-300" : "text-yellow-700"}`}>+100 points bonus !</p>
          </div>

          <div className={`rounded-lg p-3 ${darkMode ? "bg-blue-800" : "bg-blue-100"}`}>
            <p className={`text-sm ${darkMode ? "text-blue-200" : "text-blue-700"}`}>
              💡 Cliquez sur ce badge pour voir votre progression ou cliquez à côté pour fermer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
