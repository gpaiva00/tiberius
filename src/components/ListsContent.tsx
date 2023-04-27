import { useEffect, useState } from 'react'

import { GENERAL_LIST } from '@/consts'
import { subscribeToLists } from '@/services/list'

import Divider from '@/components/Divider'

import { ListProps } from '@/typings/List'

import { CaretRight, Trash } from '@phosphor-icons/react'

interface ListsContentProps {
  handleOnChooseList: (list: ListProps) => void
  handleDeleteList: (listID: ListProps['id']) => void
}

export default function ListsContent({ handleOnChooseList, handleDeleteList }: ListsContentProps) {
  const [lists, setLists] = useState<ListProps[]>([])

  useEffect(() => {
    const unsubscribe = subscribeToLists((lists) => {
      const newLists: ListProps[] = []

      lists.forEach((list) => {
        newLists.push(list.data() as ListProps)
      })


      setLists(newLists)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="flex flex-1 flex-col pb-4 max-h-[400px] overflow-y-scroll bg-white">
      {lists.map((list, index) => (
        <div key={list.id}>
          <div className={'flex items-center justify-between p-4'}>
            <h1
              className="text-primary  hover:underline cursor-pointer max-w-[86%] truncate"
              onClick={() => handleOnChooseList(list)}
            >
              {list.name}
            </h1>

            {list.id === GENERAL_LIST.id ? (
              <CaretRight className="text-gray" />
            ) : (
              <button
                className="text-lightenGray hover:text-primary transition-colors"
                onClick={() => handleDeleteList(list.id)}
              >
                <Trash size={18} />
              </button>
            )}
          </div>
          {(index !== lists.length - 1 || list.id === GENERAL_LIST.id) && <Divider />}
        </div>
      ))}
    </div>
  )
}
