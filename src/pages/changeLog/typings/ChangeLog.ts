import { Timestamp } from 'firebase/firestore'

export interface ChangeLogListProps {
  id: string
  description: string
  icon?: string
  version: string
  createdAt: Timestamp
  items: ChangeLogTaskProps[]
}

export interface ChangeLogTaskProps {
  id: string
  text: string
  completed: boolean
}
