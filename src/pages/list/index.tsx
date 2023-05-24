import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import toast from 'react-hot-toast'

import { ListItemProps, ListProps } from '@typings/List'

import Divider from '@/shared/components/Divider'
import Footer from '@/pages/list/components/ListFooter'
import Header from '@/pages/list/components/ListHeader'
import Card from '@/shared/components/Card'
import { CardContentContainer } from '@/shared/components/CardContentContainer'
import ItemTextFormatted from '@/pages/list/components/ItemTextFormatted'

import Confetti from 'react-confetti'
import { useList } from '@/hooks/useList'
import { COMPLETE_MESSAGES, CONGRATS_EMOJIS, DEFAULT_ICON_PROPS, DEFAULT_TOAST_PROPS, QUOTES } from '@/consts'
import { sortListItemsByStatus } from '@utils/sortListItemsByStatus'
import { getDayFromDateString } from '@/utils/getDayFromDateString'
import { getRandomQuote } from '@/utils/getRandomQuote'

import { DotsSixVertical, TrashSimple } from '@phosphor-icons/react'

export default function List() {
  const [editingItem, setEditingItem] = useState<ListItemProps | null>(null)

  const { selectedList, updateList } = useList()
  const listRef = useRef<HTMLDivElement>(null)
  const [parent] = useAutoAnimate()

  const sortedListItems = sortListItemsByStatus((selectedList?.items || []) as ListItemProps[])
  const isListCompleted = sortedListItems.notCompleted.length === 0 && sortedListItems.completed.length > 0

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

    if (!item.completed) {
      toast(getRandomQuote(COMPLETE_MESSAGES), {
        icon: getRandomQuote(CONGRATS_EMOJIS),
        ...DEFAULT_TOAST_PROPS,
        duration: 6000,
        style: {
          width: '800px',
        },
      })
    }
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
      {isListCompleted && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
        />
      )}
      <Header selectedList={selectedList} />
      <CardContentContainer>
        {/* quotation */}
        {!selectedList?.items.length && (
          <div className="flex flex-1 items-center justify-center px-4 md:px-0">
            <p className="text-center italic text-lightenGray">{getRandomQuote(QUOTES)}</p>
          </div>
        )}
        {/* uncompleted items */}
        <div ref={parent}>
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
              <div className="flex flex-row items-center p-2 md:px-4 md:py-3">
                <div className="mr-2 flex items-center gap-1 md:mr-4">
                  <DotsSixVertical
                    className="cursor-grab text-lightenGray2 dark:text-darkTextGray"
                    {...DEFAULT_ICON_PROPS}
                  />
                  <input
                    className="default-checkbox"
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCompleteItem(item)}
                  />
                </div>
                <div className="flex flex-1">
                  <label
                    className="max-w-[92%] text-sm transition-all dark:text-darkTextLight md:text-base"
                    onDoubleClick={() => handleDoubleClickOnItem(item)}
                  >
                    <ItemTextFormatted itemText={item.text} />
                  </label>
                </div>
                {/* item option */}
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
        </div>
        {sortedListItems.completed.length > 0 && (
          <div className="flex items-center gap-2 bg-lightGray px-2 py-2 dark:bg-darkInputBackground md:px-4">
            <h2 className="text-sm font-bold lowercase dark:text-darkTextLight md:text-base">
              {sortedListItems.completed.length} concluídas
            </h2>
          </div>
        )}
        {/* completed items */}
        <div ref={parent}>
          {sortedListItems.completed.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-row items-center gap-2 px-4 py-2 md:gap-4">
                <div className="flex">
                  <input
                    className="default-checkbox"
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCompleteItem(item)}
                  />
                </div>
                <div className="flex flex-1">
                  <label className="select-text text-sm text-lightenGray line-through opacity-50 transition-all dark:text-darkTextGray md:max-w-[92%] md:text-base">
                    {item.text}
                  </label>
                </div>
                <span className="text-[0.5rem] text-lightenGray opacity-70 dark:text-darkTextGray md:text-[0.625rem]">
                  feito {getDayFromDateString(item.completedAt as string)} às{' '}
                  {new Date(item.completedAt as string).toLocaleTimeString(navigator.language, {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              {index !== sortedListItems.completed.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </CardContentContainer>
      <Footer
        handleAddItem={handleAddItem}
        editingItemText={editingItem?.text}
      />
    </Card>
  )
}
