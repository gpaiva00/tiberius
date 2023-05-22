import { useRef, useState } from 'react'
import classNames from 'classnames'
import { v4 as uuidv4 } from 'uuid'

import { ListItemProps, ListProps } from '@typings/List'

import Divider from '@/shared/components/Divider'
import Footer from '@/pages/list/components/ListFooter'
import Header from '@/pages/list/components/ListHeader'
import Card from '@/shared/components/Card'
import { CardContentContainer } from '@/shared/components/CardContentContainer'
import ItemTextFormatted from '@/pages/list/components/ItemTextFormatted'

import { useList } from '@/hooks/useList'
import { DEFAULT_ICON_PROPS } from '@/consts'
import { sortListItemsByStatus } from '@utils/sortListItemsByStatus'

import { DotsSixVertical, TrashSimple } from '@phosphor-icons/react'
import CompletedItemsCount from '@/shared/components/CompletedItemsCount'

export default function List() {
  const [editingItem, setEditingItem] = useState<ListItemProps | null>(null)

  const { selectedList, updateList } = useList()
  const listRef = useRef<HTMLDivElement>(null)

  const sortedListItems = sortListItemsByStatus((selectedList?.items || []) as ListItemProps[])

  const handleDoubleClickOnItem = (item: ListItemProps) => {
    if (item.completed) return
    setEditingItem({
      ...item,
    })
  }

  const handleDeleteItem = async (item: ListItemProps) => {
    const prompt = window.confirm('tem certeza que deseja excluir este item?')

    if (!prompt) return

    const updatedItems = selectedList?.items.filter((selectedListItem) => selectedListItem.id !== item.id)
    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems as ListItemProps[],
    }

    await updateList(updatedList)
  }

  const updateItem = async (item: ListItemProps) => {
    const newListItems = [...(selectedList?.items as ListItemProps[])]

    const itemIndex = newListItems.findIndex((listItem) => listItem.id === item.id)
    console.warn({ item })

    newListItems[itemIndex] = item

    const updatedList = {
      ...(selectedList as ListProps),
      items: newListItems,
    }

    await updateList(updatedList)
  }

  const renameItem = (itemText: string) => {
    const newItem = {
      ...(editingItem as ListItemProps),
      text: itemText,
    }

    updateItem(newItem)
    setEditingItem(null)
  }

  const handleCompleteItem = async (item: ListItemProps) => {
    const newItem = {
      ...item,
      completed: !item.completed,
      completedAt: item.completed ? '' : new Date().toISOString(),
    }

    await updateItem(newItem)
  }

  const handleAddItem = async (itemText: string) => {
    const validatedItemText = itemText.trim()

    if (!!editingItem) {
      renameItem(validatedItemText)
      return
    }

    const updatedItems: ListItemProps[] = [
      ...(selectedList?.items as ListItemProps[]),
      {
        id: uuidv4(),
        text: validatedItemText,
        completed: false,
        createdAt: new Date().toISOString(),
      },
    ]

    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems,
    }

    await updateList(updatedList)

    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }
  // drag and drop
  const handleOnDragItemStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData('text/plain', index.toString())
  }

  const handleOnDragItemOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.currentTarget.classList.add('drag-over')
  }

  const handleDragItemLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.currentTarget.classList.remove('drag-over')
  }

  const handleOnDropItem = async (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault()
    event.currentTarget.classList.remove('drag-over')

    const dragIndex = Number(event.dataTransfer.getData('text/plain'))
    const newNotCompletedItems = [...(sortedListItems?.notCompleted as ListItemProps[])]
    const [draggedItem] = newNotCompletedItems.splice(dragIndex, 1)

    newNotCompletedItems.splice(index, 0, draggedItem)

    await updateList({
      ...(selectedList as ListProps),
      items: [...newNotCompletedItems, ...(sortedListItems?.completed as ListItemProps[])],
    })
  }

  return (
    <Card>
      <Header selectedList={selectedList} />
      <CardContentContainer>
        {!selectedList?.items.length && (
          <div className="flex flex-1 items-center justify-center">
            <p className="lowercase text-lightenGray">sem itens por enquanto</p>
          </div>
        )}
        {sortedListItems.notCompleted.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(event) => handleOnDragItemStart(event, index)}
            onDragOver={(event) => handleOnDragItemOver(event)}
            onDrop={(event) => handleOnDropItem(event, index)}
            onDragLeave={(event) => handleDragItemLeave(event)}
            ref={listRef}
          >
            <div className="flex flex-row items-center px-4 py-3">
              <div className="mr-4 flex items-center gap-1">
                <DotsSixVertical
                  className="cursor-grab text-lightenGray2 dark:text-darkTextGray"
                  {...DEFAULT_ICON_PROPS}
                />
                <input
                  className="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-default border-default border-lightenGray outline-none transition-all checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.315rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer dark:border-darkTextGray"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCompleteItem(item)}
                />
              </div>
              <div className="flex flex-1">
                <label
                  className="max-w-[92%] transition-all dark:text-darkTextLight"
                  onDoubleClick={() => handleDoubleClickOnItem(item)}
                >
                  <ItemTextFormatted itemText={item.text} />
                </label>
              </div>
              <div className="flex">
                <button
                  className="icon-button"
                  onClick={() => handleDeleteItem(item)}
                >
                  <TrashSimple {...DEFAULT_ICON_PROPS} />
                </button>
              </div>
            </div>
            {index !== sortedListItems.notCompleted.length - 1 && <Divider />}
          </div>
        ))}
        {sortedListItems.completed.length > 0 && (
          <div className="flex items-center gap-2 bg-lightGray px-4 py-2 dark:bg-darkInputBackground">
            <h2 className="font-bold lowercase dark:text-darkTextLight">concluídas</h2>
            <CompletedItemsCount items={selectedList?.items || []} />
          </div>
        )}
        {sortedListItems.completed.map((item, index) => (
          <div key={item.id}>
            <div className="flex flex-row items-center gap-4 px-4 py-2">
              <div className="flex">
                <input
                  className="relative h-[1.125rem] w-[1.125rem] appearance-none rounded-default border-default border-lightenGray outline-none transition-all checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.315rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer dark:border-darkTextGray"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCompleteItem(item)}
                />
              </div>
              <div className="flex flex-1">
                <label className="select-text text-lightenGray line-through opacity-50 transition-all dark:text-darkTextGray">
                  {item.text}
                </label>
              </div>
              <span className="text-xs text-lightenGray opacity-50 dark:text-darkTextGray">
                {new Date(item.completedAt as string).toLocaleDateString()} às{' '}
                {new Date(item.completedAt as string).toLocaleTimeString(navigator.language, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
            {index !== sortedListItems.completed.length - 1 && <Divider />}
          </div>
        ))}
      </CardContentContainer>
      <Footer
        handleAddItem={handleAddItem}
        editingItemText={editingItem?.text}
      />
    </Card>
  )
}
