import classNames from 'classnames'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  APP_SETTINGS_ROUTE,
  DEFAULT_ICON_PROPS,
  LISTS_ROUTE,
  OVERVIEW_ROUTE,
  USER_ROUTE,
} from '@/consts'
import { useAuth } from '@/hooks'

import Divider from '@/shared/components/Divider'

import { FormattedItemText } from '@/shared/components'
import {
  CaretLeft,
  CaretRight,
  GearSix,
  HouseSimple,
  ListBullets,
  SidebarSimple,
  X,
} from '@phosphor-icons/react'

interface MainCard {
  children: React.ReactNode
  size?: 'sm' | 'demo' | 'lg' | 'auto'
  title: string | React.ReactNode
  options?: React.ReactNode
  className?: string
  showAsideButton?: boolean
}

export default function MainCard({
  children,
  size = 'lg',
  className,
  title,
  options,
  showAsideButton = true,
}: MainCard) {
  const { user } = useAuth()

  const [showSidebar, setShowSidebar] = useState(false)
  const navigate = useNavigate()
  const toggleSidebar = () => setShowSidebar(!showSidebar)

  return (
    <div
      className={classNames(
        'relative flex flex-col overflow-hidden rounded-default bg-white dark:border-dark dark:bg-darkCardBackground dark:shadow-none md:shadow-default dark:md:shadow-none',
        {
          'h-screen w-full md:h-72 md:w-72': size === 'sm',
          'h-screen w-full md:h-[40rem] md:w-[56.25rem]': size === 'lg',
          'h-[20rem] w-[25rem]': size === 'demo',
        },
        className
      )}
    >
      {/* side menu */}
      <aside
        className={classNames(
          'absolute left-0 top-0 z-50 h-full w-64 transform border-r-default bg-white transition-transform duration-200 ease-in-out dark:border-r-dark dark:bg-darkCardBackground',
          {
            'translate-x-0': showSidebar,
            '-translate-x-full border-r': !showSidebar,
          }
        )}
      >
        <div className="flex h-full flex-col gap-4 bg-white px-4 py-2 dark:bg-darkCardBackground">
          <div className="flex w-full items-center justify-between">
            <h1 className="font-bold dark:text-lightenGray">Menu</h1>
            <button
              className="icon-button place-self-end"
              onClick={toggleSidebar}
            >
              <X {...DEFAULT_ICON_PROPS} />
            </button>
          </div>
          {/* sidebar content */}
          <div className="flex h-full flex-col justify-between">
            <div className="flex flex-col gap-2">
              {' '}
              <Link
                to={OVERVIEW_ROUTE}
                className="sidebar-button flex items-center gap-2"
              >
                <HouseSimple {...DEFAULT_ICON_PROPS} />
                <h1 className="font-bold hover:underline dark:text-darkTextLight">Hoje</h1>
              </Link>
              <Link
                to={LISTS_ROUTE}
                className="sidebar-button flex items-center gap-2"
              >
                <ListBullets {...DEFAULT_ICON_PROPS} />
                <h1 className="font-bold hover:underline dark:text-darkTextLight">Listas</h1>
              </Link>
              <Link
                to={APP_SETTINGS_ROUTE}
                className="sidebar-button flex items-center gap-2"
              >
                <GearSix {...DEFAULT_ICON_PROPS} />
                <h1 className="font-bold hover:underline dark:text-darkTextLight">Configurações</h1>
              </Link>
            </div>
            <Link
              className="icon-button flex items-center justify-start gap-2"
              to={USER_ROUTE}
            >
              <img
                src={user?.photoURL || ''}
                className="w-10 rounded-full"
                alt="user photo"
                referrerPolicy="no-referrer"
              />
              <h1 className="font-bold hover:underline dark:text-darkTextLight">
                {user?.displayName}
              </h1>
            </Link>
          </div>
        </div>
      </aside>
      {/* overlay */}
      <div
        className={classNames(
          'absolute left-0 top-11 h-full w-full bg-black transition duration-200 ease-in-out',
          {
            'z-40 opacity-30 dark:opacity-70': showSidebar,
            'invisible z-auto opacity-0': !showSidebar,
          }
        )}
        onClick={showSidebar ? toggleSidebar : undefined}
      ></div>
      {/* header */}
      <header className="default-header">
        <div className="flex w-full items-center gap-2">
          {showAsideButton && (
            <button
              className="icon-button"
              onClick={toggleSidebar}
            >
              <SidebarSimple {...DEFAULT_ICON_PROPS} />
            </button>
          )}
          <div className="mr-2 flex items-center gap-1">
            <button
              className="icon-button"
              onClick={() => navigate(-1)}
            >
              <CaretLeft {...DEFAULT_ICON_PROPS} />
            </button>
            <button
              className="icon-button"
              onClick={() => navigate(+1)}
            >
              <CaretRight {...DEFAULT_ICON_PROPS} />
            </button>
          </div>
          {typeof title === 'string' ? (
            <h1 className="default-header-title max-w-xs truncate">{FormattedItemText(title)}</h1>
          ) : (
            title
          )}
        </div>
        {/* options */}
        <div className="flex items-end gap-2">{options}</div>
      </header>
      <Divider />
      {children}
    </div>
  )
}
