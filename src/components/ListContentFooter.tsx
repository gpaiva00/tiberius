import { useEffect, useState } from "react"

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
    <footer className="flex items-center justify-between p-4 rounded-b-default">
      <input
        type="text"
        className="h-10 w-[320px] py-4 px-2 border border-black rounded-default font-light outline-none bg-white text-black"
        placeholder="digite o nome da tarefa"
        onChange={handleInputTextChange}
        onKeyDown={handleKeyDownOnInputText}
        value={inputTextValue}
      />
      <button
        className="text-primary hover:underline disabled:text-lightenGray disabled:no-underline"
        onClick={handleAdd}
        disabled={!inputTextValue.length}
      >
        {editingItemText?.length ? 'Salvar' : 'Adicionar'}
      </button>
    </footer>
  )
}
