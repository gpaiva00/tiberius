import { useEffect, useState } from 'react'

import { FooterContainer } from '@/components/FooterContainer'
import InputText from '@/components/InputText'
import Divider from '@/components/Divider'

interface ListCardFooterProps {
  handleAddItem: (itemText: string) => void
  editingItemText?: string
}

export default function ListContentFooter({ handleAddItem, editingItemText }: ListCardFooterProps) {
  const [inputTextValue, setInputTextValue] = useState<string>('')

  const handleAdd = () => {
    setInputTextValue('')
    handleAddItem(inputTextValue)
  }

  const handleInputTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTextValue(event.target.value)

    if (!event.target.value.length) {
      // cancel editing
    }
  }

  const handleKeyDownOnInputText = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputTextValue.length) {
      handleAdd()
    }
  }

  useEffect(() => {
    if (editingItemText?.length) {
      setInputTextValue(editingItemText)
    }
  }, [editingItemText])

  return (
    <div>
      <Divider />
      <FooterContainer>
        <InputText
          placeholder="digite o nome da tarefa"
          onChange={handleInputTextChange}
          onKeyDown={handleKeyDownOnInputText}
          value={inputTextValue}
        />
        <button
          className="secondary-button"
          onClick={handleAdd}
          disabled={!inputTextValue.length}
        >
          {editingItemText?.length ? 'Salvar' : 'Adicionar'}
        </button>
      </FooterContainer>
    </div>
  )
}
