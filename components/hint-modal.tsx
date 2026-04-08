"use client"

import { XCircle, Lightbulb } from "lucide-react"
import { chainHints } from "./data/hints"

interface HintModalProps {
  element: any
  onClose: () => void
  darkMode?: boolean
}

const HintModal = ({ element, onClose, darkMode = false }: HintModalProps) => {
  if (!element) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className={`rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 animate-scaleIn ${darkMode ? "bg-gray-800" : "bg-white"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
            <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Informations</h3>
          </div>
          <button onClick={onClose} className={`transition-colors ${darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-500 hover:text-gray-700"}`}>
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className={`font-semibold mb-2 text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>{element.name || element.text}</h4>
          </div>

          {element.definition && (
            <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-900/50 border border-blue-800" : "bg-blue-50"}`}>
              <h5 className={`font-semibold mb-1 ${darkMode ? "text-blue-300" : "text-blue-800"}`}>Définition :</h5>
              <p className={`${darkMode ? "text-blue-200" : "text-blue-700"}`}>{element.definition}</p>
            </div>
          )}

          {element.role && (
            <div className={`p-4 rounded-lg ${darkMode ? "bg-green-900/50 border border-green-800" : "bg-green-50"}`}>
              <h5 className={`font-semibold mb-1 ${darkMode ? "text-green-300" : "text-green-800"}`}>Rôle :</h5>
              <p className={`${darkMode ? "text-green-200" : "text-green-700"}`}>{element.role}</p>
            </div>
          )}

          {!element.definition && !element.role && (
            <div className={`p-4 rounded-lg ${darkMode ? "bg-yellow-900/50 border border-yellow-800" : "bg-yellow-50"}`}>
              <h5 className={`font-semibold mb-1 ${darkMode ? "text-yellow-300" : "text-yellow-800"}`}>Indice :</h5>
              <p className={`${darkMode ? "text-yellow-200" : "text-yellow-700"}`}>
                {element.type === "info" ? chainHints.info[element.position] : chainHints.energy[element.position]}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-600 text-white hover:bg-gray-700"}`}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  )
}

export default HintModal
