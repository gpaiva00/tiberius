import { v4 as uuidv4 } from 'uuid'
import { ListProps } from '@/typings/List'
import { IconWeight } from '@phosphor-icons/react'

export const LIST_ROUTE = '/list'
export const SIGN_IN_ROUTE = '/sign-in'
export const USER_ROUTE = '/user'
export const LISTS_ROUTE = '/lists'
export const LIST_SETTINGS_ROUTE = '/list-settings'

export const GENERAL_LIST: Omit<ListProps, 'userId'> = {
  id: 'general',
  items: [],
  name: 'geral',
  position: 0,
}

// storage
export const STORAGE_USER_KEY = '@tiberius/user'
export const STORAGE_SELECTED_LIST_ID_KEY = '@tiberius/selectedList'

export const DEFAULT_ICON_SIZE = 20

// styles
export const DEFAULT_ICON_PROPS = {
  size: DEFAULT_ICON_SIZE,
  weight: 'bold' as IconWeight,
}
