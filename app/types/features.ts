export interface Analysis {
  icon?: string
  title?: string
  value?: string | number
  unit?: string
  label?: string
  color?: string
  topPerformer?: string
  performerAvatar?: string
  details?: string
}

export interface AnalysisCardProps {
  analysis: Analysis[]
}

export interface Athlete {
  id: number
  name: string
  sport: string
  fitnessScore: number
  vo2: number
  trend: "up" | "down" | "steady"
  status: "Excellent" | "Good" | "Average" | "Needs Improvement"
  statusColor: "success" | "warning" | "neutral" | "error"
  lastAssessment: string
  avatar: string
}

export interface AthleteTableProps {
  athletes: Athlete[]
}

export interface InfoCardProps {
  color: string;
  icon: string; 
  title: string;
  description: string;
  timestamp?: string;
  actions?: { label: string; icon?: string; click?: () => void }[]
}