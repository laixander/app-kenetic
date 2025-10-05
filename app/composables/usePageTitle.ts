// composables/usePageTitle.ts
import { computed } from 'vue'
import { useRoute } from '#imports'
import { customTitles } from '~/data'
import { useNotifications } from '~/composables/useNotifications'
import { notificationItems } from '~/data'

export function usePageTitle() {
  const route = useRoute()
  const { notifications } = useNotifications(notificationItems)

  const pageTitleParts = computed<string[]>(() => {
    const name = String(route.name ?? '')

    // Notifications detail → Inbox › Notification Title
    if (name.startsWith('inbox-id')) {
      const id = Number(route.params.id)
      const notif = notifications.value.find((n) => n.id === id)
      return ['Inbox', notif ? notif.title : '']
    }

    // Custom title override
    if (customTitles[name]) {
      return customTitles[name].split(' › ')
    }

    // Otherwise build from route.path segments
    const segments = route.path
      .split('/')
      .filter(Boolean) // remove empty
      .map((seg) =>
        seg
          .replace(/[-._]/g, ' ')
          .replace(/([a-z])([A-Z])/g, '$1 $2')
          .replace(/\b\w/g, (l) => l.toUpperCase())
      )

    return segments.length ? segments : ['Home']
  })

  return {
    pageTitleParts,
    pageTitle: computed(() => pageTitleParts.value.join(' › ')), // fallback string
  }
}