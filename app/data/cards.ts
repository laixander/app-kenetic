

import type { Analysis } from '~/types/features'

export const analysis: Analysis[] = [
  {
    icon: 'i-lucide-bar-chart-2',
    title: 'Sport Fit Analysis',
    value: 48.3,
    unit: 'ml/kg/min',
    label: 'Class Average',
    color: 'primary',
    topPerformer: 'Alex Johnson',
    performerAvatar: 'https://i.pravatar.cc/40?img=1',
    details: 'Cardiovascular fitness'
  },
  {
    icon: 'i-lucide-heart-pulse',
    title: 'Resting Heart Rate',
    value: 71.7,
    unit: 'bpm',
    label: 'Class Average',
    color: 'red',
    topPerformer: 'Sophia Lee',
    performerAvatar: 'https://i.pravatar.cc/40?img=2',
    details: 'Cardiovascular efficiency'
  },
  {
    icon: 'i-lucide-armchair',
    title: 'Vertical Jump',
    value: 45.0,
    unit: 'cm',
    label: 'Class Average',
    color: 'green',
    topPerformer: 'Michael Chen',
    performerAvatar: 'https://i.pravatar.cc/40?img=3',
    details: 'Explosive power'
  },
  {
    icon: 'i-lucide-timer',
    title: '40-Yard Dash',
    value: 5.3,
    unit: 'seconds',
    label: 'Class Average',
    color: 'yellow',
    topPerformer: 'Daniel Cruz',
    performerAvatar: 'https://i.pravatar.cc/40?img=4',
    details: 'Sprint speed'
  },
  {
    icon: 'i-lucide-zap',
    title: 'Agility Test',
    value: 9.3,
    unit: 'seconds',
    label: 'Class Average',
    color: 'violet',
    topPerformer: 'Emily Davis',
    performerAvatar: 'https://i.pravatar.cc/40?img=5',
    details: 'Movement efficiency'
  },
  {
    icon: 'i-lucide-rabbit',
    title: 'Beep Test',
    value: 10.4,
    unit: 'level',
    label: 'Class Average',
    color: 'orange',
    topPerformer: 'Liam Martinez',
    performerAvatar: 'https://i.pravatar.cc/40?img=6',
    details: 'Endurance capacity'
  }
]

import type { Athlete } from '~/types/features'

export const athletes: Athlete[] = [
  {
    id: 1,
    name: "Jordan Reyes",
    sport: "Basketball",
    fitnessScore: 9.4,
    vo2: 68.8,
    trend: "up",
    status: "Excellent",
    statusColor: "success",
    lastAssessment: "2024-06-01",
    avatar: "https://i.pravatar.cc/40?u=athlete-1"
  },
  {
    id: 2,
    name: "Miguel Santos",
    sport: "Swimming",
    fitnessScore: 8.7,
    vo2: 65.1,
    trend: "steady",
    status: "Good",
    statusColor: "warning",
    lastAssessment: "2024-06-02",
    avatar: "https://i.pravatar.cc/40?u=athlete-2"
  },
  {
    id: 3,
    name: "Sophia Cruz",
    sport: "Tennis",
    fitnessScore: 7.9,
    vo2: 60.3,
    trend: "down",
    status: "Average",
    statusColor: "neutral",
    lastAssessment: "2024-06-03",
    avatar: "https://i.pravatar.cc/40?u=athlete-3"
  }
]

import type { StatCardProps } from '~/types/models'
export const statCards: StatCardProps[] = [
  {
    label: 'Total Athletes',
    count: 24,
    icon: 'i-lucide-users',
    color: 'secondary',
    hasDetails: true,
    trendValue: '+12%',
  },
  {
    label: 'Top Performers',
    count: 18,
    icon: 'i-lucide-medal',
    color: 'success',
    hasDetails: true,
    trendDescription: 'Above 90% fitness',
  },
  {
    label: 'Need Attention',
    count: 5,
    icon: 'i-lucide-clipboard-signature',
    color: 'warning',
    hasDetails: true,
    trendValue: '-2%',
  },
  {
    label: 'Avg Fitness Level',
    count: '89%',
    icon: 'i-lucide-target',
    color: 'error',
    hasDetails: true,
    trendValue: '+3.1%',
  },
]

export const dataStatCards: StatCardProps[] = [
  {
    label: 'Data Points',
    count: 24,
    icon: 'i-lucide-database',
    color: 'orange',
  },
  {
    label: 'Athletes Tested',
    count: 123,
    icon: 'i-lucide-users',
    color: 'secondary',
  },
  {
    label: 'Connected Devices',
    count: 12,
    icon: 'i-lucide-webcam',
    color: 'success',
  }
]