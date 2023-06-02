import { LISTS_ROUTE, LIST_ROUTE, OVERVIEW_ROUTE, SEARCH_ROUTE, USER_ROUTE } from '@/consts'
import Divider from '@/shared/components/Divider'
import { FooterContainer } from '@/shared/components/FooterContainer'
import { HouseSimple, ListBullets, MagnifyingGlass, User } from '@phosphor-icons/react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'

interface DefaultCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  size?: 'sm' | 'demo' | 'lg' | 'auto'
}

export default function CardWithTabBar({ children, size = 'lg', ...props }: DefaultCardProps) {
  return (
    <div
      className={classNames(
        'flex flex-col bg-white dark:border-dark dark:bg-darkCardBackground dark:shadow-none md:rounded-default md:shadow-default dark:md:shadow-none',
        {
          'h-screen w-full md:h-72 md:w-72': size === 'sm',
          'h-screen w-full md:h-[37.5rem] md:w-[50rem]': size === 'lg',
          'h-[20rem] w-[25rem]': size === 'demo',
          'h-auto w-auto border-white dark:border-transparent': size === 'auto',
        },
        props.className
      )}
    >
      {children}

      <Divider />
      <FooterContainer className="w-full justify-around py-2">
        <Link
          to={OVERVIEW_ROUTE}
          className={classNames('tab-bar-button', {
            'tab-bar-button-active': window.location.pathname === OVERVIEW_ROUTE,
          })}
        >
          <HouseSimple
            weight="bold"
            size={25}
          />
        </Link>
        <button
          disabled
          className={classNames('tab-bar-button', {
            'tab-bar-button-active': window.location.pathname === SEARCH_ROUTE,
          })}
        >
          <MagnifyingGlass
            weight="bold"
            size={25}
          />
        </button>
        <Link
          to={LISTS_ROUTE}
          className={classNames('tab-bar-button', {
            'tab-bar-button-active': window.location.pathname.includes(LIST_ROUTE),
          })}
        >
          <ListBullets
            weight="bold"
            size={25}
          />
        </Link>
        <Link
          to={USER_ROUTE}
          className={classNames('tab-bar-button', {
            'tab-bar-button-active': window.location.pathname.includes(USER_ROUTE),
          })}
        >
          <User
            weight="bold"
            size={25}
          />
        </Link>
      </FooterContainer>
    </div>
  )
}
