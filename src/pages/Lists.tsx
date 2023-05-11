import { useRef } from 'react'

import { useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

import Divider from '@/components/Divider'
import { ListContentContainer } from '@/components/ListContentContainer'
import ListsContentFooter from '@/components/ListsContentFooter'
import ListsContentHeader from '@/components/ListsContentHeader'
import Card from '@/components/Card'
import ProgressBar from '@/components/ProgressBar'
import CompletedItemsCount from '@/components/CompletedItemsCount'

import { DEFAULT_ICON_PROPS, GENERAL_LIST, LIST_ROUTE, STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'

import { useAuth } from '@/contexts/useAuth'
import { useList } from '@/contexts/useList'

import { ListProps } from '@/typings/List'

import { getFromStorage, setToStorage } from '@/utils/storage'

import { CaretRight, DotsSixVertical, TrashSimple } from '@phosphor-icons/react'

import { deleteList as deleteListOnDB, createList as createListOnDB, updateUserLists } from '@services/list'

export default function Lists() {
  const { user } = useAuth()
  const userId = user?.uid as string

  const { lists, setSelectedList } = useList()
  const listRef = useRef<HTMLDivElement>(null)

  const navigate = useNavigate()

  const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

  const handleAddList = (listName: string) => {
    const newList = {
      id: uuidv4(),
      name: listName,
      items: [],
      userId,
      position: lists.length,
    }

    createListOnDB(newList)

    setTimeout(() => {
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 100)
  }

  const handleDeleteList = (listID: string) => {
    const prompt = window.confirm('tem certeza que deseja excluir esta lista?')

    if (!prompt) return

    deleteListOnDB(listID)
  }

  const handleOnChooseList = (list: ListProps) => {
    setSelectedList(list)
    setToStorage(STORAGE_SELECTED_LIST_ID_KEY, list.id)

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

  const handleOnDropItem = async (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.preventDefault()
    event.currentTarget.classList.remove('drag-over')

    const dragIndex = Number(event.dataTransfer.getData('text/plain'))
    const newLists = [...lists]

    if (!newLists[index].position) {
      newLists[index].position = newLists.length
    }

    newLists[index].position = newLists[dragIndex].position

    const [removed] = newLists.splice(dragIndex, 1)

    newLists.splice(index, 0, removed)

    console.warn({ newLists })
    return

    await updateUserLists(newLists)
  }

  return (
    <Card>
      <ListsContentHeader />
      <ListContentContainer>
        {lists.map((list, index) => (
          <div
            key={list.id}
            // draggable
            // onDragStart={(event) => handleOnDragItemStart(event, index)}
            // onDragOver={(event) => handleOnDragItemOver(event)}
            // onDrop={(event) => handleOnDropItem(event, index)}
            // onDragLeave={(event) => handleDragItemLeave(event)}
            ref={listRef}
          >
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-1">
                  {/* {list.id !== GENERAL_LIST.id && (
                    <DotsSixVertical
                      className="cursor-grab text-lightenGray2 dark:text-darkTextGray"
                      {...DEFAULT_ICON_PROPS}
                    />
                  )} */}
                  <h1
                    className={classNames(
                      'max-w-[86%] cursor-pointer truncate text-primary hover:underline dark:text-darkPrimary',
                      {
                        'font-bold': list.id === selectedListOnStorage,
                        'font-light': list.id !== selectedListOnStorage,
                      }
                    )}
                    onClick={() => handleOnChooseList(list)}
                  >
                    {list.name}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <ProgressBar items={list.items} />
                  <CompletedItemsCount
                    size="sm"
                    items={list.items || []}
                  />
                </div>
              </div>

              {list.name === GENERAL_LIST.name ? (
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
            {(index !== lists.length - 1 || list.id === GENERAL_LIST.id) && <Divider />}
          </div>
        ))}
      </ListContentContainer>
      <ListsContentFooter handleAddList={handleAddList} />
    </Card>
  )
}
