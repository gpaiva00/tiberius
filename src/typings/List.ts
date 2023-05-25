export enum ListTypesProps {
  GENERAL = 'general',
  DEFAULT = 'default',
  WHATS_NEW = 'whats-new',
}

export interface ListProps {
  items: ListItemProps[]
  id: string
  name: string
  icon?: string
  userId: string
  position: number
  type: ListTypesProps
  createdAt: string
  completedAt?: string
}

export interface ListItemProps {
  id: string
  text: string
  completed: boolean
  index?: number
  createdAt: string
  completedAt?: string
  markColor?: 'blue' | 'red' | 'yellow' | 'green'
}
