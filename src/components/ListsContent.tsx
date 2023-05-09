import classNames from 'classnames'

import { DEFAULT_ICON_PROPS, GENERAL_LIST, STORAGE_SELECTED_LIST_ID_KEY } from '@/consts'

import { ListContentContainer } from '@/components/ListContentContainer'
import Divider from '@/components/Divider'

import { ListProps } from '@/typings/List'
import { getFromStorage } from '@/utils/storage'

import { CaretRight, TrashSimple } from '@phosphor-icons/react'

interface ListsContentProps {
  handleOnChooseList: (list: ListProps) => void
  handleDeleteList: (listID: ListProps['id']) => void
  lists: ListProps[]
}

export default function ListsContent({ lists, handleOnChooseList, handleDeleteList }: ListsContentProps) {
  const selectedListOnStorage = getFromStorage(STORAGE_SELECTED_LIST_ID_KEY)

  return (
    <ListContentContainer>
      {lists.map((list, index) => (
        <div key={list.id}>
          <div className={'flex items-center justify-between p-4'}>
            <h1
              className={classNames('text-primary hover:underline cursor-pointer max-w-[86%] truncate', {
                'font-bold': list.id === selectedListOnStorage,
                'font-light': list.id !== selectedListOnStorage,
              })}
              onClick={() => handleOnChooseList(list)}
            >
              {list.name}
            </h1>

            {list.name === GENERAL_LIST.name ? (
              <CaretRight {...DEFAULT_ICON_PROPS} />
            ) : (
              <button
                className="hover:text-lightenGray transition-colors"
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
  )
}
