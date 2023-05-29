import classNames from 'classnames'

import { ListItemProps } from '@/typings/List'

interface CompletedItemsCount {
  items: ListItemProps[]
  size?: 'sm' | 'normal'
}

export default function CompletedItemsCount({ items = [], size = 'normal' }: CompletedItemsCount) {
  const completedItems = items.filter((item) => item.completed).length || 0
  const isListCompleted = items.length === completedItems && items.length > 0
  const listItemsStatus = `${completedItems}/${items.length}`

  return (
    <span
      className={classNames(
        'flex h-5 items-center justify-center rounded-xl border-default px-2 text-lightenGray',
        {
          'text-primary': isListCompleted,
          'text-xs': size === 'normal',
          'text-[0.625rem]': size === 'sm',
        }
      )}
    >
      {listItemsStatus}
    </span>
  )
}
