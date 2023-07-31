import { CardContentContainer, Divider, MainCard } from '@/shared/components'

import { DEFAULT_ICON_PROPS } from '@/constants'

import { User } from '@phosphor-icons/react'

export default function Help() {
  return (
    <MainCard
      title="ajuda"
      showAsideButton={false}
    >
      <CardContentContainer className="p-4">
        <h4 className="dark:text-darkTextLight">
          Está com dúvidas sobre como usar o Tiberius? Aqui você encontrará algumas informações que
          podem te ajudar.
        </h4>
        {/* lists */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-darkTextLight">Listas de tarefas</h1>
          <Divider />
          <ol className="my-2 list-inside list-decimal dark:text-darkTextLight">
            <li>
              <span className="font-bold">Criar uma lista:</span> para criar uma lista, digite o
              nome dela na parte inferior da tela e pressione a tecla{' '}
              <span className="font-bold">Enter</span> ou clique no botão{' '}
              <span className="font-bold">Adicionar</span>.
            </li>
            <li>
              <span className="font-bold">Editar uma lista:</span> para editar uma lista, clique no
              nome dela para entrar na tela de itens. Na parte superior da tela, clique no nome da
              lista para entrar na tela de configurações da lista.
            </li>
            <li>
              <span className="font-bold">Excluir uma lista:</span> para excluir uma lista, clique
              na lixeira no lado direito do nome da lista na tela na tela de listas.
            </li>
            <li>
              <span className="font-bold">Ordenar listas:</span> para ordenar as listas, basta
              clicar e arrastar a lista para a posição desejada.
            </li>
            <li>
              <span className="font-bold">Lista "geral":</span> a lista "geral" é a lista padrão do
              Tiberius. Ela não pode ser excluída e não pode ser renomeada. Ela também não pode ser
              movida para outra posição. O objetivo dessa lista é servir como uma lista de tarefas
              não categorizadas, onde você pode criar itens que não se encaixam em nenhuma outra
              lista e que não serão concluídos no dia atual. Ela também pode ser usada como um
              "arquivo", onde os itens de outras listas podem ser movidos para ela caso não sejam
              concluídos no dia atual.
            </li>
          </ol>
        </div>
        {/* items */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-darkTextLight">Itens</h1>
          <Divider />
          <ol className="my-2 list-inside list-decimal dark:text-darkTextLight">
            <li>
              <span className="font-bold">Criar um item:</span> para criar um item, digite o nome
              dele na parte inferior da tela e pressione a tecla{' '}
              <span className="font-bold">Enter</span> ou clique no botão{' '}
              <span className="font-bold">Adicionar</span>.
            </li>
            <li>
              <span className="font-bold">Editar um item:</span> para editar um item, clique duas
              veze no nome dele para entrar no modo de edição. O item a ser editado aparecerá na
              parte inferior da tela.
            </li>
            <li>
              <span className="font-bold">Excluir um item:</span> para excluir um item, clique na
              lixeira no lado direito do nome do item.
            </li>
            <li>
              <span className="font-bold">Marcar um item como concluído:</span> para marcar um item
              como concluído, clique no checkbox no lado esquerdo do nome do item.
            </li>
            <li>
              <span className="font-bold">Desmarcar um item como concluído:</span> para desmarcar um
              item como concluído, clique no checkbox no lado esquerdo do nome do item.
            </li>
            <li>
              <span className="font-bold">Ordenar itens:</span> para ordenar os itens, basta clicar
              e arrastar o item para a posição desejada.
            </li>
          </ol>
        </div>
        {/* profile */}
        <div className="my-4">
          <h1 className="mb-1 text-xl font-bold dark:text-darkTextLight">Perfil</h1>
          <Divider />
          <ol className="my-2 list-inside list-decimal dark:text-darkTextLight">
            <li>
              <span className="font-bold">Acessar o perfil:</span> para acessar o perfil, vá para a
              tela de listas e clique no ícone{' '}
              <User
                className="m-0 mx-1 inline-block p-0 dark:text-darkTextGray"
                {...DEFAULT_ICON_PROPS}
              />
              .
            </li>
            <li>
              <span className="font-bold">Sair da conta:</span> para sair da conta, vá para a tela
              de perfil e clique no botão <span className="font-bold">sair da conta</span>.
            </li>
          </ol>
        </div>
        {/* dark mode */}
      </CardContentContainer>
    </MainCard>
  )
}
