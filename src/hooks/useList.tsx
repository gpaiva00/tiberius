import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

import { subscribeToUserLists, updateList as updateListOnDB, deleteList as deleteListOnDB } from '@/services/list'

import { useAuth } from '@/hooks/useAuth'

import { STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'

import { getFromStorage, setToStorage } from '@utils/storage'
import { sortListsByPosition } from '@/utils/sortListsByPosition'

import { ChangeLogListProps, ListProps, ListTypesProps } from '@/typings/List'
import { getChangeLog as getChangeLogService } from '@/services/changelog'
import { HAVE_SEEN_CHANGE_LOG_KEY } from '@/consts'

interface ListProviderProps {
  children: ReactNode
}

interface UseListProps {
  selectedList: ListProps | null
  lists: ListProps[]
  updateList: (list: ListProps) => Promise<void>
  deleteList: (listID: ListProps['id']) => Promise<void>
  saveSelectedList: (list: ListProps) => void
  changeLog: ChangeLogListProps | null
  haveSeenChangeLog: boolean
  handleSetHaveSeenChangeLog: () => void
}

const listContext = createContext<UseListProps>({} as UseListProps)

export const ListProvider = ({ children }: ListProviderProps) => {
  const [selectedList, setSelectedList] = useState<ListProps | null>(null)
  const [lists, setLists] = useState<ListProps[]>([])
  const [changeLog, setChangeLog] = useState<ChangeLogListProps | null>(null)
  const [haveSeenChangeLog, setHaveSeenChangeLog] = useState<boolean>(false)

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

  const getChangeLog = async () => {
    const changeLog = await getChangeLogService()

    setHaveSeenChangeLog(haveSeenChangeLog)

    setChangeLog(changeLog)
    setToStorage(HAVE_SEEN_CHANGE_LOG_KEY, true)
  }

  const handleSetHaveSeenChangeLog = () => {
    setHaveSeenChangeLog(true)
    setToStorage(HAVE_SEEN_CHANGE_LOG_KEY, true)
  }

  useEffect(() => {
    getChangeLog()
  }, [])

  useEffect(() => {
    const unsubscribe = subscribeToUserLists({
      userId,
      observer: (lists) => {
        let newLists: ListProps[] = []

        lists.forEach((list) => {
          newLists.push(list.data() as ListProps)
        })

        newLists = sortListsByPosition(newLists)

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
        changeLog,
        haveSeenChangeLog,
        handleSetHaveSeenChangeLog,
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
