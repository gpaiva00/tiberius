import { Link } from 'react-router-dom'

import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LIST_ROUTE, USER_ROUTE } from '@/consts'

import { CaretLeft, User } from '@phosphor-icons/react'

interface ListsContentHeaderProps {}

export default function Header({}: ListsContentHeaderProps) {
  return (
    <div>
      <header className="flex h-16 items-center gap-2 rounded-t-default px-2 md:px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <Link
              to={LIST_ROUTE}
              className="icon-button"
            >
              <CaretLeft {...DEFAULT_ICON_PROPS} />
            </Link>
            <h1 className="ml-2 text-xl font-black lowercase dark:text-darkTextLight md:ml-4 md:text-2xl">Listas</h1>
          </div>
          <div>
            <Link to={USER_ROUTE}>
              <button className="icon-button">
                <User {...DEFAULT_ICON_PROPS} />
              </button>
            </Link>
          </div>
        </div>
      </header>
      <Divider />
    </div>
  )
}
