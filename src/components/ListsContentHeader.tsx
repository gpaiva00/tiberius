import { Link } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, USER_ROUTE } from '@/consts'

import { CaretLeft, User } from '@phosphor-icons/react'

interface ListsContentHeaderProps {
  handleClickOnBackButton: () => void
}

export default function ListsContentHeader({ handleClickOnBackButton }: ListsContentHeaderProps) {
  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center">
        <button
          className="hover:text-lightenGray"
          onClick={handleClickOnBackButton}
        >
          <CaretLeft {...DEFAULT_ICON_PROPS} />
        </button>
        <h1 className="font-black text-2xl lowercase ml-4">Listas</h1>
      </div>
      <div>
        <Link to={USER_ROUTE}>
          <button className="hover:text-lightenGray">
            <User {...DEFAULT_ICON_PROPS} />
          </button>
        </Link>
      </div>
    </div>
  )
}
