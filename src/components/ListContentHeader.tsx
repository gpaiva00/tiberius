import classNames from 'classnames'

import { DEFAULT_ICON_PROPS } from '@/consts'

import { ListProps } from '@/typings/List'

import { List } from '@phosphor-icons/react'

interface ListContentHeaderProps {
  selectedList: ListProps | null
  handleClickOnListName: () => void
}

export default function ListContentHeader({ selectedList, handleClickOnListName }: ListContentHeaderProps) {
  const completedItems = selectedList?.items.filter((item) => item.completed).length || 0
  const isListCompleted = selectedList?.items.length === completedItems
  const listItemsStatus = `${completedItems}/${selectedList?.items.length}`

  return (
    <div className="flex flex-1 items-center justify-between">
      <div className="flex items-center justify-center">
        <button
          className="hover:text-lightenGray"
          onClick={handleClickOnListName}
        >
          <List {...DEFAULT_ICON_PROPS} />
        </button>

        <h1 className="font-black text-2xl lowercase ml-4">para hoje</h1>
      </div>

      <div className="flex flex-col items-end">
        <button className="text-xl text-primary hover:underline max-w-[15.625rem] truncate">
          {selectedList?.name}
        </button>
        <span
          className={classNames('text-xs text-lightenGray', {
            'text-primary': isListCompleted,
          })}
        >
          {' '}
          {listItemsStatus}
        </span>
      </div>
    </div>
  )
}
