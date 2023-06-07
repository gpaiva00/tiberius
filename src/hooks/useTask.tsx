import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useList } from '@/hooks'
import { ListProps, TaskProps } from '@/typings/List'

export interface TodaysTaskProps extends TaskProps {
  selectedList?: ListProps
}

interface MoveItemProps {
  item: TaskProps | null
  destinationList: ListProps
  moveTaskFallback: () => void
}

interface TaskContextProps {
  moveTask: (props: MoveItemProps) => Promise<void>
  updateTask: (task: TaskProps) => Promise<void>
  duplicateTask: (task: TaskProps) => Promise<void>
  todayTasks: TodaysTaskProps[]
}

interface TaskProviderProps {
  children: ReactNode
}

const taskContext = createContext<TaskContextProps>({} as TaskContextProps)

export const TaskProvider = ({ children }: TaskProviderProps) => {
  const [todayTasks, setTodayTasks] = useState<TaskProps[]>([])

  const { updateList, selectedList, lists } = useList()

  const updateTask = async (task: TaskProps) => {
    const newTasks = [...(selectedList?.items as TaskProps[])]

    const taskIndex = newTasks.findIndex((listItem) => listItem.id === task.id)

    newTasks[taskIndex] = {
      ...task,
      updatedAt: new Date().toISOString(),
    }

    await updateList({
      ...(selectedList as ListProps),
      items: newTasks,
    })
  }

  const duplicateTask = async (task: TaskProps) => {
    const newTask: TaskProps = {
      ...task,
      id: uuidv4(),
      updatedAt: new Date().toISOString(),
    }

    await updateList({
      ...(selectedList as ListProps),
      items: [...(selectedList?.items as TaskProps[]), newTask],
    })
  }

  const moveTask = async ({ item, destinationList, moveTaskFallback }: MoveItemProps) => {
    if (!item) return

    if (!destinationList) return

    await updateList({
      ...(selectedList as ListProps),
      items: selectedList?.items.filter(
        (selectedTask) => selectedTask.id !== item.id
      ) as TaskProps[],
    })

    await updateList({
      ...(destinationList as ListProps),
      items: [
        ...(destinationList.items as TaskProps[]),
        {
          ...item,
        },
      ],
    })

    moveTaskFallback()
  }

  const getTodayTasks = () => {
    const todaysTasks: TodaysTaskProps[] = []

    lists.forEach((list) => {
      list.items.forEach((task) => {
        if (task.completed) return

        if (new Date(task.scheduleDate || '').getDate() === new Date().getDate()) {
          todaysTasks.push({
            ...task,
            selectedList: list,
          })
        }
      })
    })

    setTodayTasks(todaysTasks)
  }

  useEffect(() => {
    getTodayTasks()
  }, [lists])

  return (
    <taskContext.Provider
      value={{
        moveTask,
        todayTasks,
        updateTask,
        duplicateTask,
      }}
    >
      {children}
    </taskContext.Provider>
  )
}

export const useTask = () => {
  const context = useContext(taskContext)

  return context
}
