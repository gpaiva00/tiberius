import { Link } from 'react-router-dom'

import { CompletedItemsCount, Divider, FormattedItemText } from '@/shared/components'

import { useChangeLog } from '@/hooks'

import { DEFAULT_ICON_PROPS, LIST_SETTINGS_ROUTE } from '@/consts'
import { ListProps } from '@/typings/List'

import { GearSix } from '@phosphor-icons/react'
interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function Header({ selectedList }: ListContentHeaderProps) {
  const { haveSeenChangeLog } = useChangeLog()

  return (
    <div>
      <header className="default-header">
        {/* list title */}
        <div className="flex w-full items-center gap-2">
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

        <div className="flex items-end">
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
