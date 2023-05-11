import { Link } from 'react-router-dom'

import { useAuth } from '@/contexts/useAuth'

import DemoCard from '@/components/DemoCard'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, SIGN_IN_ROUTE } from '@/consts'

import { GithubLogo, User } from '@phosphor-icons/react'

import ArrowIcon from '@assets/images/arrow.png'

export default function Home() {
  const { user } = useAuth()

  return (
    <main className="flex h-screen flex-col bg-white">
      <div className="flex h-screen flex-col px-40">
        <header className="flex items-center justify-between py-10">
          <h1 className="text-2xl font-black">Tiberius</h1>
          {user ? (
            <Link
              to={LISTS_ROUTE}
              className="flex items-center gap-2 rounded-default p-2 transition-colors hover:bg-lightGray"
            >
              <User
                {...DEFAULT_ICON_PROPS}
                className="dark:text-darkTextLight"
              />
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
              <h1 className="text-6xl font-black">lista de tarefas simples.</h1>
              <h2 className="text-3xl font-semibold text-lightenGray">minimalista e só com o necessário.</h2>
              <p className="mt-8 w-[25rem] text-xl leading-relaxed text-zinc-700">
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
      <footer className="flex w-full items-center justify-end gap-4 bg-white p-4">
        <p className="text-sm font-light text-gray opacity-50">Tiberius © {new Date().getFullYear()}</p>
        <a href="https://github.com/gpaiva00/tiberius">
          <GithubLogo
            weight="fill"
            size={23}
            className="mr-4 hover:text-lightenGray"
          />
        </a>
      </footer>
    </main>
  )
}
