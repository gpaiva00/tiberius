import { useState } from 'react'
import toast from 'react-hot-toast'

import { useList } from '@/hooks'

import {
  Card,
  CardContentContainer,
  Divider,
  FooterContainer,
  InputText,
  InputTextWithFormatting,
} from '@/shared/components'
import Header from './components/ListSettingsHeader'

import { DEFAULT_TOAST_PROPS } from '@/consts'
import { ListProps, ListTypesProps } from '@/typings/List'

export default function ListSettings() {
  const { selectedList, updateList } = useList()

  const [inputText, setInputText] = useState<string>(selectedList?.name as string)

  const handleChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleSave = async () => {
    if (!inputText) {
      toast('o nome da lista não pode ficar vazio', {
        icon: '⚠️',
        ...DEFAULT_TOAST_PROPS,
      })
      return
    }

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
    <Card>
      <Header selectedList={selectedList} />
      <CardContentContainer>
        <div className="flex flex-1 flex-col">
          {/* input container */}
          <div className="flex flex-col gap-2 p-2 md:gap-4 md:p-4">
            <label className="default-label">Nome da lista</label>
            <InputTextWithFormatting
              placeholder="Nome da lista"
              inputTextValue={inputText}
              setInputTextValue={setInputText}
              disabled={selectedList?.type === ListTypesProps.GENERAL}
              formats={['italic']}
              handleSubmit={handleSave}
            />
          </div>

          {/* <Divider /> */}

          {/* delete completed items container */}
          {/* <div className="flex flex-col gap-4 p-4">
            <label className="default-label">apagar itens concluídos</label>
            <div className="flex flex-col gap-2">
              <select
                className="h-inputControl"
                onChange={handleOnChangeOption}
                value={inputOption}
              >
                <option value="daily">diariamente (padrão)</option>
                <option value="weekly">semanalmente</option>
                <option value="monthly">mensalmente</option>
                <option value="never">nunca</option>
              </select>
              <p className="text-xs text-lightenGray dark:text-darkTextGray">{getOptionDescription[inputOption]}</p>
            </div>
          </div> */}
        </div>
      </CardContentContainer>
      <Divider />
      <FooterContainer>
        <div className="flex flex-1 items-center justify-center">
          <button
            className="primary-button"
            onClick={handleSave}
          >
            Salvar alterações
          </button>
        </div>
      </FooterContainer>
    </Card>
  )
}
