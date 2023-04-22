import { useState } from "react"

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
    <footer className="flex items-center justify-between p-4 rounded-b-default">
      <input
        type="text"
        className="h-10 w-[320px] py-4 px-2 border border-black rounded-default outline-none bg-white text-black"
        placeholder="digite o nome da lista"
        onChange={handleInputTextChange}
        onKeyDown={handleKeyDownOnInputText}
        value={inputTextValue}
      />
      <button
        className="text-primary hover:underline disabled:text-lightenGray disabled:no-underline ml-4"
        onClick={handleAdd}
        disabled={!inputTextValue.length}
      >
        Adicionar
      </button>
    </footer>
  )
}
