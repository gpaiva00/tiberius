import { useState } from 'react'

import { useList } from '@/contexts/useList'

import Card from '@/shared/components/Card'
import { CardContentContainer } from '@/shared/components/CardContentContainer'
import Header from './components/ListSettingsHeader'
import InputText from '@/shared/components/InputText'
import { FooterContainer } from '@/shared/components/FooterContainer'
import Divider from '@/shared/components/Divider'

import { DeleteItemsStrategyProps } from '@/pages/listSettings/typings/Options'
import { ListProps } from '@/typings/List'

import { GENERAL_LIST } from '@/consts'

export default function ListSettings() {
  const { selectedList, updateList } = useList()

  const [inputText, setInputText] = useState<string>(selectedList?.name as string)
  const [inputOption, setInputOption] = useState<DeleteItemsStrategyProps>(DeleteItemsStrategyProps.DAILY)

  const handleChangeInputText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value)
  }

  const handleSave = async () => {
    if (!inputText) {
      alert('o nome da lista não pode ficar vazio')
      return
    }

    const updatedList: ListProps = {
      ...(selectedList as ListProps),
      name: inputText,
      deleteItemsStrategy: inputOption,
    }

    await updateList(updatedList)
    // TODO: show success message
    // navigate(-1)
  }

  const getOptionDescription = {
    [DeleteItemsStrategyProps.DAILY]: 'os itens concluídos serão apagados a cada 24 horas.',
    [DeleteItemsStrategyProps.WEEKLY]: 'os itens concluídos serão apagados a cada 7 dias.',
    [DeleteItemsStrategyProps.MONTHLY]: 'os itens concluídos serão apagados a cada 30 dias.',
    [DeleteItemsStrategyProps.NEVER]: 'os itens concluídos nunca serão apagados.',
  }

  return (
    <Card>
      <Header selectedList={selectedList} />
      <CardContentContainer>
        <div className="flex flex-1 flex-col">
          {/* input container */}
          <div className="flex flex-col gap-4 p-4">
            <label className="default-label">nome da lista</label>
            <InputText
              placeholder="Nome da lista"
              value={inputText}
              onChange={handleChangeInputText}
              className="w-full"
              disabled={selectedList?.id === GENERAL_LIST.id}
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
