import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useChangeLog } from '@/hooks'

import { formattedItemText } from '@/pages/list/components/ItemTextFormatted'
import { Card, CardContentContainer, Divider, FooterContainer } from '@/shared/components'

import { LISTS_ROUTE } from '@/consts'

export default function ChangeLog() {
  const { haveSeenChangeLog, markChangeLogAsSeen, changeLog } = useChangeLog()
  const navigate = useNavigate()

  useEffect(() => {
    if (haveSeenChangeLog) {
      navigate(-1)
      return
    }

    markChangeLogAsSeen()
  }, [])

  return (
    <Card>
      {/* header */}
      <header className="flex h-16 items-center gap-2 rounded-t-default px-2 md:px-4">
        <div className="flex flex-1 items-center justify-between">
          <h1 className="ml-2 text-xl font-black lowercase dark:text-darkTextLight md:ml-4 md:text-2xl">
            <span className="mr-2 md:mr-4">🎉</span>
            novidades
          </h1>
        </div>
      </header>
      <Divider />

      <CardContentContainer>
        <div className="p-2 pb-2 md:p-4">
          <h4 className="dark:text-darkTextLight">{changeLog?.description}</h4>
        </div>
        {!!changeLog?.items &&
          changeLog.items.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-row items-center p-2 md:p-4">
                <div className="mr-2 flex items-center gap-1 md:mr-4">
                  <input
                    className="default-checkbox"
                    type="checkbox"
                    checked={item.completed}
                  />
                </div>
                <div className="flex flex-1">{formattedItemText(item.text)}</div>
              </div>
              {index !== changeLog?.items.length - 1 && <Divider />}
            </div>
          ))}
      </CardContentContainer>
      <Divider />
      <FooterContainer>
        <div className="flex flex-1 items-center justify-center">
          <Link
            to={LISTS_ROUTE}
            className="primary-button"
          >
            vamos explorar!
          </Link>
        </div>
      </FooterContainer>
    </Card>
  )
}
