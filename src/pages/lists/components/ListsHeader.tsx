import { Link } from 'react-router-dom'

import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LIST_ROUTE, USER_ROUTE } from '@/consts'

import { CaretLeft, User } from '@phosphor-icons/react'

interface ListsContentHeaderProps {}

export default function Header({}: ListsContentHeaderProps) {
  return (
    <div>
      <header className="default-header gap-2">
        <Link
          to={LIST_ROUTE}
          className="icon-button"
        >
          <CaretLeft {...DEFAULT_ICON_PROPS} />
        </Link>
        <h1 className="default-header-title w-full">Listas</h1>
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
