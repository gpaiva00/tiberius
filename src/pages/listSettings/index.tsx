import { useState } from 'react'
import toast from 'react-hot-toast'

import { useList } from '@/hooks'

import { CardContentContainer, FormattedItemText, MainCard } from '@/shared/components'

import { DEFAULT_ICON_PROPS, DEFAULT_TOAST_PROPS } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'
import { Archive } from '@phosphor-icons/react'

export default function ListSettings() {
  const { selectedList, updateList } = useList()

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

  return (
    <MainCard
      title={
        <div className="flex items-center gap-2">
          <h1 className="default-header-title max-w-[5.25rem] truncate dark:text-darkTextLight md:max-w-fit">
            Configurações
          </h1>
          <span className="text-lg font-bold dark:text-darkTextLight">em</span>
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
      }
    >
      <CardContentContainer className="px-24 py-8">
        {/* input container */}
        <div className="flex flex-col gap-2 p-2 md:gap-8 md:p-4">
          <div className="flex flex-col gap-1">
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
        </div>
      </CardContentContainer>
    </MainCard>
  )
}
