import { useAutoAnimate } from '@formkit/auto-animate/react'
import classNames from 'classnames'
import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import Footer from '@/pages/lists/components/ListsFooter'
import Header from '@/pages/lists/components/ListsHeader'
import {
  Card,
  CardContentContainer,
  CompletedItemsCount,
  Divider,
  FormattedItemText,
} from '@/shared/components'

import { useAuth, useChangeLog, useList } from '@/hooks'
import { createList as createListOnDB, updateUserLists } from '@services/list'

import {
  CHANGE_LOG_ROUTE,
  DEFAULT_ICON_PROPS,
  LIST_ROUTE,
  LIST_SETTINGS_ROUTE,
  QUOTES,
  STORAGE_SELECTED_LIST_ID_KEY,
} from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'
import { getFromStorage, getRandomQuote } from '@/utils'

import { Menu } from '@headlessui/react'
import { Archive, CaretRight, DotsThreeVertical, GearSix, TrashSimple } from '@phosphor-icons/react'

export default function Lists() {
  const { user } = useAuth()
  const userId = user?.uid as string

  const { lists, saveSelectedList, deleteList } = useList()
  const { haveSeenChangeLog } = useChangeLog()

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

  const handleGoToSettings = (list: ListProps) => {
    saveSelectedList(list)
    navigate(LIST_SETTINGS_ROUTE)
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

  const handleOnDropItem = async (
    event: React.DragEvent<HTMLDivElement>,
    itemReceivingDraggedListIndex: number
  ) => {
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

  const LIST_OPTIONS = (list: ListProps) => [
    {
      text: 'Configurar',
      icon: (
        <GearSix
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => handleGoToSettings(list),
    },
    {
      text: 'Excluir',
      icon: (
        <TrashSimple
          className="text-lightenGray dark:text-darkTextGray"
          {...DEFAULT_ICON_PROPS}
        />
      ),
      action: () => handleDeleteList(list.id),
    },
  ]

  return (
    <Card>
      <Header />
      <CardContentContainer>
        {!haveSeenChangeLog && (
          <div>
            <div className="flex items-center justify-between bg-primary p-2 dark:bg-darkPrimary">
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
              <div
                className={classNames('flex flex-row items-center py-2 pl-4 pr-2', {
                  'pl-4 pr-4': list.type === ListTypesProps.GENERAL,
                })}
              >
                {/* list text */}
                <div className="flex flex-1 items-center gap-2">
                  <h1
                    className={classNames('list-title', {
                      'font-bold': list.id === selectedListOnStorage,
                    })}
                    onClick={() => handleClickOnListName(list)}
                  >
                    {list.type === ListTypesProps.GENERAL && (
                      <Archive
                        {...DEFAULT_ICON_PROPS}
                        className="mr-1 md:mr-2"
                      />
                    )}
                    {FormattedItemText(list.name)}
                  </h1>
                  {/* complete items count */}
                  <CompletedItemsCount
                    size="sm"
                    items={list.items || []}
                  />
                </div>

                {list.type === ListTypesProps.GENERAL ? (
                  <CaretRight
                    {...DEFAULT_ICON_PROPS}
                    className="text-lightenGray dark:text-darkTextLight"
                  />
                ) : (
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
                      {LIST_OPTIONS(list).map((option) => (
                        <Menu.Item key={option.text}>
                          <button
                            className="popover-button"
                            onClick={option.action}
                          >
                            {option.icon}
                            {option.text}
                          </button>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Menu>
                )}
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
