import { Link } from 'react-router-dom'

import { CompletedItemsCount, Divider, FormattedItemText } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LIST_SETTINGS_ROUTE } from '@/consts'
import { ListProps } from '@/typings/List'

import { GearSix, Plus, Sidebar, SidebarSimple } from '@phosphor-icons/react'
interface ListContentHeaderProps {
  selectedList: ListProps | null
  openSidebar: () => void
}

export default function Header({ selectedList, openSidebar }: ListContentHeaderProps) {
  const handleClickOnAddItemButton = () => {}

  return (
    <div>
      <header className="default-header">
        {/* list title */}
        <div className="flex w-full items-center gap-2">
          <button
            className="icon-button"
            onClick={openSidebar}
          >
            <SidebarSimple
              {...DEFAULT_ICON_PROPS}
              size={25}
            />
          </button>
          <h1 className="default-header-title max-w-xs truncate">
            {FormattedItemText(
              selectedList?.type === 'default' ? selectedList?.name : 'Itens gerais'
            )}
          </h1>
          <CompletedItemsCount
            size="sm"
            items={selectedList?.items || []}
          />
        </div>
        {/* options */}
        <div className="flex items-end gap-2">
          <button
            onClick={handleClickOnAddItemButton}
            className="icon-button"
          >
            <Plus {...DEFAULT_ICON_PROPS} />
          </button>
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
