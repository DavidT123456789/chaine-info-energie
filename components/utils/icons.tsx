import {
  BookOpen,
  Cpu,
  Gauge,
  Rocket,
  Book,
  Target,
  Award,
  CheckCircle,
  Trophy,
  Crown,
} from "lucide-react"

type IconType = "BookOpen" | "Cpu" | "Gauge" | "Rocket" | "Book" | "Target" | "Award" | "CheckCircle" | "Trophy" | "Crown"

const iconMap: Record<IconType, typeof BookOpen> = {
  BookOpen,
  Cpu,
  Gauge,
  Rocket,
  Book,
  Target,
  Award,
  CheckCircle,
  Trophy,
  Crown,
}

export function renderIcon(iconType: IconType, className: string) {
  const IconComponent = iconMap[iconType]
  return <IconComponent className={`w-5 h-5 ${className}`} />
}
