export const niveaux = [
  {
    id: 1,
    nom: "Débutant",
    scoreRequis: 0,
    couleur: "bg-gradient-to-br from-green-50 to-emerald-100 text-emerald-800 border border-emerald-200 dark:from-emerald-950/40 dark:to-green-900/40 dark:text-emerald-300 dark:border-emerald-800/50",
    iconType: "BookOpen" as const,
    iconColor: "text-emerald-600 dark:text-emerald-400",
    description: "Découverte des chaînes d'information et d'énergie",
  },
  {
    id: 2,
    nom: "Apprenti",
    scoreRequis: 100,
    couleur: "bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-800 border border-blue-200 dark:from-blue-950/40 dark:to-cyan-900/40 dark:text-blue-300 dark:border-blue-800/50",
    iconType: "Cpu" as const,
    iconColor: "text-blue-600 dark:text-blue-400",
    description: "Maîtrise des concepts fondamentaux",
  },
  {
    id: 3,
    nom: "Confirmé",
    scoreRequis: 300,
    couleur: "bg-gradient-to-br from-purple-50 to-fuchsia-100 text-purple-800 border border-purple-200 dark:from-purple-950/40 dark:to-fuchsia-900/40 dark:text-purple-300 dark:border-purple-800/50",
    iconType: "Gauge" as const,
    iconColor: "text-purple-600 dark:text-purple-400",
    description: "Application à des systèmes complexes",
  },
  {
    id: 4,
    nom: "Expert",
    scoreRequis: 600,
    couleur: "bg-gradient-to-br from-orange-50 to-amber-100 text-orange-800 border border-orange-200 dark:from-orange-950/40 dark:to-amber-900/40 dark:text-orange-300 dark:border-orange-800/50",
    iconType: "Rocket" as const,
    iconColor: "text-orange-600 dark:text-orange-400",
    description: "Maîtrise complète des chaînes d'information et d'énergie",
  },
  {
    id: 5,
    nom: "Maître",
    scoreRequis: 900,
    couleur: "bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-900 border border-yellow-300 dark:from-yellow-900/50 dark:to-amber-800/50 dark:text-yellow-300 dark:border-yellow-700/50 shadow-sm",
    iconType: "Crown" as const,
    iconColor: "text-amber-600 dark:text-amber-400",
    description: "Maîtrise absolue — tous les systèmes n'ont plus de secrets",
  },
]

export const encouragementMessages = [
  "Excellent travail ! 🎉",
  "Fantastique ! Tu maîtrises ! ⭐",
  "Bravo ! Continue comme ça ! 🚀",
  "Parfait ! Tu es sur la bonne voie ! 💫",
  "Magnifique ! Tu progresses bien ! 🌟",
  "Super ! Tu comprends vite ! ✨",
  "Génial ! Tu es doué ! 🎯",
  "Formidable ! Quel talent ! 🏆",
]

export const perfectMessages = [
  "PARFAIT ! Aucune erreur ! 👑",
  "FLAWLESS ! Tu es un maître ! 💎",
  "IMPECCABLE ! Performance parfaite ! ⚡",
  "EXCELLENT ! Zéro faute ! 🌟",
  "MAGISTRAL ! Sans une erreur ! 🏅",
]
