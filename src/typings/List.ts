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
  updatedAt: string
  completedAt?: string
  markColor: ListItemMarksProps | ''
}

export type ListItemMarksProps = 'blue' | 'red' | 'yellow' | 'green'
