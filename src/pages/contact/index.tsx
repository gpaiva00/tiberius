import { Link } from 'react-router-dom'

import { Card, CardContentContainer, Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE } from '@/consts'

import { HouseSimple } from '@phosphor-icons/react'

export default function Contact() {
  return (
    <Card>
      <header className="flex h-16 items-center gap-2 rounded-t-default px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <Link
              to={LISTS_ROUTE}
              className="icon-button"
            >
              <HouseSimple {...DEFAULT_ICON_PROPS} />
            </Link>
            <h1 className="ml-4 text-2xl font-black dark:text-darkTextLight">contato</h1>
          </div>
        </div>
      </header>
      <Divider />
      <CardContentContainer>
        <main className="p-4">
          <h4 className="dark:text-darkTextLight">
            Leia qual é a melhor forma de entrar em contato:
          </h4>
          {/* doubts, suggestions */}
          <div className="my-4">
            <h1 className="mb-1 text-xl font-black dark:text-darkTextLight">
              Reclamações e sugestões de melhoria do app
            </h1>
            <Divider />
            <ol className="list-inside list-decimal dark:text-darkTextLight">
              <li className="my-2">
                Caso você tenha alguma reclamação ou sugestão de melhoria para o Tiberius, sinta-se
                livre para abrir uma issue no{' '}
                <a
                  href="https://github.com/gpaiva00/tiberius"
                  className="text-primary hover:underline dark:text-darkPrimary"
                >
                  repositório do projeto
                </a>
                .
              </li>
            </ol>
          </div>
          {/* about user */}
          <div className="my-4">
            <h1 className="mb-1 text-xl font-black dark:text-darkTextLight">Outros assuntos</h1>
            <Divider />
            <ol className="list-inside list-decimal dark:text-darkTextLight">
              <li className="my-2">
                Caso você queira entrar em contato por qualquer outro assunto, sinta-se livre para
                enviar um e-mail para{' '}
                <a
                  className="rounded-default bg-lightGray p-1 text-primary hover:underline dark:bg-darkInputBackground dark:text-darkPrimary"
                  href="mailto:mytiberius@gmail.com.br"
                >
                  mytiberius@gmail.com.br
                </a>
                .
              </li>
            </ol>
          </div>
        </main>
      </CardContentContainer>
    </Card>
  )
}
