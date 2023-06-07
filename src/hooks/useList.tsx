import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { useAuth } from '@/hooks'

import {
  deleteList as deleteListOnDB,
  subscribeToUserLists,
  updateList as updateListOnDB,
} from '@/services/list'

import { STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'
import { ListProps, ListTypesProps, TaskProps } from '@/typings/List'
import { getFromStorage, setToStorage, sortListsByPosition, sortTasksByStatus } from '@/utils'
import { SortTasksByStatusProps } from '@/utils/sortTasksByStatus'

interface ListProviderProps {
  children: ReactNode
}

interface UseListProps {
  selectedList: ListProps | null
  lists: ListProps[]
  updateList: (list: ListProps) => Promise<void>
  deleteList: (listID: ListProps['id']) => Promise<void>
  saveSelectedList: (list: ListProps) => void
  isListCompleted: boolean
  sortedTasks: SortTasksByStatusProps
}

const listContext = createContext<UseListProps>({} as UseListProps)

export const ListProvider = ({ children }: ListProviderProps) => {
  const [selectedList, setSelectedList] = useState<ListProps | null>(null)
  const [lists, setLists] = useState<ListProps[]>([])

  const { user } = useAuth()
  const userId = user?.uid || ''

  const saveSelectedList = (list: ListProps) => {
    setSelectedList(list)
    setToStorage(STORAGE_SELECTED_LIST_ID_KEY, list.id)
  }

  const handleSetSelectedList = (lists: ListProps[]) => {
    const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

    const selectedList = lists.find((list) => list.id === selectedListOnStorage) || lists[0]
    saveSelectedList(selectedList)
  }

  const updateList = async (list: ListProps) => {
    setSelectedList(list)
    await updateListOnDB(list)
  }

  const deleteList = async (listID: ListProps['id']) => {
    // select user's general list as default selected list
    if (selectedList?.id === listID) {
      const userGeneralList = lists.find(
        (list) => list.type === ListTypesProps.GENERAL
      ) as ListProps
      saveSelectedList(userGeneralList)
    }

    await deleteListOnDB(listID)
  }

  const sortedTasks = sortTasksByStatus((selectedList?.items || []) as TaskProps[])
  const isListCompleted = sortedTasks.notCompleted.length === 0 && sortedTasks.completed.length > 0

  useEffect(() => {
    const unsubscribe = subscribeToUserLists({
      userId,
      observer: (querySnapshot) => {
        const newLists = querySnapshot.docs.map((doc) => doc.data() as ListProps)
        const sortedLists = sortListsByPosition(newLists)
        setLists(sortedLists)
        handleSetSelectedList(sortedLists)
      },
    })

    return () => unsubscribe()
  }, [userId])

  return (
    <listContext.Provider
      value={{
        selectedList,
        saveSelectedList,
        lists,
        deleteList,
        updateList,
        isListCompleted,
        sortedTasks,
      }}
    >
      {children}
    </listContext.Provider>
  )
}

export const useList = () => {
  const context = useContext(listContext)

  return context
}
