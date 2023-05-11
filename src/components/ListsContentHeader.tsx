import { Link, useNavigate } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, USER_ROUTE } from '@/consts'

import { CaretLeft, User } from '@phosphor-icons/react'

interface ListsContentHeaderProps {}

export default function ListsContentHeader({}: ListsContentHeaderProps) {
  const navigate = useNavigate()

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  return (
    <header className="flex h-16 items-center gap-2 rounded-t-default px-4">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center">
          <button
            className="rounded-default p-2 transition-colors hover:bg-lightGray dark:hover:bg-darkTextGray"
            onClick={handleClickOnBackButton}
          >
            <CaretLeft
              {...DEFAULT_ICON_PROPS}
              className="dark:text-darkTextLight"
            />
          </button>
          <h1 className="ml-4 text-2xl font-black lowercase dark:text-darkTextLight">Listas</h1>
        </div>
        <div>
          <Link to={USER_ROUTE}>
            <button className="rounded-default p-2 transition-colors hover:bg-lightGray dark:hover:bg-darkTextGray">
              <User
                {...DEFAULT_ICON_PROPS}
                className="dark:text-darkTextLight"
              />
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
