import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { subscribeToUserLists, updateList as updateListOnDB } from '@/services/list'

import { useAuth } from '@/contexts/useAuth'

import { STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'

import { getFromStorage, setToStorage } from '@/utils/storage'

import { ListProps } from '@/typings/List'

interface ListProviderProps {
  children: ReactNode
}

interface UseListProps {
  selectedList: ListProps | null
  lists: ListProps[]
  updateList: (list: ListProps) => void
  setSelectedList: (list: ListProps) => void
}

const listContext = createContext<UseListProps>({} as UseListProps)

export const ListProvider = ({ children }: ListProviderProps) => {
  const [selectedList, setSelectedList] = useState<ListProps | null>(null)
  const [lists, setLists] = useState<ListProps[]>([])

  const { user } = useAuth()
  const userId = user?.uid || ''

  const handleSetSelectedList = (lists: ListProps[]) => {
    const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

    if (!selectedListOnStorage) {
      setSelectedList(lists[0])
      setToStorage(STORAGE_SELECTED_LIST_ID_KEY, lists[0].id)
      return
    }

    const selectedList = lists.find((list) => list.id === selectedListOnStorage)

    setSelectedList(selectedList as ListProps)
  }

  const updateList = (list: ListProps) => {
    updateListOnDB(list)
    setSelectedList(list)
  }

  useEffect(() => {
    const unsubscribe = subscribeToUserLists({
      userId,
      observer: (lists) => {
        const newLists: ListProps[] = []

        lists.forEach((list) => {
          newLists.push(list.data() as ListProps)
        })

        // sort lists by position keeping list with id "general" at the top
        newLists.sort((a, b) => {
          if (a.id === 'general') return -1
          if (b.id === 'general') return 1

          return a.position - b.position
        })

        setLists(newLists)
        handleSetSelectedList(newLists)
      },
    })

    return () => unsubscribe()
  }, [userId])

  return (
    <listContext.Provider
      value={{
        selectedList,
        setSelectedList,
        lists,
        updateList,
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
