import { ABOUT_ROUTE, CONTACT_ROUTE, HELP_ROUTE, TERMOS_OF_USE_ROUTE } from '@/consts'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full pb-4 pt-6 dark:bg-darkBackground md:pt-0">
      <p className="text-center text-sm text-gray opacity-50 dark:text-darkTextGray">
        <Link
          to={TERMOS_OF_USE_ROUTE}
          className="hover:underline"
        >
          termos de uso
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to={ABOUT_ROUTE}
          className="hover:underline"
        >
          sobre
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to={CONTACT_ROUTE}
          className="hover:underline"
        >
          contato
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to="https://github.com/gpaiva00/tiberius"
          target="_blank"
          className="hover:underline"
        >
          github
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to={HELP_ROUTE}
          className="hover:underline"
        >
          ajuda
        </Link>
        <span className="mx-1 hidden md:mx-2 md:inline">•</span>
        <span className="mt-1 block md:mt-0 md:inline">
          © {new Date().getFullYear()}{' '}
          <Link
            to="/"
            className="hover:underline"
          >
            Tiberius (beta)
          </Link>
        </span>
      </p>
    </footer>
  )
}
