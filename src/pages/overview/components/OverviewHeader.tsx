import { Link } from 'react-router-dom'

import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LIST_SETTINGS_ROUTE } from '@/consts'

import { GearSix, Sidebar, SidebarSimple } from '@phosphor-icons/react'
interface HeaderProps {
  openSidebar: () => void
}

export default function Header({ openSidebar }: HeaderProps) {
  return (
    <div>
      <header className="default-header gap-2">
        <button
          className="icon-button"
          onClick={openSidebar}
        >
          <SidebarSimple
            {...DEFAULT_ICON_PROPS}
            size={25}
          />
        </button>
        <h1 className="default-header-title w-full">Início</h1>
        <div className="flex items-end gap-2">
          <Link
            to={LIST_SETTINGS_ROUTE}
            className="icon-button"
          >
            <GearSix {...DEFAULT_ICON_PROPS} />
          </Link>
        </div>
      </header>
      <Divider />
    </div>
  )
}
