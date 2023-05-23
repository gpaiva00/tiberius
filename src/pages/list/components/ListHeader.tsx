import { Link } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, LIST_SETTINGS_ROUTE } from '@/consts'

import Divider from '@/shared/components/Divider'
import ProgressBar from '@/shared/components/ProgressBar'
import { ListProps, ListTypesProps } from '@/typings/List'

import { Archive, List } from '@phosphor-icons/react'
import { useList } from '@/hooks/useList'
import classNames from 'classnames'
import CompletedItemsCount from '@/shared/components/CompletedItemsCount'

interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function Header({ selectedList }: ListContentHeaderProps) {
  const { haveSeenChangeLog } = useList()

  return (
    <div>
      <header className="flex h-16 items-center gap-2 rounded-t-default px-2 md:px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link
              to={LISTS_ROUTE}
              className="icon-button"
            >
              <span
                className={classNames({
                  'relative inline-block': !haveSeenChangeLog,
                })}
              >
                <List {...DEFAULT_ICON_PROPS} />
                {!haveSeenChangeLog && (
                  <span className="absolute right-0 top-0 inline-block h-2 w-2 -translate-y-1/2 translate-x-1/2 transform  rounded-full bg-primary"></span>
                )}
              </span>
            </Link>
            <h1 className="ml-2 text-xl font-black lowercase dark:text-darkTextLight md:ml-4 md:text-2xl">
              {selectedList?.type === 'default' ? 'para hoje' : 'itens gerais'}
            </h1>
          </div>

          <div className="flex flex-col items-end">
            <Link
              to={LIST_SETTINGS_ROUTE}
              className="flex max-w-xs items-center truncate text-base text-primary hover:underline dark:text-darkPrimary md:max-w-[15.625rem] md:text-xl"
            >
              {selectedList?.type === ListTypesProps.GENERAL && (
                <Archive
                  {...DEFAULT_ICON_PROPS}
                  className="mr-1 md:mr-2"
                />
              )}
              {selectedList?.name}
            </Link>
            <div className="flex h-[1rem] items-center gap-2">
              <ProgressBar items={selectedList?.items || []} />
              <CompletedItemsCount
                size="sm"
                items={selectedList?.items || []}
              />
            </div>
          </div>
        </div>
      </header>
      <Divider />
    </div>
  )
}
