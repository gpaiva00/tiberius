import { v4 as uuidv4 } from 'uuid'
import { ListProps, ListTypesProps } from '@/typings/List'
import { IconWeight } from '@phosphor-icons/react'
import { ToastPosition } from 'react-hot-toast'

export const LIST_ROUTE = '/list'
export const SIGN_IN_ROUTE = '/sign-in'
export const USER_ROUTE = '/user'
export const LISTS_ROUTE = '/lists'
export const LIST_SETTINGS_ROUTE = '/list-settings'
export const CHANGE_LOG_ROUTE = '/change-log'
export const TERMOS_OF_USE_ROUTE = '/terms-of-use'
export const CONTACT_ROUTE = '/contact'
export const ABOUT_ROUTE = '/about'
export const HELP_ROUTE = '/help'

export const GENERAL_LIST: Omit<ListProps, 'userId' | 'createdAt'> = {
  id: uuidv4(),
  items: [],
  name: 'geral',
  position: 0,
  type: ListTypesProps.GENERAL,
}

export const WHATS_NEW_LIST: Omit<ListProps, 'userId'> = {
  id: uuidv4(),
  items: [],
  name: 'novidades',
  position: 1,
  type: ListTypesProps.WHATS_NEW,
  createdAt: new Date().toISOString(),
}

// storage
export const STORAGE_USER_KEY = '@tiberius/user'
export const STORAGE_SELECTED_LIST_ID_KEY = '@tiberius/selectedList'
export const HAVE_SEEN_CHANGE_LOG_KEY = '@tiberius/haveSeenChangeLog'

export const DEFAULT_ICON_SIZE = 20

// styles
export const DEFAULT_ICON_PROPS = {
  size: DEFAULT_ICON_SIZE,
  weight: 'bold' as IconWeight,
}

export const DEFAULT_TOAST_PROPS = {
  position: 'top-center' as ToastPosition,
}

// random quotes
export const QUOTES = [
  '"A jornada de mil passos começa com um único item concluído."',
  '"Cada tarefa concluída é um passo em direção ao sucesso."',
  '"Grandes realizações começam com pequenas tarefas."',
  '"A produtividade é a chave para desbloquear seu potencial."',
  '"Acredite no poder de suas listas para alcançar seus objetivos."',
  '"O sucesso está na ação, não na inação."',
  '"Transforme suas tarefas em conquistas notáveis."',
  '"Faça cada momento contar em direção à realização."',
  '"O caminho para o sucesso é pavimentado com tarefas bem feitas."',
  '"Você está um passo mais perto de seus sonhos com cada item concluído."',
]

export const ERROR_MESSAGES = [
  'Parece que perdemos a conexão com o universo digital. Vamos tentar encontrar o caminho de volta juntos.',
  'Ops, parece que algo deu uma voltinha pelo nosso código! Estamos trabalhando para trazê-lo de volta ao caminho certo.',
  'Parece que o universo digital está em manutenção. Vamos esperar um pouco para ver se ele volta.',
  'Opa! Algo saiu do script e agora estamos dançando ao som de um bug. A equipe está trabalhando duro para desligar a música e consertar isso.',
  'Parece que as linhas do nosso código estão tendo uma pequena confusão.',
  'Oops! Parece que nossos hamsters programadores entraram em greve. Vamos trocar as rodinhas deles e resolver isso rapidinho!',
  'Ops-a-daisy! Nosso time de robôs comediantes tentou fazer uma piada e acabou bugando tudo. Estamos corrigindo o palco para a próxima apresentação!',
  'Eita lasquera! Nosso sistema encontrou um problema e saiu correndo atrás de um café. Vamos acelerar a xícara e logo estaremos no ritmo novamente!',
  'Uau, pegamos você de surpresa! Nosso sistema decidiu tirar um cochilo inesperado, mas estamos preparando um alarme bem barulhento para acordá-lo!',
  'Ups-a-daisy! Parece que nosso programador trapalhão derrubou uma pilha de códigos. Vamos pegar a vassoura e voltar a funcionar!',
]
