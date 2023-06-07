export enum ListTypesProps {
  GENERAL = 'general',
  DEFAULT = 'default',
  WHATS_NEW = 'whats-new',
}

export interface ListProps {
  items: TaskProps[]
  id: string
  name: string
  icon?: string
  userId: string
  position: number
  type: ListTypesProps
  createdAt: string
  completedAt?: string
}

export interface TaskProps {
  id: string
  text: string
  completed: boolean
  index?: number
  updatedAt?: string
  createdAt?: string
  completedAt?: string
  scheduleDate?: string
  markColor: TaskMarksProps | ''
}

export type TaskMarksProps = 'blue' | 'red' | 'yellow' | 'green'
