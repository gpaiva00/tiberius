export interface ChangeLogListProps {
  id: string
  description: string
  icon?: string
  version: string
  createdAt: string
  items: ChangeLogListItemProps[]
}

export interface ChangeLogListItemProps {
  id: string
  text: string
  completed: boolean
}
