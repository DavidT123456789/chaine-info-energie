import { Sparkles, Medal, Heart } from "lucide-react"
import { renderIcon } from "./utils/icons"

export const NotificationSystem = ({ notifications, darkMode }: any) => {
  return (
    <div className="fixed top-4 right-4 z-[55] space-y-3" style={{ marginTop: "200px" }}>
      {notifications.map((notification: any, index: number) => (
        <div
          key={notification.id}
          className="transform transition-all duration-700 ease-out animate-slideInRight"
          style={{
            transform: `translateY(${index * 10}px)`,
            animationDelay: `${index * 0.2}s`,
          }}
        >
          {notification.type === "level" && (
            <div className={`p-4 rounded-xl shadow-lg ${notification.data.couleur} max-w-sm animate-scaleIn`}>
              <div className="flex items-center mb-2">
                <Sparkles className="w-6 h-6 text-yellow-500 mr-2 animate-spin" />
                <h3 className="font-bold">Niveau Supérieur !</h3>
              </div>
              <div className="flex items-center">
                {renderIcon(notification.data.iconType, notification.data.iconColor)}
                <span className="ml-2 font-semibold">
                  Niveau {notification.data.id}: {notification.data.nom}
                </span>
              </div>
              <p className="text-sm mt-1">{notification.data.description}</p>
            </div>
          )}

          {notification.type === "badge" && (
            <div className={`p-4 rounded-xl shadow-lg ${notification.data.couleur} max-w-sm animate-scaleIn`}>
              <div className="flex items-center mb-2">
                <Medal className="w-6 h-6 text-yellow-500 mr-2 animate-bounce" />
                <h3 className="font-bold">Badge Débloqué !</h3>
              </div>
              <div className="flex items-center">
                {renderIcon(notification.data.iconType, notification.data.iconColor)}
                <span className="ml-2 font-semibold">{notification.data.nom}</span>
              </div>
              <p className="text-sm mt-1">{notification.data.description}</p>
            </div>
          )}

          {notification.type === "bonus" && (
            <div
              className={`p-4 rounded-xl shadow-lg border max-w-sm animate-scaleIn ${
                darkMode
                  ? "bg-gradient-to-r from-purple-900 to-pink-900 border-purple-700"
                  : "bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300"
              }`}
            >
              <div className="flex items-center mb-2">
                <Heart className="w-6 h-6 text-purple-500 mr-2 animate-pulse" />
                <h3 className={`font-bold ${darkMode ? "text-purple-200" : "text-purple-800"}`}>Vie Bonus !</h3>
              </div>
              <p className={`text-sm ${darkMode ? "text-purple-300" : "text-purple-700"}`}>
                {notification.data.message}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
