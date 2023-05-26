import { Link } from 'react-router-dom'

import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LIST_ROUTE, USER_ROUTE } from '@/consts'

import { CaretLeft, User } from '@phosphor-icons/react'

interface ListsContentHeaderProps {}

export default function Header({}: ListsContentHeaderProps) {
  return (
    <div>
      <header className="flex items-center justify-between gap-2 rounded-t-default p-2">
        <div className="flex items-center gap-2 md:gap-4">
          <Link
            to={LIST_ROUTE}
            className="icon-button"
          >
            <CaretLeft {...DEFAULT_ICON_PROPS} />
          </Link>
          <h1 className="text-xl font-black dark:text-darkTextLight">Listas</h1>
        </div>
        <Link to={USER_ROUTE}>
          <button className="icon-button">
            <User {...DEFAULT_ICON_PROPS} />
          </button>
        </Link>
      </header>
      <Divider />
    </div>
  )
}
