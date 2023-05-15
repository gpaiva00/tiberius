import { DeleteItemsStrategyProps } from '@/pages/listSettings/typings/Options'

export interface ListProps {
  items: ListItemProps[]
  id: string
  name: string
  icon?: string
  userId: string
  position: number
  deleteItemsStrategy: DeleteItemsStrategyProps
}

export interface ListItemProps {
  id: string
  text: string
  completed: boolean
}
