import { useAuth } from '@/hooks'

import { MainCard } from '@/shared/components'

export default function User() {
  const { user, signOut } = useAuth()

  return (
    <MainCard title="Perfil">
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
            className="secondary-button max-w-sm"
            onClick={signOut}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </MainCard>
  )
}
