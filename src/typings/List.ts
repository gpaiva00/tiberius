export interface ListProps {
  items: ListItemProps[]
  id: string
  name: string
  icon?: string
  userId: string
  position: number
}

export interface ListItemProps {
  id: string
  text: string
  completed: boolean
}
