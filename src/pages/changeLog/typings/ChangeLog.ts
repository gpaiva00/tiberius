import { Timestamp } from 'firebase/firestore'

export interface ChangeLogListProps {
  id: string
  description: string
  icon?: string
  version: string
  createdAt: Timestamp
  items: ChangeLogListItemProps[]
}

export interface ChangeLogListItemProps {
  id: string
  text: string
  completed: boolean
}
