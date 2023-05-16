import { Link } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, LIST_SETTINGS_ROUTE } from '@/consts'

import Divider from '@/shared/components/Divider'
import ProgressBar from '@/shared/components/ProgressBar'
import { ListProps, ListTypesProps } from '@/typings/List'

import { List } from '@phosphor-icons/react'

interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function Header({ selectedList }: ListContentHeaderProps) {
  return (
    <div>
      <header className="flex h-16 items-center gap-2 rounded-t-default px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center justify-center">
            <Link
              to={LISTS_ROUTE}
              className="icon-button"
            >
              {/* <span className="relative inline-block"> */}
              <List {...DEFAULT_ICON_PROPS} />
              {/* <span className="absolute right-0 top-0 inline-block h-2 w-2 -translate-y-1/2 translate-x-1/2 transform  rounded-full bg-primary"></span> */}
              {/* </span> */}
            </Link>
            <h1 className="ml-4 text-2xl font-black lowercase dark:text-darkTextLight">para hoje</h1>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Link
              to={selectedList?.type === ListTypesProps.WHATS_NEW ? '' : LIST_SETTINGS_ROUTE}
              className="max-w-[15.625rem] truncate text-xl text-primary hover:underline dark:text-darkPrimary"
            >
              {selectedList?.type === ListTypesProps.WHATS_NEW && <span>🎉 </span>}
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
