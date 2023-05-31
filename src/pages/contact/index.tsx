import { Link } from 'react-router-dom'

import { Card, CardContentContainer, Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE } from '@/consts'

import { HouseSimple } from '@phosphor-icons/react'

export default function Contact() {
  return (
    <Card>
      <header className="default-header gap-2">
        <Link
          to={LISTS_ROUTE}
          className="icon-button"
        >
          <HouseSimple {...DEFAULT_ICON_PROPS} />
        </Link>
        <h1 className="default-header-title">contato</h1>
      </header>
      <Divider />
      <CardContentContainer className="p-4">
        <h4 className="dark:text-darkTextLight">
          Leia qual é a melhor forma de entrar em contato:
        </h4>
        {/* doubts, suggestions */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-darkTextLight">
            Reclamações e sugestões de melhoria do app
          </h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-darkTextLight">
            <li className="my-2">
              Caso você tenha alguma reclamação ou sugestão de melhoria para o Tiberius, sinta-se
              livre para abrir uma issue no{' '}
              <a
                href="https://github.com/gpaiva00/tiberius"
                className="default-link"
              >
                repositório do projeto
              </a>
              .
            </li>
          </ol>
        </div>
        {/* about user */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-darkTextLight">Outros assuntos</h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-darkTextLight">
            <li className="my-2">
              Caso você queira entrar em contato por qualquer outro assunto, sinta-se livre para
              enviar um e-mail para{' '}
              <a
                className="default-link"
                href="mailto:mytiberius@gmail.com.br"
              >
                mytiberius@gmail.com.br
              </a>
              .
            </li>
          </ol>
        </div>
      </CardContentContainer>
    </Card>
  )
}
