import classNames from 'classnames'

import { ListItem, ListProps } from '@/typings/List'

import Divider from '@/components/Divider'

import { Trash } from '@phosphor-icons/react'

interface ListBodyProps {
  selectedList: ListProps | null
  setSelectedList: React.Dispatch<React.SetStateAction<ListProps | null>>
  handleDoubleClickOnItem: (item: ListItem) => void
  handleOnCheckItem: (item: ListItem) => void
  handleDeleteItem: (item: ListItem) => void
}

export default function ListContent(props: ListBodyProps) {
  const { selectedList, handleDoubleClickOnItem, handleOnCheckItem, handleDeleteItem } = props

  const listItems = selectedList?.items

  return (
    <div className="flex flex-1 flex-col pb-4 max-h-[400px] overflow-y-scroll bg-white">
      {!listItems?.length && (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-lightenGray font-light lowercase">sem itens por enquanto</p>
        </div>
      )}
      {listItems?.map((item, index) => (
        <div>
          <div className={'flex flex-row items-center gap-2 p-4'} key={item.id}>
            <div className="flex">
              <input
                className="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-default border-default border-neutral-300 outline-none checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer transition-all"
                type="checkbox"
                checked={item.completed}
                onChange={() => handleOnCheckItem(item)}
              />
            </div>
            <div className="flex flex-1">
              <label
                className={classNames('  transition-all font-light select-text', {
                  'line-through text-gray opacity-30 hover:line-through': item.completed,
                })}
                onDoubleClick={() => handleDoubleClickOnItem(item)}
              >
                {item.text}
              </label>
            </div>
            <div className="flex">
              <button
                className="text-lightenGray hover:text-primary transition-colors"
                onClick={() => handleDeleteItem(item)}
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
          {index !== listItems.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  )
}
