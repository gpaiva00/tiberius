import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { Card, Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS } from '@/consts'

import { CaretLeft } from '@phosphor-icons/react'

export default function User() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  return (
    <Card size="sm">
      <header className="default-header gap-2">
        <button
          className="icon-button"
          onClick={handleClickOnBackButton}
        >
          <CaretLeft {...DEFAULT_ICON_PROPS} />
        </button>
        <h1 className="default-header-title">Perfil</h1>
      </header>
      <Divider />

      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white px-4 dark:bg-darkCardBackground">
        <img
          src={user?.photoURL || ''}
          className="w-20 rounded-full"
          alt="user photo"
          referrerPolicy="no-referrer"
        />
        <div className="flex w-full flex-col items-center gap-4">
          <h1 className="ml-4 text-xl font-bold dark:text-darkTextLight">{user?.displayName}</h1>
          <button
            className="primary-button"
            onClick={signOut}
          >
            sair da conta
          </button>
        </div>
      </div>
    </Card>
  )
}
