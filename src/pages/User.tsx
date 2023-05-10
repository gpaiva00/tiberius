import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/useAuth'

import Card from '@/components/Card'

import { DEFAULT_ICON_PROPS } from '@/consts'

import Divider from '@/components/Divider'

import { CaretLeft } from '@phosphor-icons/react'

export default function User() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  return (
    <Card size="sm">
      <header className="flex h-16 items-center gap-2 rounded-t-default bg-header px-4">
        <div className="flex items-center">
          <button
            className="rounded-default p-2 transition-colors hover:bg-lightGray"
            onClick={handleClickOnBackButton}
          >
            <CaretLeft {...DEFAULT_ICON_PROPS} />
          </button>
          <h1 className="ml-4 text-2xl font-black lowercase">Perfil</h1>
        </div>
      </header>
      <Divider />

      <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-white">
        <img
          src={user?.photoURL || ''}
          className="w-20 rounded-full"
          alt="user photo"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col gap-4">
          <h1 className="ml-4 text-2xl font-bold lowercase">{user?.displayName}</h1>
          <button
            className="rounded-default border-default bg-red px-5 py-2 lowercase text-white transition-colors hover:bg-black hover:text-rose-500"
            onClick={signOut}
          >
            sair da conta
          </button>
        </div>
      </div>
    </Card>
  )
}
