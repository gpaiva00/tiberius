export interface ListProps {
  items: ListItemProps[]
  id: string
  name: string
  icon?: string
  userId: string
}

export interface ListItemProps {
  id: string
  text: string
  completed: boolean
  position?: number
}
