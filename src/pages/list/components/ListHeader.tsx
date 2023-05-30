import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { CompletedItemsCount, Divider, FormattedItemText } from '@/shared/components'

import { useChangeLog } from '@/hooks'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, LIST_SETTINGS_ROUTE } from '@/consts'
import { ListProps } from '@/typings/List'

import { GearSix, ListBullets } from '@phosphor-icons/react'
interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function Header({ selectedList }: ListContentHeaderProps) {
  const { haveSeenChangeLog } = useChangeLog()

  return (
    <div>
      <header className="flex items-center gap-2 rounded-t-default p-2">
        <Link
          to={LISTS_ROUTE}
          className="icon-button"
        >
          <span
            className={classNames({
              'relative inline-block': !haveSeenChangeLog,
            })}
          >
            <ListBullets {...DEFAULT_ICON_PROPS} />
            {!haveSeenChangeLog && (
              <span className="absolute right-0 top-0 inline-block h-2 w-2 -translate-y-1/2 translate-x-1/2 transform  rounded-full bg-primary"></span>
            )}
          </span>
        </Link>
        {/* list title */}
        <div className="flex w-full items-center gap-2">
          <h1 className="max-w-xs truncate text-xl font-black dark:text-darkTextLight md:max-w-[15.625rem]">
            {FormattedItemText(
              selectedList?.type === 'default' ? selectedList?.name : 'Itens gerais'
            )}
          </h1>
          <CompletedItemsCount
            size="sm"
            items={selectedList?.items || []}
          />
        </div>

        <div className="flex items-end">
          <Link
            to={LIST_SETTINGS_ROUTE}
            className="icon-button"
          >
            <GearSix {...DEFAULT_ICON_PROPS} />
          </Link>
        </div>
      </header>
      <Divider />
    </div>
  )
}
