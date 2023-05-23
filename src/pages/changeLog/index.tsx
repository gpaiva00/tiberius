import { useEffect } from 'react'
import classNames from 'classnames'
import { Link, useNavigate } from 'react-router-dom'

import { useList } from '@/hooks/useList'

import Card from '@/shared/components/Card'
import { CardContentContainer } from '@/shared/components/CardContentContainer'
import Divider from '@/shared/components/Divider'
import ItemTextFormatted from '@/pages/list/components/ItemTextFormatted'
import { FooterContainer } from '@/shared/components/FooterContainer'

import { LISTS_ROUTE } from '@/consts'

export default function ChangeLog() {
  const { changeLog, handleSetHaveSeenChangeLog } = useList()
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!changeLog) {
  //     navigate(-1)
  //     return
  //   }

  //   handleSetHaveSeenChangeLog(true)
  // }, [])

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
          <h4 className="dark:text-darkTextLight">veja o que há de novo nessa nova versão do Tiberius!</h4>
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
                <div className="flex flex-1">
                  <label className="select-text text-sm text-lightenGray line-through opacity-50 transition-all dark:text-darkTextGray md:max-w-[92%] md:text-base">
                    <ItemTextFormatted itemText={item.text} />
                  </label>
                </div>
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
            começar a usar
          </Link>
        </div>
      </FooterContainer>
    </Card>
  )
}
