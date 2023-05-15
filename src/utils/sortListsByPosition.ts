import { GENERAL_LIST } from '@/consts'

import { ListProps } from '@/typings/List'

export const sortListsByPosition = (lists: ListProps[]): ListProps[] => {
  lists.sort((a, b) => {
    if (a.id === GENERAL_LIST.id) return -1
    if (b.id === GENERAL_LIST.id) return 1

    return a.position - b.position
  })

  return lists
}
