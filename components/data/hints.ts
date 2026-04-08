export const lessonElements = [
  {
    id: 1,
    text: "Environnement",
    type: "info" as const,
    position: 0,
    hint: "L'espace ou le milieu dans lequel évolue le système technique",
  },
  {
    id: 2,
    text: "Acquérir",
    type: "info" as const,
    position: 1,
    hint: "Fonction qui permet de recueillir des informations sur l'environnement",
  },
  {
    id: 3,
    text: "Traiter",
    type: "info" as const,
    position: 2,
    hint: "Fonction qui analyse et transforme les informations reçues",
  },
  {
    id: 4,
    text: "Communiquer",
    type: "info" as const,
    position: 3,
    hint: "Fonction qui transmet les ordres aux actionneurs",
  },
  {
    id: 5,
    text: "Source d'énergie",
    type: "energy" as const,
    position: 0,
    hint: "Élément qui fournit l'énergie nécessaire au fonctionnement du système",
  },
  {
    id: 6,
    text: "Alimenter",
    type: "energy" as const,
    position: 1,
    hint: "Fonction qui adapte l'énergie de la source aux besoins du système",
  },
  {
    id: 7,
    text: "Distribuer",
    type: "energy" as const,
    position: 2,
    hint: "Fonction qui répartit l'énergie vers les différents composants",
  },
  {
    id: 8,
    text: "Convertir",
    type: "energy" as const,
    position: 3,
    hint: "Fonction qui transforme une forme d'énergie en une autre",
  },
  {
    id: 9,
    text: "Transmettre",
    type: "energy" as const,
    position: 4,
    hint: "Fonction qui achemine l'énergie vers l'effecteur",
  },
  {
    id: 10,
    text: "Fonction",
    type: "energy" as const,
    position: 5,
    hint: "Le service rendu par le système technique",
  },
]

export const chainHints = {
  info: [
    "L'espace ou le milieu dans lequel évolue le système technique",
    "Fonction qui permet de recueillir des informations sur l'environnement",
    "Fonction qui analyse et transforme les informations reçues",
    "Fonction qui transmet les ordres aux actionneurs",
  ],
  energy: [
    "Élément qui fournit l'énergie nécessaire au fonctionnement du système",
    "Fonction qui adapte l'énergie de la source aux besoins du système",
    "Fonction qui répartit l'énergie vers les différents composants",
    "Fonction qui transforme une forme d'énergie en une autre",
    "Fonction qui achemine l'énergie vers l'effecteur",
    "Le service rendu par le système technique",
  ],
}
