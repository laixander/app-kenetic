import type { NavigationMenuItem } from '@nuxt/ui'

export const navigationMenuItemsByRole: Record<string, NavigationMenuItem[]> = {
    'Employee': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Dashboard', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Profile Management', icon: 'i-lucide-star', to: '/profile-management'  },
            { label: 'Talent Identification', icon: 'i-lucide-bot', to: '/talent-identification'  },
            // { label: 'Campus Fitness', icon: 'i-lucide-dumbbell', to: '/campus-fitness' },
            { label: 'Assessment Center', icon: 'i-lucide-clipboard-check', to: '/assessment-center' },
            { label: 'Benchmarking', icon: 'i-lucide-activity', to: '/benchmarking'  },
            { label: 'Team Management', icon: 'i-lucide-dribbble', to: '/team-management'  },
            { label: 'Reports & Analytics', icon: 'i-lucide-chart-column', to: '/reports-analytics'  },
            // { label: 'Inbox', icon: 'i-lucide-inbox', to: '/inbox'  }
        ]
    ],
    'Head': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Dashboard', icon: 'i-lucide-folder-open', to: '/dashboard'  },
        ]
    ],
    'Administrator': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Dashboard', icon: 'i-lucide-folder-open', to: '/dashboard'  },
        ]
    ]
}

import type { TabItem } from '~/types/ui'

export const formBuilderTabs: TabItem[] = [
    {
        label: 'Fields',
        icon: 'i-lucide-text-cursor-input',
        to: '/assessment-center/assessment-forms/form-builder'
    },
    {
        label: 'Preview',
        icon: 'i-lucide-file-text',
        to: '/assessment-center/assessment-forms/form-builder/preview'
    },
    {
        label: 'Settings',
        icon: 'i-lucide-settings',
        to: '/assessment-center/assessment-forms/form-builder/settings'
    }
]

export const assessmentTabs: TabItem[] = [
    {
        label: 'Assessment Repository',
        icon: 'i-lucide-book-marked',
        to: '/assessment-center'
    },
    {
        label: 'Assessment Forms',
        icon: 'i-lucide-clipboard-list',
        to: '/assessment-center/assessment-forms'
    },
    {
        label: 'Scheduled Assessments',
        icon: 'i-lucide-calendar',
        to: '/assessment-center/scheduled-assessments'
    }
]

export const talentTabs: TabItem[] = [
    {
        label: 'Overview',
        icon: 'i-lucide-file-chart-column',
        to: '/talent-identification'
    },
    {
        label: 'Data Import',
        icon: 'i-lucide-hard-drive-upload',
        to: '/talent-identification/data-import'
    },
    {
        label: 'Benchmarking',
        icon: 'i-lucide-activity',
        to: '/talent-identification/benchmarking'
    },
    {
        label: 'AI Prediction',
        icon: 'i-lucide-sparkles',
        to: '/talent-identification/ai-prediction'
    },
    {
        label: 'Reports',
        icon: 'i-lucide-clipboard-list',
        to: '/talent-identification/reports'
    }
]

export const campusFitnessTabs: TabItem[] = [
    {
        label: 'Population Overview',
        icon: 'i-lucide-users',
        to: '/campus-fitness'
    },
    {
        label: 'Performance Rankings',
        icon: 'i-lucide-bar-chart-3',
        to: '/campus-fitness/performance-rankings'
    },
    {
        label: 'Benchmarking',
        icon: 'i-lucide-activity',
        to: '/campus-fitness/benchmarking'
    }
]

export const benchmarkingTabs: TabItem[] = [
    {
        label: 'Overview',
        icon: 'i-lucide-file-chart-column',
        to: '/benchmarking'
    },
    {
        label: 'Norm Creation',
        icon: 'i-lucide-clipboard-list',
        to: '/benchmarking/norm-creation'
    },
    {
        label: 'Demographics',
        icon: 'i-lucide-user-check',
        to: '/benchmarking/demographics'
    },
    {
        label: 'Comparison',
        icon: 'i-lucide-columns-2',
        to: '/benchmarking/comparison'
    },
    {
        label: 'Management',
        icon: 'i-lucide-settings-2',
        to: '/benchmarking/management'
    }
]

export const teamManagementTabs: TabItem[] = [
    {
        label: 'Team Rosters',
        icon: 'i-lucide-users',
        to: '/team-management'
    },
    {
        label: 'Performance',
        icon: 'i-lucide-bar-chart-3',
        to: '/team-management/performance'
    },
    {
        label: 'Training',
        icon: 'i-lucide-footprints',
        to: '/team-management/training'
    },
    {
        label: 'Schedule',
        icon: 'i-lucide-calendar',
        to: '/team-management/schedule'
    }
]

export const reportsAnalyticsTabs: TabItem[] = [
    {
        label: 'Population Overview',
        icon: 'i-lucide-users',
        to: '/reports-analytics'
    },
    {
        label: 'Performance Rankings',
        icon: 'i-lucide-chart-candlestick',
        to: '/reports-analytics/perfomance-rankings'
    },
    {
        label: 'Department Summary',
        icon: 'i-lucide-pie-chart',
        to: '/reports-analytics/department-summary'
    },
    {
        label: 'Detailed Reports',
        icon: 'i-lucide-file-chart-column',
        to: '/reports-analytics/detailed-reports'
    }
]