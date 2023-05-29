import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import Confetti from 'react-confetti'
import toast from 'react-hot-toast'
import { v4 as uuidv4 } from 'uuid'

import { useList } from '@/hooks'

import Footer from '@/pages/list/components/ListFooter'
import Header from '@/pages/list/components/ListHeader'
import { Card, CardContentContainer, Divider, FormattedItemText } from '@/shared/components'

import {
  COMPLETE_MESSAGES,
  CONGRATS_EMOJIS,
  DEFAULT_ICON_PROPS,
  DEFAULT_TOAST_PROPS,
  QUOTES,
} from '@/consts'
import { copyToClipboard, getDayFromDateString, getRandomQuote, ifTextHasLink } from '@/utils'
import { ListItemMarksProps, ListItemProps, ListProps } from '@typings/List'
import { sortListItemsByStatus } from '@utils/sortListItemsByStatus'

import {
  Copy,
  CursorText,
  DotsThreeVertical,
  ListDashes,
  PencilSimple,
  TrashSimple,
} from '@phosphor-icons/react'

export default function List() {
  const [editingItem, setEditingItem] = useState<ListItemProps | null>(null)

  const { selectedList, updateList } = useList()
  const listRef = useRef<HTMLDivElement>(null)
  const [parent] = useAutoAnimate()

  const sortedListItems = sortListItemsByStatus((selectedList?.items || []) as ListItemProps[])
  const isListCompleted =
    sortedListItems.notCompleted.length === 0 && sortedListItems.completed.length > 0

  const handleEditItem = (item: ListItemProps) => {
    if (item.completed) return
    setEditingItem({
      ...item,
    })
  }

  const handleDeleteItem = async (item: ListItemProps) => {
    const prompt = window.confirm('tem certeza que deseja excluir este item?')

    if (!prompt) return

    const updatedItems = selectedList?.items.filter(
      (selectedListItem) => selectedListItem.id !== item.id
    )
    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems as ListItemProps[],
    }

    await updateList(updatedList)
  }

  const updateItem = async (item: ListItemProps) => {
    const newListItems = [...(selectedList?.items as ListItemProps[])]

    const itemIndex = newListItems.findIndex((listItem) => listItem.id === item.id)

    newListItems[itemIndex] = {
      ...item,
      updatedAt: new Date().toISOString(),
    }

    const updatedList = {
      ...(selectedList as ListProps),
      items: newListItems,
    }

    await updateList(updatedList)
  }

  const renameItem = (itemText: string) => {
    const newItem: ListItemProps = {
      ...(editingItem as ListItemProps),
      text: itemText,
    }

    updateItem(newItem)
    setEditingItem(null)
  }

  const handleCompleteItem = async (item: ListItemProps) => {
    const newItemCompleteValue = !item.completed

    const newItem: ListItemProps = {
      ...item,
      completed: newItemCompleteValue,
      completedAt: newItemCompleteValue ? new Date().toISOString() : '',
      markColor: newItemCompleteValue ? '' : item.markColor,
    }

    await updateItem(newItem)

    if (!item.completed) {
      toast(getRandomQuote(COMPLETE_MESSAGES), {
        icon: getRandomQuote(CONGRATS_EMOJIS),
        ...DEFAULT_TOAST_PROPS,
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
        updatedAt: new Date().toISOString(),
        markColor: '',
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

  const handleMarkItem = async (item: ListItemProps, markOption: ListItemMarksProps) => {
    const newItem: ListItemProps = {
      ...item,
      markColor: markOption === item.markColor ? '' : markOption,
    }

    await updateItem(newItem)
  }

  const ITEM_OPTIONS = (item: ListItemProps) => [
    {
      text: 'Editar',
      icon: (
        <PencilSimple
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => handleEditItem(item),
    },
    {
      text: 'Excluir',
      icon: (
        <TrashSimple
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => handleDeleteItem(item),
    },
    {
      text: 'Copiar',
      icon: (
        <CursorText
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => copyToClipboard(item.text),
    },
    {
      text: 'Duplicar',
      icon: (
        <Copy
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => handleAddItem(item.text),
    },
    {
      text: 'Mover',
      icon: (
        <ListDashes
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => {},
    },
  ]

  const MARK_OPTIONS = (item: ListItemProps) => [
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-green-400 transition-colors hover:bg-green-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-darkTextLight':
                item.markColor === 'green',
              'opacity-25': item.markColor && item.markColor !== 'green',
            }
          )}
        />
      ),
      action: () => handleMarkItem(item, 'green'),
    },
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-yellow-400 transition-colors hover:bg-yellow-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-darkTextLight':
                item.markColor === 'yellow',
              'opacity-25': item.markColor && item.markColor !== 'yellow',
            }
          )}
        />
      ),
      action: () => handleMarkItem(item, 'yellow'),
    },
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-rose-400 transition-colors hover:bg-rose-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-darkTextLight': item.markColor === 'red',
              'opacity-25': item.markColor && item.markColor !== 'red',
            }
          )}
        />
      ),
      action: () => handleMarkItem(item, 'red'),
    },
    {
      mark: (
        <div
          className={classNames(
            'h-4 w-4 rounded-full bg-blue-400 transition-colors hover:bg-blue-500 hover:opacity-100',
            {
              'border border-black opacity-100 dark:border-darkTextLight':
                item.markColor === 'blue',
              'opacity-25': item.markColor && item.markColor !== 'blue',
            }
          )}
        />
      ),
      action: () => handleMarkItem(item, 'blue'),
    },
  ]

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
              <div
                className={classNames('flex flex-row items-center', {
                  'px-2 pb-2': item.updatedAt,
                  'p-2': !item.updatedAt,
                })}
              >
                {/* checkbox */}
                <div className="ml-2 mr-2 flex items-center gap-1 md:mr-4">
                  <input
                    className="default-checkbox"
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => handleCompleteItem(item)}
                  />
                </div>
                {/* item text */}
                <div className="w-full">
                  {item.updatedAt && (
                    <small className="text-[0.5rem] text-lightenGray opacity-90 dark:text-darkTextGray md:text-[0.625rem]">
                      atualizado {getDayFromDateString(item.updatedAt as string)} às{' '}
                      {new Date(item.updatedAt as string).toLocaleTimeString(navigator.language, {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </small>
                  )}
                  <div
                    className={classNames('max-w-[92%] break-words dark:text-darkTextLight', {
                      'break-all': ifTextHasLink(item.text),
                    })}
                  >
                    {FormattedItemText(item.text)}
                  </div>
                </div>
                {/* item option */}
                <div className="flex items-center gap-2">
                  <div
                    className={classNames('h-4 w-4 rounded-full transition-all', {
                      'bg-green-400': item.markColor === 'green',
                      'bg-yellow-400': item.markColor === 'yellow',
                      'bg-rose-400': item.markColor === 'red',
                      'bg-blue-400': item.markColor === 'blue',
                      'bg-transparent': !item.markColor,
                    })}
                  />
                  <Menu
                    as="div"
                    className="relative inline-block"
                  >
                    <Menu.Button className="inline-flex">
                      <button className="icon-button">
                        <DotsThreeVertical
                          className="text-lightenGray dark:text-darkTextGray"
                          {...DEFAULT_ICON_PROPS}
                        />
                      </button>
                    </Menu.Button>
                    <Menu.Items className="menu-items">
                      {ITEM_OPTIONS(item).map((option, index) => (
                        <Menu.Item key={index}>
                          <button
                            className="popover-button"
                            onClick={option.action}
                          >
                            {option.icon}
                            {option.text}
                          </button>
                        </Menu.Item>
                      ))}
                      <Menu.Items>
                        <Divider />
                        <div className="flex w-full items-center justify-between pt-3">
                          {MARK_OPTIONS(item).map((option, index) => (
                            <Menu.Item key={index}>
                              <button onClick={option.action}>{option.mark}</button>
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Menu.Items>
                  </Menu>
                </div>
              </div>
              {index !== sortedListItems.notCompleted.length - 1 && <Divider />}
            </div>
          ))}
        </div>
        {sortedListItems.completed.length > 0 && (
          <div className="flex items-center gap-2 bg-lightGray px-2 py-2 dark:bg-darkInputBackground md:px-4">
            <h2 className="text-sm font-bold dark:text-darkTextLight md:text-base">
              {sortedListItems.completed.length} concluídas
            </h2>
          </div>
        )}
        {/* completed items */}
        <div ref={parent}>
          {sortedListItems.completed.map((item, index) => (
            <div key={item.id}>
              <div className="flex flex-row items-center gap-2 px-4 py-2 md:gap-4">
                <input
                  className="default-checkbox"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCompleteItem(item)}
                />
                <div className="w-full">
                  <small className="text-[0.5rem] text-lightenGray opacity-90 dark:text-darkTextGray md:text-[0.625rem]">
                    feito {getDayFromDateString(item.completedAt as string)} às{' '}
                    {new Date(item.completedAt as string).toLocaleTimeString(navigator.language, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </small>
                  <div
                    className={classNames(
                      'max-w-[92%] break-words text-lightenGray opacity-70 dark:text-darkTextGray dark:opacity-40',
                      {
                        'break-all': ifTextHasLink(item.text),
                      }
                    )}
                  >
                    {FormattedItemText(item.text)}
                  </div>
                </div>
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
