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
  'A jornada de mil passos começa com um único item concluído.',
  'Cada tarefa concluída é um passo em direção ao sucesso.',
  'Grandes realizações começam com pequenas tarefas.',
  'A produtividade é a chave para desbloquear seu potencial.',
  'Acredite no poder de suas listas para alcançar seus objetivos.',
  'O sucesso está na ação, não na inação.',
  'Transforme suas tarefas em conquistas notáveis.',
  'Faça cada momento contar em direção à realização.',
  'O caminho para o sucesso é pavimentado com tarefas bem feitas.',
  'Você está um passo mais perto de seus sonhos com cada item concluído.',
]
