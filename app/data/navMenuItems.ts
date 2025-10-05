import type { NavigationMenuItem } from '@nuxt/ui'

export const navigationMenuItemsByRole: Record<string, NavigationMenuItem[]> = {
    'Employee': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Dashboard', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Athlete Management', icon: 'i-lucide-git-branch',  },
            { label: 'Talent Identification', icon: 'i-lucide-users',  },
            { label: 'Campus Fitness', icon: 'i-lucide-file-text',  },
            { label: 'Assessment Center', icon: 'i-lucide-folder-open', to: '/assessment-center' },
            { label: 'Benchmarking', icon: 'i-lucide-clipboard-check',  },
            { label: 'Team Management', icon: 'i-lucide-chart-column',  },
            { label: 'Reports & Analytics', icon: 'i-lucide-user-plus',  },
            { label: 'Inbox', icon: 'i-lucide-inbox', to: '/inbox'  }
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
