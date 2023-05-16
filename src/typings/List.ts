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
}

export interface ListItemProps {
  id: string
  text: string
  completed: boolean
  index?: number
}

interface ChangeLogListProps {
  id: string
  name: string
  description: string
  icon?: string
  version: string
  createdAt: string
  lastVersion: string
}
