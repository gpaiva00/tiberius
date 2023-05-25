import { Link, useNavigate } from 'react-router-dom'

import { useList } from '@/hooks'

import { Divider } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE, LIST_ROUTE } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'

import { Archive, CaretLeft, Dot, TrashSimple } from '@phosphor-icons/react'

interface ListContentHeaderProps {
  selectedList: ListProps | null
}

export default function Header({ selectedList }: ListContentHeaderProps) {
  const { deleteList } = useList()
  const navigate = useNavigate()

  const handleDeleteList = async (listID: ListProps['id']) => {
    const prompt = window.confirm('tem certeza que deseja excluir esta lista?')

    if (!prompt) return

    await deleteList(listID)
    navigate(LISTS_ROUTE)
  }

  return (
    <div>
      <header className="flex h-16 items-center gap-2 rounded-t-default px-2 md:px-4">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <Link
              to={LIST_ROUTE}
              className="icon-button"
            >
              <CaretLeft {...DEFAULT_ICON_PROPS} />
            </Link>
            <h1 className="ml-2 max-w-[5.25rem] truncate text-xl font-black lowercase dark:text-darkTextLight md:ml-4 md:max-w-fit md:text-2xl">
              configurações
            </h1>
            <Dot
              {...DEFAULT_ICON_PROPS}
              size={25}
              className="dark:text-darkTextGray"
            />
            <h1 className="flex max-w-xs items-center truncate text-xl font-semibold text-lightenGray dark:text-darkTextGray md:max-w-[15.625rem] md:text-2xl">
              {selectedList?.type === ListTypesProps.GENERAL && (
                <Archive
                  {...DEFAULT_ICON_PROPS}
                  className="mr-2"
                />
              )}
              {selectedList?.name}
            </h1>
          </div>
          <button
            className="rounded-default p-2 transition-colors hover:bg-lightGray dark:hover:bg-darkTextGray"
            onClick={() => handleDeleteList(selectedList?.id as ListProps['id'])}
          >
            <TrashSimple
              {...DEFAULT_ICON_PROPS}
              className="dark:text-darkTextLight"
            />
          </button>
        </div>
      </header>
      <Divider />
    </div>
  )
}
