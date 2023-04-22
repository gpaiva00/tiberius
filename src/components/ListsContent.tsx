import { GENERAL_LIST_ID } from "@/consts"

import Divider from "@/components/Divider"

import { ListProps } from "@/typings/List"

import { CaretRight, Trash } from "@phosphor-icons/react"
import classNames from "classnames"

interface ListsContentProps {
  handleClickOnListName: (listID: number) => void
  handleDeleteList: (listID: number) => void
  lists: ListProps[]
}

export default function ListsContent({ handleClickOnListName, handleDeleteList, lists }: ListsContentProps) {

  return (
    <div>
      {/* <>
        <div className="flex items-center justify-between pb-4 px-4">
          <h1
            className="text-primary text-lg hover:underline cursor-pointer"
            onClick={() => handleClickOnListName(GENERAL_LIST_ID)}
          >
            Geral
          </h1>

          <CaretRight className="text-gray" />
        </div>
        <Divider />
      </> */}

      {lists.map((list, index) => (
        <div key={list.id}>
          <div className={classNames('flex items-center justify-between p-4', {
            'px-4 pb-4 pt-0': list.id === GENERAL_LIST_ID
          })}>
            <h1
              className="text-primary text-lg hover:underline cursor-pointer max-w-[86%] truncate"
              onClick={() => handleClickOnListName(list.id)}
            >
              {list.name}
            </h1>

            {list.id === GENERAL_LIST_ID ? (
              <CaretRight className="text-gray" />
            ) : (
              <button
                className="text-lightenGray hover:text-primary"
                onClick={() => handleDeleteList(list.id)}
              >
                <Trash size={18} />
              </button>
            )}
          </div>
          {(index !== lists.length - 1 || list.id === GENERAL_LIST_ID) && <Divider />}
        </div>
      ))}
    </div>
  )
}