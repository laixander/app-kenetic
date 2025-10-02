import type { NavigationMenuItem } from '@nuxt/ui'

export const navigationMenuItemsByRole: Record<string, NavigationMenuItem[]> = {
    'Employee': [
        [
            { label: 'MAIN NAVIGATION', type: 'label' },
            { label: 'Dashboard', icon: 'i-lucide-pie-chart', to: '/dashboard' },
            { label: 'Athlete Management', icon: 'i-lucide-git-branch',  },
            { label: 'Talent Identification', icon: 'i-lucide-users',  },
            { label: 'Campus Fitness', icon: 'i-lucide-file-text',  },
            { label: 'Data Collection', icon: 'i-lucide-folder-open', to: '/data-collection' },
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
        to: '/data-collection/fields'
    },
    {
        label: 'Forms',
        icon: 'i-lucide-text-cursor-input',
        to: '/data-collection/form-builder'
    },
    {
        label: 'Preview',
        icon: 'i-lucide-file-text',
        to: '/data-collection/form-builder/preview'
    },
    {
        label: 'Settings',
        icon: 'i-lucide-settings',
        to: '/data-collection/form-builder/settings'
    }
]

export const dataCollectionTabs: TabItem[] = [
    {
        label: 'Assessment Forms',
        icon: 'i-lucide-clipboard-list',
        to: '/data-collection'
    },
    {
        label: 'Device Management',
        icon: 'i-lucide-monitor-cog',
        to: '/data-collection/device-management'
    },
    {
        label: 'Live Data',
        icon: 'i-lucide-webcam',
        to: '/data-collection/live-data'
    }
]
