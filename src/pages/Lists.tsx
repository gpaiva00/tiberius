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

import { CaretRight, TrashSimple } from '@phosphor-icons/react'

import { deleteList as deleteListOnDB, createList as createListOnDB } from '@services/list'

export default function Lists() {
  const { user } = useAuth()
  const userId = user?.uid as string

  const { lists, setSelectedList } = useList()

  const navigate = useNavigate()

  const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

  const handleAddList = (listName: string) => {
    const newList = {
      id: uuidv4(),
      name: listName,
      items: [],
      userId,
    }

    createListOnDB(newList)
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

  return (
    <Card>
      <ListsContentHeader />
      <Divider />

      <ListContentContainer>
        {lists.map((list, index) => (
          <div key={list.id}>
            <div className="flex items-center justify-between p-4">
              <div className="flex flex-1 flex-col">
                <h1
                  className={classNames('max-w-[86%] cursor-pointer truncate text-primary hover:underline', {
                    'font-bold': list.id === selectedListOnStorage,
                    'font-light': list.id !== selectedListOnStorage,
                  })}
                  onClick={() => handleOnChooseList(list)}
                >
                  {list.name}
                </h1>
                <div className="flex items-center gap-2">
                  <ProgressBar items={list.items} />
                  <CompletedItemsCount
                    size="sm"
                    items={list.items || []}
                  />
                </div>
              </div>

              {list.name === GENERAL_LIST.name ? (
                <CaretRight {...DEFAULT_ICON_PROPS} />
              ) : (
                <button
                  className="rounded-default p-2 transition-colors hover:bg-lightGray"
                  onClick={() => handleDeleteList(list.id)}
                >
                  <TrashSimple {...DEFAULT_ICON_PROPS} />
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
