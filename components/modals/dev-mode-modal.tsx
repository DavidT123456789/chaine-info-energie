import React from "react"
import { XCircle } from "lucide-react"

export const DevModeModal = React.memo(({
  showDevMode,
  setShowDevMode,
  devModeUnlocked,
  setDevModeUnlocked,
  passwordInputRef,
  devPassword,
  setDevPassword,
  handleDevPassword,
  darkMode
}: any) => {
  if (!showDevMode) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
      <div className={`p-6 rounded-xl shadow-2xl max-w-md w-full ${darkMode ? "bg-gray-800" : "bg-white"}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Mode Développeur</h3>
          <button
            onClick={() => setShowDevMode(false)}
            className={`hover:text-gray-700 ${darkMode ? "text-gray-400 hover:text-gray-300" : "text-gray-500"}`}
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {!devModeUnlocked ? (
          <>
            <div className="mb-4">
              <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                Mot de passe :
              </label>
              <input
                ref={passwordInputRef}
                type="password"
                value={devPassword}
                onChange={(e) => setDevPassword(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                }`}
                placeholder="Entrez le mot de passe"
                onKeyPress={(e) => e.key === "Enter" && handleDevPassword()}
                autoFocus
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowDevMode(false)
                  setDevPassword("")
                }}
                className={`px-4 py-2 rounded transition-colors ${
                  darkMode
                    ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                Fermer
              </button>
              <button
                onClick={handleDevPassword}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Valider
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Mode développeur activé. Les raccourcis sont disponibles en bas de page.
              </p>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setDevModeUnlocked(false)
                  setShowDevMode(false)
                }}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                Sortir du mode dev
              </button>
              <button
                onClick={() => setShowDevMode(false)}
                className={`px-4 py-2 rounded transition-colors ${
                  darkMode
                    ? "bg-gray-600 text-gray-200 hover:bg-gray-700"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                Fermer
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
})
