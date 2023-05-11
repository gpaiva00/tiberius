import { Link } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE } from '@/consts'

import Divider from '@/components/Divider'
import ProgressBar from '@/components/ProgressBar'
import { ListProps } from '@/typings/List'

import { List } from '@phosphor-icons/react'

interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function ListContentHeader({ selectedList }: ListContentHeaderProps) {
  return (
    <div>
      <header className="flex h-16 items-center gap-2 rounded-t-default px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link
              to={LISTS_ROUTE}
              className="icon-button"
            >
              <List {...DEFAULT_ICON_PROPS} />
            </Link>
            <h1 className="ml-4 text-2xl font-black lowercase dark:text-darkTextLight">para hoje</h1>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Link
              to={''}
              className="max-w-[15.625rem] truncate text-xl text-primary hover:underline dark:text-darkPrimary"
            >
              {selectedList?.name}
            </Link>
            <ProgressBar items={selectedList?.items || []} />
          </div>
        </div>
      </header>
      <Divider />
    </div>
  )
}
