import { createContext, useContext, useEffect, useState } from 'react'

import { getChangeLog as getChangeLogService } from '@/services/changelog'

import { getFromStorage, setToStorage } from '@/utils'

import { HAVE_SEEN_CHANGE_LOG_DATE_KEY } from '@/constants'
import { ChangeLogListProps } from '@/pages/changeLog/typings/ChangeLog'

interface ChangeLogProps {
  children: React.ReactNode
}

interface UseChangeLogProps {
  changeLog: ChangeLogListProps | null
  haveSeenChangeLog: boolean
  markChangeLogAsSeen: () => void
}

const changeLogContext = createContext<UseChangeLogProps>({} as UseChangeLogProps)

export const ChangeLogProvider = ({ children }: ChangeLogProps) => {
  const [changeLog, setChangeLog] = useState<ChangeLogListProps>({} as ChangeLogListProps)
  const [haveSeenChangeLog, setHaveSeenChangeLog] = useState<boolean>(true)

  const handleSetHaveSeenChangeLog = (changeLog: ChangeLogListProps) => {
    const haveSeenChangeLogDateTimestamp = getFromStorage(HAVE_SEEN_CHANGE_LOG_DATE_KEY)
    const changeLogDateTimestamp = changeLog?.createdAt?.toDate().getTime()

    if (
      changeLogDateTimestamp &&
      (!haveSeenChangeLogDateTimestamp || changeLogDateTimestamp > haveSeenChangeLogDateTimestamp)
    ) {
      setHaveSeenChangeLog(false)
      return
    }
    setHaveSeenChangeLog(true)
  }

  const markChangeLogAsSeen = () => {
    setHaveSeenChangeLog(true)
    setToStorage(HAVE_SEEN_CHANGE_LOG_DATE_KEY, changeLog?.createdAt.toDate().getTime())
  }

  const getChangeLog = async () => {
    const changeLogDocs = await getChangeLogService()
    setChangeLog(changeLogDocs)
  }

  useEffect(() => {
    getChangeLog()
  }, [])

  useEffect(() => {
    if (changeLog) handleSetHaveSeenChangeLog(changeLog)
  }, [changeLog])

  return (
    <changeLogContext.Provider
      value={{
        changeLog,
        haveSeenChangeLog,
        markChangeLogAsSeen,
      }}
    >
      {children}
    </changeLogContext.Provider>
  )
}

export const useChangeLog = () => {
  const context = useContext(changeLogContext)

  return context
}
