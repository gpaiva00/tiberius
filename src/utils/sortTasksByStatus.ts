import { TaskProps } from '@/typings/List'

export interface SortTasksByStatusProps {
  completed: TaskProps[]
  notCompleted: TaskProps[]
}

export const sortTasksByStatus = (listItems: TaskProps[]): SortTasksByStatusProps => {
  const [completed, notCompleted] = listItems.reduce(
    (acc, item) => {
      if (item.completed) {
        acc[0].push(item)
      } else {
        acc[1].push(item)
      }
      return acc
    },
    [[], []] as TaskProps[][]
  )

  return {
    notCompleted,
    completed,
  }
}
