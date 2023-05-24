import { useRef } from 'react'

import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import Divider from '@/shared/components/Divider'
import { CardContentContainer } from '@/shared/components/CardContentContainer'
import Footer from '@/pages/lists/components/ListsFooter'
import Header from '@/pages/lists/components/ListsHeader'
import Card from '@/shared/components/Card'
import ProgressBar from '@/shared/components/ProgressBar'
import CompletedItemsCount from '@/shared/components/CompletedItemsCount'

import { CHANGE_LOG_ROUTE, DEFAULT_ICON_PROPS, LIST_ROUTE, QUOTES, STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'

import { useAuth } from '@/hooks/useAuth'
import { useList } from '@/hooks/useList'
import { createList as createListOnDB, updateUserLists } from '@services/list'

import { ListProps, ListTypesProps } from '@/typings/List'

import { getFromStorage } from '@utils/storage'
import { getRandomQuote } from '@/utils/getRandomQuote'

import { Archive, CaretRight, DotsSixVertical, TrashSimple } from '@phosphor-icons/react'

export default function Lists() {
  const { user } = useAuth()
  const userId = user?.uid as string

  const { lists, saveSelectedList, deleteList, haveSeenChangeLog } = useList()
  const navigate = useNavigate()
  const listRef = useRef<HTMLDivElement>(null)
  const [parent] = useAutoAnimate()

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
        {!haveSeenChangeLog && (
          <div>
            <div className="flex items-center justify-between bg-primary p-2 dark:bg-darkPrimary md:px-4 md:py-3">
              <div className="flex flex-1 flex-col">
                <div className="flex items-center gap-1">
                  <Link to={CHANGE_LOG_ROUTE}>
                    <h1 className="font-bold text-white hover:underline dark:text-darkTextLight">
                      <span>🎉 novidades</span>
                    </h1>
                  </Link>
                </div>
              </div>
              <CaretRight
                {...DEFAULT_ICON_PROPS}
                className="text-white dark:text-darkTextLight"
              />
            </div>
            <Divider />
          </div>
        )}
        {!lists.length && (
          <div className="flex flex-1 items-center justify-center">
            <p className="italic text-lightenGray">{getRandomQuote(QUOTES)}</p>
          </div>
        )}
        <div ref={parent}>
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
              <div className="flex flex-row items-center p-2 md:px-4 md:py-3">
                {list.type == ListTypesProps.DEFAULT && (
                  <div className="mr-2 flex items-center gap-1 md:mr-4">
                    <DotsSixVertical
                      className="cursor-grab text-lightenGray2 dark:text-darkTextGray"
                      {...DEFAULT_ICON_PROPS}
                    />
                  </div>
                )}
                {/* list text */}
                <div className="flex flex-1 flex-col items-start">
                  <h1
                    className={classNames(
                      'flex max-w-[21.875rem] cursor-pointer items-center truncate text-primary hover:underline dark:text-darkPrimary',
                      {
                        'font-bold': list.id === selectedListOnStorage,
                      }
                    )}
                    onClick={() => handleClickOnListName(list)}
                  >
                    {list.type === ListTypesProps.GENERAL && (
                      <Archive
                        {...DEFAULT_ICON_PROPS}
                        className="mr-1 md:mr-2"
                      />
                    )}
                    {list.name}
                  </h1>
                  <div className="flex h-[1rem] items-center gap-2">
                    <ProgressBar items={list.items} />
                    <CompletedItemsCount
                      size="sm"
                      items={list.items || []}
                    />
                  </div>
                </div>
                <div className="flex">
                  {list.type === ListTypesProps.GENERAL ? (
                    <CaretRight
                      {...DEFAULT_ICON_PROPS}
                      className="dark:text-darkTextLight"
                    />
                  ) : (
                    <button
                      className="icon-button"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      <TrashSimple {...DEFAULT_ICON_PROPS} />
                    </button>
                  )}
                </div>
              </div>
              {(index !== lists.length - 1 || list.type === ListTypesProps.GENERAL) && <Divider />}
            </div>
          ))}
        </div>
      </CardContentContainer>
      <Footer handleAddList={handleAddList} />
    </Card>
  )
}
