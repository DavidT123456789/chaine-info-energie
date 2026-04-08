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
        <div className={`shrink-0 flex justify-between items-center p-5 md:px-8 border-b ${darkMode ? "border-slate-700 bg-slate-800/95" : "border-gray-100 bg-white/95"} backdrop-blur-md z-20 sticky top-0`}>
          <div className="flex items-center gap-4">
            <div className={`relative flex items-center justify-center w-14 h-14 rounded-full ${darkMode ? "bg-slate-800 border border-slate-700 shadow-inner" : "bg-white border border-gray-100 shadow-sm"}`}>
               <div className="transform scale-[1.3]">
                 {renderIcon(niveauActuel.iconType, niveauActuel.iconColor)}
               </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-bold uppercase tracking-widest ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Niveau {niveauActuel.id}
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${darkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                  {score} pts
                </span>
              </div>
              <h2 className={`text-2xl font-black tracking-tight ${darkMode ? "text-white" : "text-gray-800"}`}>
                {niveauActuel.nom}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setShowProgressModal(false)}
            className={`p-2 rounded-full hover:scale-110 transition-all ${darkMode ? "hover:bg-slate-700 text-slate-400 hover:text-slate-200" : "hover:bg-gray-100 text-gray-400 hover:text-gray-600"}`}
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto">

        <div className="mb-8">

          {prochainNiveau ? (
            <div className="px-2">
              <div className="flex justify-between items-end mb-2">
                <div className={`text-sm font-medium ${darkMode ? "text-slate-400" : "text-gray-500"}`}>
                  Encore <span className={`font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{prochainNiveau.scoreRequis - score} pts</span>
                </div>
                <div className={`text-sm font-bold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>
                  {progression}%
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`flex-1 rounded-full h-3.5 overflow-hidden shadow-inner ${darkMode ? "bg-slate-900 border border-slate-800" : "bg-gray-100"}`}>
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 ease-out relative"
                    style={{ width: `${Math.max(2, progression)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-[pulse_2s_ease-in-out_infinite] rounded-full"></div>
                  </div>
                </div>
                
                <div className={`flex-shrink-0 font-black text-sm uppercase tracking-wider flex items-center gap-1.5 ${darkMode ? "text-slate-200" : "text-gray-800"}`}>
                   <div className="flex items-center justify-center">
                     {renderIcon(prochainNiveau.iconType, prochainNiveau.iconColor)}
                   </div>
                   {prochainNiveau.nom}
                </div>
              </div>
            </div>
          ) : (
            <div className={`p-6 rounded-2xl text-center border shadow-lg transition-transform duration-300 hover:scale-[1.02] ${darkMode ? "bg-green-900/20 border-green-800 shadow-green-900/10" : "bg-green-50 border-green-200 shadow-green-100/50"}`}>
              <Sparkles className={`w-12 h-12 mx-auto mb-4 ${darkMode ? "text-green-400" : "text-green-500"} animate-pulse`} />
              <p className={`text-xl font-black ${darkMode ? "text-green-300" : "text-green-700"}`}>
                Félicitations ! Vous avez atteint le niveau maximum !
              </p>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h3 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
            Badges ({badgesObtenus.length}/{badges.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.map((badge: any) => {
              const isObtenu = badgesObtenus.includes(badge.id)
              const isSpecial = badge.id === "maitrise_totale"
              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-xl border relative overflow-hidden transition-all duration-300 group ${
                    isObtenu
                      ? `${badge.couleur} hover:scale-[1.03] hover:shadow-lg hover:-translate-y-1 ${isSpecial ? "border-4 border-yellow-400 shadow-xl z-10" : "shadow-md"}`
                      : darkMode
                        ? "bg-slate-800/50 text-slate-400 border-slate-700 opacity-70 hover:opacity-100 hover:bg-slate-700/50"
                        : "bg-gray-50 text-gray-500 border-gray-200 opacity-80 hover:opacity-100 hover:bg-gray-100"
                  }`}
                >
                  {isObtenu && (
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  )}
                  <div className="flex items-center mb-3 relative z-10">
                    <div className={`p-2.5 rounded-xl mr-3 shadow-sm ${isObtenu ? (darkMode ? "bg-white/20" : "bg-white/60") : (darkMode ? "bg-slate-700" : "bg-gray-200")}`}>
                      {isObtenu ? (
                        <div className="relative">
                          {renderIcon(badge.iconType, badge.iconColor)}
                          {isSpecial && <Sparkles className="w-4 h-4 text-yellow-500 absolute -top-2 -right-2 animate-pulse" />}
                        </div>
                      ) : (
                        <Lock className="w-5 h-5 opacity-50" />
                      )}
                    </div>
                    <span className={`font-bold tracking-tight text-sm ${isObtenu ? (darkMode ? "text-white" : "text-gray-900") : ""}`}>{badge.nom}</span>
                  </div>
                  <p className={`text-xs leading-relaxed relative z-10 ${isObtenu ? (darkMode ? "text-white/90" : "text-gray-800") : ""}`}>{badge.description}</p>
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
