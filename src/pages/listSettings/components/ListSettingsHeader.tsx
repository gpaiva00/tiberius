import { useNavigate } from 'react-router-dom'

import { useList } from '@/hooks'

import { Divider, FormattedItemText } from '@/shared/components'

import { DEFAULT_ICON_PROPS, LISTS_ROUTE } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'

import { Archive, CaretLeft, Dot, SidebarSimple } from '@phosphor-icons/react'

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

  const handleClickOnBackButton = () => {
    navigate(-1)
  }

  return (
    <div>
      <header className="default-header">
        <div className="flex w-full items-center">
          <button className="icon-button">
            <SidebarSimple
              {...DEFAULT_ICON_PROPS}
              size={25}
            />
          </button>
          <button
            onClick={handleClickOnBackButton}
            className="icon-button"
          >
            <CaretLeft {...DEFAULT_ICON_PROPS} />
          </button>
          <h1 className="default-header-title max-w-[5.25rem] truncate dark:text-darkTextLight md:max-w-fit">
            Configurações
          </h1>
          <Dot
            {...DEFAULT_ICON_PROPS}
            size={25}
            className="text-lightenGray dark:text-darkTextGray"
          />
          <h1 className="flex max-w-xs items-center truncate text-xl font-semibold text-lightenGray dark:text-darkTextGray md:max-w-[15.625rem]">
            {selectedList?.type === ListTypesProps.GENERAL && (
              <Archive
                {...DEFAULT_ICON_PROPS}
                className="mr-2"
              />
            )}
            {FormattedItemText(selectedList?.name)}
          </h1>
        </div>
      </header>
      <Divider />
    </div>
  )
}
