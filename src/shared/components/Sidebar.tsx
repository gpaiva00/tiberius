import classNames from 'classnames'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  APP_SETTINGS_ROUTE,
  DEFAULT_ICON_PROPS,
  LISTS_ROUTE,
  LIST_ROUTE,
  OVERVIEW_ROUTE,
  USER_ROUTE,
} from '@/constants'
import { useAuth, useList } from '@/hooks'
import FormattedItemText from '@/shared/components/ItemTextFormatted'
import { ListProps } from '@/typings/List'
import Logo from '@assets/images/logo.png'
import { CaretRight, GearSix, HouseSimple, ListBullets } from '@phosphor-icons/react'

export default function Sidebar() {
  const [openRecentLists, setOpenRecentLists] = useState(false)

  const { user } = useAuth()
  const { getRecentlyAccessedLists, saveSelectedList } = useList()
  const navigate = useNavigate()

  const recentlyAccessedLists = getRecentlyAccessedLists()

  function handleClickOnRecentlyAccessedList(list: ListProps) {
    saveSelectedList(list)
    navigate(LIST_ROUTE)
  }

  return (
    <aside className="flex h-[30rem] w-72 flex-col gap-6 rounded-default bg-white p-4 dark:bg-darkCardBackground">
      {/* title container */}
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          className="w-6"
        />
        <h1 className="font-semibold dark:text-lightenGray">Tiberius</h1>
      </div>
      {/* content container */}
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-2 overflow-y-scroll">
          {/* overview */}
          <Link
            to={OVERVIEW_ROUTE}
            className="sidebar-button flex items-center"
          >
            <HouseSimple
              {...DEFAULT_ICON_PROPS}
              className="text-lightenGray dark:text-darkTextGray"
            />
            <h1 className="dark:text-darkTextLight">Hoje</h1>
          </Link>
          {/* lists */}
          <div className="flex flex-col gap-2">
            <div className="sidebar-button flex items-center justify-between">
              <Link
                to={LISTS_ROUTE}
                className="flex items-center gap-2 hover:underline"
              >
                <ListBullets
                  {...DEFAULT_ICON_PROPS}
                  className="text-lightenGray dark:text-darkTextGray"
                />
                <h1 className="dark:text-darkTextLight">Listas</h1>
              </Link>
              {recentlyAccessedLists.length > 0 && (
                <button
                  onClick={() => {
                    setOpenRecentLists(!openRecentLists)
                  }}
                >
                  <CaretRight
                    {...DEFAULT_ICON_PROPS}
                    className={classNames('text-lightenGray dark:text-darkTextGray', {
                      'rotate-90 transform duration-150': openRecentLists,
                      'rotate-0 transform duration-150': !openRecentLists,
                    })}
                  />
                </button>
              )}
            </div>
            {/* recently accessed lists */}
            {recentlyAccessedLists.length > 0 && openRecentLists && (
              <div className="flex flex-col gap-2 overflow-y-scroll pl-4">
                {recentlyAccessedLists.map((list) => (
                  <button
                    key={list.id}
                    onClick={() => handleClickOnRecentlyAccessedList(list)}
                    className="sidebar-button flex items-center"
                  >
                    <h1 className="max-w-xs truncate dark:text-darkTextLight">
                      {FormattedItemText(list.name)}
                    </h1>
                  </button>
                ))}

                <Link
                  to={LISTS_ROUTE}
                  className="default-link"
                >
                  Mostrar mais
                </Link>
              </div>
            )}
          </div>
          {/* <Link
                to={''}
                className="sidebar-button flex items-center"
              >
                <Notification {...DEFAULT_ICON_PROPS} />
                <h1 className="dark:text-darkTextLight">Notificações</h1>
              </Link> */}
          {/* configs */}
          <Link
            to={APP_SETTINGS_ROUTE}
            className="sidebar-button flex items-center"
          >
            <GearSix
              {...DEFAULT_ICON_PROPS}
              className="text-lightenGray dark:text-darkTextGray"
            />
            <h1 className="dark:text-darkTextLight">Configurações</h1>
          </Link>
        </div>
        {/* profile */}
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
          <h1 className="dark:text-darkTextLight">{user?.displayName}</h1>
        </Link>
      </div>
    </aside>
  )
}
