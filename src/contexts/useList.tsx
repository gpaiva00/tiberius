import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { subscribeToUserLists, updateList as updateListOnDB, deleteList as deleteListOnDB } from '@/services/list'

import { useAuth } from '@/contexts/useAuth'

import { GENERAL_LIST, STORAGE_SELECTED_LIST_ID_KEY, WHATS_NEW_LIST } from '@/consts'

import { getFromStorage, setToStorage } from '@utils/storage'
import { sortListsByPosition } from '@/utils/sortListsByPosition'

import { ListProps, ListTypesProps } from '@/typings/List'

interface ListProviderProps {
  children: ReactNode
}

interface UseListProps {
  selectedList: ListProps | null
  lists: ListProps[]
  updateList: (list: ListProps) => Promise<void>
  deleteList: (listID: ListProps['id']) => Promise<void>
  saveSelectedList: (list: ListProps) => void
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
      saveSelectedList(lists[0])
      return
    }

    const selectedList = lists.find((list) => list.id === selectedListOnStorage)
    saveSelectedList(selectedList as ListProps)
  }

  const updateList = async (list: ListProps) => {
    setSelectedList(list)
    await updateListOnDB(list)
  }

  const saveSelectedList = (list: ListProps) => {
    setSelectedList(list)
    setToStorage(STORAGE_SELECTED_LIST_ID_KEY, list.id)
  }

  const deleteList = async (listID: ListProps['id']) => {
    // select user's general list as default selected list
    if (selectedList?.id === listID) {
      const userGeneralList = lists.find((list) => list.type === ListTypesProps.GENERAL) as ListProps
      saveSelectedList(userGeneralList)
    }

    await deleteListOnDB(listID)
  }

  useEffect(() => {
    const unsubscribe = subscribeToUserLists({
      userId,
      observer: (lists) => {
        let newLists: ListProps[] = []

        lists.forEach((list) => {
          newLists.push(list.data() as ListProps)
        })

        newLists = sortListsByPosition(newLists)
        console.warn({ newLists })

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
        saveSelectedList,
        lists,
        deleteList,
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
