import classNames from 'classnames'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useChangeLog } from '@/hooks'

import { CardContentContainer, Divider, FooterContainer, MainCard } from '@/shared/components'
import FormattedItemText from '@/shared/components/ItemTextFormatted'

import { LISTS_ROUTE } from '@/consts'
import { ifTextHasLink } from '@/utils'

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
    <MainCard title="🎉 Novidades">
      <CardContentContainer>
        <div className="p-2 pb-2 md:p-4">
          <h4 className="dark:text-darkTextLight">{changeLog?.description}</h4>
        </div>
        {!!changeLog?.items &&
          changeLog.items.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-row items-start py-2 pr-2">
                {/* checkbox */}
                <div className="mx-2 mt-1 flex md:mx-4">
                  <input
                    className="default-checkbox cursor-none"
                    type="checkbox"
                    checked={item.completed}
                  />
                </div>
                {/* item text */}
                <div className="w-full">
                  <div
                    className={classNames(
                      'm-0 max-w-[92%] break-words p-0 dark:text-darkTextLight',
                      {
                        'break-all': ifTextHasLink(item.text),
                      }
                    )}
                  >
                    {FormattedItemText(item.text)}
                  </div>
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
            Quero ver tudo isso!
          </Link>
        </div>
      </FooterContainer>
    </MainCard>
  )
}
