export interface ListProps {
  items: ListItem[]
  id: string
  name: string
  icon?: string
}

export interface ListItem {
  id: string
  text: string
  completed: boolean
  position?: number
}
