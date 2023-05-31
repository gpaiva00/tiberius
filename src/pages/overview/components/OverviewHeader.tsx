import { Link } from 'react-router-dom'

import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LIST_SETTINGS_ROUTE } from '@/consts'

import { GearSix } from '@phosphor-icons/react'

export default function Header() {
  return (
    <div>
      <header className="default-header">
        {/* title */}
        <h1 className="w-full text-xl font-black dark:text-darkTextLight">Resumo</h1>

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
