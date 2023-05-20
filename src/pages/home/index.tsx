import { Link } from 'react-router-dom'

import { useAuth } from '@/hooks/useAuth'

import DemoCard from '@/pages/home/components/DemoCard'
import Footer from '@/shared/components/Footer'

import { DEFAULT_ICON_PROPS, LIST_ROUTE, SIGN_IN_ROUTE } from '@/consts'

import { User } from '@phosphor-icons/react'
import ArrowIcon from '@assets/images/arrow.png'

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="flex h-screen flex-col bg-white dark:bg-darkBackground">
      <div className="flex h-screen flex-col px-40">
        <header className="flex items-center justify-between py-10">
          <h1 className="text-2xl font-black dark:text-darkTextLight">Tiberius</h1>
          {user ? (
            <Link
              to={LIST_ROUTE}
              className="icon-button flex items-center gap-2"
            >
              <User {...DEFAULT_ICON_PROPS} />
              {user.firstName}
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
        <div className="flex flex-1 flex-col items-center justify-center gap-4 pb-10">
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <h1 className="text-6xl font-black dark:text-darkTextLight">lista de tarefas simples.</h1>
              <h2 className="text-3xl font-semibold text-lightenGray dark:text-darkTextGray">
                minimalista e só com o necessário.
              </h2>
              <p className="mt-8 w-[25rem] text-xl leading-relaxed text-zinc-700 dark:text-zinc-500">
                Apenas funcionalidades que você espera para manter o foco no que realmente importa.
              </p>
              <Link
                to={SIGN_IN_ROUTE}
                className="primary-button w-[20rem]"
              >
                começar
              </Link>
            </div>
            <div className="flex flex-col items-center justify-end">
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
