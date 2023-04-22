import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import ListContent from "@/components/ListContent";
import ListsContent from "@/components/ListsContent";
import Divider from "@components/Divider";

import { ListItem, ListProps } from "@typings/List";
import { DEFAULT_LIST } from "@/consts"

import ListContentFooter from "@/components/ListContentFooter";
import ListsContentFooter from "@/components/ListsContentFooter";

export default function Home() {
  const [showLists, setShowLists] = useState<boolean>(false)
  const [lists, setLists] = useState<ListProps[]>([DEFAULT_LIST])
  const [selectedList, setSelectedList] = useState<ListProps | null>(DEFAULT_LIST)
  const [editingItem, setEditingItem] = useState<ListItem | null>(null)

  const handleClickOnListName = () => setShowLists(true)

  const handleDoubleClickOnItem = (item: ListItem) => {
    if (item.completed) return

    setEditingItem(item)
  }

  const handleDeleteItem = (item: ListItem) => {
    const prompt = window.confirm('Tem certeza que deseja excluir este item?')

    if (!prompt) return

    const newItems = selectedList?.items.filter((selectedListItem) => selectedListItem.id !== item.id)

    setSelectedList({
      ...selectedList as ListProps,
      items: newItems as ListItem[]
    })
  }

  const handleDeleteList = (listID: number) => {
    const prompt = window.confirm('Tem certeza que deseja excluir esta lista?')

    if (!prompt) return

    const newLists = lists.filter((list) => list.id !== listID)

    setLists(newLists)
  }

  const updateItem = (item: ListItem) => {
    const newItems = selectedList?.items.map((selectedListItem) => {
      if (selectedListItem.id === item.id) {
        return item
      }

      return selectedListItem
    })

    setSelectedList({
      ...selectedList as ListProps,
      items: newItems as ListItem[]
    })
  }

  const updateItemText = (itemText: string) => {
    const newItem = {
      ...editingItem as ListItem,
      text: itemText
    }

    updateItem(newItem)
    setEditingItem(null)
  }

  const handleOnCheckItem = (item: ListItem) => {
    const newItem = {
      ...item,
      completed: !item.completed
    }

    updateItem(newItem)
  }

  const handleAddItem = (itemText: string) => {
    if (!!editingItem) {
      updateItemText(itemText)
      return
    }

    const newItems = [
      ...selectedList?.items as ListItem[],
      {
        id: uuidv4(),
        text: itemText,
        completed: false
      }
    ]

    setSelectedList({
      ...selectedList as ListProps,
      items: newItems
    })

    const newLists = lists.map((list) => {
      if (list.id === selectedList?.id) {
        return {
          ...list,
          items: newItems
        }
      }

      return list
    })

    setLists(newLists)
  }

  const handleOnChooseList = (listID: number) => {

    if (listID === 1) {
      setSelectedList(DEFAULT_LIST)
      setShowLists(false)
      return
    }

    const list = lists.find((list) => list.id === listID)

    if (!list) return

    setSelectedList(list)
    setShowLists(false)

  }

  const handleAddList = (listName: string) => {
    const newList = {
      id: uuidv4(),
      name: listName,
      items: []
    }

    setLists([
      ...lists,
      newList
    ])
  }

  return (
    <main className='flex flex-col flex-1 min-h-screen px-40 py-10 items-center justify-center'>
      <div className="flex flex-col">
        <div className="flex flex-col bg-white rounded-default h-[500px] w-[450px] border border-black shadow-default">
          <header className="flex items-center gap-2 p-4 bg-header rounded-t-default">
            {showLists
              ? <div className="flex flex-1 items-center justify-between">
                <h1 className="font-black text-2xl text-black">Listas</h1>
                {/* <button
                  className="text-black font-semibold text-2xl hover:underline hover:text-white transition-colors"
                  onClick={handleClickOnHome}
                >
                  <House size={25} weight="fill" />
                </button> */}
              </div>
              : <div className="flex flex-1 items-center justify-between">
                <h1 className="font-black text-2xl text-black">Para hoje</h1>
                <button
                  className="text-black text-xl hover:underline max-w-[200px] truncate"
                  onClick={handleClickOnListName}
                >
                  {selectedList?.name}
                </button>
              </div>
            }
          </header>
          <Divider />

          <div className="flex flex-1 flex-col pt-4">
            {showLists
              ? <ListsContent
                lists={lists}
                handleClickOnListName={handleOnChooseList}
                handleDeleteList={handleDeleteList}
              />
              : <ListContent
                selectedList={selectedList}
                setSelectedList={setSelectedList}
                handleDoubleClickOnItem={handleDoubleClickOnItem}
                handleOnCheckItem={handleOnCheckItem}
                handleDeleteItem={handleDeleteItem}
              />
            }
          </div>

          <Divider />

          {showLists ? (
            <ListsContentFooter
              handleAddList={handleAddList}
            />
          ) : (
            <ListContentFooter
              handleAddItem={handleAddItem}
              editingItemText={editingItem?.text}
            />
          )}
        </div>
        <footer className="w-full text-end mt-5">
          <p className='text-sm text-gray opacity-50 font-light'>Tiberius © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </main>
  )
}