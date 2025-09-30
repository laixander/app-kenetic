export interface TabItem {
  label: string
  to: string
  icon?: string
}

export interface TabsProps {
  items: TabItem[]
  color?: 'primary' | 'secondary' | 'success' | 'danger' | 'white'
}
