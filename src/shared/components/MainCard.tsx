import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, OVERVIEW_ROUTE, USER_ROUTE } from '@/consts'
import { useAuth } from '@/hooks'

import { HouseSimple, ListBullets, X } from '@phosphor-icons/react'

interface MainCard extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'demo' | 'lg' | 'auto'
  showSidebar?: boolean
  closeSidebar?: () => void
}

export default function MainCard({
  children,
  size = 'lg',
  showSidebar,
  closeSidebar,
  className,
}: MainCard) {
  const { user } = useAuth()

  return (
    <div
      className={classNames(
        'relative overflow-x-hidden',
        'flex flex-col rounded-default bg-white dark:border-dark dark:bg-darkCardBackground dark:shadow-none md:shadow-default dark:md:shadow-none',
        {
          'h-screen w-full md:h-72 md:w-72': size === 'sm',
          'h-screen w-full md:h-[37.5rem] md:w-[46.875rem]': size === 'lg',
          'h-[20rem] w-[25rem]': size === 'demo',
        },
        className
      )}
    >
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
              onClick={closeSidebar}
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
                <h1 className="font-bold hover:underline dark:text-darkTextLight">Início</h1>
              </Link>
              <Link
                to={LISTS_ROUTE}
                className="sidebar-button flex items-center gap-2"
              >
                <ListBullets {...DEFAULT_ICON_PROPS} />
                <h1 className="font-bold hover:underline dark:text-darkTextLight">Listas</h1>
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
      <div
        className={classNames(
          'absolute left-0 top-12 h-full w-full bg-black transition duration-200 ease-in-out',
          {
            'z-40 opacity-40': showSidebar,
            'z-auto opacity-0': !showSidebar,
          }
        )}
        onClick={showSidebar ? closeSidebar : () => {}}
      ></div>
      {children}
    </div>
  )
}
