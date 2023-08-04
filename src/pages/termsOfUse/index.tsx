import { Divider } from '@/shared/components'

export default function TermsOfUse() {
  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title">termos de uso</h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col overflow-y-scroll rounded-default bg-white p-4 dark:bg-zinc-800">
        <h4 className="dark:text-gray-300">
          Ao usar o Tiberius você está de acordo com os seguintes termos de uso:
        </h4>
        {/* about tiberius */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">Tiberius</h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
            <li className="my-2">
              O Tiberius tem como principal objetivo{' '}
              <span className="font-bold">ajudar você a organizar suas tarefas</span>. Isso inclui
              criar listas de tarefas, adicionar itens a essas listas, marcar itens como concluídos
              e excluir itens.
            </li>
            <li className="my-2">
              O Tiberius <span className="font-bold">nunca irá vender</span> os dados de seus
              usuários e <span className="font-bold">nunca irá compartilhar</span> informações com
              terceiros.
            </li>
            <li className="my-2">
              O Tiberius não é responsável por qualquer dano causado pelo uso do aplicativo,
              incluindo perda de dados.
            </li>
            <li className="my-2">
              O Tiberius somente irá coletar dados que são fundamentalmente necessários para o{' '}
              <span className="font-bold">funcionamento</span> e
              <span className="font-bold"> proteção</span> do serviço. Nosso princípio neste ponto é
              de quanto menos dados sobre o usuário coletarmos, menos dados sensíveis teremos em
              nossa base, logo melhor estaremos posicionados no quesito proteção do serviço e
              usuários.
            </li>
          </ol>
        </div>
        {/* about user */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">Usuário</h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
            <li className="my-2">
              O usuário é responsável por seus dados e por manter sua conta segura.
            </li>
            <li className="my-2">
              Caso o usuário descubra ou esbarre com alguma brecha de segurança do serviço e
              encontre informações sensíveis (por exemplo, dados privados de outros usuários, dados
              sensíveis do sistema ou acesso não autorizado), se compromete a reportar este caso de
              forma privada através do email{' '}
              <a
                className="default-link"
                href="mailto:mytiberius@gmail.com.br"
              >
                mytiberius@gmail.com.br
              </a>
              . Após o fechamento da falha, o Tiberius se compromete em criar um Postmortem público
              com os detalhes do que aconteceu. Não temos interesse algum em esconder estes
              acontecimentos e queremos compartilhar todos os conhecimentos adquiridos e estratégia
              adotadas, mantendo em mente que iremos proteger ao máximo dados sensíveis dos
              usuários. Falhas que não possuem informações sensíveis e não irão prejudicar outros
              usuários poderão ser livremente reportados no{' '}
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
        {/* copyright and intelectual property */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">
            Direitos autorais e propriedade intelectual
          </h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
            <li className="my-2">
              O Tiberius é um software de código aberto, licenciado sob a licença MIT. O código
              fonte do projeto pode ser encontrado no{' '}
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
        {/* guarantees */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">Garantias</h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
            <li className="my-2">
              O Tiberius é um projeto de natureza Open Source, com esforços feitos de forma
              espontânea e não oferecemos nenhuma garantia para a disponibilidade do serviço ou
              suporte.
            </li>
          </ol>
        </div>
        {/* updates on terms */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-gray-300">
            Alterações nos termos de uso
          </h1>
          <Divider />
          <ol className="list-inside list-decimal dark:text-gray-300">
            <li className="my-2">
              Os termos naturalmente poderão ser alterados quando necessário e estas alterações
              serão acompanhadas de notificações dentro do próprio Tiberius. Iremos sempre destacar
              com linguajar simples e com total clareza quais alterações foram realizadas.
            </li>
          </ol>
        </div>
        <Divider />
        {/* last update date */}
        <div className="my-4">
          <p className="text-gray text-xs dark:text-gray-300">
            Última atualização: 22 de Maio de 2023
          </p>
        </div>
      </div>
    </>
  )
}
