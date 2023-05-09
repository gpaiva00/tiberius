import { useEffect, useState } from 'react'

import { FooterContainer } from '@/components/FooterContainer'
import InputText from '@/components/InputText'

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
    <FooterContainer>
      <InputText
        placeholder="digite o nome da tarefa"
        onChange={handleInputTextChange}
        onKeyDown={handleKeyDownOnInputText}
        value={inputTextValue}
      />
      <button
        className="text-primary hover:underline disabled:text-lightenGray disabled:no-underline ml-4 lowercase"
        onClick={handleAdd}
        disabled={!inputTextValue.length}
      >
        {editingItemText?.length ? 'Salvar' : 'Adicionar'}
      </button>
    </FooterContainer>
  )
}
