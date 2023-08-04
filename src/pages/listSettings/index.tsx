import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router'

import { useList } from '@/hooks'

import { FormattedItemText } from '@/shared/components'

import { DEFAULT_ICON_PROPS, DEFAULT_TOAST_PROPS, LISTS_ROUTE } from '@/constants'
import { deleteList } from '@/services/list'
import { ListProps, ListTypesProps } from '@/typings/List'
import { Archive } from '@phosphor-icons/react'

export default function ListSettings() {
  const { selectedList, updateList } = useList()
  const navigate = useNavigate()

  const [inputText, setInputText] = useState<string>(selectedList?.name as string)

  const handleSave = async () => {
    if (!inputText) {
      toast('o nome da lista não pode ficar vazio', {
        icon: '⚠️',
        ...DEFAULT_TOAST_PROPS,
      })
      return
    }

    if (inputText === selectedList?.name) return

    const updatedList: ListProps = {
      ...(selectedList as ListProps),
      name: inputText,
    }

    await updateList(updatedList)

    toast('lista atualizada com sucesso!', {
      icon: '👏',
      ...DEFAULT_TOAST_PROPS,
    })
  }

  async function handleDeleteList() {
    const confirm = window.confirm('Tem certeza que deseja excluir essa lista?')

    if (!confirm) return

    await deleteList(selectedList?.id as string)
    navigate(LISTS_ROUTE)
  }

  return (
    <>
      {/* title container */}
      <div className="mb-2 flex w-full items-center px-4">
        <h1 className="default-header-title max-w-[5.25rem] truncate dark:text-gray-300 md:max-w-fit">
          Configurações ・
        </h1>
        <h1 className="default-header-title max-w-xs items-center truncate text-zinc-600 dark:text-gray-300 md:max-w-[15.625rem]">
          {selectedList?.type === ListTypesProps.GENERAL && (
            <Archive
              {...DEFAULT_ICON_PROPS}
              className="mr-2"
            />
          )}
          {FormattedItemText(selectedList?.name)}
        </h1>
      </div>
      {/* content container */}
      <div className="flex min-h-[350px] w-full flex-col items-center gap-2 overflow-y-scroll rounded-default bg-white p-2 dark:bg-zinc-800 md:gap-8 md:p-4">
        <div className="flex w-full flex-1 flex-col gap-1">
          <label className="default-label">Nome da lista</label>
          <input
            type="text"
            className="default-input-text"
            placeholder="Ex: 📖 Estudos"
            onSubmit={handleSave}
            onKeyDown={(event) => event.key === 'Enter' && handleSave()}
            value={inputText}
            onBlur={handleSave}
            onChange={(event) => setInputText(event.target.value)}
            disabled={selectedList?.type === ListTypesProps.GENERAL}
          />
        </div>
        {selectedList?.type !== ListTypesProps.GENERAL && (
          <button
            className="secondary-button dark:text-dark-red max-w-sm text-red-500"
            onClick={handleDeleteList}
          >
            Excluir lista
          </button>
        )}
      </div>
    </>
  )
}
