import Badge from '@/shared/components/Badge'
import { TaskProps } from '@/typings/List'
import classNames from 'classnames'

interface CompletedItemsCount {
  items: TaskProps[]
  size?: 'sm' | 'normal'
}

export default function CompletedItemsCount({ items = [], size = 'normal' }: CompletedItemsCount) {
  const completedItems = items.filter((item) => item.completed).length || 0
  const isListCompleted = items.length === completedItems && items.length > 0
  const listItemsStatus = `${completedItems}/${items.length}`

  return (
    <Badge
      className={classNames('bg-transparent', {
        'text-primary': isListCompleted,
      })}
    >
      {listItemsStatus}
    </Badge>
  )
}
