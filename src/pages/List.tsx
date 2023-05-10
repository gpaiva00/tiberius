import { useState } from 'react'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import { ListItemProps, ListProps } from '@typings/List'

import Divider from '@components/Divider'
import ListContentFooter from '@/components/ListContentFooter'
import ListContentHeader from '@/components/ListContentHeader'
import DefaultCard from '@/components/DefaultCard'
import { ListContentContainer } from '@/components/ListContentContainer'

import { useList } from '@/contexts/useList'

import { DEFAULT_ICON_PROPS } from '@/consts'
import ItemTextFormatted from '@/utils/ItemTextFormatted'

import { DotsSixVertical, TrashSimple } from '@phosphor-icons/react'

export default function List() {
  const [editingItem, setEditingItem] = useState<ListItemProps | null>(null)

  const { selectedList, updateList } = useList()

  const handleDoubleClickOnItem = (item: ListItemProps) => {
    if (item.completed) return
    setEditingItem(item)
  }

  const handleDeleteItem = (item: ListItemProps) => {
    const prompt = window.confirm('tem certeza que deseja excluir este item?')

    if (!prompt) return

    const updatedItems = selectedList?.items.filter((selectedListItem) => selectedListItem.id !== item.id)
    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems as ListItemProps[],
    }

    updateList(updatedList)
  }

  const updateItem = (item: ListItemProps) => {
    const updatedItems = selectedList?.items.map((selectedListItem) => {
      if (selectedListItem.id === item.id) {
        return item
      }

      return selectedListItem
    })

    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems as ListItemProps[],
    }

    updateList(updatedList)
  }

  const renameItem = (itemText: string) => {
    const newItem = {
      ...(editingItem as ListItemProps),
      text: itemText,
    }

    updateItem(newItem)
    setEditingItem(null)
  }

  const handleOnCheckItem = (item: ListItemProps) => {
    const newItem = {
      ...item,
      completed: !item.completed,
    }

    updateItem(newItem)
  }

  const handleAddItem = (itemText: string) => {
    if (!!editingItem) {
      renameItem(itemText)
      return
    }

    const updatedItems = [
      ...(selectedList?.items as ListItemProps[]),
      {
        id: uuidv4(),
        text: itemText,
        completed: false,
        position: selectedList?.items.length,
      },
    ]

    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems,
    }

    updateList(updatedList)
  }

  const handleOnDragItemStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData('text/plain', index.toString());
  }

  const handleOnDragItemOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.add('drag-over')
  }

  const handleDragItemLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('drag-over');
  }

  const handleOnDropItem = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    const dragIndex = Number(event.dataTransfer.getData('text/plain'));
    const newListItems = [...selectedList?.items as ListItemProps[]];
    const [removed] = newListItems.splice(dragIndex, 1);

    newListItems.splice(index, 0, removed);

    updateList({
      ...selectedList as ListProps,
      items: newListItems,
    })
  }

  return (
    <DefaultCard>
      <ListContentHeader
        handleClickOnListName={() => { }}
        selectedList={selectedList}
      />
      <Divider />

      <ListContentContainer>
        {!selectedList?.items.length && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-lightenGray font-light lowercase">sem itens por enquanto</p>
          </div>
        )}
        {selectedList?.items.map((item, index) => (
          <div key={item.id}
            draggable
            onDragStart={(event) => handleOnDragItemStart(event, index)}
            onDragOver={(event) => handleOnDragItemOver(event)}
            onDrop={(event) => handleOnDropItem(event, index)}
            onDragLeave={(event) => handleDragItemLeave(event)}
          >
            <div className="flex flex-row items-center p-4">
              <div className="flex gap-1">
                <DotsSixVertical
                  className="text-lightenGray2 cursor-grab"
                  {...DEFAULT_ICON_PROPS}
                />
                <input
                  className="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-default border-default border-lightenGray outline-none checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.315rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer transition-all"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleOnCheckItem(item)}
                />
              </div>
              <div className="flex flex-1 ml-3">
                <label
                  className={classNames('transition-all font-light select-text', {
                    'line-through text-gray opacity-30 hover:line-through': item.completed,
                  })}
                  onDoubleClick={() => handleDoubleClickOnItem(item)}
                >
                  <ItemTextFormatted itemText={item.text} />
                </label>
              </div>
              <div className="flex">
                <button
                  className="hover:bg-lightGray rounded-default p-2 transition-colors"
                  onClick={() => handleDeleteItem(item)}
                >
                  <TrashSimple {...DEFAULT_ICON_PROPS} />
                </button>
              </div>
            </div>
            {index !== selectedList?.items.length - 1 && <Divider />}
          </div>
        ))}
      </ListContentContainer>

      <Divider />
      <ListContentFooter
        handleAddItem={handleAddItem}
        editingItemText={editingItem?.text}
      />
    </DefaultCard>
  )
}
