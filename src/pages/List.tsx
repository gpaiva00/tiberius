import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useAuth } from '@/hooks/useAuth'

import ListContent from '@/components/ListContent'
import ListsContent from '@/components/ListsContent'
import Divider from '@components/Divider'

import { ListItemProps, ListProps } from '@typings/List'

import ListContentFooter from '@/components/ListContentFooter'
import ListsContentFooter from '@/components/ListsContentFooter'
import ListContentHeader from '@/components/ListContentHeader'
import ListsContentHeader from '@/components/ListsContentHeader'
import DefaultCard from '@/components/DefaultCard'

import { STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'
import { getFromStorage, setToStorage } from '@/utils/storage'

import {
  createList as createListOnDB,
  deleteList as deleteListOnDB,
  subscribeToUserLists,
  updateList as updateListOnDB,
} from '@services/list'

export default function List() {
  const [lists, setLists] = useState<ListProps[]>([])
  const [showLists, setShowLists] = useState<boolean>(false)
  const [selectedList, setSelectedList] = useState<ListProps | null>(null)
  const [editingItem, setEditingItem] = useState<ListItemProps | null>(null)

  const { user } = useAuth()
  const userId = user?.uid as string

  const toggleListView = () => setShowLists(!showLists)

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

    setSelectedList(updatedList)
    updateListOnDB(updatedList)
  }

  const handleDeleteList = (listID: string) => {
    const prompt = window.confirm('tem certeza que deseja excluir esta lista?')

    if (!prompt) return

    deleteListOnDB(listID)
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

    setSelectedList(updatedList)
    updateListOnDB(updatedList)
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

    setSelectedList(updatedList)
    updateListOnDB(updatedList)
  }

  const handleOnChooseList = (list: ListProps) => {
    setSelectedList(list)
    setShowLists(false)
    setToStorage(STORAGE_SELECTED_LIST_ID_KEY, list.id)
  }

  const handleAddList = (listName: string) => {
    const newList = {
      id: uuidv4(),
      name: listName,
      items: [],
      userId,
    }

    createListOnDB(newList)
  }

  const handleSetSelectedList = (lists: ListProps[]) => {
    const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

    if (!selectedListOnStorage) {
      setSelectedList(lists[0])
      setToStorage(STORAGE_SELECTED_LIST_ID_KEY, lists[0].id)
      return
    }

    const selectedList = lists.find((list) => list.id === selectedListOnStorage)

    setSelectedList(selectedList as ListProps)
  }

  useEffect(() => {
    const unsubscribe = subscribeToUserLists({
      userId,
      observer: (lists) => {
        const newLists: ListProps[] = []

        lists.forEach((list) => {
          newLists.push(list.data() as ListProps)
        })

        setLists(newLists)
        handleSetSelectedList(newLists)
      },
    })

    return () => unsubscribe()
  }, [])

  return (
    <DefaultCard>
      <header className="flex items-center gap-2 px-4 bg-header rounded-t-default h-16">
        {showLists ? (
          <ListsContentHeader handleClickOnBackButton={toggleListView} />
        ) : (
          <ListContentHeader
            handleClickOnListName={toggleListView}
            selectedList={selectedList}
          />
        )}
      </header>
      <Divider />

      {showLists ? (
        <ListsContent
          handleOnChooseList={handleOnChooseList}
          handleDeleteList={handleDeleteList}
          lists={lists}
        />
      ) : (
        <ListContent
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          handleDoubleClickOnItem={handleDoubleClickOnItem}
          handleOnCheckItem={handleOnCheckItem}
          handleDeleteItem={handleDeleteItem}
        />
      )}

      <Divider />
      {showLists ? (
        <ListsContentFooter handleAddList={handleAddList} />
      ) : (
        <ListContentFooter
          handleAddItem={handleAddItem}
          editingItemText={editingItem?.text}
        />
      )}
    </DefaultCard>
  )
}
