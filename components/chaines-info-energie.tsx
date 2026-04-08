"use client"

import { useState, useEffect, useRef, useCallback } from "react"
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
  Volume2,
  Heart,
  Map,
  Lightbulb,
  Zap,
  Settings,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
  Clock,
  AlertCircle,
  RotateCcw,
  Unlock,
  Lock,
  Sparkles,
  Sun,
  Moon,
  ArrowRight,
  XCircle,
  Medal,
  Home,
  Info,
} from "lucide-react"
import HintModal from "./hint-modal"
import { renderIcon } from "./utils/icons"
import { niveaux, encouragementMessages, perfectMessages } from "./data/levels"
import { badges } from "./data/badges"
import { lessonElements, chainHints } from "./data/hints"
import { exercises } from "./data/exercises"
import {
  ParticleSystem,
  ConfettiSystem,
  HeartLossAnimation,
  SuccessAnimation,
  PerfectAnimation,
  GameOverAnimation
} from "./game-animations"
import { ProgressionModal } from "./modals/progression-modal"
import { DevModeModal } from "./modals/dev-mode-modal"
import { NotificationSystem } from "./notification-system"
import { MaitriseTotaleBadge } from "./badges/maitrise-totale-badge"

const ElementCard = ({ element, isUsed = false, isSelected, darkMode, onClick }: any) => {
  let cardClasses = "group relative p-3 md:p-4 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl flex items-center justify-center text-center "

  if (isUsed) {
    cardClasses += darkMode
      ? "bg-gray-700 opacity-50 cursor-not-allowed"
      : "bg-gray-200 opacity-50 cursor-not-allowed"
  } else if (isSelected) {
    cardClasses += darkMode
      ? "bg-blue-900 border-2 border-blue-400 scale-110 shadow-2xl floating-animation cursor-pointer"
      : "bg-blue-100 border-2 border-blue-500 scale-110 shadow-2xl floating-animation cursor-pointer"
  } else {
    cardClasses += darkMode
      ? "bg-gray-800 hover:scale-105 hover:shadow-xl hover:bg-gray-700 cursor-pointer border border-gray-700"
      : "bg-white hover:scale-105 hover:shadow-xl hover:bg-blue-50 cursor-pointer border border-gray-200"
  }

  return (
    <div
      onClick={() => !isUsed && onClick(element)}
      className={cardClasses}
    >
      <div className={`font-semibold flex items-center select-none ${darkMode ? "text-white" : "text-gray-800"}`}>
        {isSelected && <span className="text-blue-600 mr-2 animate-bounce">👆</span>}
        {element.name || element.text}
        {(!isUsed && (element.definition || element.role)) && (
          <Info className={`ml-2 w-4 h-4 opacity-50 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
        )}
      </div>

      {(!isUsed && (element.definition || element.role)) && (
        <div className={`absolute bottom-full mb-3 left-1/2 min-w-64 max-w-sm -translate-x-1/2 p-4 rounded-xl shadow-2xl z-[60] transition-all duration-200 pointer-events-none ${darkMode ? "bg-gray-800 border border-gray-700 text-white shadow-black/50" : "bg-white border border-gray-200 text-gray-800 shadow-xl"} ${isSelected ? "opacity-100 visible scale-100" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible scale-95 group-hover:scale-100"}`}>
          {element.definition && (
            <div className={`text-sm mb-2 text-left ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <strong className={darkMode ? "text-blue-400" : "text-blue-600"}>Définition :</strong> {element.definition}
            </div>
          )}
          {element.role && (
            <div className={`text-sm text-left ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
              <strong className={darkMode ? "text-indigo-400" : "text-indigo-600"}>Rôle :</strong> {element.role}
            </div>
          )}
          {/* Petite flèche en bas */}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 border-8 border-transparent ${darkMode ? "border-t-gray-800" : "border-t-white"}`}></div>
        </div>
      )}
    </div>
  )
}

const ChainArrows = ({ chainType }: { chainType: string }) => {
  const arrowColor = chainType === "info" ? "text-blue-500" : "text-red-500"

  return (
    <div className="flex justify-center items-center">
      <ArrowRight className={`w-6 h-6 ${arrowColor}`} />
    </div>
  )
}

const CommunicateDistributeLink = ({ darkMode }: { darkMode: boolean }) => {
  return (
    <div className="relative h-16 flex justify-center">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-green-500">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1 rotate-45 w-3 h-3 border-b-2 border-r-2 border-green-500"></div>
      </div>
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-3 py-1 flex items-center justify-center rounded-full z-10 shadow-sm transition-colors duration-300 ${
          darkMode ? "bg-green-900 border border-green-700" : "bg-green-100 border border-green-300"
        }`}
      >
        <span className={`text-[11px] leading-none font-bold uppercase tracking-wider mb-[1px] ${darkMode ? "text-green-300" : "text-green-700"}`}>ORDRE</span>
      </div>
    </div>
  )
}

const ChainesInfoEnergie = () => {

  const [score, setScore] = useState(0)
  const [badgesObtenus, setBadgesObtenus] = useState([])
  const [niveau, setNiveau] = useState(1)
  const [exercicesTermines, setExercicesTermines] = useState([])
  const [exercicesDebloques, setExercicesDebloques] = useState([0])
  const [showHintModal, setShowHintModal] = useState(null)
  const [lessonChains, setLessonChains] = useState({
    info: [null, null, null, null],
    energy: [null, null, null, null, null, null],
  })
  const [completedExercises, setCompletedExercises] = useState([])
  const [isLessonUnlocked, setIsLessonUnlocked] = useState(false)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [lives, setLives] = useState(3)
  const [selectedElement, setSelectedElement] = useState(null)
  const [erreursDansExercice, setErreursDansExercice] = useState(0)
  const [notifications, setNotifications] = useState([])
  const [showMaitriseTotaleBadge, setShowMaitriseTotaleBadge] = useState(false)
  const [showProgressModal, setShowProgressModal] = useState(false)
  const [showDevMode, setShowDevMode] = useState(false)
  const [devModeUnlocked, setDevModeUnlocked] = useState(false)
  const [devPassword, setDevPassword] = useState("")
  const passwordInputRef = useRef(null)
  const [showNextExercise, setShowNextExercise] = useState(false)
  const [livesAtExerciseCompletion, setLivesAtExerciseCompletion] = useState(3)
  const [currentMode, setCurrentMode] = useState("home")
  const [hoveredZone, setHoveredZone] = useState(null)
  const [hoveredHint, setHoveredHint] = useState(null)
  const [particles, setParticles] = useState([])
  const [shuffledLessonElements, setShuffledLessonElements] = useState([])
  const [shuffledExerciseElements, setShuffledExerciseElements] = useState([])
  const [successAnimation, setSuccessAnimation] = useState(null)
  const [perfectAnimation, setPerfectAnimation] = useState(null)
  const [heartLossAnimation, setHeartLossAnimation] = useState(null)
  const [gameOverAnimation, setGameOverAnimation] = useState(null)
  const [showConfirmReset, setShowConfirmReset] = useState(false)
  const [errorFeedback, setErrorFeedback] = useState<{message: string, correct: string} | null>(null)
  
  // Ref to prevent double heart animation triggers
  const heartAnimationTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastHeartAnimationRef = useRef<number>(0)
  const previousExercicesLength = useRef<number>(0)
  const [confetti, setConfetti] = useState([])
  const [darkMode, setDarkMode] = useState(false)

  // Debounced heart loss animation trigger - prevents double animations
  const triggerHeartLossAnimation = useCallback((x: number, y: number) => {
    const now = Date.now()
    // Ignore if another animation was triggered less than 500ms ago
    if (now - lastHeartAnimationRef.current < 500) return
    
    lastHeartAnimationRef.current = now
    
    // Clear any existing timeout
    if (heartAnimationTimeoutRef.current) {
      clearTimeout(heartAnimationTimeoutRef.current)
    }
    
    setHeartLossAnimation({ x, y, timestamp: now })
    
    heartAnimationTimeoutRef.current = setTimeout(() => {
      setHeartLossAnimation(null)
      heartAnimationTimeoutRef.current = null
    }, 2000)
  }, [])


  const shuffleArray = useCallback((array) => {
    const newArray = [...array]
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
    }
    return newArray
  }, [])

  const addNotification = useCallback((type, data) => {
    setNotifications((prev) => {
      const isDuplicate = prev.some((n) => {
        if (type === "badge" && n.type === "badge") {
          return n.data.id === data.id
        }
        if (type === "level" && n.type === "level") {
          return n.data.id === data.id
        }
        if (type === "bonus" && n.type === "bonus") {
          return n.data.message === data.message
        }
        return false
      })

      if (isDuplicate) return prev

      const id = Date.now() + Math.random()
      const notification = { id, type, data, timestamp: Date.now() }

      if (type !== "badge" || data.id !== "maitrise_totale") {
        setTimeout(() => {
          setNotifications((current) => current.filter((n) => n.id !== id))
        }, 6000)
      }

      return [...prev, notification]
    })
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const isLessonComplete = useCallback(() => {
    const complete = lessonChains.info.every((el) => el !== null) && lessonChains.energy.every((el) => el !== null)
    if (complete && !isLessonUnlocked) {
      setIsLessonUnlocked(true)
    }
    return complete
  }, [lessonChains, isLessonUnlocked])

  const isExerciseComplete = useCallback(() => {
    const currentEx = exercises[currentExercise]
    return currentEx.elements.every((el) => completedExercises.includes(`${currentExercise}-${el.name}`))
  }, [currentExercise, completedExercises])

  const getMaxLives = useCallback(() => {
    return exercicesTermines.length >= 3 ? 4 : 3
  }, [exercicesTermines.length])

  const resetLesson = useCallback(() => {
    setLessonChains({ info: [null, null, null, null], energy: [null, null, null, null, null, null] })
    setLives(3)
    setSelectedElement(null)
    setIsLessonUnlocked(false)
    setShuffledLessonElements(shuffleArray([...lessonElements]))
  }, [shuffleArray])

  const resetExercise = useCallback(() => {
    setCompletedExercises([])
    setCurrentExercise(0)
    setLives(3)
    setSelectedElement(null)
    setShowNextExercise(false)
    setErreursDansExercice(0)
    const exerciseElementsMap = {}
    exercises.forEach((exercise, index) => {
      exerciseElementsMap[index] = shuffleArray([...exercise.elements])
    })
    setShuffledExerciseElements(exerciseElementsMap)
  }, [shuffleArray])


  useEffect(() => {
    if (lives <= 0) {
      setGameOverAnimation({ timestamp: Date.now() })

      const savedMode = currentMode
      const savedScore = score
      const savedCompleted = [...completedExercises]
      const savedTermines = [...exercicesTermines]
      const savedCurrentEx = currentExercise
      const savedBlocksInLesson = lessonChains.info.filter((e) => e !== null).length + lessonChains.energy.filter((e) => e !== null).length

      setTimeout(() => {
        setGameOverAnimation(null)
        if (savedMode === "lesson") {
          setScore(Math.max(0, savedScore - (savedBlocksInLesson * 10)))
          resetLesson()
          setLives(savedTermines.length >= 3 ? 4 : 3)
        } else {
          const targetIndex = savedCurrentEx >= 3 ? 3 : 0
          const elementsToRemoveCount = savedCompleted.filter(key => parseInt(key.split('-')[0]) >= targetIndex).length
          
          setScore(Math.max(0, savedScore - (elementsToRemoveCount * 20)))
          setCompletedExercises(savedCompleted.filter(key => parseInt(key.split('-')[0]) < targetIndex))
          setExercicesTermines(savedTermines.filter(idx => idx < targetIndex))
          setCurrentExercise(targetIndex)
          
          setLives(savedTermines.filter(idx => idx < targetIndex).length >= 3 ? 4 : 3)
          setSelectedElement(null)
          setShowNextExercise(false)
          setErreursDansExercice(0)
          
          const exerciseElementsMap: any = {}
          exercises.forEach((exercise, index) => {
            exerciseElementsMap[index] = shuffleArray([...exercise.elements])
          })
          setShuffledExerciseElements(exerciseElementsMap)
        }
      }, 3000)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lives])

  const getNiveauActuel = useCallback(() => {
    return niveaux.find((niv) => niv.id === niveau) || niveaux[0]
  }, [niveau])

  const getProchainNiveau = useCallback(() => {
    const prochainNiveauId = niveau + 1
    return niveaux.find((niv) => niv.id === prochainNiveauId)
  }, [niveau])

  const getProgressionNiveau = useCallback(() => {
    const niveauActuel = getNiveauActuel()
    const prochainNiveau = getProchainNiveau()

    if (!prochainNiveau) return 100

    const scoreRequis = prochainNiveau.scoreRequis - niveauActuel.scoreRequis
    const scoreActuel = score - niveauActuel.scoreRequis

    return Math.min(Math.floor((scoreActuel / scoreRequis) * 100), 100)
  }, [getNiveauActuel, getProchainNiveau, score])


  const createConfetti = useCallback(() => {
    const newConfetti = []
    for (let i = 0; i < 50; i++) {
      newConfetti.push({
        id: Math.random(),
        x: Math.random() * window.innerWidth,
        y: -10,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        color: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7"][Math.floor(Math.random() * 6)],
        size: Math.random() * 8 + 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
      })
    }
    setConfetti(newConfetti)
    setTimeout(() => setConfetti([]), 3000)
  }, [])

  const createErrorParticles = useCallback((x, y) => {
    const newParticles = []
    for (let i = 0; i < 15; i++) {
      newParticles.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15,
        life: 1,
        color: "#FF4444",
        size: Math.random() * 6 + 3,
      })
    }
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1500)
  }, [])

  const createSuccessParticles = useCallback((x, y) => {
    const newParticles = []
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Math.random(),
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 12,
        life: 1,
        color: "#00FF88",
        size: Math.random() * 5 + 2,
      })
    }
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 1000)
  }, [])

  const playZeldaChestSound = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const notes = [
      { freq: 523.25, time: 0.0, duration: 0.3 },
      { freq: 659.25, time: 0.3, duration: 0.3 },
      { freq: 783.99, time: 0.6, duration: 0.3 },
      { freq: 1046.5, time: 0.9, duration: 0.6 },
    ]

    notes.forEach((note) => {
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      const filter = audioContext.createBiquadFilter()

      osc.type = "triangle"
      filter.type = "lowpass"
      filter.frequency.setValueAtTime(2000, audioContext.currentTime)

      osc.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time)

      const startTime = audioContext.currentTime + note.time
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05)
      gain.gain.setValueAtTime(0.3, startTime + note.duration * 0.7)
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(audioContext.destination)

      osc.start(startTime)
      osc.stop(startTime + note.duration)
    })

    setTimeout(() => {
      notes.forEach((note) => {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()

        osc.type = "sine"
        osc.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time)

        const startTime = audioContext.currentTime + note.time
        gain.gain.setValueAtTime(0, startTime)
        gain.gain.linearRampToValueAtTime(0.1, startTime + 0.05)
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + note.duration * 1.5)

        osc.connect(gain)
        gain.connect(audioContext.destination)

        osc.start(startTime)
        osc.stop(startTime + note.duration * 1.5)
      })
    }, 200)
  }, [])

  const playSuccessSound = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const osc1 = audioContext.createOscillator()
    const osc2 = audioContext.createOscillator()
    const osc3 = audioContext.createOscillator()

    const gain1 = audioContext.createGain()
    const gain2 = audioContext.createGain()
    const gain3 = audioContext.createGain()
    const masterGain = audioContext.createGain()

    osc1.type = "sine"
    osc2.type = "sine"
    osc3.type = "triangle"

    osc1.frequency.setValueAtTime(523.25, audioContext.currentTime)
    osc2.frequency.setValueAtTime(659.25, audioContext.currentTime)
    osc3.frequency.setValueAtTime(783.99, audioContext.currentTime)

    gain1.gain.setValueAtTime(0.15, audioContext.currentTime)
    gain2.gain.setValueAtTime(0.1, audioContext.currentTime)
    gain3.gain.setValueAtTime(0.08, audioContext.currentTime)
    masterGain.gain.setValueAtTime(0.3, audioContext.currentTime)

    osc1.connect(gain1)
    osc2.connect(gain2)
    osc3.connect(gain3)
    gain1.connect(masterGain)
    gain2.connect(masterGain)
    gain3.connect(masterGain)
    masterGain.connect(audioContext.destination)

    const now = audioContext.currentTime
    masterGain.gain.setValueAtTime(0, now)
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.05)
    masterGain.gain.linearRampToValueAtTime(0.2, now + 0.1)
    masterGain.gain.setValueAtTime(0.2, now + 0.3)
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

    osc1.start(now)
    osc2.start(now + 0.05)
    osc3.start(now + 0.1)
    osc1.stop(now + 0.6)
    osc2.stop(now + 0.6)
    osc3.stop(now + 0.6)
  }, [])

  const playErrorSound = useCallback(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const osc1 = audioContext.createOscillator()
    const osc2 = audioContext.createOscillator()
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate)
    const noiseSource = audioContext.createBufferSource()

    const noiseData = noiseBuffer.getChannelData(0)
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = Math.random() * 2 - 1
    }
    noiseSource.buffer = noiseBuffer

    const gain1 = audioContext.createGain()
    const gain2 = audioContext.createGain()
    const noiseGain = audioContext.createGain()
    const masterGain = audioContext.createGain()

    const filter = audioContext.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.setValueAtTime(800, audioContext.currentTime)

    osc1.type = "sawtooth"
    osc2.type = "square"

    const now = audioContext.currentTime
    osc1.frequency.setValueAtTime(200, now)
    osc1.frequency.linearRampToValueAtTime(100, now + 0.3)
    osc2.frequency.setValueAtTime(150, now)
    osc2.frequency.linearRampToValueAtTime(75, now + 0.3)

    gain1.gain.setValueAtTime(0.2, now)
    gain2.gain.setValueAtTime(0.15, now)
    noiseGain.gain.setValueAtTime(0.1, now)
    masterGain.gain.setValueAtTime(0.4, now)

    osc1.connect(gain1)
    osc2.connect(gain2)
    noiseSource.connect(filter)
    filter.connect(noiseGain)
    gain1.connect(masterGain)
    gain2.connect(masterGain)
    noiseGain.connect(masterGain)
    masterGain.connect(audioContext.destination)

    masterGain.gain.setValueAtTime(0, now)
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.02)
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

    osc1.start(now)
    osc2.start(now)
    noiseSource.start(now)
    osc1.stop(now + 0.4)
    osc2.stop(now + 0.4)
    noiseSource.stop(now + 0.1)
  }, [])

  useEffect(() => {
    if (exercicesTermines.length >= 3 && previousExercicesLength.current < 3) {
      setLives(4)
      if (previousExercicesLength.current > 0) { // Not initial load
        addNotification("bonus", { message: "Vie bonus débloquée ! Vous avez maintenant 4 vies !" })
      }
    }
    previousExercicesLength.current = exercicesTermines.length
  }, [exercicesTermines.length, addNotification])

  useEffect(() => {
    setShuffledLessonElements(shuffleArray([...lessonElements]))

    const exerciseElementsMap = {}
    exercises.forEach((exercise, index) => {
      exerciseElementsMap[index] = shuffleArray([...exercise.elements])
    })
    setShuffledExerciseElements(exerciseElementsMap)

    const savedScore = localStorage.getItem("chainesInfoEnergie_score")
    const savedBadges = localStorage.getItem("chainesInfoEnergie_badges")
    const savedNiveau = localStorage.getItem("chainesInfoEnergie_niveau")
    const savedExercicesTermines = localStorage.getItem("chainesInfoEnergie_exercicesTermines")
    const savedExercicesDebloques = localStorage.getItem("chainesInfoEnergie_exercicesDebloques")
    const savedDarkMode = localStorage.getItem("chainesInfoEnergie_darkMode")

    if (savedScore) setScore(Number.parseInt(savedScore))
    if (savedBadges) setBadgesObtenus(JSON.parse(savedBadges))
    if (savedNiveau) setNiveau(Number.parseInt(savedNiveau))
    if (savedExercicesTermines) setExercicesTermines(JSON.parse(savedExercicesTermines))
    if (savedExercicesDebloques) setExercicesDebloques(JSON.parse(savedExercicesDebloques))
    if (savedDarkMode) setDarkMode(JSON.parse(savedDarkMode))
  }, [shuffleArray])


  const handleDevPassword = () => {
    if (devPassword === "dev123") {
      setDevModeUnlocked(true)
      setDevPassword("")
    } else {
      addNotification("bonus", { message: "❌ Mot de passe incorrect" })
      setDevPassword("")
      passwordInputRef.current?.focus()
    }
  }

  const completerLecon = () => {
    const newChains = {
      info: [...lessonElements.filter((el) => el.type === "info").sort((a, b) => a.position - b.position)],
      energy: [...lessonElements.filter((el) => el.type === "energy").sort((a, b) => a.position - b.position)],
    }
    setLessonChains(newChains)
    setIsLessonUnlocked(true)
    setScore((prev) => prev + 100)
    playSuccessSound()
  }

  const completerExerciceActuel = () => {
    const exerciceActuel = exercises[currentExercise]
    const nouvellesCompletions = exerciceActuel.elements.map((el) => `${currentExercise}-${el.name}`)
    setCompletedExercises((prev) => [...prev, ...nouvellesCompletions])
    setScore((prev) => prev + exerciceActuel.elements.length * 20)
    playSuccessSound()
  }

  const reinitialiserStatistiques = () => {
    setShowConfirmReset(true)
  }

  const confirmerReinitialisation = () => {
    setScore(0)
    setBadgesObtenus([])
    setNiveau(1)
    setExercicesTermines([])
    setExercicesDebloques([0])
    setShowHintModal(null)
    setLessonChains({ info: [null, null, null, null], energy: [null, null, null, null, null, null] })
    setCompletedExercises([])
    setIsLessonUnlocked(false)
    setCurrentExercise(0)
    setLives(3)
    setSelectedElement(null)
    setErreursDansExercice(0)
    setNotifications([])
    setShowMaitriseTotaleBadge(false)
    setCurrentMode("lesson")

    localStorage.removeItem("chainesInfoEnergie_score")
    localStorage.removeItem("chainesInfoEnergie_badges")
    localStorage.removeItem("chainesInfoEnergie_niveau")
    localStorage.removeItem("chainesInfoEnergie_exercicesTermines")
    localStorage.removeItem("chainesInfoEnergie_exercicesDebloques")

    setShowConfirmReset(false)
    addNotification("bonus", { message: "✅ Statistiques réinitialisées avec succès." })
  }

  const isLessonCompleted = isLessonComplete()
  const isCurrentExerciseCompleted = currentMode === "exercises" && isExerciseComplete()
  const areStatsAtZero =
    score === 0 &&
    badgesObtenus.length === 0 &&
    niveau === 1 &&
    exercicesTermines.length === 0 &&
    exercicesDebloques.length === 1
  const isLessonAtZero = lessonChains.info.every((el) => el === null) && lessonChains.energy.every((el) => el === null)
  const isExerciseAtZero = completedExercises.length === 0

  useEffect(() => {
    localStorage.setItem("chainesInfoEnergie_darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  // Refs to track notifications that have already been triggered (prevent duplicates)
  const notifiedLevelsRef = useRef<Set<number>>(new Set())
  const notifiedBadgesRef = useRef<Set<string>>(new Set())
  const notifiedCheckpointRef = useRef(false)

  // Effet pour le Checkpoint
  useEffect(() => {
    if (currentMode === "exercises" && currentExercise === 3 && !notifiedCheckpointRef.current) {
      notifiedCheckpointRef.current = true
      addNotification("bonus", { message: "🏁 Checkpoint atteint ! En cas de défaite, vous recommencerez d'ici." })
    }
  }, [currentExercise, currentMode, addNotification])

  // Separate effect for localStorage saves only
  useEffect(() => {
    localStorage.setItem("chainesInfoEnergie_score", score.toString())
    localStorage.setItem("chainesInfoEnergie_badges", JSON.stringify(badgesObtenus))
    localStorage.setItem("chainesInfoEnergie_niveau", niveau.toString())
    localStorage.setItem("chainesInfoEnergie_exercicesTermines", JSON.stringify(exercicesTermines))
    localStorage.setItem("chainesInfoEnergie_exercicesDebloques", JSON.stringify(exercicesDebloques))
  }, [score, badgesObtenus, niveau, exercicesTermines, exercicesDebloques])

  // Separate effect for level up notifications
  useEffect(() => {
    const nouveauNiveau = niveaux.reduce((acc, niv) => {
      if (score >= niv.scoreRequis && niv.id > acc) {
        return niv.id
      }
      return acc
    }, 1)

    if (nouveauNiveau !== niveau) {
      setNiveau(nouveauNiveau)
      // Only notify if we haven't already notified for this level AND it's a level UP
      if (nouveauNiveau > niveau && !notifiedLevelsRef.current.has(nouveauNiveau)) {
        notifiedLevelsRef.current.add(nouveauNiveau)
        const niveauData = niveaux.find((n) => n.id === nouveauNiveau)
        addNotification("level", niveauData)
      }
    }
  }, [score, niveau, addNotification])

  // Separate effect for badge notifications
  useEffect(() => {
    const verifierBadge = (badgeId: string) => {
      if (!badgesObtenus.includes(badgeId) && !notifiedBadgesRef.current.has(badgeId)) {
        notifiedBadgesRef.current.add(badgeId)
        setBadgesObtenus((prev) => {
          if (prev.includes(badgeId)) return prev
          return [...prev, badgeId]
        })
        const badgeData = badges.find((b) => b.id === badgeId)

        if (badgeId === "maitrise_totale") {
          setShowMaitriseTotaleBadge(true)
          playZeldaChestSound()
        } else {
          addNotification("badge", badgeData)
        }
      }
    }

    const lessonIsComplete = isLessonComplete()
    if (lessonIsComplete && !badgesObtenus.includes("lecon_complete")) {
      verifierBadge("lecon_complete")
    }

    if (exercicesTermines.length > 0 && !badgesObtenus.includes("premier_exercice")) {
      verifierBadge("premier_exercice")
    }

    if (exercicesTermines.length === exercises.length && !badgesObtenus.includes("tous_exercices")) {
      verifierBadge("tous_exercices")
    }

    if (score >= 1000 && !badgesObtenus.includes("score_1000")) {
      verifierBadge("score_1000")
    }

    const autresBadges = badges.filter((b) => b.id !== "maitrise_totale").map((b) => b.id)
    const tousAutresBadgesObtenus = autresBadges.every((badgeId) => badgesObtenus.includes(badgeId))
    const niveauMaxAtteint = niveau === niveaux[niveaux.length - 1].id

    if (tousAutresBadgesObtenus && niveauMaxAtteint && !badgesObtenus.includes("maitrise_totale")) {
      verifierBadge("maitrise_totale")
      setScore((prev) => prev + 100)
    }
  }, [score, badgesObtenus, niveau, exercicesTermines, isLessonComplete, addNotification, playZeldaChestSound])

  // Ref to track if exercise completion animation has been triggered
  const exerciseCompletionTriggeredRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    if (currentMode === "exercises" && isExerciseComplete()) {
      // Check if this exercise completion was already handled
      if (exerciseCompletionTriggeredRef.current.has(currentExercise)) {
        setShowNextExercise(true)
        return
      }

      if (!exercicesTermines.includes(currentExercise)) {
        // Mark this exercise as handled to prevent double animations
        exerciseCompletionTriggeredRef.current.add(currentExercise)

        setLivesAtExerciseCompletion(lives)
        setShowNextExercise(true)

        setExercicesTermines((prev) => [...prev, currentExercise])

        const nextExercise = currentExercise + 1
        if (nextExercise < exercises.length && !exercicesDebloques.includes(nextExercise)) {
          setExercicesDebloques((prev) => [...prev, nextExercise])
        }


        if (erreursDansExercice === 0) {
          const message = perfectMessages[Math.floor(Math.random() * perfectMessages.length)]
          setPerfectAnimation({ message, timestamp: Date.now() })
          setTimeout(() => setPerfectAnimation(null), 4000)
          createConfetti()

          if (!badgesObtenus.includes("sans_erreur")) {
            const newBadges = [...badgesObtenus, "sans_erreur"]
            setBadgesObtenus(newBadges)
            const badgeData = badges.find((b) => b.id === "sans_erreur")
            addNotification("badge", badgeData)
          }
        } else {
          const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
          setSuccessAnimation({ message, timestamp: Date.now() })
          setTimeout(() => setSuccessAnimation(null), 3000)
        }

        setErreursDansExercice(0)
      }
    } else {
      setShowNextExercise(false)
    }
  }, [
    completedExercises,
    currentExercise,
    currentMode,
    erreursDansExercice,
    exercicesTermines,
    badgesObtenus,
    lives,
    isExerciseComplete,
    addNotification,
    getMaxLives,
    createConfetti,
    exercicesDebloques,
  ])

  // Ref to track if lesson completion animation has been triggered
  const lessonCompletionTriggeredRef = useRef(false)

  useEffect(() => {
    if (currentMode === "lesson" && isLessonComplete()) {
      // Only trigger animation once
      if (lessonCompletionTriggeredRef.current) return
      lessonCompletionTriggeredRef.current = true


      const message = encouragementMessages[Math.floor(Math.random() * encouragementMessages.length)]
      setSuccessAnimation({ message, timestamp: Date.now() })
      setTimeout(() => setSuccessAnimation(null), 3000)
    }
  }, [currentMode, isLessonComplete, getMaxLives])

  // Reset lesson completion trigger when lesson is reset
  useEffect(() => {
    if (currentMode === "lesson" && !isLessonComplete()) {
      lessonCompletionTriggeredRef.current = false
    }
  }, [currentMode, isLessonComplete])

  const handleElementClick = (element) => {
    if (selectedElement === element) {
      setSelectedElement(null)
    } else {
      setSelectedElement(element)
    }
  }

  const handleZoneClick = (chainType, position, isExercise, event) => {
    if (!selectedElement) return

    let isCorrect = false
    if (isExercise) {
      isCorrect = selectedElement.chain === chainType && selectedElement.position === position
    } else {
      isCorrect = selectedElement.type === chainType && selectedElement.position === position
    }

    if (isCorrect) {
      const rect = event.target.getBoundingClientRect()
      createSuccessParticles(rect.left + rect.width / 2, rect.top + rect.height / 2)
      playSuccessSound()

      if (isExercise) {
        const exerciseKey = `${currentExercise}-${selectedElement.name}`
        if (!completedExercises.includes(exerciseKey)) {
          setCompletedExercises((prev) => [...prev, exerciseKey])
          if (!exercicesTermines.includes(currentExercise)) {
            setScore((prev) => prev + 20)
          }
        }
      } else {
        const newChains = { ...lessonChains }
        if (!newChains[chainType][position]) {
          newChains[chainType][position] = selectedElement
          setLessonChains(newChains)
          if (!badgesObtenus.includes("lecon_complete")) {
            setScore((prev) => prev + 10)
          }
        }
      }
      setSelectedElement(null)
    } else {
      setLives((prev) => prev - 1)
      
      const isGameOver = lives <= 1

      if (!isGameOver) {
        setHeartLossAnimation({ x: event.clientX, y: event.clientY, timestamp: Date.now() })
        setTimeout(() => setHeartLossAnimation(null), 2000)
      }

      createErrorParticles(event.clientX, event.clientY)
      playErrorSound()

      // Feedback pédagogique : donner un indice au lieu de la réponse directe
      const hint = selectedElement.role
        ? `Son rôle est de "${selectedElement.role.charAt(0).toLowerCase() + selectedElement.role.slice(1)}".`
        : selectedElement.definition
          ? `Définition : ${selectedElement.definition}.`
          : "Réfléchis à sa fonction globale dans le système !";

      if (!isGameOver) {
        setErrorFeedback({
          message: "Cet élément ne va pas ici !",
          correct: hint
        })
        setTimeout(() => setErrorFeedback(null), 4000)
      }

      if (isExercise) {
        setErreursDansExercice((prev) => prev + 1)
      }
    }
  }



  const goToNextExercise = () => {
    if (currentExercise < exercises.length - 1 && exercicesDebloques.includes(currentExercise + 1)) {
      setCurrentExercise(currentExercise + 1)
      setSelectedElement(null)
      setShowNextExercise(false)
      setErreursDansExercice(0)
    } else {
      resetExercise()
      setCurrentMode("lesson")
    }
  }

  const getHeartAnimationClass = (index) => {
    if (index >= lives) return ""

    const maxLives = getMaxLives()
    if (lives === maxLives) return ""

    if (lives === 1) return "animate-pulse-fast"
    if (lives === 2) return "animate-pulse-medium"
    return "animate-pulse-slow"
  }

  const buyHeart = () => {
    if (score >= 150 && lives < getMaxLives()) {
      setScore((prev) => prev - 150)
      setLives((prev) => prev + 1)
      playSuccessSound()
      
      if (!badgesObtenus.includes("prevoyant")) {
        setBadgesObtenus(prev => [...prev, "prevoyant"])
        const badgeData = badges.find((b) => b.id === "prevoyant")
        addNotification("badge", badgeData)
      }
    }
  }

  // NEW UNIFIED NAVIGATION COMPONENT
  const UnifiedNavigation = () => {
    const niveauActuel = getNiveauActuel()
    const progression = getProgressionNiveau()

    return (
      <div
        className={`sticky top-0 z-50 relative ${darkMode ? "bg-gray-900/60" : "bg-white/70"} backdrop-blur-md border-b ${darkMode ? "border-gray-700/50" : "border-gray-200/50"} shadow-lg`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col xl:flex-row items-center w-full gap-4">
            
            {/* Left side - Navigation/Breadcrumb */}
            <div className="flex-1 flex flex-wrap items-center justify-center xl:justify-start gap-2 md:gap-3">
              <nav aria-label="Breadcrumb" className={`h-10 md:h-11 flex items-center p-0.5 rounded-2xl ${darkMode ? "bg-gray-800/80" : "bg-gray-100/80"} backdrop-blur-sm border ${darkMode ? "border-gray-700" : "border-gray-200/80"} shadow-inner`}>
                <ol className="flex items-center h-full">
                  <li className="h-full">
                    <button
                      onClick={() => setCurrentMode("home")}
                      className={`h-full flex items-center px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        currentMode === "home"
                          ? "bg-white text-purple-600 shadow-md dark:bg-gray-700 dark:text-purple-400"
                          : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      <Book className="w-4 h-4 sm:mr-1.5" />
                      <span className="hidden sm:inline">Leçon</span>
                    </button>
                  </li>
                  
                  <ChevronRight className={`w-4 h-4 mx-1 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
                  
                  <li className="h-full">
                    <button
                      onClick={() => {
                        if (currentMode === "home") {
                          setCurrentMode(completedExercises.length > 0 ? "exercises" : "lesson");
                        }
                      }}
                      className={`h-full relative overflow-hidden flex items-center px-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        currentMode === "lesson" || currentMode === "exercises"
                           ? "bg-white text-blue-600 shadow-md dark:bg-gray-800 dark:text-blue-400"
                           : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-700/50"
                      }`}
                    >
                      {/* Progress Background inside button */}
                      {(currentMode === "lesson" || currentMode === "exercises") && (
                        <>
                          <div 
                            className="absolute inset-y-0 left-0 bg-blue-50 dark:bg-blue-900/30 transition-all duration-500 ease-out"
                            style={{ width: `${((currentMode === "lesson" ? 1 : currentExercise + 2) / (exercises.length + 1)) * 100}%` }}
                          />
                          <div 
                            className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 ease-out"
                            style={{ width: `${((currentMode === "lesson" ? 1 : currentExercise + 2) / (exercises.length + 1)) * 100}%` }}
                          />
                        </>
                      )}

                      <div className="relative z-10 flex items-center">
                        <Target className="w-4 h-4 sm:mr-1.5" />
                        <span className="hidden sm:inline">
                          {(currentMode === "lesson" || currentMode === "exercises") 
                             ? `Exercice ${currentMode === "lesson" ? 1 : currentExercise + 2}/${exercises.length + 1}`
                             : "Exercices"}
                        </span>
                        {/* Mobile view just shows numbers */}
                        <span className="inline sm:hidden ml-1.5">
                          {(currentMode === "lesson" || currentMode === "exercises") 
                             ? `${currentMode === "lesson" ? 1 : currentExercise + 2}/${exercises.length + 1}` 
                             : ""}
                        </span>
                      </div>
                    </button>
                  </li>
                </ol>
              </nav>

              {devModeUnlocked && (
                <button
                  onClick={() => setShowDevMode(true)}
                  className={`h-10 md:h-11 px-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 flex items-center space-x-1.5 ${
                    darkMode
                      ? "bg-gray-800 text-orange-400 border border-orange-400/50 hover:bg-gray-700"
                      : "bg-white text-orange-600 border border-orange-200 hover:bg-orange-50 shadow-sm"
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span className="hidden sm:inline">Dev Mode</span>
                </button>
              )}
            </div>

            {/* Center - User Stats */}
            <div className="flex-none flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-2 xl:mt-0">
                {/* Lives */}
                <div className={`h-10 md:h-11 flex items-center px-3 md:px-4 rounded-2xl border shadow-sm transition-all duration-300 ${darkMode ? "bg-red-950/40 border-red-900/50" : "bg-gradient-to-br from-red-50 to-rose-50 border-red-200"}`} title={`${lives} vie(s) restante(s)`}>
                  <div className="flex gap-1.5 items-center">
                    {[...Array(getMaxLives())].map((_, i) => (
                      <div key={i} className="relative">
                        {i < lives ? (
                           <Heart className={`w-4 h-4 md:w-5 md:h-5 text-red-500 fill-red-500 drop-shadow-sm ${getHeartAnimationClass(i)}`} />
                        ) : (
                           <Heart className={`w-4 h-4 md:w-5 md:h-5 ${darkMode ? "text-gray-700 fill-gray-800" : "text-gray-300 fill-gray-100"}`} />
                        )}
                      </div>
                    ))}
                    {lives < getMaxLives() && score >= 150 && (
                      <button
                        onClick={buyHeart}
                        className={`ml-1 px-1.5 py-0.5 text-xs font-black rounded-md border shadow-sm flex items-center transition-transform hover:scale-110 active:scale-95 ${darkMode ? "bg-green-900/80 border-green-700 text-green-300 hover:bg-green-800" : "bg-green-100 border-green-300 text-green-700 hover:bg-green-200"}`}
                        title="Acheter un cœur pour 150 points"
                      >
                        +<Heart className="w-2.5 h-2.5 ml-0.5 fill-current" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Badges Collection */}
                <div
                  className={`h-10 md:h-11 flex items-center px-3 md:px-4 rounded-2xl shadow-sm cursor-pointer transition-all hover:scale-105 hover:shadow-md ${darkMode ? "bg-purple-950/40 border border-purple-900/50" : "bg-gradient-to-br from-purple-50 to-fuchsia-50 border border-purple-200"}`}
                  onClick={() => setShowProgressModal(true)}
                  title={`${badgesObtenus.length} badge(s) sur ${badges.length} débloqué(s)`}
                >
                  <Medal className={`w-4 h-4 md:w-5 md:h-5 mr-2 drop-shadow-sm ${darkMode ? "text-purple-400" : "text-purple-600"}`} />
                  <div className="flex items-center font-bold text-sm">
                    <span className={darkMode ? "text-purple-300" : "text-purple-700"}>{badgesObtenus.length}</span>
                    <span className={`mx-1 text-xs opacity-50 ${darkMode ? "text-purple-300" : "text-purple-700"}`}>/</span>
                    <span className={`text-xs opacity-75 ${darkMode ? "text-purple-300" : "text-purple-700"}`}>{badges.length}</span>
                  </div>
                </div>

                {/* Progression Badge (Level + Score combined) */}
                <div
                  className={`h-10 md:h-11 flex items-center pr-3 md:pr-4 rounded-2xl shadow-sm cursor-pointer transition-all hover:scale-105 hover:shadow-md pl-1 md:pl-1.5 ${darkMode ? "bg-slate-800/80 border border-slate-700" : "bg-white border border-gray-200"}`}
                  onClick={() => setShowProgressModal(true)}
                  title={`${score} points`}
                >
                  <div className={`relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full mr-2 shrink-0 ${darkMode ? "bg-slate-900 border border-slate-700 shadow-inner" : "bg-gray-50 border border-gray-100 shadow-sm"}`}>
                    <div className="transform scale-[0.85] md:scale-[0.9]">
                      {renderIcon(niveauActuel.iconType, niveauActuel.iconColor)}
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-1.5 leading-none">
                      <span className={`text-[10px] md:text-[10px] font-bold uppercase tracking-widest hidden lg:block ${darkMode ? "text-slate-400" : "text-gray-500"} mb-0.5`}>
                        Niv {niveauActuel.id}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] md:text-[10px] font-bold uppercase tracking-wider sm:mb-0.5 ${darkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600"}`}>
                        {score} pts
                      </span>
                    </div>
                    <span className={`font-black text-[13px] md:text-[14px] leading-none tracking-tight hidden sm:block ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {niveauActuel.nom}
                    </span>
                  </div>
                </div>
              </div>

            {/* Right side - Dark Mode Toggle */}
            <div className="flex-1 flex items-center justify-center xl:justify-end mt-2 xl:mt-0">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`h-10 w-10 md:h-11 md:w-11 flex items-center justify-center rounded-full transition-all duration-300 ${
                  darkMode
                    ? "text-yellow-500 hover:bg-gray-800/80"
                    : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-700"
                }`}
                title={darkMode ? "Mode Clair" : "Mode Sombre"}
              >
                {darkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const DropZone = ({ chainType, position, isExercise = false }) => {
    let isOccupied = false
    let occupiedElement = null

    if (isExercise) {
      const foundElement = exercises[currentExercise].elements.find(
        (el) =>
          completedExercises.includes(`${currentExercise}-${el.name}`) &&
          el.chain === chainType &&
          el.position === position,
      )
      isOccupied = !!foundElement
      occupiedElement = foundElement
    } else {
      isOccupied = lessonChains[chainType][position] !== null
      occupiedElement = lessonChains[chainType][position]
    }

    const zoneId = `${chainType}-${position}`
    const hintId = `hint-${chainType}-${position}`

    const isExogenous = (chainType === "info" && position === 0) || (chainType === "energy" && position === 0)
    const isFunction = chainType === "energy" && position === 5

    let zoneClasses = "flex items-center justify-center transition-all duration-300 cursor-pointer relative "

    // Forme différente pour les éléments exogènes et la fonction
    if (isExogenous) {
      zoneClasses += "w-40 h-24 rounded-full border-2 border-dashed "
      zoneClasses += darkMode ? "bg-transparent " : "bg-transparent "
    } else if (isFunction) {
      zoneClasses += "w-40 h-24 rounded-full border-2 border-dashed "
      zoneClasses += darkMode ? "bg-gray-800 " : "bg-white "
    } else {
      zoneClasses += "w-40 h-20 rounded-lg border-2 border-dashed "
      zoneClasses += darkMode ? "bg-gray-800 " : "bg-white "
    }

    if (isOccupied) {
      zoneClasses += darkMode
        ? "border-green-400 bg-green-900 cursor-default transform scale-105 shadow-lg"
        : "border-green-500 bg-green-50 cursor-default transform scale-105 shadow-lg"
    } else if (hoveredZone === zoneId) {
      zoneClasses += darkMode
        ? "border-gray-500 " + (isExogenous ? "" : "bg-gray-700")
        : "border-gray-400 " + (isExogenous ? "" : "bg-gray-50")
    } else {
      zoneClasses += darkMode
        ? "border-gray-600 hover:border-gray-500 " + (isExogenous ? "" : "hover:bg-gray-700")
        : "border-gray-300 hover:border-gray-400 " + (isExogenous ? "" : "hover:bg-gray-50")
    }

    const getElementColor = (chainType, position) => {
      if (chainType === "energy") {
        if (position === 0) return "bg-pink-500"
        if (position === 1) return "bg-red-500"
        if (position === 2) return "bg-indigo-500"
        if (position === 3) return "bg-orange-500"
        if (position === 4) return "bg-yellow-500"
        if (position === 5) return "bg-lime-500"
      } else {
        if (position === 0) return "bg-teal-500"
        if (position === 1) return "bg-blue-500"
        if (position === 2) return "bg-purple-500"
        return "bg-green-500"
      }
    }

    return (
      <div
        onClick={(e) => {
          if (isOccupied) {
            setShowHintModal(occupiedElement)
          } else {
            handleZoneClick(chainType, position, isExercise, e)
          }
        }}
        onMouseEnter={() => setHoveredZone(zoneId)}
        onMouseLeave={() => {
          setHoveredZone(null)
          setHoveredHint(null)
        }}
        className={`${zoneClasses} ${!isOccupied && selectedElement ? "drop-zone-glow" : ""}`}
      >
        {isOccupied ? (
          <div
            className={`px-3 py-1 rounded text-white text-sm font-semibold cursor-pointer hover:opacity-80 transition-opacity ${getElementColor(chainType, position)} ${
              isExogenous || isFunction ? "text-center" : ""
            }`}
            title="Cliquez pour voir les informations"
          >
            {isExercise ? occupiedElement.name : occupiedElement.text}
          </div>
        ) : (
          <div className={`text-sm font-medium text-center px-2 ${darkMode ? "text-gray-400" : "text-gray-400"}`}>
            {isExercise
              ? chainType === "info"
                ? position === 0
                  ? "Environnement"
                  : position === 1
                    ? "Acquérir"
                    : position === 2
                      ? "Traiter"
                      : "Communiquer"
                : position === 0
                  ? "Source d'énergie"
                  : position === 1
                    ? "Alimenter"
                    : position === 2
                      ? "Distribuer"
                      : position === 3
                        ? "Convertir"
                        : position === 4
                          ? "Transmettre"
                          : "Fonction"
              : isExogenous
                ? "Élément exogène"
                : "Système"}
          </div>
        )}

        {/* Indicateur d'indice pour la leçon uniquement - positionné en dehors du conteneur */}
        {!isExercise && !isOccupied && (
          <div className="absolute -top-2 -right-2 z-40">
            <div
              className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold cursor-help hover:bg-blue-600 transition-colors shadow-xl border-2 border-white"
              onMouseEnter={() => {
                setHoveredHint(hintId)
              }}
              onMouseLeave={() => {
                setHoveredHint(null)
              }}
              onClick={(e) => {
                e.stopPropagation()
                setHoveredHint(hoveredHint === hintId ? null : hintId)
              }}
            >
              i
            </div>
          </div>
        )}

        {/* Tooltip avec l'indice */}
        {!isExercise && !isOccupied && hoveredHint === hintId && (
          <div
            className={`absolute z-[9999] px-3 py-2 text-sm rounded-lg shadow-lg w-64 pointer-events-none ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-800 text-white"
            }`}
            style={{
              bottom: "calc(100% + 12px)",
              left: position === 0 ? "-8px" : ((chainType === "info" && position === 3) || (chainType === "energy" && position === 5)) ? "auto" : "50%",
              right: ((chainType === "info" && position === 3) || (chainType === "energy" && position === 5)) ? "-16px" : "auto",
              transform: position === 0 || ((chainType === "info" && position === 3) || (chainType === "energy" && position === 5)) ? "none" : "translateX(-50%)",
            }}
          >
            <div className="font-semibold mb-1">💡 Indice :</div>
            {chainHints[chainType][position]}
          </div>
        )}
      </div>
    )
  }





  // Obtenir les éléments de la leçon non placés
  const getUnplacedLessonElements = () => {
    return shuffledLessonElements.filter((el) => !lessonChains[el.type][el.position])
  }

  // Obtenir les éléments d'exercice non placés
  const getUnplacedExerciseElements = () => {
    if (!shuffledExerciseElements[currentExercise]) return []

    return shuffledExerciseElements[currentExercise].filter(
      (el) => !completedExercises.includes(`${currentExercise}-${el.name}`),
    )
  }

  // Bouton "Suivant" dynamique
  const NextExerciseButton = () => {
    // If we are in "lesson" (which is actually Exercice 1) and it's unlocked, show the button to go to "exercises"
    if (currentMode === "lesson" && isLessonUnlocked) {
      const exerciseNumber = currentExercise + 2;
      const isResuming = completedExercises.length > 0 || currentExercise > 0;
      const buttonText = isResuming ? `Reprendre l'exercice ${exerciseNumber}` : "Exercice 2";

      return (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => setCurrentMode("exercises")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 animate-pulse-slow ${
              darkMode
                ? "bg-green-800 text-green-200 border border-green-600 hover:bg-green-700 shadow-lg"
                : "bg-green-600 text-white hover:bg-green-700 shadow-lg"
            }`}
            style={{ boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
          >
            <span>{buttonText}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )
    }

    if (currentMode !== "exercises") return null

    const nextExerciseIndex = currentExercise + 1
    const isNextUnlocked = exercicesDebloques.includes(nextExerciseIndex)
    const hasNextExercise = nextExerciseIndex < exercises.length

    if (!hasNextExercise || !isNextUnlocked) return null

    return (
      <div className="fixed bottom-4 right-4 z-40 animate-fade-in">
        <button
          onClick={() => {
            setCurrentExercise(nextExerciseIndex)
            setSelectedElement(null)
            setShowNextExercise(false)
          }}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg animate-pulse-slow ${
            darkMode
              ? "bg-green-800 text-green-200 border border-green-600 hover:bg-green-700"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
          style={{
            boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
          }}
        >
          <span>Exercice {nextExerciseIndex + 2}</span>
          <ChevronRight className="w-5 h-5 ml-1" />
        </button>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-500 ${
        darkMode ? "bg-zinc-950 text-slate-100" : "bg-[#f8fafc] text-slate-900"
      }`}
    >
      <ParticleSystem particles={particles} />
      <ConfettiSystem confetti={confetti} />
      <HeartLossAnimation heartLossAnimation={heartLossAnimation} />
      <SuccessAnimation successAnimation={successAnimation} />
      <PerfectAnimation perfectAnimation={perfectAnimation} />
      <GameOverAnimation gameOverAnimation={gameOverAnimation} />
      {errorFeedback && (
        <div className="fixed inset-0 pointer-events-none z-[100] flex items-end justify-center pb-32">
          <div className="pointer-events-auto bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-5 rounded-2xl shadow-2xl animate-error-feedback max-w-lg text-center border border-red-400">
            <div className="font-bold text-lg mb-2">❌ {errorFeedback.message}</div>
            <div className="text-sm opacity-95 bg-white/10 rounded-lg px-4 py-2">💡 {errorFeedback.correct}</div>
          </div>
        </div>
      )}
      <NotificationSystem notifications={notifications} darkMode={darkMode} />
      <MaitriseTotaleBadge 
        showMaitriseTotaleBadge={showMaitriseTotaleBadge}
        setShowMaitriseTotaleBadge={setShowMaitriseTotaleBadge}
        setShowProgressModal={setShowProgressModal}
        darkMode={darkMode}
      />
      <ProgressionModal 
        showProgressModal={showProgressModal}
        setShowProgressModal={setShowProgressModal}
        getNiveauActuel={getNiveauActuel}
        getProchainNiveau={getProchainNiveau}
        getProgressionNiveau={getProgressionNiveau}
        score={score}
        badgesObtenus={badgesObtenus}
        niveau={niveau}
        exercicesTermines={exercicesTermines}
        darkMode={darkMode}
      />
      <DevModeModal 
        showDevMode={showDevMode}
        setShowDevMode={setShowDevMode}
        devModeUnlocked={devModeUnlocked}
        setDevModeUnlocked={setDevModeUnlocked}
        passwordInputRef={passwordInputRef}
        devPassword={devPassword}
        setDevPassword={setDevPassword}
        handleDevPassword={handleDevPassword}
        darkMode={darkMode}
      />
      <UnifiedNavigation />
      <NextExerciseButton />

      <div className="w-full max-w-[1600px] mx-auto p-4 md:p-8">
        {showHintModal && <HintModal element={showHintModal} onClose={() => setShowHintModal(null)} darkMode={darkMode} />}

        {currentMode === "home" ? (
          <div className="space-y-8">
            {/* Grand titre déplacé depuis l'entête */}
            <div className="text-center py-4 md:py-8 animate-intro-slide">
              <div className="inline-flex items-center justify-center mb-4">
                <div className={`p-3 rounded-2xl mr-4 shadow-lg ${darkMode ? "bg-blue-900 shadow-blue-900/50" : "bg-blue-100 shadow-blue-200/50"}`}>
                  <Zap className={`w-8 h-8 md:w-10 md:h-10 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                </div>
                <h1 className={`text-3xl md:text-5xl font-extrabold tracking-tight ${darkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"}`}>
                  Chaînes d'Information et d'Énergie
                </h1>
              </div>
              <p className={`text-lg md:text-xl font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Place les éléments dans les chaînes !
              </p>
            </div>

            <div className={`rounded-xl shadow-lg p-6 animate-intro-slide ${darkMode ? "bg-gradient-to-br from-indigo-900 to-blue-900 border border-indigo-700" : "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200"}`}>
              <div className="flex items-center mb-4">
                <BookOpen className={`w-7 h-7 mr-3 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                <h2 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                  Comprendre avant de jouer
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Chaîne d'information */}
                <div className={`p-4 rounded-lg ${darkMode ? "bg-blue-800/50 border border-blue-700" : "bg-white border border-blue-200"}`}>
                  <div className="flex items-center mb-2">
                    <Lightbulb className={`w-5 h-5 mr-2 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                    <h3 className={`font-bold ${darkMode ? "text-blue-300" : "text-blue-700"}`}>Chaîne d'Information</h3>
                  </div>
                  <p className={`text-sm mb-2 ${darkMode ? "text-blue-200" : "text-blue-800"}`}>
                    C'est le <strong>cerveau</strong> du système. Elle capte des informations et décide quoi faire.
                  </p>
                  <div className={`text-xs space-y-1 ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Environnement</strong> → ce qui entoure le système</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Acquérir</strong> → capter les informations (capteurs)</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Traiter</strong> → analyser et décider (processeur)</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Communiquer</strong> → envoyer les ordres</div>
                  </div>
                </div>

                {/* Chaîne d'énergie */}
                <div className={`p-4 rounded-lg ${darkMode ? "bg-red-800/50 border border-red-700" : "bg-white border border-red-200"}`}>
                  <div className="flex items-center mb-2">
                    <Zap className={`w-5 h-5 mr-2 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                    <h3 className={`font-bold ${darkMode ? "text-red-300" : "text-red-700"}`}>Chaîne d'Énergie</h3>
                  </div>
                  <p className={`text-sm mb-2 ${darkMode ? "text-red-200" : "text-red-800"}`}>
                    Ce sont les <strong>muscles</strong> du système. Elle fournit la force pour agir.
                  </p>
                  <div className={`text-xs space-y-1 ${darkMode ? "text-red-300" : "text-red-700"}`}>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Source</strong> → d'où vient l'énergie (pile, prise...)</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Alimenter</strong> → adapter et mettre à disposition l'énergie</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Distribuer</strong> → répartir l'énergie selon les ordres</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Convertir</strong> → transformer l'énergie (moteur, LED...)</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Transmettre</strong> → transporter la force (engrenages, courroies...)</div>
                    <div className="flex items-center"><ChevronRight className="w-3 h-3 mr-1" /><strong>Fonction (Action)</strong> → réaliser l'effet final attendu (avancer, éclairer...)</div>
                  </div>
                </div>
              </div>

              <div className={`flex items-center justify-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                <ArrowRight className="w-4 h-4 mr-2" />
                La chaîne d'information <strong className="mx-1">commande</strong> la chaîne d'énergie grâce aux <strong className="ml-1">ordres</strong>.
              </div>
            </div>
            
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setCurrentMode("lesson")}
                className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform transform hover:scale-105 flex items-center space-x-3 ${
                  darkMode 
                    ? "bg-blue-600 text-white hover:bg-blue-500" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                <span>Commencer les exercices !</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : currentMode === "lesson" ? (
          <div className="space-y-8">
            <div className={`w-full mx-auto py-4 animate-fade-in`}>
              <h2 className={`text-2xl font-bold mb-4 text-center ${darkMode ? "text-white" : "text-gray-800"}`}>
                Place les fonctions au bon endroit !
              </h2>
              <p className={`text-center mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                Clique sur une étiquette, puis clique sur une zone pour la placer.
              </p>

              <div className="mb-10 flex justify-center">
                <div className="flex flex-wrap gap-3 justify-center">
                  {getUnplacedLessonElements().map((element) => {
                    const isUsed = Object.values(lessonChains)
                      .flat()
                      .some((el) => el?.id === element.id)

                    return <ElementCard key={element.id} element={element} isUsed={isUsed} isSelected={selectedElement === element} darkMode={darkMode} onClick={handleElementClick} />
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className={`p-6 md:p-8 rounded-3xl shadow-sm border transition-all duration-300 ${
                    darkMode ? "bg-zinc-900/50 border-blue-900/50" : "bg-white border-blue-100/50"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Lightbulb className={`mr-2 w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                    <h3 className={`text-xl font-bold ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                      Chaîne d'Information
                    </h3>
                  </div>

                  <div className="flex justify-center items-center chain-responsive overflow-x-auto pt-32 -mt-28 pb-4">
                    <DropZone chainType="info" position={0} />
                    <ChainArrows chainType="info" />
                    <DropZone chainType="info" position={1} />
                    <ChainArrows chainType="info" />
                    <DropZone chainType="info" position={2} />
                    <ChainArrows chainType="info" />
                    <DropZone chainType="info" position={3} />
                  </div>
                </div>

                <CommunicateDistributeLink darkMode={darkMode} />

                <div
                  className={`p-6 md:p-8 rounded-3xl shadow-sm border transition-all duration-300 ${
                    darkMode ? "bg-zinc-900/50 border-red-900/50" : "bg-white border-red-100/50"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Zap className={`mr-2 w-6 h-6 ${darkMode ? "text-red-400" : "text-red-500"}`} />
                    <h3 className={`text-xl font-bold ${darkMode ? "text-red-300" : "text-red-700"}`}>
                      Chaîne d'Énergie
                    </h3>
                  </div>

                  <div className="flex justify-center items-center chain-responsive overflow-x-auto pt-32 -mt-28 pb-4">
                    <DropZone chainType="energy" position={0} />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={1} />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={2} />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={3} />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={4} />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={5} />
                  </div>
                </div>
              </div>

              {/* Les éléments à placer ont été déplacés en haut */}
            </div>
          </div>
        ) : currentMode === "exercises" ? (
          <div className="space-y-8">
            <div className={`w-full mx-auto py-4 animate-fade-in`}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>
                    {exercises[currentExercise].title}
                  </h2>
                  <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {exercises[currentExercise].description}
                  </p>
                </div>
                <img
                  src={exercises[currentExercise].image || "/placeholder.svg"}
                  alt={exercises[currentExercise].title}
                  className="w-32 h-32 rounded-lg shadow-md object-cover flex-shrink-0"
                />
              </div>

              <div className="mb-10 flex justify-center">
                <div className="flex flex-wrap gap-3 justify-center">
                  {getUnplacedExerciseElements().map((element) => {
                    const isUsed = completedExercises.includes(`${currentExercise}-${element.name}`)

                    return <ElementCard key={element.name} element={element} isUsed={isUsed} isSelected={selectedElement === element} darkMode={darkMode} onClick={handleElementClick} />
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className={`p-6 md:p-8 rounded-3xl shadow-sm border transition-all duration-300 ${
                    darkMode ? "bg-zinc-900/50 border-blue-900/50" : "bg-white border-blue-100/50"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Lightbulb className={`mr-2 w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                    <h3 className={`text-xl font-bold ${darkMode ? "text-blue-300" : "text-blue-700"}`}>
                      Chaîne d'Information
                    </h3>
                  </div>

                  <div className="flex justify-center items-center chain-responsive overflow-x-auto pt-32 -mt-28 pb-4">
                    <DropZone chainType="info" position={0} isExercise />
                    <ChainArrows chainType="info" />
                    <DropZone chainType="info" position={1} isExercise />
                    <ChainArrows chainType="info" />
                    <DropZone chainType="info" position={2} isExercise />
                    <ChainArrows chainType="info" />
                    <DropZone chainType="info" position={3} isExercise />
                  </div>
                </div>

                <CommunicateDistributeLink darkMode={darkMode} />

                <div
                  className={`p-6 md:p-8 rounded-3xl shadow-sm border transition-all duration-300 ${
                    darkMode ? "bg-zinc-900/50 border-red-900/50" : "bg-white border-red-100/50"
                  }`}
                >
                  <div className="flex items-center mb-4">
                    <Zap className={`mr-2 w-6 h-6 ${darkMode ? "text-red-400" : "text-red-500"}`} />
                    <h3 className={`text-xl font-bold ${darkMode ? "text-red-300" : "text-red-700"}`}>
                      Chaîne d'Énergie
                    </h3>
                  </div>

                  <div className="flex justify-center items-center chain-responsive overflow-x-auto pt-32 -mt-28 pb-4">
                    <DropZone chainType="energy" position={0} isExercise />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={1} isExercise />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={2} isExercise />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={3} isExercise />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={4} isExercise />
                    <ChainArrows chainType="energy" />
                    <DropZone chainType="energy" position={5} isExercise />
                  </div>
                </div>
              </div>

              {/* Les éléments à placer ont été déplacés en haut */}

              {/* === RÉCAPITULATIF FIN D'EXERCICE === */}
              {showNextExercise && exercises[currentExercise]?.elements && (
                <div className={`mt-8 p-6 rounded-xl shadow-lg border-2 animate-intro-slide ${darkMode ? "bg-green-900/40 border-green-700" : "bg-green-50 border-green-300"}`}>
                  <div className="flex items-center justify-center mb-4">
                    <CheckCircle className={`w-8 h-8 mr-3 ${darkMode ? "text-green-400" : "text-green-600"}`} />
                    <h3 className={`text-2xl font-bold ${darkMode ? "text-green-300" : "text-green-700"}`}>
                      Exercice terminé avec succès !
                    </h3>
                  </div>
                  <p className={`text-center mb-6 ${darkMode ? "text-green-100" : "text-green-800"}`}>
                    Voici la chaîne complète pour le système : <strong>{exercises[currentExercise].title}</strong>.
                    Prends un instant pour l'observer.
                  </p>
                  
                  <div className="flex flex-col md:flex-row justify-center gap-6 text-sm">
                    {/* Résumé Info */}
                    <div className={`flex-1 p-4 rounded-lg border shadow-sm ${darkMode ? "bg-blue-900/60 border-blue-600" : "bg-white border-blue-200"}`}>
                      <h4 className={`font-bold mb-3 flex items-center justify-center pb-2 border-b ${darkMode ? "text-blue-300 border-blue-700" : "text-blue-700 border-blue-100"}`}>
                        <Lightbulb className="w-4 h-4 mr-2" /> Chaîne d'Information
                      </h4>
                      <ol className={`space-y-2 list-none ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {exercises[currentExercise].elements
                          .filter(e => e.chain === "info")
                          .sort((a, b) => a.position - b.position)
                          .map((el, idx) => {
                            // Map position to physical name 0=Environment, 1=Acquire, etc
                            let functName = ""
                            if (el.position === 0) functName = "Environnement"
                            else if (el.position === 1) functName = "Acquérir"
                            else if (el.position === 2) functName = "Traiter"
                            else if (el.position === 3) functName = "Communiquer"
                            
                            return (
                              <li key={idx} className="flex">
                                <span className={`w-32 font-semibold ${darkMode ? "text-blue-400" : "text-blue-600"}`}>{functName}</span>
                                <span className="mx-2">→</span>
                                <span className="flex-1">{el.name}</span>
                              </li>
                            )
                          })
                        }
                      </ol>
                    </div>

                    {/* Résumé Énergie */}
                    <div className={`flex-1 p-4 rounded-lg border shadow-sm ${darkMode ? "bg-red-900/60 border-red-600" : "bg-white border-red-200"}`}>
                      <h4 className={`font-bold mb-3 flex items-center justify-center pb-2 border-b ${darkMode ? "text-red-300 border-red-700" : "text-red-700 border-red-100"}`}>
                        <Zap className="w-4 h-4 mr-2" /> Chaîne d'Énergie
                      </h4>
                      <ol className={`space-y-2 list-none ${darkMode ? "text-gray-200" : "text-gray-700"}`}>
                        {exercises[currentExercise].elements
                          .filter(e => e.chain === "energy")
                          .sort((a, b) => a.position - b.position)
                          .map((el, idx) => {
                             const energyNames = ["Source", "Alimenter", "Distribuer", "Convertir", "Transmettre", "Action"]
                             return (
                              <li key={idx} className="flex">
                                <span className={`w-32 font-semibold ${darkMode ? "text-red-400" : "text-red-600"}`}>{energyNames[el.position]}</span>
                                <span className="mx-2">→</span>
                                <span className="flex-1">{el.name}</span>
                              </li>
                            )
                          })
                        }
                      </ol>
                    </div>
                  </div>
                </div>
              )}

              {/* === ÉCRAN DE FIN DE JEU === */}
              {showNextExercise && currentExercise === exercises.length - 1 && (
                <div className={`mt-10 p-8 rounded-2xl shadow-2xl border-2 animate-intro-slide ${darkMode ? "bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 border-purple-500" : "bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-100 border-purple-400"}`}>
                  <div className="flex flex-col items-center text-center">
                    <Trophy className={`w-16 h-16 mb-4 ${darkMode ? "text-yellow-400" : "text-yellow-500"} animate-bounce`} />
                    <h2 className={`text-3xl md:text-4xl font-extrabold mb-6 ${darkMode ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-purple-300" : "text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-purple-600"}`}>
                      Félicitations, Jeu Terminé !
                    </h2>
                    
                    <p className={`text-lg md:text-xl mb-8 max-w-3xl leading-relaxed ${darkMode ? "text-purple-100" : "text-purple-900"}`}>
                      Vous avez brillamment complété tous les exercices ! Vous maîtrisez désormais la façon dont les systèmes automatisés fonctionnent : 
                      <br/><br/>
                      <span className="flex items-center justify-center gap-2">
                        <Lightbulb className={`w-6 h-6 ${darkMode ? "text-blue-400" : "text-blue-600"}`} />
                        <strong>La Chaîne d'Information décide (le cerveau)</strong>
                      </span>
                      <span className="flex items-center justify-center gap-2 mt-2">
                        <Zap className={`w-6 h-6 ${darkMode ? "text-red-400" : "text-red-600"}`} />
                        <strong>La Chaîne d'Énergie agit (les muscles)</strong>
                      </span>
                      <br/>
                      Continuez d'observer les objets autour de vous avec ce nouveau regard d'ingénieur !
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-10">
                       <div className={`p-6 rounded-xl flex flex-col items-center justify-center shadow-inner ${darkMode ? "bg-black/20" : "bg-white/50"}`}>
                         <Award className={`w-10 h-10 mb-2 ${darkMode ? "text-blue-400" : "text-blue-500"}`} />
                         <div className={`text-sm uppercase tracking-wider font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Score Final</div>
                         <div className={`text-4xl font-black flex items-baseline gap-1 ${darkMode ? "text-white" : "text-gray-900"}`}>{score} <span className="text-xl">pts</span></div>
                       </div>
                       
                       <div className={`p-6 rounded-xl flex flex-col items-center justify-center shadow-inner ${darkMode ? "bg-black/20" : "bg-white/50"}`}>
                         <Medal className={`w-10 h-10 mb-2 ${darkMode ? "text-purple-400" : "text-purple-500"}`} />
                         <div className={`text-sm uppercase tracking-wider font-bold mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Badges Récoltés</div>
                         <div className={`text-4xl font-black flex items-baseline gap-1 ${darkMode ? "text-white" : "text-gray-900"}`}>{badgesObtenus.length} <span className="text-xl">/{badges.length}</span></div>
                       </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
                      <button
                        onClick={() => setShowProgressModal(true)}
                        className={`px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-transform transform hover:scale-105 flex items-center justify-center w-full sm:w-auto ${
                          darkMode 
                            ? "bg-purple-600 text-white hover:bg-purple-500" 
                            : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                      >
                        <Trophy className="w-5 h-5 mr-3" />
                        Voir ma progression
                      </button>
                      
                      <button
                        onClick={reinitialiserStatistiques}
                        className={`px-8 py-4 rounded-xl font-bold text-lg shadow-md transition-transform transform hover:scale-105 flex items-center justify-center w-full sm:w-auto border-2 ${
                          darkMode 
                            ? "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800" 
                            : "bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <RotateCcw className="w-5 h-5 mr-3" />
                        Rejouer le jeu
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Raccourcis mode développeur en bas de page */}
        {devModeUnlocked && (
          <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-600">
            <div className="text-center mb-4">
              <h3 className={`text-lg font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                Raccourcis Mode Développeur
              </h3>
            </div>

            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-3">
                <label className={`font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Aller à :
                </label>
                <select
                  className={`px-4 py-2 rounded-lg font-semibold border focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-colors ${
                    darkMode 
                      ? "bg-gray-800 text-white border-gray-600 focus:border-blue-500" 
                      : "bg-white text-gray-800 border-gray-300 focus:border-blue-500"
                  }`}
                  value={currentMode === "lesson" ? "lesson" : currentExercise.toString()}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "lesson") {
                      setCurrentMode("lesson");
                    } else {
                      const idx = parseInt(val, 10);
                      setCurrentMode("exercises");
                      setCurrentExercise(idx);
                      // S'assurer que le niveau est bien débloqué en mode Dev
                      if (!exercicesDebloques.includes(idx)) {
                        setExercicesDebloques((prev) => {
                          const newUnlocked = new Set([...prev]);
                          for (let i = 0; i <= idx; i++) newUnlocked.add(i);
                          return Array.from(newUnlocked);
                        });
                      }
                    }
                    // Reset selected element/states during jump
                    setSelectedElement(null);
                    setShowNextExercise(false);
                    setErreursDansExercice(0);
                  }}
                >
                  <option value="lesson">Exercice 1 (Leçon)</option>
                  {exercises.map((ex, idx) => (
                    <option key={idx} value={idx.toString()}>
                      Exercice {idx + 2} : {ex.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center space-x-4 flex-wrap gap-2">
              {currentMode === "lesson" ? (
                <button
                  onClick={completerLecon}
                  disabled={isLessonComplete()}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isLessonComplete()
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : darkMode
                        ? "bg-blue-900 text-blue-200 border border-blue-700 hover:bg-blue-800"
                        : "bg-blue-100 text-blue-600 border border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Compléter l'Exercice 1
                </button>
              ) : (
                <button
                  onClick={completerExerciceActuel}
                  disabled={exercicesTermines.includes(currentExercise)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    exercicesTermines.includes(currentExercise)
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : darkMode
                        ? "bg-green-900 text-green-200 border border-green-700 hover:bg-green-800"
                        : "bg-green-100 text-green-600 border border-green-600 hover:bg-green-50"
                  }`}
                >
                  Compléter l'Exercice {currentExercise + 2}
                </button>
              )}

              {currentMode === "lesson" ? (
                <button
                  onClick={resetLesson}
                  disabled={isLessonAtZero}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isLessonAtZero
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : darkMode
                        ? "bg-orange-900 text-orange-200 border border-orange-700 hover:bg-orange-800"
                        : "bg-orange-100 text-orange-600 border border-orange-600 hover:bg-orange-50"
                  }`}
                >
                  Réinitialiser l'Exercice 1
                </button>
              ) : (
                <button
                  onClick={resetExercise}
                  disabled={isExerciseAtZero}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isExerciseAtZero
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : darkMode
                        ? "bg-orange-900 text-orange-200 border border-orange-700 hover:bg-orange-800"
                        : "bg-orange-100 text-orange-600 border border-orange-600 hover:bg-orange-50"
                  }`}
                >
                  Réinitialiser l'Exercice {currentExercise + 2}
                </button>
              )}

              <button
                onClick={reinitialiserStatistiques}
                disabled={areStatsAtZero}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  areStatsAtZero
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : darkMode
                      ? "bg-red-900 text-red-200 border border-red-700 hover:bg-red-800"
                      : "bg-red-100 text-red-600 border border-red-600 hover:bg-red-50"
                }`}
              >
                Réinitialiser toutes les stats
              </button>
            </div>
          </div>
        )}

        {/* Footer avec mention développeur et bouton mode développeur */}
        <div className="mt-16 pt-8 border-t border-gray-300 dark:border-gray-600">
          <div className="flex justify-between items-center">
            <div className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              Développée par <span className="font-semibold">David Trafial</span>
            </div>
            <button
              onClick={() => setShowDevMode(true)}
              className={`p-2 rounded-full transition-colors ${
                darkMode
                  ? "text-gray-500 hover:text-gray-400 hover:bg-gray-700"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
              title="Mode développeur"
            >
              <Cpu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modale de confirmation de réinitialisation */}
      {showConfirmReset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[70] animate-modal-backdrop">
          <div className={`p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 animate-scaleIn ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h3 className={`text-xl font-bold mb-3 ${darkMode ? "text-white" : "text-gray-800"}`}>
              ⚠️ Réinitialisation complète
            </h3>
            <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              Êtes-vous sûr de vouloir réinitialiser <strong>toutes</strong> les statistiques ? Cette action est irréversible.
              Votre score, vos badges et votre progression seront perdus.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowConfirmReset(false)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${darkMode ? "bg-gray-700 text-gray-300 hover:bg-gray-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                Annuler
              </button>
              <button
                onClick={confirmerReinitialisation}
                className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Tout réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChainesInfoEnergie
