import { Link } from 'react-router-dom'

import { useAuth } from '@/hooks'

import { Footer } from '@/shared/components'
import DemoCard from '@/pages/home/components/DemoCard'

import { DEFAULT_ICON_PROPS, LIST_ROUTE, SIGN_IN_ROUTE } from '@/consts'

import { User } from '@phosphor-icons/react'
import ArrowIcon from '@assets/images/arrow.png'

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="flex h-screen flex-col bg-white dark:bg-darkBackground">
      <div className="flex h-screen flex-1 flex-col px-6 md:px-40">
        <header className="flex items-center justify-between py-10">
          <h1 className="text-2xl font-black dark:text-darkTextLight">Tiberius</h1>
          {user ? (
            <Link
              to={LIST_ROUTE}
              className="icon-button flex items-center gap-2"
            >
              <User {...DEFAULT_ICON_PROPS} />
              <span className="hidden md:inline">{user.firstName}</span>
            </Link>
          ) : (
            <Link
              to={SIGN_IN_ROUTE}
              className="secondary-button w-auto"
            >
              entrar
            </Link>
          )}
        </header>
        <div className="flex flex-1 flex-col items-center gap-4 pb-10 md:justify-center">
          <div className="flex md:grid md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl font-black dark:text-darkTextLight md:text-6xl">lista de tarefas simples.</h1>
              <h2 className="text-2xl font-semibold text-lightenGray dark:text-darkTextGray md:text-3xl">
                minimalista e só com o necessário.
              </h2>
              <p className="mt-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-500 md:w-[25rem] md:text-xl">
                Apenas funcionalidades que você espera para manter o foco no que realmente importa.
              </p>
              <Link
                to={SIGN_IN_ROUTE}
                className="primary-button md:w-[20rem]"
              >
                começar
              </Link>
            </div>
            <div className="hidden flex-col items-center justify-end md:flex">
              <DemoCard />
              <div className="flex w-full items-end">
                <span className="align-bottom text-sm text-lightenGray">Apenas tarefas. Nada mais.</span>
                <div className="">
                  <img
                    src={ArrowIcon}
                    alt="arrow"
                    className="my-4 h-12 w-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
