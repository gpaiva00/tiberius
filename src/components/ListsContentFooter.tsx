import { useState } from 'react'

import { FooterContainer } from '@/components/FooterContainer'
import InputText from '@/components/InputText'
import Divider from '@/components/Divider'

interface AllListsCardFooterProps {
  handleAddList: (itemText: string) => void
}

export default function ListsContentFooter({ handleAddList }: AllListsCardFooterProps) {
  const [inputTextValue, setInputTextValue] = useState<string>('')

  const handleAdd = () => {
    setInputTextValue('')
    handleAddList(inputTextValue)
  }

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value)
  }

  const handleKeyDownOnInputText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputTextValue.length) {
      handleAdd()
    }
  }

  return (
    <div>
      <Divider />
      <FooterContainer>
        <InputText
          placeholder="digite o nome da lista"
          onChange={handleInputTextChange}
          onKeyDown={handleKeyDownOnInputText}
          value={inputTextValue}
        />
        <button
          className="secondary-button"
          onClick={handleAdd}
          disabled={!inputTextValue.length}
        >
          Adicionar
        </button>
      </FooterContainer>
    </div>
  )
}
