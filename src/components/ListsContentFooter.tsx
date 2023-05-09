import { useState } from 'react'
import { FooterContainer } from '@/components/FooterContainer'
import InputText from '@/components/InputText'

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
    <FooterContainer>
      <InputText
        placeholder="digite o nome da lista"
        onChange={handleInputTextChange}
        onKeyDown={handleKeyDownOnInputText}
        value={inputTextValue}
      />
      <button
        className="text-primary hover:underline disabled:text-lightenGray disabled:no-underline ml-4 lowercase"
        onClick={handleAdd}
        disabled={!inputTextValue.length}
      >
        Adicionar
      </button>
    </FooterContainer>
  )
}
