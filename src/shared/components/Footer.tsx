import { ABOUT_ROUTE, CONTACT_ROUTE, HELP_ROUTE, TERMOS_OF_USE_ROUTE } from '@/consts'

export default function Footer() {
  return (
    <footer className="w-full pb-4">
      <p className="text-center text-sm text-gray opacity-50 dark:text-darkTextGray">
        <a
          href={TERMOS_OF_USE_ROUTE}
          className="hover:underline"
        >
          termos de uso
        </a>
        <span className="mx-1">•</span>
        <a
          href={ABOUT_ROUTE}
          className="hover:underline"
        >
          sobre
        </a>
        <span className="mx-1">•</span>
        <a
          href={CONTACT_ROUTE}
          className="hover:underline"
        >
          contato
        </a>
        <span className="mx-1">•</span>
        <a
          href="https://github.com/gpaiva00/tiberius"
          target="_blank"
          className="hover:underline"
        >
          github
        </a>
        <span className="mx-1">•</span>
        <a
          href={HELP_ROUTE}
          className="hover:underline"
        >
          ajuda
        </a>
        <span className="mx-1">•</span>
        <span>
          © {new Date().getFullYear()}{' '}
          <a
            href="/"
            className="hover:underline"
          >
            Tiberius (beta)
          </a>
        </span>
      </p>
    </footer>
  )
}
