import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/useAuth'

import Card from '@/shared/components/Card'

import { DEFAULT_ICON_PROPS } from '@/consts'

import Divider from '@/shared/components/Divider'

import { CaretLeft } from '@phosphor-icons/react'

export default function User() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  return (
    <Card size="sm">
      <header className="flex h-16 items-center gap-2 rounded-t-default bg-header px-4 dark:bg-darkCardBackground">
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
          <h1 className="ml-4 text-2xl font-black lowercase dark:text-darkTextLight">Perfil</h1>
        </div>
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
          <h1 className="ml-4 text-xl font-bold lowercase dark:text-darkTextLight">{user?.displayName}</h1>
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
