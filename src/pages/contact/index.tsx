import { Divider } from '@/shared/components'

export default function Contact() {
  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title">Contato</h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col overflow-y-scroll rounded-default bg-white p-4 dark:bg-zinc-800">
        <h4 className="dark:text-gray-300">Leia qual é a melhor forma de entrar em contato:</h4>
        {/* doubts, suggestions */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">
            Reclamações e sugestões de melhoria do app
          </h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
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
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">Outros assuntos</h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
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
      </div>
    </>
  )
}
