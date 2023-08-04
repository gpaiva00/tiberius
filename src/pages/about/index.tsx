import { Divider } from '@/shared/components'

export default function About() {
  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title">sobre o tiberius</h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col overflow-y-scroll rounded-default bg-white p-4 dark:bg-zinc-800">
        <p className="dark:text-gray-300">
          O Tiberius é um app de listas de tarefas simples e minimalista. Ele nasceu em Abril de
          2023, partindo de uma necessidade pessoal de ter um app de listas de tarefas que tivesse
          apenas o essencial, sem distrações. No meu dia a dia, gosto de organizar minhas tarefas em
          bullet points ou checklists, e de fato existem muitas opções de apps que fazem isso, mas
          nenhum deles me agradava completamente, pois todos tinham muito mais do que eu precisava,
          e isso me distraía e me deixava ansioso.
          <br />
          <br />
          Para diminuir minha ansiedade de fazer muitas coisas, decidir criar um app que me ajudasse
          a <span className="font-bold">concentrar apenas no presente</span>, ou seja, que me
          ajudasse a focar apenas nas tarefas do dia atual.
        </p>
        {/* why tiberius */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">Por que Tiberius?</h1>
          <Divider />
          <p className="my-2 dark:text-gray-300">
            O nome Tiberius foi inspirado no nome do imperador romano Tibério Júlio César Augusto,
            que governou o Império Romano de 14 a 37 d.C. Tibério foi um imperador que se destacou
            por ser um <span className="font-bold">administrador eficiente</span>, que se preocupava
            com a <span className="font-bold">economia</span> e com a{' '}
            <span className="font-bold">estabilidade do império</span>. Ele também foi um imperador
            que <span className="font-bold">não gostava de aparecer</span>. Ele também era{' '}
            <span className="font-bold">muito rigoroso</span> com seus subordinados.
            <br />
            <br />O nome Tiberius foi escolhido por ser um nome que remete a{' '}
            <span className="font-bold">organização</span>,{' '}
            <span className="font-bold">eficiência</span>,{' '}
            <span className="font-bold">estabilidade</span>,{' '}
            <span className="font-bold">rigor</span>, <span className="font-bold">discrição</span> e
            ao <span className="font-bold">minimalismo</span>.
            <br />
            <br />
            O slogan do Tiberius é:
            <br />
            <br />
            {/* quotation */}
            <span className="rounded-full bg-gray-500 px-4 py-2 dark:bg-zinc-700">
              <span className="italic">
                "concentre-se no presente, pois é um presente que você recebeu."
              </span>
            </span>
            <br />
            <br />
          </p>
        </div>
        {/* who am i */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">Quem sou eu?</h1>
          <Divider />
          <p className="my-2 dark:text-gray-300">
            Meu nome é <span className="font-bold">Gabriel</span>, tenho{' '}
            {new Date().getFullYear() - 1998} anos e sou engenheiro de software há{' '}
            {new Date().getFullYear() - 2017} anos. Sou apaixonado por tecnologia, e gosto de usá-la
            para facilitar a vida de alguma forma. Sou um entusiasta de{' '}
            <span className="font-bold">produtividade pessoal</span>, e gosto de estudar sobre o
            assunto. Gosto de design e de criar coisas simples e minimalistas.
            <br />
            <br />
            Você pode me encontrar nas redes sociais:
            <br />
            <br />
            <ul className="list-inside list-disc">
              <li>
                <a
                  href="https://www.linkedin.com/in/gabrielpaiva00"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline dark:text-blue-500"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="
                    https://www.instagram.com/simplesmente_gab/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline dark:text-blue-500"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="
                    https://twitter.com/papaiva00"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline dark:text-blue-500"
                >
                  Twitter
                </a>
              </li>
            </ul>
          </p>
        </div>
      </div>
    </>
  )
}
