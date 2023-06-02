import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS } from '@/consts'

import { Plus, SidebarSimple } from '@phosphor-icons/react'

interface HeaderProps {
  openSidebar: () => void
  toggleCreateListModal: () => void
}

export default function Header({ openSidebar, toggleCreateListModal }: HeaderProps) {
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
        <h1 className="default-header-title w-full">Listas</h1>
        <div className="flex items-end gap-2">
          <button
            onClick={toggleCreateListModal}
            className="icon-button"
          >
            <Plus {...DEFAULT_ICON_PROPS} />
          </button>
        </div>
      </header>
      <Divider />
    </div>
  )
}
