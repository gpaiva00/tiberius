import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Menu } from '@headlessui/react'
import classNames from 'classnames'
import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import {
  CardContentContainer,
  CompletedItemsCount,
  Divider,
  FormattedItemText,
  MainCard,
  Modal,
} from '@/shared/components'

import { useAuth, useChangeLog, useList } from '@/hooks'
import { createList as createListOnDB, updateUserLists } from '@services/list'

import {
  CHANGE_LOG_ROUTE,
  DEFAULT_ICON_PROPS,
  LIST_ROUTE,
  LIST_SETTINGS_ROUTE,
  QUOTES,
} from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'
import { getRandomQuote } from '@/utils'

import { Archive, CaretRight, DotsThree, GearSix, Plus, TrashSimple } from '@phosphor-icons/react'

export default function Lists() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showAddListModal, setShowAddListModal] = useState(false)
  const [listName, setListName] = useState('')

  const { user } = useAuth()
  const userId = user?.uid as string

  const { lists, saveSelectedList, deleteList } = useList()
  const { haveSeenChangeLog } = useChangeLog()

  const navigate = useNavigate()
  const listRef = useRef<HTMLDivElement>(null)
  const [parent] = useAutoAnimate()

  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const toggleCreateListModal = () => {
    setShowAddListModal(!showAddListModal)
    setListName('')
  }

  const handleAddList = async () => {
    if (!listName) return

    const validatedListName = listName.trim()

    const newList: ListProps = {
      id: uuidv4(),
      name: validatedListName,
      items: [],
      userId,
      position: lists.length,
      type: ListTypesProps.DEFAULT,
      createdAt: new Date().toISOString(),
    }

    await createListOnDB(newList)

    toggleCreateListModal()
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }

  const handleOnChangeListName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setListName(event.target.value)

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
    <>
      <MainCard
        title="Listas"
        options={
          <button
            onClick={toggleCreateListModal}
            className="icon-button"
          >
            <Plus {...DEFAULT_ICON_PROPS} />
          </button>
        }
      >
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
          {/* lists */}
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
                  className={classNames(
                    'flex items-center pl-4 pr-2 transition-all hover:bg-lightGray dark:hover:bg-darkInputBackground',
                    {
                      'pr-4': list.type === ListTypesProps.GENERAL,
                    }
                  )}
                >
                  {/* list text */}
                  <div
                    className="flex w-full cursor-pointer items-center gap-2 py-2"
                    onClick={() => handleClickOnListName(list)}
                  >
                    <h1 className="list-title">
                      {list.type === ListTypesProps.GENERAL && (
                        <Archive
                          {...DEFAULT_ICON_PROPS}
                          className="mr-1"
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
                      className="text-lightenGray dark:text-lightenGray"
                    />
                  ) : (
                    <Menu
                      as="div"
                      className="relative inline-block"
                    >
                      <Menu.Button className="inline-flex">
                        <button className="icon-button hover:bg-zinc-300 dark:hover:bg-zinc-700">
                          <DotsThree
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
                {(index !== lists.length - 1 || list.type === ListTypesProps.GENERAL) && (
                  <Divider />
                )}
              </div>
            ))}
          </div>
        </CardContentContainer>
      </MainCard>
      <Modal
        isOpen={showAddListModal}
        toggleDialog={toggleCreateListModal}
        title="Criar lista"
      >
        {/* body */}
        <div className="flex flex-col gap-2 px-4 py-4">
          <label className="default-label">Nome da lista</label>
          <input
            type="text"
            className="default-input-text"
            placeholder="Ex: 📖 Estudos"
            onSubmit={handleAddList}
            onKeyDown={(event) => event.key === 'Enter' && handleAddList()}
            value={listName}
            onChange={handleOnChangeListName}
          />
          <button
            className="primary-button mt-4"
            onClick={handleAddList}
            disabled={!listName}
          >
            Criar lista
          </button>
        </div>
      </Modal>
    </>
  )
}
