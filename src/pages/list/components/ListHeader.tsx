import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { CompletedItemsCount, Divider, FormattedItemText } from '@/shared/components'

import { useChangeLog } from '@/hooks'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, LIST_SETTINGS_ROUTE } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'

import { Archive, ListBullets } from '@phosphor-icons/react'
interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function Header({ selectedList }: ListContentHeaderProps) {
  const { haveSeenChangeLog } = useChangeLog()

  return (
    <div>
      <header className="flex items-center justify-between gap-2 rounded-t-default p-2">
        <div className="flex items-center gap-2 md:gap-4">
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
          <h1 className="text-xl font-black dark:text-darkTextLight">
            {selectedList?.type === 'default' ? 'Para hoje' : 'Itens gerais'}
          </h1>
        </div>

        <div className="flex flex-col items-end">
          <Link
            to={LIST_SETTINGS_ROUTE}
            className="flex max-w-xs items-center truncate text-base font-bold text-primary hover:underline dark:text-darkPrimary md:max-w-[15.625rem]"
          >
            {selectedList?.type === ListTypesProps.GENERAL && (
              <Archive
                {...DEFAULT_ICON_PROPS}
                className="mr-1 md:mr-2"
              />
            )}
            {FormattedItemText(selectedList?.name)}
          </Link>
          <CompletedItemsCount
            size="sm"
            items={selectedList?.items || []}
          />
        </div>
      </header>
      <Divider />
    </div>
  )
}
