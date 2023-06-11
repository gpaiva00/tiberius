import { ABOUT_ROUTE, CONTACT_ROUTE, HELP_ROUTE, TERMOS_OF_USE_ROUTE } from '@/consts'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="z-50 w-full pb-2 pt-6 md:pt-0">
      <p className="text-center text-sm text-lightenGray dark:text-darkTextGray">
        <Link
          to={TERMOS_OF_USE_ROUTE}
          className="hover:underline"
        >
          Termos de uso
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to={ABOUT_ROUTE}
          className="hover:underline"
        >
          Sobre
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to={CONTACT_ROUTE}
          className="hover:underline"
        >
          Contato
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to="https://github.com/gpaiva00/tiberius"
          target="_blank"
          className="hover:underline"
        >
          Github
        </Link>
        <span className="mx-1 md:mx-2">•</span>
        <Link
          to={HELP_ROUTE}
          className="hover:underline"
        >
          Ajuda
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
