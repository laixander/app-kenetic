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