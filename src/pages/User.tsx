import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

import DefaultCard from '@/components/DefaultCard'

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
    <DefaultCard>
      <header className="flex items-center gap-2 px-4 bg-header rounded-t-default h-16">
        <div className="flex items-center">
          <button
            className="hover:text-lightenGray"
            onClick={handleClickOnBackButton}
          >
            <CaretLeft {...DEFAULT_ICON_PROPS} />
          </button>
          <h1 className="font-black text-2xl lowercase ml-4">Perfil</h1>
        </div>
      </header>
      <Divider />

      <div className="flex flex-1 gap-10 items-center justify-center flex-col bg-white">
        <img
          src={user?.photoURL || ''}
          className="w-24 rounded-full"
          alt="user photo"
          referrerPolicy="no-referrer"
        />
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-2xl lowercase ml-4">{user?.displayName}</h1>
          <button
            className="py-2 px-5 bg-red hover:text-black border-default rounded-default text-white hover: transition-colors lowercase"
            onClick={signOut}
          >
            sair da conta
          </button>
        </div>
      </div>
    </DefaultCard>
  )
}
