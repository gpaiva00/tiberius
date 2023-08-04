import Badge from '@/shared/components/Badge'
import { TaskProps } from '@/typings/List'
import classNames from 'classnames'

interface CompletedItemsCount {
  items: TaskProps[]
}

export default function CompletedItemsCount({ items = [] }: CompletedItemsCount) {
  const completedItems = items.filter((item) => item.completed).length || 0
  const isListCompleted = items.length === completedItems && items.length > 0
  const listItemsStatus = `${completedItems}/${items.length}`

  return (
    <Badge
      className={classNames('bg-transparent', {
        'text-blue-500': isListCompleted,
      })}
    >
      {listItemsStatus}
    </Badge>
  )
}
