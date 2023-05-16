import { useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

import Divider from '@/shared/components/Divider'
import { CardContentContainer } from '@/shared/components/CardContentContainer'
import Footer from '@/pages/lists/components/ListsFooter'
import Header from '@/pages/lists/components/ListsHeader'
import Card from '@/shared/components/Card'
import ProgressBar from '@/shared/components/ProgressBar'
import CompletedItemsCount from '@/shared/components/CompletedItemsCount'

import { DEFAULT_ICON_PROPS, GENERAL_LIST, LIST_ROUTE, STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'

import { useAuth } from '@/contexts/useAuth'
import { useList } from '@/contexts/useList'

import { ListProps, ListTypesProps } from '@/typings/List'

import { getFromStorage } from '@utils/storage'

import { CaretRight, DotsSixVertical, TrashSimple } from '@phosphor-icons/react'

import { createList as createListOnDB, updateUserLists } from '@services/list'

export default function Lists() {
  const { user } = useAuth()
  const userId = user?.uid as string

  const { lists, saveSelectedList, deleteList } = useList()
  const listRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

  const handleAddList = async (listName: string) => {
    const newList: ListProps = {
      id: uuidv4(),
      name: listName,
      items: [],
      userId,
      position: lists.length,
      type: ListTypesProps.DEFAULT,
      createdAt: new Date().toISOString(),
    }

    await createListOnDB(newList)

    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const handleDeleteList = (listID: ListProps['id']) => {
    const prompt = window.confirm('tem certeza que deseja excluir esta lista?')

    if (!prompt) return

    deleteList(listID)
  }

  const handleClickOnListName = (list: ListProps) => {
    saveSelectedList(list)
    navigate(LIST_ROUTE)
  }

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

  const handleOnDropItem = async (event: React.DragEvent<HTMLDivElement>, itemReceivingDraggedListIndex: number) => {
    event.preventDefault()
    event.currentTarget.classList.remove('drag-over')

    if (itemReceivingDraggedListIndex === 0) return

    const draggedListIndex = Number(event.dataTransfer.getData('text/plain'))
    const newLists = [...lists]

    // get dragged list
    const [draggedList] = newLists.splice(draggedListIndex, 1)
    // insert dragged list on new position
    newLists.splice(itemReceivingDraggedListIndex, 0, draggedList)

    // update lists position
    newLists.forEach((list, index) => {
      list.position = index
    })

    await updateUserLists(newLists)
  }

  return (
    <Card>
      <Header />
      <CardContentContainer>
        {lists.map((list, index) => (
          <div
            key={list.id}
            draggable={list.type !== (ListTypesProps.GENERAL || ListTypesProps.WHATS_NEW)}
            onDragStart={(event) => handleOnDragItemStart(event, index)}
            onDragOver={(event) => handleOnDragItemOver(event)}
            onDrop={(event) => handleOnDropItem(event, index)}
            onDragLeave={(event) => handleDragItemLeave(event)}
            ref={listRef}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-1">
                  {list.type == ListTypesProps.DEFAULT && (
                    <DotsSixVertical
                      className="cursor-grab text-lightenGray2 dark:text-darkTextGray"
                      {...DEFAULT_ICON_PROPS}
                    />
                  )}
                  <h1
                    className={classNames(
                      'max-w-[21.875rem] cursor-pointer truncate text-primary hover:underline dark:text-darkPrimary',
                      {
                        'font-bold': list.id === selectedListOnStorage || list.type === ListTypesProps.WHATS_NEW,
                        'font-light': list.id !== selectedListOnStorage,
                      }
                    )}
                    onClick={() => handleClickOnListName(list)}
                  >
                    {list.type === ListTypesProps.WHATS_NEW && <span>🎉 </span>}
                    {list.name}
                  </h1>
                </div>
                {list.type !== ListTypesProps.WHATS_NEW && (
                  <div className="flex items-center gap-2">
                    <ProgressBar items={list.items} />
                    <CompletedItemsCount
                      size="sm"
                      items={list.items || []}
                    />
                  </div>
                )}
              </div>

              {list.type === ListTypesProps.GENERAL || list.type === ListTypesProps.WHATS_NEW ? (
                <CaretRight
                  {...DEFAULT_ICON_PROPS}
                  className="dark:text-darkTextLight"
                />
              ) : (
                <button
                  className="rounded-default p-2 transition-colors hover:bg-lightGray dark:hover:bg-darkTextGray"
                  onClick={() => handleDeleteList(list.id)}
                >
                  <TrashSimple
                    {...DEFAULT_ICON_PROPS}
                    className="dark:text-darkTextLight"
                  />
                </button>
              )}
            </div>
            {(index !== lists.length - 1 || list.type === ListTypesProps.GENERAL) && <Divider />}
          </div>
        ))}
      </CardContentContainer>
      <Footer handleAddList={handleAddList} />
    </Card>
  )
}
