import { useAuth } from '@/hooks'

export default function User() {
  const { user, signOut } = useAuth()

  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center justify-between px-4">
        <h1 className="default-header-title">Perfil</h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col items-center gap-2 overflow-y-scroll rounded-default bg-white p-2 dark:bg-zinc-800 md:gap-8 md:p-4">
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <img
            src={user?.photoURL || ''}
            className="w-28 rounded-full"
            alt="user photo"
            referrerPolicy="no-referrer"
          />
          <h1 className="ml-4 text-xl font-bold dark:text-gray-300">{user?.displayName}</h1>
        </div>
        <div className="flex w-full flex-col items-center gap-4">
          <button
            className="secondary-button dark:text-dark-red max-w-sm text-red-500"
            onClick={signOut}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </>
  )
}
