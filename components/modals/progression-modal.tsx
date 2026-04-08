import { XCircle, Lock, Sparkles } from "lucide-react"
import { renderIcon } from "../utils/icons"
import { badges } from "../data/badges"
import { exercises } from "../data/exercises"

export const ProgressionModal = ({ 
  showProgressModal, 
  setShowProgressModal, 
  getNiveauActuel, 
  getProchainNiveau, 
  getProgressionNiveau,
  score,
  badgesObtenus,
  niveau,
  exercicesTermines,
  darkMode
}: any) => {
  if (!showProgressModal) return null

  const niveauActuel = getNiveauActuel()
  const prochainNiveau = getProchainNiveau()
  const progression = getProgressionNiveau()

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 sm:p-6">
      <div
        className={`flex flex-col rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] animate-scaleIn overflow-hidden relative ${darkMode ? "bg-slate-800" : "bg-white"}`}
      >
        <div className={`shrink-0 flex justify-between items-center p-6 md:px-8 border-b ${darkMode ? "border-slate-700 bg-slate-800/95" : "border-gray-100 bg-white/95"} backdrop-blur-sm z-10`}>
          <h2 className={`text-2xl font-bold tracking-tight ${darkMode ? "text-white" : "text-gray-800"}`}>Votre Progression</h2>
          <button
            onClick={() => setShowProgressModal(false)}
            className={`hover:scale-110 transition-transform ${darkMode ? "text-slate-400 hover:text-slate-200" : "text-gray-400 hover:text-gray-600"}`}
          >
            <XCircle className="w-7 h-7" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div className="flex items-center">
              <div className={`p-4 rounded-2xl mr-4 flex items-center justify-center shadow-sm ${darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-100"}`}>
                <div className="transform scale-[1.3] origin-center">
                  {renderIcon(niveauActuel.iconType, niveauActuel.iconColor)}
                </div>
              </div>
              <div>
                <h4 className={`text-xs uppercase tracking-widest font-bold mb-1 ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Niveau {niveauActuel.id}
                </h4>
                <div className={`text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {niveauActuel.nom}
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:text-right flex items-center md:block">
              <div className={`text-3xl font-black tracking-tight ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                {score}
              </div>
              <div className={`ml-2 md:ml-0 text-sm font-semibold uppercase tracking-wider ${darkMode ? "text-blue-400/70" : "text-blue-600/70"}`}>
                Points
              </div>
            </div>
          </div>

          {prochainNiveau ? (
            <div className={`p-5 rounded-2xl ${darkMode ? "bg-slate-800/80 border border-slate-700" : "bg-gray-50 border border-gray-200"} relative overflow-hidden`}>
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 opacity-[0.05] rounded-full blur-2xl pointer-events-none"></div>
              
              <div className="flex justify-between items-end mb-3 relative z-10">
                <span className={`text-xs font-bold uppercase tracking-wider ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Progression vers <span className={darkMode ? "text-slate-200" : "text-gray-700"}>{prochainNiveau.nom}</span>
                </span>
                <span className={`text-lg font-black ${darkMode ? "text-white" : "text-gray-800"}`}>{progression}%</span>
              </div>
              
              <div className={`w-full rounded-full h-4 mb-3 shadow-inner relative z-10 ${darkMode ? "bg-slate-900 border border-slate-700" : "bg-gray-200 border border-gray-300/50"}`}>
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-1000 ease-out relative"
                  style={{ width: `${Math.max(2, progression)}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 w-full animate-pulse rounded-full"></div>
                </div>
              </div>

              <div className={`flex justify-between text-xs font-bold relative z-10 ${darkMode ? "text-slate-500" : "text-gray-400"}`}>
                <span>{niveauActuel.scoreRequis} pts</span>
                <span>{prochainNiveau.scoreRequis} pts</span>
              </div>
              
              <div className={`mt-4 pt-4 border-t relative z-10 ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
                <p className={`text-center text-sm font-medium ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                  Plus que <span className="font-bold text-lg">{prochainNiveau.scoreRequis - score}</span> points pour devenir <span className="font-bold">{prochainNiveau.nom}</span> !
                </p>
              </div>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl text-center border ${darkMode ? "bg-green-900/20 border-green-800" : "bg-green-50 border-green-200"}`}>
              <Sparkles className={`w-10 h-10 mx-auto mb-3 ${darkMode ? "text-green-400" : "text-green-500"}`} />
              <p className={`text-lg font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>
                Félicitations ! Vous avez atteint le niveau maximum !
              </p>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Badges ({badgesObtenus.length}/{badges.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge: any) => {
              const isObtenu = badgesObtenus.includes(badge.id)
              const isSpecial = badge.id === "maitrise_totale"
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    isObtenu
                      ? `${badge.couleur} ${isSpecial ? "border-4 border-yellow-400 shadow-lg" : ""}`
                      : darkMode
                        ? "bg-gray-700 text-gray-400 border-gray-600"
                        : "bg-gray-100 text-gray-500 border-gray-300"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    {isObtenu ? (
                      <>
                        {renderIcon(badge.iconType, badge.iconColor)}
                        {isSpecial && <Sparkles className="w-4 h-4 text-yellow-500 ml-1" />}
                      </>
                    ) : (
                      <Lock className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="ml-2 font-semibold">{badge.nom}</span>
                  </div>
                  <p className="text-sm">{badge.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>Statistiques</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-blue-900 border-blue-700" : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className={`text-2xl font-bold ${darkMode ? "text-blue-300" : "text-blue-700"}`}>{score}</div>
              <div className={`text-sm ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Points totaux</div>
            </div>
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-green-900 border-green-700" : "bg-green-50 border-green-200"
              }`}
            >
              <div className={`text-2xl font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>
                {exercicesTermines.length}/{exercises.length}
              </div>
              <div className={`text-sm ${darkMode ? "text-green-400" : "text-green-600"}`}>Exercices terminés</div>
            </div>
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-purple-900 border-purple-700" : "bg-purple-50 border-purple-200"
              }`}
            >
              <div className={`text-2xl font-bold ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                {badgesObtenus.length}
              </div>
              <div className={`text-sm ${darkMode ? "text-purple-400" : "text-purple-600"}`}>Badges obtenus</div>
            </div>
            <div
              className={`p-4 rounded-lg border ${
                darkMode ? "bg-amber-900 border-amber-700" : "bg-amber-50 border-amber-200"
              }`}
            >
              <div className={`text-2xl font-bold ${darkMode ? "text-amber-300" : "text-amber-700"}`}>{niveau}</div>
              <div className={`text-sm ${darkMode ? "text-amber-400" : "text-amber-600"}`}>Niveau actuel</div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
