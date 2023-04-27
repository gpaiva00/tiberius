import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ListContent from '@/components/ListContent'
import ListsContent from '@/components/ListsContent'
import Divider from '@components/Divider'

import { ListItem, ListProps } from '@typings/List'
import { GENERAL_LIST } from '@/consts'

import ListContentFooter from '@/components/ListContentFooter'
import ListsContentFooter from '@/components/ListsContentFooter'

import { createList as createListOnDB, deleteList as deleteListOnDB, updateList as updateListOnDB } from '@services/list'

export default function Home() {
  const [showLists, setShowLists] = useState<boolean>(false)
  const [selectedList, setSelectedList] = useState<ListProps | null>(GENERAL_LIST)
  const [editingItem, setEditingItem] = useState<ListItem | null>(null)

  const handleClickOnListName = () => setShowLists(true)

  const handleDoubleClickOnItem = (item: ListItem) => {
    if (item.completed) return
    setEditingItem(item)
  }

  const handleDeleteItem = (item: ListItem) => {
    const prompt = window.confirm('tem certeza que deseja excluir este item?')

    if (!prompt) return

    const updatedItems = selectedList?.items.filter((selectedListItem) => selectedListItem.id !== item.id)
    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems as ListItem[],
    }

    setSelectedList(updatedList)
    updateListOnDB(updatedList)
  }

  const handleDeleteList = (listID: string) => {
    const prompt = window.confirm('tem certeza que deseja excluir esta lista?')

    if (!prompt) return

    deleteListOnDB(listID)
  }

  const updateItem = (item: ListItem) => {
    const updatedItems = selectedList?.items.map((selectedListItem) => {
      if (selectedListItem.id === item.id) {
        return item
      }

      return selectedListItem
    })

    const updatedList = {
      ...(selectedList as ListProps),
      items: updatedItems as ListItem[],
    }

    setSelectedList(updatedList)
    updateListOnDB(updatedList)
  }

  const renameItem = (itemText: string) => {
    const newItem = {
      ...(editingItem as ListItem),
      text: itemText,
    }

    updateItem(newItem)
    setEditingItem(null)
  }

  const handleOnCheckItem = (item: ListItem) => {
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
      ...(selectedList?.items as ListItem[]),
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
    if (list.id === GENERAL_LIST.id) {
      setSelectedList(GENERAL_LIST)
      setShowLists(false)
      return
    }

    setSelectedList(list)
    setShowLists(false)
  }

  const handleAddList = (listName: string) => {
    const newList = {
      id: uuidv4(),
      name: listName,
      items: [],
    }

    createListOnDB(newList)
  }

  return (
    <main className="flex flex-1 flex-col px-40 py-10 items-center justify-center">
      <div className="flex flex-col bg-white rounded-default h-[550px] w-[500px] border-default shadow-default">
        <header className="flex items-center gap-2 p-4 bg-header rounded-t-default">
          {showLists ? (
            <div className="flex flex-1 items-center justify-between">
              <h1 className="font-black text-2xl  lowercase">Listas</h1>
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-between">
              <h1 className="font-black text-2xl  lowercase">para hoje</h1>
              <button className=" text-xl hover:underline max-w-[250px] truncate" onClick={handleClickOnListName}>
                {selectedList?.name}
              </button>
            </div>
          )}
        </header>
        <Divider />

        <div className="flex flex-1">
          {showLists ? (
            <ListsContent
              handleOnChooseList={handleOnChooseList}
              handleDeleteList={handleDeleteList}
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
        </div>

        <Divider />

        <div className="">
          {showLists ? (
            <ListsContentFooter handleAddList={handleAddList} />
          ) : (
            <ListContentFooter handleAddItem={handleAddItem} editingItemText={editingItem?.text} />
          )}
        </div>
      </div>
    </main>
  )
}
