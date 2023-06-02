import { useAuth } from '@/hooks'
import { useNavigate } from 'react-router-dom'

import { useState } from 'react'

import { MainCard, CardWithTabBar, Divider } from '@/shared/components'
import { DEFAULT_ICON_PROPS } from '@/consts'

import { CaretLeft, Sidebar, SidebarSimple } from '@phosphor-icons/react'

export default function User() {
  const [showSidebar, setShowSidebar] = useState(false)
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  const toggleSidebar = () => setShowSidebar(!showSidebar)

  return (
    <MainCard
      showSidebar={showSidebar}
      closeSidebar={toggleSidebar}
    >
      <header className="default-header gap-2">
        <button
          className="icon-button"
          onClick={toggleSidebar}
        >
          <SidebarSimple
            {...DEFAULT_ICON_PROPS}
            size={25}
          />
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
            className="secondary-button max-w-md"
            onClick={signOut}
          >
            Sair da conta
          </button>
        </div>
      </div>
    </MainCard>
  )
}
