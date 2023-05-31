import { ListItemProps } from '@/typings/List'

export interface SortListItemsByStatusProps {
  completed: ListItemProps[]
  notCompleted: ListItemProps[]
}

export const sortListItemsByStatus = (listItems: ListItemProps[]): SortListItemsByStatusProps => {
  const [completed, notCompleted] = listItems.reduce(
    (acc, item) => {
      if (item.completed) {
        acc[0].push(item)
      } else {
        acc[1].push(item)
      }
      return acc
    },
    [[], []] as ListItemProps[][]
  )

  return {
    notCompleted,
    completed,
  }
}
