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

  useEffect(() => {
    if (!changeLog) {
      navigate(-1)
      return
    }

    handleSetHaveSeenChangeLog(true)
  }, [])

  return (
    <Card>
      {/* header */}
      <div>
        <header className="flex h-16 items-center gap-2 rounded-t-default px-4">
          <div className="flex flex-1 items-center justify-between">
            <h1 className="ml-4 text-2xl font-black lowercase dark:text-darkTextLight">
              <span className="mr-4">🎉</span>
              novidades
            </h1>
          </div>
        </header>
        <Divider />
      </div>

      <CardContentContainer>
        <div className="p-4 pb-2">
          <h1 className="text-xl dark:text-darkTextLight">veja o que há de novo nessa nova versão do Tiberius!</h1>
        </div>
        {!!changeLog?.items &&
          changeLog.items.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-row items-center p-4">
                <div className="mr-4 flex items-center gap-1">
                  <input
                    className="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-default border-default border-lightenGray outline-none transition-all checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.315rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] dark:border-darkTextGray"
                    type="checkbox"
                    checked={item.completed}
                  />
                </div>
                <div className="flex flex-1">
                  <label
                    className={classNames('max-w-[92%] font-light transition-all dark:text-darkTextLight', {
                      'text-gray line-through opacity-30 hover:line-through dark:text-darkTextGray': item.completed,
                    })}
                  >
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
