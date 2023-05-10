import { Link, useNavigate } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, USER_ROUTE } from '@/consts'

import { CaretLeft, User } from '@phosphor-icons/react'

interface ListsContentHeaderProps {
}

export default function ListsContentHeader({ }: ListsContentHeaderProps) {

  const navigate = useNavigate()

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  return (
    <header className="flex items-center gap-2 px-4 bg-header rounded-t-default h-16">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center">
          <button
            className="hover:bg-lightGray rounded-default p-2 transition-colors"
            onClick={handleClickOnBackButton}
          >
            <CaretLeft {...DEFAULT_ICON_PROPS} />
          </button>
          <h1 className="font-black text-2xl lowercase ml-4">Listas</h1>
        </div>
        <div>
          <Link to={USER_ROUTE}>
            <button className="hover:bg-lightGray rounded-default p-2 transition-colors">
              <User {...DEFAULT_ICON_PROPS} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
