

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
    label: 'Total Assessment',
    count: 24,
    icon: 'i-lucide-file-text',
    color: 'primary',
  },
  {
    label: 'Completed',
    count: "1,247",
    icon: 'i-lucide-circle-check-big',
    color: 'success',
  },
  {
    label: 'This Week',
    count: 18,
    icon: 'i-lucide-clock',
    color: 'orange',
  }
]

export const talentStatCards: StatCardProps[] = [
  {
    label: 'Students Assessed',
    count: 243,
    icon: 'i-lucide-users',
    color: 'primary',
  },
  {
    label: 'Sports Analyzed',
    count: 84,
    icon: 'i-lucide-dribbble',
    color: 'amber',
  },
  {
    label: 'Prediction Accuracy',
    count: '98%',
    icon: 'i-lucide-sparkles',
    color: 'success',
  },
  {
    label: 'Avg. Performance',
    count: '89%',
    icon: 'i-lucide-target',
    color: 'error',
  }
]

export const profileManagementStatCards: StatCardProps[] = [
  {
    label: 'Total Athletes',
    count: 24,
    icon: 'i-lucide-users',
    color: 'primary',
    trendValue: '+12%',
  },
  {
    label: 'Top Performers',
    count: 18,
    icon: 'i-lucide-medal',
    color: 'success',
    trendDescription: 'Above 90% fitness',
  },
  {
    label: 'Need Attention',
    count: 5,
    icon: 'i-lucide-clipboard-pen-line',
    color: 'amber',
    trendValue: '-2%',
  },
  {
    label: 'Avg Fitness Level',
    count: '89%',
    icon: 'i-lucide-target',
    color: 'error',
    trendValue: '+3.1%',
  }
]


export const teamStatCards: StatCardProps[] = [
  {
    label: 'Total Teams',
    count: 12,
    icon: 'i-lucide-users',
    color: 'primary',
    trendValue: '+2%',
  },
  {
    label: 'Active Members',
    count: 284,
    icon: 'i-lucide-user',
    color: 'success',
    trendValue: '+12%',
  },
  {
    label: 'Scheduled Trainings',
    count: 10,
    icon: 'i-lucide-dumbbell',
    color: 'amber',
    trendDescription: 'Across all teams',
  }
]

export const benchmarkStatCards: StatCardProps[] = [
  {
    label: 'Active Benchmarks',
    count: 24,
    icon: 'i-lucide-target',
    color: 'secondary',
    trendValue: '+2.1%',
  },
  {
    label: 'Athletes Assessed',
    count: '1,247',
    icon: 'i-lucide-users',
    color: 'success',
    trendValue: '+18',
  },
  {
    label: 'Performance Metrics',
    count: '18',
    icon: 'i-lucide-bar-chart-3',
    color: 'amber',
    trendDescription: 'Tracking across sports'
  },
  {
    label: 'Updated Norms',
    count: '6',
    icon: 'i-lucide-refresh-cw',
    color: 'error',
    trendDescription: 'Last 30 days'
  }
]

export const performanceStatCards: StatCardProps[] = [
  {
    label: 'Avg Fitness Score',
    count: 85.7,
    icon: 'i-lucide-target',
    color: 'primary',
    trendValue: '+12%',
  },
  {
    label: 'Performance Goals',
    count: "12/15",
    icon: 'i-lucide-users',
    color: 'success',
    trendDescription: 'Goals achieved this month',
  },
  {
    label: 'Top Performers',
    count: 8,
    icon: 'i-lucide-bar-chart-3',
    color: 'amber',
    trendDescription: 'Above benchmark',
  },
  {
    label: 'Recent Tests',
    count: 24,
    icon: 'i-lucide-refresh-cw',
    color: 'error',
    trendDescription: 'Tests completed this week',
  }
]

export const analyticStatCards: StatCardProps[] = [
  {
    label: 'Total Students',
    count: '1,412',
    icon: 'i-lucide-users',
    color: 'primary',
    trendDescription: 'Complete Population',
  },
  {
    label: 'Campus Average Score',
    count: "73.2",
    icon: 'i-lucide-map-pinned',
    color: 'success',
    trendValue: '+2.1',
  },
  {
    label: 'Fitness Categories',
    count: 5,
    icon: 'i-lucide-dumbbell',
    color: 'amber',
    trendDescription: 'Percentile-based',
  },
  {
    label: 'Improvement Rate',
    count: '78%',
    icon: 'i-lucide-target',
    color: 'error',
    trendDescription: 'Students improving',
  }
]

import type { FormCardProps } from '~/types/features'

export const formCards: FormCardProps[] = [
  {
    color: 'blue',
    icon: 'i-lucide-ruler',
    title: 'Physical Assessment',
    description: 'Body measurements, biometric data, and physical condition',
    timestamp: '15 mins'
  },
  {
    color: 'green',
    icon: 'i-lucide-trophy',
    title: 'Skill Assessment',
    description: 'Sport-specific skills, technique evaluation, and proficiency tests',
    timestamp: '2 hrs'
  },
  {
    color: 'purple',
    icon: 'i-lucide-activity',
    title: 'Performance Test',
    description: 'Speed, strength, endurance, and power measurements',
    timestamp: '2 hrs'
  },
  {
    color: 'orange',
    icon: 'i-lucide-heart',
    title: 'Wellness Survey',
    description: 'Sleep, stress, motivation, and overall wellbeing assessment',
    timestamp: '2 hrs'
  },
  {
    color: 'pink',
    icon: 'i-lucide-info',
    title: 'Injury Assessment',
    description: 'Injury history, pain levels, and rehabilitation progress',
    timestamp: '2 hrs'
  }
]

export const inputCards: FormCardProps[] = [
  {
    color: 'gray',
    icon: 'i-lucide-type',
    title: 'Full Name',
    description: 'Enter athlete name and other personal details',
    tag: 'Text',
    timestamp: '15 mins'
  },
  {
    color: 'gray',
    icon: 'i-lucide-ruler',
    title: 'Height & Weight',
    description: 'Record physical measurements in numeric format',
    tag: 'Number',
    timestamp: '2 hrs'
  },
  {
    color: 'gray',
    icon: 'i-lucide-calendar',
    title: 'Date of Birth',
    description: 'Select athlete’s birth date or competition schedule',
    tag: 'Date',
    timestamp: '2 hrs'
  },
  {
    color: 'gray',
    icon: 'i-lucide-list',
    title: 'Sport Category',
    description: 'Choose athlete’s sport type, event, or position',
    tag: 'Select',
    timestamp: '2 hrs'
  },
  {
    color: 'gray',
    icon: 'i-lucide-square-check',
    title: 'Injury History',
    description: 'Mark past injuries, medical conditions, or clear status',
    tag: 'Checkbox',
    timestamp: '2 hrs'
  }
]

export const devices = [
  {
    id: 1,
    icon: 'i-lucide-webcam',
    description: { title: 'AI Sports Analysis Camera', details: 'Video Analysis' },
    tags: ['Movement Efficiency', 'Technique Rating', 'Injury Prevention', 'Real-time Tracking'],
    highlights: { status: 'Connected', signal: 90, battery: 80 },
    lastSynced: '2 hours ago',
    version: '2.1.0'
  },
  {
    id: 2,
    icon: 'i-lucide-camera',
    description: { title: 'High-Speed Motion Camera Pro', details: 'Video Analysis' },
    tags: ['Motion Capture', 'Biomechanics'],
    highlights: { status: 'Calibrating', signal: 50, battery: 45 },
    lastSynced: '2 hours ago',
    version: '1.4.2'
  },
  {
    id: 3,
    icon: 'i-lucide-activity',
    description: { title: 'Heart Rate Monitor Set', details: 'Wearable' },
    tags: ['Data Sync', 'Team Dashboard', 'AI Insights'],
    highlights: { status: 'Disconnected', signal: 10, battery: 15 },
    lastSynced: '2 hours ago',
    version: '3.0.1'
  },
  {
    id: 4,
    icon: 'i-lucide-heart',
    description: { title: 'VO2 Max Analyzer', details: 'Cardio' },
    tags: ['Real-time Tracking', 'GPS Data', 'Speed Analysis', 'Stamina Score'],
    highlights: { status: 'Connected', signal: 50, battery: 10 },
    lastSynced: '2 hours ago',
    version: '4.5.3'
  },
  {
    id: 5,
    icon: 'i-lucide-activity',
    description: { title: 'Heart Rate Monitor Set', details: 'Wearable' },
    tags: ['Heart Rate', 'VO2 Max', 'Sleep Monitoring'],
    highlights: { status: 'Disconnected', signal: 50, battery: 45 },
    lastSynced: '2 hours ago',
    version: '3.0.1'
  },
  {
    id: 6,
    icon: 'i-lucide-video',
    description: { title: 'AI Sports Analysis Camera', details: 'Video Analysis' },
    tags: ['Form Correction', 'Workout Guidance'],
    highlights: { status: 'Connected', signal: 90, battery: 80 },
    lastSynced: '2 hours ago',
    version: '2.1.0'
  },
];