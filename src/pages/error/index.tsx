import Footer from '@/shared/components/Footer'

import { getRandomQuote } from '@/utils/getRandomQuote'

import { ERROR_MESSAGES, LISTS_ROUTE, QUOTES } from '@/consts'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <main className="flex h-screen flex-col bg-white dark:bg-darkBackground">
      <div className="flex h-screen flex-1 flex-col justify-center gap-6 px-6 md:px-40">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold dark:text-darkTextLight">{getRandomQuote(ERROR_MESSAGES)}</h1>
          <h4 className="text-2xl font-bold dark:text-darkTextGray">
            Aproveite para tomar uma água e voltar em breve.
          </h4>
        </div>
        <p className="text-lg italic text-primary">{getRandomQuote(QUOTES)}</p>
        <Link
          to={LISTS_ROUTE}
          className="primary-button md:w-[20rem]"
        >
          Voltar para as listas
        </Link>
      </div>
      <Footer />
    </main>
  )
}
