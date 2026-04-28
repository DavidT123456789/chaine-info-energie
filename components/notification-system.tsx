import { Sparkles, Medal, Heart, Info, CheckCircle2, XCircle, Flag } from "lucide-react"
import { renderIcon } from "./utils/icons"

export const NotificationSystem = ({ notifications, darkMode }: any) => {
  return (
    <div className="fixed top-4 right-4 z-[100] space-y-4" style={{ marginTop: "80px" }}>
      {notifications.map((notification: any, index: number) => {
        
        let icon, title, bgClass, borderClass, textClass, iconBgClass;
        
        if (notification.type === "level") {
            icon = <Sparkles className="w-5 h-5 text-blue-500" style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />;
            title = "Niveau Supérieur !";
            bgClass = darkMode ? "bg-slate-900" : "bg-white";
            borderClass = darkMode ? "border-blue-500/30" : "border-blue-200/60";
            textClass = darkMode ? "text-blue-400" : "text-blue-600";
            iconBgClass = darkMode ? "bg-blue-900/40" : "bg-blue-50";
        } else if (notification.type === "badge") {
            icon = <Medal className="w-5 h-5 text-amber-500" style={{ animation: 'floating 3s ease-in-out infinite' }} />;
            title = "Badge Débloqué !";
            bgClass = darkMode ? "bg-slate-900" : "bg-white";
            borderClass = darkMode ? "border-amber-500/30" : "border-amber-200/60";
            textClass = darkMode ? "text-amber-400" : "text-amber-600";
            iconBgClass = darkMode ? "bg-amber-900/40" : "bg-amber-50";
        } else if (notification.type === "bonus") {
            icon = <Heart className="w-5 h-5 text-pink-500" style={{ animation: 'scale-up 1s cubic-bezier(0.34, 1.56, 0.64, 1) infinite alternate' }} />;
            title = "Vie Bonus !";
            bgClass = darkMode ? "bg-slate-900" : "bg-white";
            borderClass = darkMode ? "border-pink-500/30" : "border-pink-200/60";
            textClass = darkMode ? "text-pink-400" : "text-pink-600";
            iconBgClass = darkMode ? "bg-pink-900/40" : "bg-pink-50";
        } else if (notification.type === "info") {
            const msg = notification.data.message || "";
            if (msg.includes("❌")) {
                icon = <XCircle className="w-5 h-5 text-red-500" />;
                title = "Erreur";
                bgClass = darkMode ? "bg-slate-900" : "bg-white";
                borderClass = darkMode ? "border-red-500/30" : "border-red-200/60";
                textClass = darkMode ? "text-red-400" : "text-red-600";
                iconBgClass = darkMode ? "bg-red-900/40" : "bg-red-50";
            } else if (msg.includes("✅")) {
                icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
                title = "Succès";
                bgClass = darkMode ? "bg-slate-900" : "bg-white";
                borderClass = darkMode ? "border-green-500/30" : "border-green-200/60";
                textClass = darkMode ? "text-green-400" : "text-green-600";
                iconBgClass = darkMode ? "bg-green-900/40" : "bg-green-50";
            } else if (msg.includes("🏁")) {
                icon = <Flag className="w-5 h-5 text-blue-500" />;
                title = "Checkpoint";
                bgClass = darkMode ? "bg-slate-900" : "bg-white";
                borderClass = darkMode ? "border-blue-500/30" : "border-blue-200/60";
                textClass = darkMode ? "text-blue-400" : "text-blue-600";
                iconBgClass = darkMode ? "bg-blue-900/40" : "bg-blue-50";
            } else {
                icon = <Info className="w-5 h-5 text-blue-500" />;
                title = "Information";
                bgClass = darkMode ? "bg-slate-900" : "bg-white";
                borderClass = darkMode ? "border-blue-500/30" : "border-blue-200/60";
                textClass = darkMode ? "text-blue-400" : "text-blue-600";
                iconBgClass = darkMode ? "bg-blue-900/40" : "bg-blue-50";
            }
        } else {
            return null;
        }

        const getBlobColor = (type: string, msg: string) => {
            if (type === 'level' || (type === 'info' && !msg.includes('❌') && !msg.includes('✅') && !msg.includes('🏁'))) return 'bg-blue-500';
            if (type === 'badge') return 'bg-amber-500';
            if (type === 'bonus') return 'bg-pink-500';
            if (type === 'info' && msg.includes('❌')) return 'bg-red-500';
            if (type === 'info' && msg.includes('✅')) return 'bg-green-500';
            if (type === 'info' && msg.includes('🏁')) return 'bg-blue-500';
            return 'bg-blue-500';
        };

        return (
          <div
            key={notification.id}
            className={`transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] animate-slideInRight max-w-sm w-[320px] rounded-2xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden ${bgClass} ${borderClass}`}
            style={{
              transform: `translateY(${index * 10}px)`,
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="p-4 relative">
                <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none ${getBlobColor(notification.type, notification.data?.message || '')}`}></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className={`p-2.5 rounded-2xl shrink-0 shadow-sm border border-white/10 ${iconBgClass}`}>
                  {icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-xs mb-1.5 tracking-wider uppercase ${textClass}`}>{title}</h3>
                  <div className="flex items-start gap-2">
                    {notification.type !== "bonus" && notification.type !== "info" && notification.data.iconType && (
                        <div className="shrink-0 mt-0.5 scale-90">
                            {renderIcon(notification.data.iconType, notification.data.iconColor)} 
                        </div>
                    )}
                    <span className={`text-sm font-semibold block flex-1 ${darkMode ? "text-gray-100" : "text-gray-800"}`}>
                        {notification.type === "level" && `Niv. ${notification.data.id} : ${notification.data.nom}`}
                        {notification.type === "badge" && notification.data.nom}
                        {(notification.type === "bonus" || notification.type === "info") && <span className="font-medium text-sm block leading-tight">{notification.type === "info" ? (notification.data.message || "").replace(/^[❌✅🏁]\s*/, "") : notification.data.message}</span>}
                    </span>
                  </div>
                  {notification.type !== "bonus" && notification.data.description && (
                    <p className={`text-xs mt-2 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {notification.data.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
