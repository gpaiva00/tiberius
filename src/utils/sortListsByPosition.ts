import { ListProps, ListTypesProps } from '@/typings/List'

export const sortListsByPosition = (lists: ListProps[]): ListProps[] => {
  lists.sort((a, b) => {
    if (a.type === ListTypesProps.GENERAL) return -1
    if (b.type === ListTypesProps.GENERAL) return 1

    return a.position - b.position
  })

  return lists
}
